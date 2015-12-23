var buildConfig = require('../build.config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var watch       = require('gulp-watch');
var chalk       = require('chalk');



gulp.task('watchers', function() {

    var jsWatcher = gulp.watch(buildConfig.app_files.js, function() {
        return runSequence('eslinter-js', 'transpile-scripts');
    });

    var jsunitWatcher = gulp.watch(buildConfig.app_files.jsunit, function() {
        return runSequence('eslinter-jsunit');
    });

    var jadeWatcher = gulp.watch(buildConfig.app_files.jade_all, function() {
        return runSequence('compile-jade');
    });

    var sassWatcher = gulp.watch(buildConfig.app_files.sass_all, function() {
        return runSequence('build-styles');
    });

    jsWatcher.on('change', function(e) {
        console.log(chalk.yellow('[JS] ' + chalk.yellow(e.path)));
    });

    jsWatcher.on('add', function(e) {
        setTimeout(function() {
            return runSequence('html-injector');
        }, 1000);
        return console.log(chalk.yellow('[NEW JS FILE INJECTED] ' + chalk.yellow(e)));
    });

    sassWatcher.on('change', function(e) {
        console.log(chalk.yellow('[SASS] ' + chalk.yellow(e.path)));
    });

    jadeWatcher.on('change', function(e) {
        console.log(chalk.yellow('[JADE] ' + chalk.yellow(e.path)));
        if (e.path.match(/partial.jade/)) {
            buildConfig.variables.jadeCache = false;
            return console.log(chalk.blue('[JADE] Partial file had been modified. Running JADE without cache'));
        }
    });
});
