// read.js
let fs = require('fs')

function read() {
   let data = '';
   console.log('start ')
   const readStream = fs.createReadStream('demo.csv', 'utf-8');
   readStream.on('error', (error) => console.log(error.message));
   readStream.on('data', (chunk) => {
    data += chunk
    console.log('chunk')
   });
   readStream.on('end', () => console.log('Reading complete'));
};

read();
console.log('end')

