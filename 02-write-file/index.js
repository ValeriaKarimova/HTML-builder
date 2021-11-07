const fs = require('fs');
const process = require('process');
const path = require('path');
const readline = require('readline');


const PathToNewFile = path.join(__dirname, 'text.txt');
const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
let content = "";
  
fs.writeFile(PathToNewFile, "", () => {});
console.log('Enter your text:');

userInput.on('line', (input) => {
    if (input == 'exit'){
        userInput.close();
        return;
    }
    content += input + "\n";
    fs.writeFile(PathToNewFile, content, () => {});
});

userInput.on('close', (code) => {
    console.log("Have a nice day!");
});



