'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: "\n\n"
            },
            dist: {
                src: ['js/bootstrap.js', 'js/owl.carousel.js', 'js/jquery.magnific-popup.js', 'js/gmap3.js', 'js/custom.js'],
                dest: 'js/all.js'
            } 
        },

        uglify: {
            main: {
                files: {
                    'js/all.min.js' : ['js/all.js'],
                }
            }
        },

/*
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/main-unprefixed.css' : '_scss/main.scss'
                }
            }
        },
*/

        sass: {
            options: {
                sourceMap: true,
                relativeAssets: false,
                outputStyle: 'expanded',
                sassDir: '_scss',
                cssDir: '_site/css'
            },
            build: {
                files: [{
                    expand: false,
                    cwd: '_scss/',
                    src: ['**/*.{scss,sass}'],
                    dest: '_site/css',
                    ext: '.css'
                },
                {
                    expand: true,
                    cwd: '_scss/',
                    src: ['**/*.{scss,sass}'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            main: {
                src: "css/main-unprefixed.css",
                dest: "css/main.css"
            }
        },

        shell : {
            jekyllServe : {
                command : 'jekyll serve'
            },

            jekyllBuild : {
                command : 'jekyll build'
            }  
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'svg',
                    src: ['*.svg'],
                    dest: 'svg/min'
                }]
            }
        },

        svgstore: {
            options: {
                prefix : 'icon-',
                svg: {
                    style: 'display: none;'
                },
                cleanup: ['fill', 'style']
            },
            default: {
                files: {
                    '_includes/svg-defs.svg': ['svg/*.svg']
                }
            }
        },

        watch: {
            stylesheets: {
                files: ['_scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'shell:jekyllBuild']
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'uglify', 'shell:jekyllBuild']
            },
            site: {
                files: ['**/*.html', '_layouts/*.html', '_posts/**/*.markdown', '_includes/*.html', '_config.yml', 'js/**/*.js', '_data/*.yml'],
                tasks: ['shell:jekyllBuild']
            },
            svgIcons: {
                files: ['svg/*.svg'],
                tasks: ['svgmin', 'svgstore', 'shell:jekyllBuild']
            },
            options: {
                spawn : false,
                livereload: true
            }
        }
    });

    require("load-grunt-tasks")(grunt);

    // Define the tasks
    grunt.registerTask('serve', ['sass','shell:jekyllServe']);
    grunt.registerTask('default', ['watch']);
}