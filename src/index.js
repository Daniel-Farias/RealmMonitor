import { app, Tray } from 'electron';
import { resolve } from 'path';
import { getRealms } from './utils/realms';
import { loadTray } from './utils/tray';

global.mainTray = {};

if (app.dock) {
  app.dock.hide();
}

function render() {
  loadTray();
  getRealms();
}

app.on('ready', () => {
  mainTray = new Tray(resolve(__dirname, 'assets', 'icon.png'));
  render();
});