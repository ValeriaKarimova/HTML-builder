const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const project = path.join(__dirname, 'project-dist');
const styleFile = path.join(project, 'style.css');
const htmlFile = path.join(project, 'index.html');
const assetsFolder = path.join(project, 'assets');

const copiedStyles = path.join(__dirname, 'styles');
const copiedAssets = path.join(__dirname, 'assets');
const template = path.join(__dirname, 'template.html');
const componentArticle = path.join(__dirname, 'components');


async function main(){

    await fsPromises.rm(project, { recursive: true, force: true });

    await fsPromises.mkdir(project);
    copyStyleFiles();
    replaceStrings();
    copyFolder(copiedAssets, assetsFolder);
    
}

async function replaceStrings() {
        const items = await fsPromises.readdir(componentArticle, {withFileTypes: true});
        let fileData = await fsPromises.readFile(template, 'utf-8');
        let currentTag;
        let dataToReplace;

        for(const item of items) {
            const currentPathTag = path.join(componentArticle, item.name);
            const tagExtension = path.extname(item.name);
            currentTag = path.basename(item.name, tagExtension);
            dataToReplace = await fsPromises.readFile(currentPathTag, 'utf-8');
            fileData = fileData.replace('{{' + currentTag + '}}', dataToReplace);
        }
        
        fs.writeFile(htmlFile, fileData, function(){});
        
}


async function copyStyleFiles(){
    try {
        const files = await fsPromises.readdir(copiedStyles, {withFileTypes: true});
        
        for (const file of files) {
            const extension = path.extname(file.name);
           if (file.isFile() && extension == ".css") {
               const currentFile = path.join(copiedStyles, file.name);
               fs.readFile(currentFile, 'utf-8', function(err, data){
                fs.appendFile(styleFile, data, function(){});
               });
           }
        }
    } catch (err) {
        console.error(err);
    }
}

async function copyFolder(src, dest) {
    const contents = await fsPromises.readdir(src, {withFileTypes: true});
    
    await fsPromises.mkdir(dest);

    for (const contentItem of contents) {
        const newSrc = path.join(src, contentItem.name);
        const newDest = path.join(dest, contentItem.name);

        if (contentItem.isFile()) {
            await fsPromises.copyFile(newSrc, newDest);
        } else if (contentItem.isDirectory()) {
            await copyFolder(newSrc, newDest);
        }
    }
}

main();





