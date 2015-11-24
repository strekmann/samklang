module.exports = (grunt) => {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');

    grunt.initConfig({
        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        'process.env': {
                            // This has effect on the react lib size
                            'NODE_ENV': JSON.stringify('production'),
                        },
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin()
                ),
            },
            'build-dev': {
                devtool: 'sourcemap',
                debug: true,
            },
        },
        sass: {
            options: {
                includePaths: [
                    'node_modules/font-awesome/scss',
                    'node_modules/bootstrap-sass/assets/stylesheets',
                ],
            },
            dest: {
                options: {
                    outputStyle: 'compressed',
                },
                files: {
                    'public/css/site.css': 'scss/styles.scss',
                },
            },
        },
        copy: {
            font: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: [
                    'node_modules/font-awesome/fonts/*',
                    'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
                    'fonts/*',
                ],
                dest: 'public/fonts/',
            },
            img: {
                expand: true,
                cwd: 'images',
                src: ['**'],
                dest: 'public/images',
            },
        },
        watch: {
            clientjs: {
                files: ['react/**/*.js'],
                tasks: ['webpack:build-dev'],
                options: {
                    spawn: false,
                },
            },
            server: {
                files: ['Gruntfile.js', 'cluster.js', 'server/**/*.js', 'test/**/*.js'],
                tasks: ['eslint'],
            },
            scss: {
                files: ['scss/*.scss'],
                tasks: ['sass', 'concat:css'],
            },
        },
        abideExtract: {
            js: {
                src: 'server/**/*.js',
                dest: 'server/locale/templates/LC_MESSAGES/messages.pot',
                options: {
                    keyword: '__',
                },
            },
            client: {
                src: 'public/js/*.js',
                dest: 'server/locale/templates/LC_MESSAGES/messages.pot',
                options: {
                    keyword: '__',
                },
            },
        },
        abideMerge: {
            messages: {
                options: {
                    template: 'server/locale/templates/LC_MESSAGES/messages.pot',
                    localeDir: 'server/locale',
                },
            },
        },
        abideCompile: {
            json: {
                dest: 'public/js/',
                options: {
                    type: 'json',
                    localeDir: 'server/locale',
                },
            },
        },
        eslint: {
            target: [
                'server/**/*.js',
                'react/**/*.js',
                'test/**/*.js',
                '*.js',
            ],
        },
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-i18n-abide');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('default', ['sass', 'copy', 'abideCompile', 'webpack:build-dev']);
    grunt.registerTask('prod', ['sass', 'copy', 'abideCompile', 'webpack:build']);
    grunt.registerTask('locales', ['webpack:build-dev', 'abideExtract', 'abideMerge', 'abideCompile']);
};
