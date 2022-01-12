require('dotenv').config();

import axios from 'axios';
import { resolve } from 'path';
import { getToken } from './oauth';
import { realmsTray } from './tray';

const onlineIcon = resolve(__dirname, '../assets', 'online.png');
const offlineIcon = resolve(__dirname, '../assets', 'offline.png');

export async function getRealms() {
  const { access_token } = await getToken();
  const url = process.env.URL_BASE + '?namespace=dynamic-us' + '&realms.timezone=' + process.env.TIMEZONE + '&access_token=' + access_token;

  let realms = [];
  await axios(url, { method: "GET" })
    .then(response => {
      const { results } = response.data;
      for (let resultIndex = 0; resultIndex < results.length; resultIndex++) {
        const { data } = response.data.results[resultIndex];
        for (let realmIndex = 0; realmIndex < data.realms.length; realmIndex++) {
          if (data.status.type === 'UP') {
            realms.push({ label: data.realms[realmIndex].name.en_US + ': Online', icon: onlineIcon });
          } else {
            realms.push({ label: data.realms[realmIndex].name.en_US + ': Offline', icon: offlineIcon });
          }
        }
      }
      realmsTray(realms);
    }).catch(err => {
      console.log(err);
    });
}