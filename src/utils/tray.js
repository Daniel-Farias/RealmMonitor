import { Menu } from 'electron';
import { getRealms } from './realms';

export function loadTray() {
  const tray = Menu.buildFromTemplate([
    {
      label: 'Loading...',
    },
    {
      type: 'separator',
    },
    {
      type: 'normal',
      label: 'Quit',
      role: 'quit',
      enabled: true,
    },
  ]);
  mainTray.setContextMenu(tray);
};

export function realmsTray(realms) {
  const tray = Menu.buildFromTemplate([
    ...realms,
    {
      type: 'separator',
    },
    {
      label: 'Update List',
      click: reloadTray.bind(this),
    },
    {
      type: 'separator',
    },
    {
      type: 'normal',
      label: 'Quit',
      role: 'quit',
      enabled: true,
    },
  ]);
  mainTray.setContextMenu(tray);
};

export function reloadTray() {
  loadTray();
  getRealms();
};