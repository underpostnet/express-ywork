
import fs from "fs";

import { Keys } from 'file:///C:/dd/underpost.net/src/node/src/keys/class/Keys.js';

var data = await JSON.parse(fs.readFileSync('C:/dd/global_data/json/cyberia/cyberia.json', 'utf8'));

await new Keys().generateKeys(data.dataPath+'keys/', data.keys.key_pass);
