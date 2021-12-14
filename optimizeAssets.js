const sharp = require('sharp'),
    path = require('path'), 
    fs = require('fs')


function getAssetList(startPath, filter, blacklist) {
    var assets = [];

    if (fs.existsSync(startPath) && !blacklist.includes(startPath)) {
        var files = fs.readdirSync(startPath);

        for(var file of files) {
            var filename = path.join(startPath, file);
            var stat = fs.lstatSync(filename);

            if (stat.isDirectory()) {
                assets = assets.concat(getAssetList(filename, filter, blacklist)); // recursively search assets
            } else if (filter.test(filename)) {
                assets.push(filename);
            }
        }
    }

    return assets;
}

function resize(input, size, output) {
    console.log(`Resize: Started processing ${input} for size ${size}`);
    sharp(input)
        .resize(size)
        .toFile(output, (err, _) => { if (err) { console.error(err) } });

    // todo: check and copy if not resized
}

function prepareOutputDir(dir) {
    console.log(`Preparing output dir ${dir}`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function generateImages(assetList, breakpoint) {
    console.log(`Generating images for breakpoint ${breakpoint}`);
    for (var asset of assetList) {
        var filePath = asset.split('/');
        var filename = filePath[filePath.length - 1];
        resize(asset, breakpoint, `.vuepress/public/resized-images/${breakpoint}/${filename}`);
    }
}

module.exports = (breakpoints) => {
    console.log("Assets optimization started");

    console.log("Setup: List assets");

    const filter = /^.*\.(jpe?g|png)/g;
    const blacklist = ['node_modules', '.vuepress/dist', '.vuepress/theme', '.vuepress/public/resized-images', '.vuepress/public/h5p', '.git'];
    const assetList = getAssetList('./', filter, blacklist);

    console.log("Setup: Completed");

    console.log("Resize: Started resizing images using sharp");

    for (var breakpoint of breakpoints) {
        prepareOutputDir(`.vuepress/public/resized-images/${breakpoint}`);
        generateImages(assetList, breakpoint);
    }

    console.log("Resize: Completed");

    console.log("Assets optimization completed");
}