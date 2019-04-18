/* jshint esversion: 6 */

const game = new Game();

document.querySelector('#btn__reset').addEventListener('click', () => game.startGame());
document.querySelector('#qwerty').addEventListener('click', event => game.handleInteraction(event));
window.addEventListener('keyup', event => game.handleInteraction(event));