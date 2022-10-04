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
