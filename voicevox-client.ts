import fetch from 'node-fetch';
import fs from 'fs-extra';
import crypto from 'crypto';

async function hoge() {
  const topPageJson = await fs.readJson('./src/assets/input-json/top-page.json');

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

  const audioQuery = await res.json();
  console.log(audioQuery);

  const sound = await fetch(
    `http://localhost:50021/synthesis?speaker=${zundamonNumber}&enable_interrogative_upspeak=true`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'audio/wav',
        responseType: 'stream',
      },
      body: JSON.stringify(audioQuery),
    }
  );

  const fileName = `${crypto.createHash('md5').update(text).digest('hex')}.wav`;

  // TODO: inputのjsonファイル名をフォルダにしてその中に保存する
  const dest = fs.createWriteStream(`./public/${fileName}`);
  sound.body!.pipe(dest);

  const resultJson = {
    [text]: {
      audioQuery: audioQuery,
      audioFile: fileName,
    },
  };

  fs.writeJSON('./src/assets/output-json/top-page-out.json', resultJson);
}

hoge();
