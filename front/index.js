// VARIABLES DECLARADAS
let tarjetasDestapadas = 0,
  movimiento = 0,
  aciertos = 0,
  timer = 0;

let tarjeta1 = null,
  tarjeta2 = null,
  primerResultado = null,
  segundoResultado = null,
  tiempoF = null;

let temporizador = false;
let jugador = {};
let imagenes = [];

const TOTALPARES = 15;

// ELEMENTOS DEL DOM
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("tiempo");

// GUARDAR ESTADISTICAS A LA API
async function guardarEstadisticas(jugador) {
  try {
    const response = await fetch("/api/guardar", {
      //envio las estadisticas a la api
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jugador),
    });
    const data = await response.json();
  } catch (error) {
    console.error("Error al guardar estadísticas:", error);
  }
}

// OBTENER PERSONAJES DE LA API
async function obtenerPersonajes() {
  try {
    const response = await fetch("/api/characters"); //envio el get a la api
    const personajes = await response.json(); //la espero hasta que sea json
    imagenes = [...personajes, ...personajes].sort(() => Math.random() - 0.5); //array duplico personajes para los pares y mezclo
    crearTablero();
  } catch (error) {
    console.error("Error al obtener personajes:", error);
  }
}

//FUNCIONES
function crearTablero() {
  const tablero = document.getElementById("tablero");
  tablero.innerHTML = "";
  imagenes.forEach((img, index) => {
    // console.log(`Posición ${index}: ${img.name}`);
    const button = document.createElement("button"); //crear boton para cada imagen
    button.id = index;
    button.onclick = () => destapar(index);
    tablero.appendChild(button);
  });
}

function contarTiempo() {
  tiempoF = setInterval(() => {
    //ejecuto la funcion cada 1 segundo
    timer++;
    mostrarTiempo.innerHTML = `Tiempo: ${timer}`;
    if (aciertos === TOTALPARES) {
      finalizarJuego();
    }
  }, 1000);
}

function ocultarTarjetas() {
  setTimeout(() => {
    tarjeta1.innerHTML = " ";
    tarjeta2.innerHTML = " ";
    tarjeta1.disabled = false;
    tarjeta2.disabled = false;
    tarjetasDestapadas = 0;
  }, 2000); //tarjetas visibles por 2 segundos
}

function verificarJugadorRegistrado() {
  if (!jugador.nombre || !jugador.apellido || !jugador.email) {
    Swal.fire({
      title: "Ups",
      text: "Registrate antes de jugar.",
      icon: "error",
      confirmButtonText: "OK",
      customClass: {
        popup: "contenedorSwal",
        confirmButton: "botonSwal",
      },
    });
    return false;
  }
  return true;
}

function iniciarTemporizador() {
  contarTiempo();
  temporizador = true;
}

function destapar(id) {
  if (!verificarJugadorRegistrado()) return;
  if (!temporizador) {
    iniciarTemporizador();
  }

  tarjetasDestapadas++;

  if (tarjetasDestapadas === 1) {
    manejarPrimeraTarjeta(id);
  } else if (tarjetasDestapadas === 2) {
    manejarSegundaTarjeta(id);
  }
}

function manejarPrimeraTarjeta(id) {
  tarjeta1 = document.getElementById(id);
  primerResultado = imagenes[id].image; // guardo la carta en la variable
  tarjeta1.innerHTML = `<img src="${primerResultado}" alt="imagen">`;
  tarjeta1.disabled = true;
}

function manejarSegundaTarjeta(id) {
  tarjeta2 = document.getElementById(id);
  segundoResultado = imagenes[id].image;
  tarjeta2.innerHTML = `<img src="${segundoResultado}" alt="imagen">`;
  tarjeta2.disabled = true;

  movimiento++;
  mostrarMovimientos.innerHTML = `Movimientos: ${movimiento}`;

  if (primerResultado === segundoResultado) {
    manejarAcierto();
  } else {
    ocultarTarjetas();
  }
}

function manejarAcierto() {
  tarjetasDestapadas = 0;
  aciertos++;
  mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
  if (aciertos === TOTALPARES) {
    finalizarJuego();
  }
}

function finalizarJuego() {
  clearInterval(tiempoF); //detengo el tiempo al terminar el juego
  mostrarTiempo.innerHTML = `Tiempo: ${timer} ⌛`;
  mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🥳`;
  mostrarMovimientos.innerHTML = `Movimientos: ${movimiento} 😎`;

  jugador.movimientos = movimiento;
  jugador.tiempo = timer;
  jugador.aciertos = aciertos;
  guardarEstadisticas(jugador);

  mostrarMensajeGanador();
}

function mostrarMensajeGanador() {
  Swal.fire({
    title: "¡Felicitaciones!",
    text: "Ganaste el juego!",
    icon: "success",
    confirmButtonText: "Ok",
    customClass: {
      popup: "contenedorSwal",
      confirmButton: "botonSwal",
    },
  });
}

function resetearEstadisticas() {
  tarjetasDestapadas = 0;
  movimiento = 0;
  aciertos = 0;
  timer = 0;
  temporizador = false;
  clearInterval(tiempoF);

  mostrarMovimientos.innerHTML = "Movimientos: 0";
  mostrarAciertos.innerHTML = "Aciertos: 0";
  mostrarTiempo.innerHTML = "Tiempo: 0";
}

function resetearTablero() {
  const buttons = document.querySelectorAll("#tablero button"); //selecciono todos los botones(cartas) del tablero
  buttons.forEach((button) => {
    button.disabled = false;
    button.innerHTML = " ";
  });
}

function reiniciarJuego() {
  resetearEstadisticas();
  resetearTablero();
  obtenerPersonajes();
}

// MANEJAR REGISTRO JUGADOR
document
  .getElementById("registroJugador")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    jugador.nombre = document.getElementById("nombre").value;
    jugador.apellido = document.getElementById("apellido").value;
    jugador.email = document.getElementById("email").value;
    Swal.fire({
      title: "Registro Completo",
      text: "Ahora puedes jugar!",
      icon: "success",
      confirmButtonText: "Ok",
      customClass: {
        popup: "contenedorSwal",
        confirmButton: "botonSwal",
      },
    });
    document.getElementById("jugadorNombre").textContent = jugador.nombre; //envio el nombre al html
    this.reset();
  });

// INICIAR JUEGO
document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
obtenerPersonajes();
