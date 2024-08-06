# MemoTest Harry Potter

## Descripción
MEMO POTTER es un juego de memoria basado en personajes de Harry Potter. Los jugadores deben emparejar cartas con imágenes de personajes, poniendo a prueba su memoria y rapidez. Este proyecto lo desarrollé como proyecto final de la materia WebII de la carrera de Tecnología en Desarrollo de Software en la UGD. La finalidad del proyecto era ser evaluado al finalizar la materia. Las condiciones para realizar este proyecto y aprobar la materia fueron:

- Desarrollar el típico juego de Memoria de Cartas.
- El juego consiste en presentar sobre un tablero en forma de grilla 30 cartas ubicadas boca abajo en forma aleatoria. Esas 30 cartas están formadas por 15 pares de cartas iguales. Cuando se destapa la segunda carta, esta debe mostrarse al menos 2 segundos antes de volver a ocultarse para permitir la memorización por parte del jugador.

### Reglas del Juego
1. **El jugador debe registrar un nombre, apellido y email antes de comenzar la partida.**
2. **El jugador elige una carta, y esta se destapa.**
3. **El jugador elige otra carta diferente y esta se destapa.**
   - **Si las cartas son iguales**, estas se mantienen destapadas, suman puntos y se continúa destapando otro conjunto de cartas.
   - **Si las cartas son diferentes**, estas se ponen boca abajo nuevamente y se continúa destapando otro conjunto de cartas. 
4. **El juego termina cuando se han descubierto todos los pares del tablero.**

### Condiciones de Evaluación
- Al comenzar la partida, el juego debe llevar un contador de segundos y un contador de intentos visibles en el panel.
- Cada intento exitoso (cuando se descubre un par) sumará los siguientes puntos: número de segundos + número del intento.
- Una vez finalizada la partida, el juego debe guardar los datos de la partida en un repositorio persistente del servidor.
- La aplicación debe permitir consultar en una página aparte el listado de las primeras 20 posiciones almacenadas, donde las primeras posiciones corresponden a las partidas con menor puntaje.
- Las cartas deben ser construidas en base a los personajes de Harry Potter, que serán consumidos desde la API [HP-API](https://hp-api.onrender.com/api/characters). Se deben tener en cuenta solo los personajes que tengan imagen, y deben ser elegidos de forma aleatoria. Cada carta debe mostrar el nombre del personaje, su imagen, casa y fecha de nacimiento (si existen).

## Características
- Juego de memoria con temática de Harry Potter
- Sistema de registro de jugadores
- Tablero dinámico con imágenes de personajes
- Contador de movimientos, aciertos y tiempo
- Tabla de posiciones con los mejores 20 jugadores

## Tecnologías Utilizadas
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Base de datos**: JSON (para almacenamiento local de partidas)
- **API externa**: HP-API para obtener información de personajes


## Estructura del Proyecto
Proyecto Final WEB-2/
|-- back/
| |-- node_modules/
| |-- .gitignore
| |-- package-lock.json
| |-- package.json
| |-- partidas.json
| |-- server.js
|-- front/
| |-- imagenes/
| | |-- carta.jpg
| | |-- memoPotter.jpg
| | |-- pajaro.jpg
| | |-- sombrero.jpg
| | |-- top20.jpg
| |-- index.js
| |-- index.html
| |-- posiciones.html
| |-- posiciones.js
| |-- style.css
| |-- consignas.pdf

## Cómo Jugar
1. Regístrate con tu nombre, apellido y email.
2. Haz clic en las cartas para revelarlas.
3. Encuentra todos los pares antes de que se acabe el tiempo.
4. Intenta hacer el menor número de movimientos posible!

---

## Autor
[Nicolas Kaminski](https://www.linkedin.com/in/nkaminski-profile/)

## Licencia
Este proyecto está bajo la Licencia ISC.

---

Gracias por revisar mi proyecto! :)



