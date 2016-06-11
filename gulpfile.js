var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sync = require('run-sequence');
var gutil = require('gulp-util');
var browser = require('browser-sync');

gulp.task('scripts', function () {
   return gulp.src([
         'client/vendor/angular/angular.js',
         'client/vendor/angular-resource/angular-resource.js',
         'client/vendor/angular-ui-router/release/angular-ui-router.js',
         'client/app/services/lb-services.js',
         'client/app/templates/welcomeHtml.js',
         'client/app/components/laundry/laundry.js',
         'client/app/components/nearby/nearby.js',
         'client/app/components/menu/menu.js',
         'client/app/components/status/status.js',
         'client/app/components/welcome/welcome.js',
         'client/app/app.js',
         'client/app/services/geofactory.js'
      ])
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('client/dist'))

});

gulp.task('css', function () {
   return gulp.src([
         'client/vendor/bootstrap-css-only/css/bootstrap.min.css',
         'client/css/loader.css',
         'client/css/global.css',
         'client/css/buttons.css',
         'client/css/padders.css',
         'client/css/form_classes.css',
         'client/css/status.css',
         'client/css/nearby.css',
         'client/css/clothes.css',
         'client/css/welcome.css',
         'client/css/ul.css',
         'client/css/img.css',
         'client/css/ngstyles.css',
         'client/css/media_queries.css'
      ])
      .pipe(concat('app.css'))
      .pipe(gulp.dest('client/dist'))
});

gulp.task('default', function (done) {
   sync('scripts', 'css', done);
});