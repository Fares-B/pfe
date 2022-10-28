import axios from "axios";
// import QRCode from 'qrcode';
// import { PassThrough } from 'stream';

// export default async function (req, res, next) {
//     try {
//         const content = JSON.stringify(req.query);
//         const qrStream = new PassThrough();
//         const result = await QRCode.toFileStream(qrStream, content,
//             {
//                 type: 'png',
//                 width: 500,
//                 errorCorrectionLevel: 'H'
//             }
//         );
//         const filename = `${req.query.name} table-${req.query.table}.png`;
//         // send file stream
//         res.setHeader('Content-Type', 'image/png');
//         res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
//         res.setHeader('Connection', 'close');
//         res.status(200);
//         res.setHeader('content-type', 'image/png');
//         qrStream.pipe(res);
//     } catch (err) {
//         console.error('Failed to return content', err);
//     }
// }

export function sendRateToArduino(rate: number) {
  // const url = process.env.NODE_URL_ARDUINO;
  // const url ="http://127.0.0.1:3002";
  const url = "http://172.17.87.193:3306";
  if (url) {
    axios
      .get(url + "/" + rate)
      .then((res) => {
        // console.log("res", res);
        return;
      })
      .catch((err) => {
        // console.log("err", err);
        return;
      });
  }
}
