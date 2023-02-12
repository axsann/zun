import fetch from 'node-fetch';
import fs from 'fs-extra';
import crypto from 'crypto';

async function hoge() {
  const topPageJson = await fs.readJson('./src/assets/json/top-page.json');

  const text = Object.keys(topPageJson)[0];
  const zundamonNumber = 1;
  const textQuery = encodeURIComponent(text);
  console.log(text);
  const url = `http://localhost:50021/audio_query?text=${textQuery}&speaker=${zundamonNumber}`;
  console.log(url);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const query = await res.json();
  console.log(query);

  const sound = await fetch(
    `http://localhost:50021/synthesis?speaker=${zundamonNumber}&enable_interrogative_upspeak=true`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'audio/wav',
        responseType: 'stream',
      },
      body: JSON.stringify(query),
    }
  );

  const fileName = crypto.createHash('md5').update(text).digest('hex');

  const dest = fs.createWriteStream(`${fileName}.wav`);
  sound.body!.pipe(dest);
}

hoge();
