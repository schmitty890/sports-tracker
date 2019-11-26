const gulp = require('gulp');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const reload = browserSync.reload;
const clean = require('gulp-clean');
const maps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const gutil = require('gulp-util');
const babel = require('gulp-babel');

// when served, watch files. call browser-sync
gulp.task('serve', ['browser-sync'], function() {
  gulp.watch('public/assets/scss/partials/*.scss', ['sass']);
  gulp.watch('public/assets/js/*/*.js', ['concatScripts']);
});

// browser-sync call nodemon
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:8080',
    // open: 'google-chrome',
    open: false,
    port: 3000
  });
});

// nodemon calls sass and concatScripts
gulp.task('nodemon', ['sass', 'concatScripts'], function(done) {
  let running = false;
  return nodemon({
    script: 'app.js',
    watch: 'public/assets/'
  }).on('start', function() {
    // console.log('-----------------start-----------------');
    if(!running) {
      done();
    }
    running = true;
  }).on('restart', function() {
    // console.log('-----------------restart-----------------');
    setTimeout(function() {
      reload();
    }, 2000);
  })
});

// take the styles in styles.scss and convert them to .css and push them to the assets/css folder
gulp.task('sass', function() {
  return gulp.src('public/assets/scss/styles.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename('styles.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('build/css'))
});

// clean the build folder
gulp.task('clean', function() {
  // console.log('gulp clean task');
  return gulp.src([ // return acts as sort of a promise, without the return statement, other tasks wont know until the clean task is finished.
    'build/'
  ])
    .pipe(clean());
});

// concat, map, and write js to build folder
gulp.task('concatScripts', function() {
  // console.log('gulp concatScripts task');
  return gulp.src([
    './public/assets/js/*/*.js'
  ])
    .pipe(maps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(maps.write('./'))
    .pipe(gulp.dest('build/js'))
});

// start gulp task by cleaning then running serve
gulp.task('default', function(done) {
  runSequence('clean', 'serve', function() {
    // console.log('Run something else');
    done();
  });
});
