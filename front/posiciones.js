//OBTENER POSICIONES DE LA API Y LAS CARGA EN LA TABLA
async function cargarPosiciones() {
  try {
    const response = await fetch("/api/posiciones");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posiciones = await response.json(); //parseo a objeto
    const cuerpoTabla = document.getElementById("posicionesTabla");
    if (!cuerpoTabla) {
      return;
    }

    cuerpoTabla.innerHTML = ""; // limpio la tabla para que no se repitan datos

    if (posiciones.length === 0) {
      cuerpoTabla.innerHTML =
        "<tr><td colspan='6'>No hay posiciones para mostrar</td></tr>";
      return;
    }

    posiciones.forEach((partida, index) => {
      //recorro array de partidas
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${partida.nombre || "N/A"}</td>
        <td>${partida.apellido || "N/A"}</td>
        <td>${partida.email || "N/A"}</td>
        <td>${partida.movimientos || "N/A"}</td>
        <td>${partida.tiempo || "N/A"}</td>
        <td>${partida.aciertos || "N/A"}</td>
      `; //creo una fila y lleno con los datos de la partida
      cuerpoTabla.appendChild(tr);
    });
  } catch (error) {
    console.error("Error al cargar posiciones:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, llamando a cargarPosiciones");
  cargarPosiciones(); // cargo posiciones cuando este el dom
});
