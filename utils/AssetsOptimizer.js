const sharp = require('sharp'),
    path = require('path'), 
    fs = require('fs')

class AssetsOptimizer {
    constructor(breakpoints, blacklist) {
        this.breakpoints = breakpoints;
        this.blacklist = blacklist;
    }

    optimize() {
        console.log("Assets optimization started");
        console.log("Setup: List assets");

        const filter = /^.*\.(jpe?g|png)/;
        const assetList = this.getAssetList('./', filter, blacklist);
        console.log('LIST: ', assetList)

        console.log("Setup: Completed");
        console.log("Resize: Started resizing images using sharp");

        var basePath = '.vuepress/public/resized-images/';
        for (var breakpoint of this.breakpoints) {
            this.prepareOutputDir(basePath + breakpoint);
            this.generateImages(assetList, breakpoint, basePath);
        }

        console.log("Resize: Completed");
        console.log("Assets optimization completed");
    }

    getAssetList(startPath, filter, blacklist) {
        var assets = [];
    
        if (fs.existsSync(startPath) && !blacklist.some(item => startPath.includes(item))) {
            var files = fs.readdirSync(startPath);
    
            for(var file of files) {
                var filename = path.join(startPath, file);
                var stat = fs.lstatSync(filename);
    
                if (stat.isDirectory()) {
                    assets = assets.concat(this.getAssetList(filename, filter, blacklist)); // recursively search assets
                } else if (filter.test(filename)) {
                    assets.push(filename);
                } else if (filename.includes('png')) console.log(filename);
            }
        }
    
        return assets;
    }
    
    resize(input, size, output) {
        console.log(`Resize: Started processing ${input} for size ${size}`);
        sharp(input)
            .resize(size)
            .toFile(output, (err, _) => { if (err) { console.error(err) } });
    
        // todo: check and copy if not resized
    }
    
    prepareOutputDir(dir) {
        console.log(`Preparing output dir ${dir}`);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }
    
    generateImages(assetList, breakpoint, basePath) {
        console.log(`Generating images for breakpoint ${breakpoint}`);
        if (!breakpoint || isNaN(breakpoint)) return;

        for (var asset of assetList) {
            var filename = this.getFilename(asset);
            this.resize(asset, breakpoint, basePath + `${breakpoint}/${filename}`);
        }
    }

    getFilename(path) {
        var filePath = path.split('/');
        return filePath[filePath.length - 1];
    }
}

module.exports = AssetsOptimizer;