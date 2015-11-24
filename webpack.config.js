var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var entry = {};
var pagesPath = path.join(__dirname, 'react/pages');
var pages = fs.readdirSync(pagesPath);
_.each(pages, (page) => {
    if (path.extname(page) === '.js') {
        entry[path.basename(page, '.js')] = path.join(pagesPath, page);
    }
});

module.exports = {
    cache: true,
    entry: entry,
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            { test: /.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        ],
    },
    plugins: [
        new CommonsChunkPlugin('common.js'),
    ],
    externals: [
        (context, request, callback) => {
            var file;

            if (/lib\/translator$/.test(request)) {
                file = fs.readFileSync('./server/lib/translator-web.js', {encoding: 'utf8'});
                return callback(null, file);
            }
            callback();
        },
    ],
};
