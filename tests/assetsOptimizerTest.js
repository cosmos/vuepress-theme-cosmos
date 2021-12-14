const assert = require('assert');
const fs = require('fs');
const AssetsOptimizer = require("../utils/AssetsOptimizer");

const defaultBreakpoints = [100];
const defaultFilter = /^.*\.(jpe?g|png)/;
const defaultBlacklist = ['node_modules', '.vuepress/dist', '.vuepress/theme', '.vuepress/public/resized-images', '.vuepress/public/h5p', 'tests/images/resized'];
const basePath = "./tests/images/resized/"

var assetsOptimizer = null;

const fileExist = (path) => fs.existsSync(path);

describe('Testing assets optimization', () => {

    describe('Asset list tests', () => {
        before(() => {
            assetsOptimizer = new AssetsOptimizer(defaultBreakpoints, defaultBlacklist);
        })

        it('Should list expected assets', () => {
            const list = assetsOptimizer.getAssetList('./tests', defaultFilter, defaultBlacklist);
            assert.equal(list.length, 5);
        })

        it('Should blacklist a given folder', () => {
            const list = assetsOptimizer.getAssetList('./tests', defaultFilter, ['/tests']);
            assert.equal(list.length, 0);
        })

    })

    describe('Resizing tests', () => {

        before(() => {
            assetsOptimizer = new AssetsOptimizer(defaultBreakpoints, defaultBlacklist);
        })

        it('Should generate resized test images', () => {
            const list = assetsOptimizer.getAssetList('./tests', defaultFilter, defaultBlacklist);
            const breakpoint = defaultBreakpoints[0];
            assetsOptimizer.prepareOutputDir(basePath + breakpoint);
            assetsOptimizer.generateImages(list, breakpoint, basePath);
            for (var item of list) {
                assert(fileExist(basePath + `${breakpoint}/` + assetsOptimizer.getFilename(item)));
            }
        })

        it('Shouldn\'t resize test images with wrong breakpoint', () => {
            const list = assetsOptimizer.getAssetList('./tests', defaultFilter, defaultBlacklist);
            const breakpoint = null;
            assetsOptimizer.prepareOutputDir(basePath + breakpoint);
            assetsOptimizer.generateImages(list, breakpoint, basePath);
            for (var item of list) {
                assert(!fileExist(basePath + `${breakpoint}/` + assetsOptimizer.getFilename(item)));
            }
        })
        
    })

    

    

})