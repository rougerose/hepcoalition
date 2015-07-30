'use strict';

// gulp
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    nano = require('gulp-cssnano'),
    plumber = require('gulp-plumber');

// CSS: sass; concat;
gulp.task('css', function () {
  gulp.src(['css/hepcoalition.scss','css/hepcoalition-rtl.scss'])
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(sass({ sourceMap: false }))
    .pipe(sass({ sourceComments: true }))
    .pipe(autoprefixer())
    //.pipe(nano())
    .pipe(gulp.dest('css'));
});

// minifyjs : uglify;
gulp.task('js', function () {
  gulp.src(['js/hepcoalition.js'])
    .pipe(uglify())
    .pipe(concat('hepcoalition.min.js'))
    .pipe(gulp.dest('./js'));
});

// watch
gulp.task('watch', function () {
  gulp.watch('css/scss/*scss', ['css']);
});


// tâches
gulp.task('default', ['css']);
gulp.task('minify', ['js']);
