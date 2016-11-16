import browserSync from 'browser-sync';
import sass from 'ruby-sass';

const server = browserSync.get('jaak.dev');

server.watch('index.html').on('change', server.reload);

// server.watch('styles/**/scss/*').on('change', )
sass('styles/**/scss/*', function(err, css))