// Generated on 2014-09-23 using
// generator-webapp 0.5.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.loadNpmTasks('grunt-dom-munger');

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // php: {
    //   test: {
    //     options: {
    //       keepalive: true,
    //       open: true
    //     }
    //   }
    // }

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        // tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
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
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
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
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
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
    sass: {
      options: {
        sourcemap: true,
        loadPath: 'bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
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
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html']
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    requirejs: {
      dist: {
        // Options: http://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // dir: "app/",
          baseUrl: '<%= config.app %>/scripts',
          optimize: 'none',
          // paths: {
          //   'main': '../../.tmp/js/templates'
          // },
          preserveLicenseComments: false,
          useStrict: false,
          name: 'main',
          out: '<%= config.dist %>/scripts/amd-olb.js',
          mainConfigFile: '<%= config.app %>/scripts/main.js'
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },
    
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    replace: {
      tcw: [{
        file: 'scripts/amd-olb.js',
        replace: {
          '../images/': '/sites/all/modules/custom/service_booking/images/',
          '//uat.toyotabeta.co.uk/tgb_osb/fixedpricerepairs.jsonp': '//www.toyota.co.uk/tgb_osb/fixedpricerepairs.jsonp',
          '//# sourceMappingURL=jquery.min.map;': '',
          '//@ sourceMappingURL=underscore-min.map;': '',
          '//@ sourceMappingURL=backbone-min.map;': ''
        }
      },
      {
        file: 'styles/main.css',
        replace: {
          '../images/': '/sites/all/modules/custom/service_booking/images/'
        }
      },
      {
        file: 'index.html',
        replace: {
          'bower_components/requirejs/require.js': '/sites/all/modules/custom/service_booking/js/bower/requirejs/require.js',
          'scripts/main.js': '/sites/all/modules/custom/service_booking/js/amd-olb'
        }
      }],
      retail: [{
        file: 'scripts/amd-olb.js',
        replace: {
          '../images/': '/sites/all/modules/custom/tgb_osb/images/',
          '//uat.toyotabeta.co.uk/tgb_osb/fixedpricerepairs.jsonp': '/tgb_osb/fixedpricerepairs.jsonp',
          '//# sourceMappingURL=jquery.min.map;': '',
          '//@ sourceMappingURL=underscore-min.map;': '',
          '//@ sourceMappingURL=backbone-min.map;': ''
        }
      },
      {
        file: 'styles/main.css',
        replace: {
          '../images/': '/sites/all/modules/custom/tgb_osb/images/'
        }
      },
      {
        file: 'index.html',
        replace: {
          'bower_components/requirejs/require.js': '/sites/all/modules/custom/tgb_osb/js/bower/requirejs/require.js',
          'scripts/main.js': '/sites/all/modules/custom/tgb_osb/js/amd-olb'
        }
      }]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    cssmin: {
      dist: {
        files: {
          '<%= config.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= config.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/scripts/amd-olb.js': [
            '<%= config.dist %>/scripts/amd-olb.js'
          ]
        }
      },
      requirejs: {
        files: {
          '<%= config.dist %>/bower_components/requirejs/require.js': [
            '<%= config.dist %>/scripts/bower/requirejs/require.js'
          ]
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      retail: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.png',
            '{,*/}*.html',
            'styles/ico/{,*/}*.*',
            'bower_components/' + (this.includeCompass ? 'sass-' : '') + 'bootstrap/' + (this.includeCompass ? 'fonts/' : 'dist/fonts/') + '*.*'
          ]
        }]
      },
      tcw: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.png',
            '{,*/}*.html',
            'fonts/{,*/}*.*',
            'styles/ico/{,*/}*.*',
            'bower_components/' + (this.includeCompass ? 'sass-' : '') + 'bootstrap/' + (this.includeCompass ? 'fonts/' : 'dist/fonts/') + '*.*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      requirejs: {
        src: '<%= config.app %>/bower_components/requirejs/require.js',
        dest: '<%= config.dist %>/scripts/bower/requirejs/require.js'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });

  // grunt.registerTask('phpwatch', ['php:watch', 'watch']);

  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function(target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    // 'replace:devAids',
    'wiredep',
    // 'useminPrepare',    
    'requirejs',
    'concurrent:dist',
    'autoprefixer',
    // 'concat',
    'cssmin',
    // 'uglify',    
    'copy:requirejs',
    'modernizr',
  ]);

  grunt.registerTask('build:retail', [
    'build',
    'copy:retail',
    'replace:retail',    
    // 'rev'
    // 'usemin'
    // 'htmlmin'
  ]);

  grunt.registerTask('build:tcw', [
    'build',
    'copy:tcw',
    'replace:tcw',    
    // 'rev'
    // 'usemin'
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

};
