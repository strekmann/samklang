var path = require("path");
var fs = require('fs');
var _ = require('lodash');
var webpack = require("webpack");
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var entry = {};
var pages_path = path.join(__dirname, 'react/pages');
var pages = fs.readdirSync(pages_path);
_.each(pages, function(page){
    if (path.extname(page) === '.js'){
        entry[path.basename(page, '.js')] = path.join(pages_path, page);
    }
});

module.exports = {
    cache: true,
    entry: entry,
    output: {
        path: path.join(__dirname, "public/js"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new CommonsChunkPlugin("common.js")
    ],
    externals: [
        function(context, request, callback){
            if (/lib\/translator$/.test(request)){
                var file = fs.readFileSync('./server/lib/translator-web.js', {encoding: 'utf8'});
                return callback(null, file);
            }
            callback();
        }
    ]
};