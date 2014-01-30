'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-cordovacli');

    grunt.initConfig({
        yeoman: {
            app: require('./bower.json').appPath || 'app',
            dist: '<%= cordovacli.options.path %>/www/' //Apache Cordova project 'www' folder
        },
        cordovacli: {
            options: {
                path: './cordova'
            },
            create: {
                options: {
                    command: 'create',
                    id: 'cz.bouralu.dp',
                    name: 'HybridApp'
                }
            },
            add_android: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['android']
                }
            },
            add_ios: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['ios']
                }
            },
            add_all: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['ios', 'android']
                }
            },
            add_plugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'camera',
                        'contacts',
                        'device',
                        'dialogs',
                        'file',
                        'file-transfer',
                        'splashscreen',
                        'https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin.git'
                    ]
                }
            },
            build_android: {
                options: {
                    command: 'build',
                    platforms: ['android']
                }
            },
            build_ios: {
                options: {
                    command: 'build',
                    platforms: ['android']
                }
            },
            build_all: {
                options: {
                    command: 'build',
                    platforms: ['android', 'ios']
                }
            },
            emulate_android: {
                options: {
                    command: 'emulate',
                    platforms: ['android']
                }
            },
            emulate_ios: {
                options: {
                    command: 'emulate',
                    platforms: ['ios']
                }
            },
            run_android: {
                options: {
                    command: 'run',
                    platforms: ['android']
                }
            },
            run_ios: {
                options: {
                    command: 'run',
                    platforms: ['ios']
                }
            }
        },
        html2js: {
            options: {
                rename: function(moduleName) {
                    return moduleName.replace('../app/', '');
                }
            },
            main: {
                src: ['<%= yeoman.app %>/views/*.html'],
                dest: '<%= yeoman.dist %>/views/templates.js'
            },
        },
        template: {
            build: {
                options: {
                    data: {
                        "development": false
                    }
                },
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': ['<%= yeoman.dist %>/scripts/scripts.js']
                }
            }
        },
        clean: {
            options: {
                force: true
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*',
                        '!<%= yeoman.dist %>/index.html'
                    ]
                }]
            },
            cordova: {
                files: [{
                    dot: true,
                    src: [
                        '<%= cordovacli.options.path %>/*'
                    ]
                }]
            },
            server: '.tmp'
        },
        concat: {
            js: {
                src: '<%= yeoman.app %>/scripts/**/*.js',
                dest: '<%= yeoman.dist %>/scripts/scripts.js'
            },
            css: {
                src: '<%= yeoman.app %>/styles/*.css',
                dest: '<%= yeoman.dist %>/styles/main.css'
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/main.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        cssmin: {
            css: {
                src: '<%= yeoman.dist %>/styles/main.css',
                dest: '<%= yeoman.dist %>/styles/main.css'
            }
        },
        copy: {
            dist: {
                files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            //'*.{ico,png,txt}',
                            //'.htaccess',
                            'bower_components/**/*.min.{js,css}',
                            'bower_components/**/*bindonce.js',
                            'bower_components/**/*fastclick.js',
                            'bower_components/**/*fontawesome-webfont.ttf',
                            '!bower_components/font-awesome/src/**/*',
                            'images/{,*/}*.{gif,webp}',
                            //'scripts/**/*.js',
                            'views/directives/**/*.html',
                            'styles/fonts/**/*',
                            //'styles/icons/*',
                            //'styles/*.css',
                            'config.xml',
                            'index.html',
                            'main.html'
                        ]
                    }
                    /*, {
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'index.html'
                    ],
                    rename: function(dest) {
                        return dest + '/main.html';
                    }
                }*/
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            }
        }
    });

    grunt.registerTask('build_www', [
        'clean:dist',
        'concat',
        'copy:dist',
        'template',
        'ngmin',
        'cssmin',
        'uglify',
        'usemin',
        'html2js'
    ]);
    grunt.registerTask('cordova', function(arg1) {
        if (arg1 != undefined && arguments.length == 1) {
            grunt.task.run([
                'clean:cordova',
                'cordovacli:create',
                'cordovacli:add_' + arg1,
                'cordovacli:add_plugins'
            ]);
        };
    });
    grunt.registerTask('build', function(arg1) {
        if (arg1 != undefined && arguments.length == 1) {
            grunt.task.run([
                'build_www',
                'cordovacli:build_' + arg1
            ]);
        };
    });
    grunt.registerTask('emulate', function(arg1) {
        if (arg1 != undefined && arguments.length == 1) {
            grunt.task.run([
                'cordovacli:emulate_' + arg1
            ]);
        };
    });
    grunt.registerTask('run', function(arg1) {
        if (arg1 != undefined && arguments.length == 1) {
            grunt.task.run([
                'cordovacli:run_' + arg1
            ]);
        };
    });
    grunt.registerTask('init', function(arg1) {
        if (arg1 != undefined && arguments.length == 1) {
            grunt.task.run([
                'cordova:' + arg1,
                'build_www',
                'cordovacli:build_' + arg1
            ]);
        };
    });

};
