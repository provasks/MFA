const fs = require("fs-extra");
const concat = require("concat");
const { getConfigFileParsingDiagnostics } = require("typescript");
const path = require("path");

(async function build() {

    async function copyFolder(sourceDir, destinationDir) {
        if (fs.existsSync(sourceDir))
            await fs.copy(sourceDir, destinationDir)
                .then(() => console.log('copied ' + sourceDir))
                .catch(err => console.error(err))
    }

    async function copyFile(sourceFile, destinationFile) {
        await fs.copyFile(sourceFile, destinationFile);
    }

    async function mergeFiles(files, folder, filename) {
        await fs.ensureDir(folder);
        await concat(files, folder + "/" + filename);
    }

    function copyResources(sourceDir, extensions, copyFolder, destinationDir, copyFile) {
        fs.readdir(sourceDir, (err, files) => {
            if (err)
                return console.log(err);
            else {
                const nonJsFiles = files.filter((file, idx) => !extensions.includes(path.extname(file)));
                nonJsFiles.forEach(file => {
                    if (path.extname(file) === "")
                        copyFolder(sourceDir + "/" + file, destinationDir + "/" + file);
                    else
                        copyFile(sourceDir + "/" + file, destinationDir + "/" + file);
                });
            }
        });
    }


    // const prgName = process.argv.slice(2)[0];
    const prgName = process.argv[2];
    const environment = process.argv[3];
    // console.log(process.argv)
    if (prgName === '' || prgName === undefined) {
        console.log('Project name is required as argument');
        return false;
    }
    else {
        const files_es2015 = [
            './dist/' + prgName + '/polyfill-webcomp-es5.js',
            './dist/' + prgName + '/polyfill-webcomp.js',
            './dist/' + prgName + '/polyfills-es2015.js',
            './dist/' + prgName + '/scripts.js',
            './dist/' + prgName + '/main-es2015.js',
        ];
        const files_es5 = [
            './dist/' + prgName + '/polyfill-webcomp-es5.js',
            './dist/' + prgName + '/polyfill-webcomp.js',
            './dist/' + prgName + '/polyfills-es5.js',
            './dist/' + prgName + '/scripts.js',
            './dist/' + prgName + '/main-es5.js',
        ];

        const elementFolder = `./dist/${prgName}/elements`
        mergeFiles(files_es2015, elementFolder, `${prgName}-elements-es2015_${environment}.js`);
        // mergeFiles(files_es5, elementFolder, `${prgName}-elements-es5_${environment}.js`);
        console.log('Done generating bundles for ' + prgName);


        console.log('Copying assets for ' + prgName);

        const extensions = [".js", ".html", ".txt", ".css", ".ico"];
        const sourceDir = './dist/' + prgName;
        const destinationDir = "./site";
        setTimeout(() => {
            copyResources(sourceDir, extensions, copyFolder, destinationDir, copyFile);
            fs.rename(`${sourceDir}/styles.css`, `${destinationDir}/${prgName}-styles.css`);
            // fs.remove(`${destinationDir}/styles.css`, err => {
            //     if (err) return console.error(err)
            //     console.log('success!')
            // });
            // fs.remove(`${destinationDir}/favicon.ico`, err => {
            //     if (err) return console.error(err)
            //     console.log('success!')
            // });
        }, 1000);
    }

})();