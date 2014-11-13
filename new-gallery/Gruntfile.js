// Generated on 2014-01-20 using generator-webapp 0.4.7
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // Configurable paths
      app: 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        // tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      // jstest: {
      //     files: ['test/spec/{,*/}*.js'],
      //     tasks: ['test:watch']
      // },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9999,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },


    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    'bower-install': {
      app: {
        html: '<%= yeoman.app %>/index.html',
        ignorePath: '<%= yeoman.app %>/'
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            // '<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
            '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },

    requirejs: {
      dist: {
        // Options: http://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // dir: "app/",
          baseUrl: '<%= yeoman.app %>/scripts',
          optimize: 'none',
          // paths: {
          //   'main': '../../.tmp/js/templates'
          // },
          preserveLicenseComments: false,
          useStrict: false,
          name: 'main',
          out: '<%= yeoman.dist %>/scripts/amd-cc-gallery.js',
          mainConfigFile: '<%= yeoman.app %>/scripts/main.js'
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '{,*/}*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //     dist: {
    //         files: {
    //             '<%= yeoman.dist %>/styles/main.css': [
    //                 '.tmp/styles/{,*/}*.css',
    //                 '<%= yeoman.app %>/styles/{,*/}*.css'
    //             ]
    //         }
    //     }
    // },
    // uglify: {
    //     dist: {
    //         files: {
    //             '<%= yeoman.dist %>/scripts/scripts.js': [
    //                 '<%= yeoman.dist %>/scripts/scripts.js'
    //             ]
    //         }
    //     }
    // },
    // concat: {
    //     dist: {}
    // },

    replace: {
      dev_aids: [{
        file: 'scripts/amd-cc-gallery.js',
        replace: {
          'window.Drupal=\{setting:\{gallery_widget:\{RC:"AY5"\}\}\};': '//',
          'http://127.0.0.1/': '/'
        }
      },{
        file: 'index.html',
        replace: {
          '<header id="fake-header"></header>': '',
          'bower_components/requirejs/require.js': '/sites/all/modules/custom/tgb_car_chapters/js/bower_components/requirejs/require.js',
          'scripts/main.js': '/sites/all/modules/custom/tgb_car_chapters/js/amd-cc-gallery'
        }
      }]
    },

    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/amd-cc-gallery.js': [
            '<%= yeoman.dist %>/scripts/amd-cc-gallery.js'
          ]
        }
      },
      requirejs: {
        files: {
          '<%= yeoman.dist %>/bower_components/requirejs/require.js': [
            '<%= yeoman.dist %>/scripts/bower/requirejs/require.js'
          ]
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.png',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*',
            'rest/*.json',
            'bower_components/' + (this.includeCompass ? 'sass-' : '') + 'bootstrap/' + (this.includeCompass ? 'fonts/' : 'dist/fonts/') + '*.*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      requirejs: {
        src: '<%= yeoman.app %>/bower_components/requirejs/require.js',
        dest: '<%= yeoman.dist %>/scripts/bower/requirejs/require.js'
      }
    },


    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
      outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
      files: [
        '<%= yeoman.dist %>/scripts/{,*/}*.js',
        '<%= yeoman.dist %>/styles/{,*/}*.css',
        '!<%= yeoman.dist %>/scripts/vendor/*'
      ],
      uglify: true
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'compass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'compass',
        'copy:styles',
        // 'imagemin',
        'svgmin'
      ]
    }
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function() {
    grunt.log.warn('The `server` task has been deprecated dumb arse.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer',
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'requirejs',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'copy:dist',
    'uglify:dist',
    'copy:requirejs',
    'uglify:requirejs',
    'modernizr',
    'replace',
    // 'strip-html',
    // 'rev',
    'usemin'
    // 'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerMultiTask('replace', 'Replaces text in a file', function() {
    var fs = require('fs'),
      done = this.async(),
      count = this.data.length;

    this.data.forEach(function(config) {
      var filename = 'dist/' + config.file;
      fs.readFile(filename, function(err, content) {
        if (err) {
          grunt.log.error('Cannot open file ' + err.path);
        }
        content = content.toString();
        grunt.log.subhead('Replacing text in file ' + config.file);

        Object.keys(config.replace).forEach(function(search) {
          var replace = config.replace[search];
          grunt.log.writeln('Replacing ' + search.cyan + ' -> ' + replace.cyan);

          content = content.replace(new RegExp(search, 'g'), replace);
        });

        fs.writeFile(filename, content, function() {
          if (count === 0) {
            done();
          }
        });

        count--;
      });
    });
  });

  grunt.registerTask('strip-html', 'Cuts out html for deployment to Toyota website', function() {
    var fs = require('fs'),
      jsdom = require('jsdom'),
      done = this.async();

    jsdom.env({
      file: __dirname + '/dist/index.html',
      scripts: __dirname + '/app/components/jquery/jquery.min.js',
      done: function(err, window) {
        grunt.log.subhead('Removing reference to Drupal.settings for production');

        if (err) {
          grunt.log.error(err);
        }

        var document = window.document,
          $ = window.$,
          $body = $('body');

        // move stylesheet into body
        $body.first().prepend($('link[href$="configure.css"]'));

        // remove last script element
        $body.find('script:last()').remove();

        fs.writeFile('dist/index.html', $body.html(), function() {
          done();
        });
      }
    });
  });

};
