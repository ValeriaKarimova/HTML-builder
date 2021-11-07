const fs = require ('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const textToRead = fs.ReadStream(filePath, 'utf-8');

textToRead.on('data', function(content) {
    console.log(content);
})

