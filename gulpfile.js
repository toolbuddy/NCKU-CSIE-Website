const gulp = require( 'gulp' );

const sass = require( 'gulp-sass' );
const nodemon = require( 'gulp-nodemon' );

// sass task
gulp.task( 'sass', function() {
    return gulp.src( './static/src/sass/**/*.sass' )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( gulp.dest( './static/dist/css' ) )
} );

// sass watch
gulp.task( 'sass:watch', function() {
    gulp.watch( './static/src/sass/**/*.sass', [ 'sass' ]);
} );

// nodemon
gulp.task( 'start', [ 'sass' ], function() {
     nodemon( {
         ext: 'js json pug sass',
         script: 'server.js',
         task: [ 'sass' ],
    } );
} );

gulp.task( 'default', [ 'start' ], function(){
    
} );
