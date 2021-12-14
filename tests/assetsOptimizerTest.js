var assert = require('assert');
const AssetsOptimizer = require("../utils/AssetsOptimizer");

const defaultBreakpoints = [100];
const defaultFilter = /^.*\.(jpe?g|png)/;
const defaultBlacklist = ['node_modules', '.vuepress/dist', '.vuepress/theme', '.vuepress/public/resized-images', '.vuepress/public/h5p'];

var assetsOptimizer = null;

describe('Testing assets optimization', () => {

    describe('Breakpoints configuration tests', () => {

    })

    describe('Blacklist configuration tests', () => {
        
    })

    describe('Asset list tests', () => {
        before(() => {
            assetsOptimizer = new AssetsOptimizer(defaultBreakpoints);
        })

        it('Should list expected assets', () => {
            const list = assetsOptimizer.getAssetList('./tests', defaultFilter, defaultBlacklist);
            assert.equal(list.length, 5);
        })

        it('Should blacklist a folder', () => {
            const list = assetsOptimizer.getAssetList('./tests', defaultFilter, ['/tests']);
            assert.equal(list.length, 0);
        })

    })

    

    

})