'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import sync     from 'run-sequence';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import fs       from 'fs';
import yargs    from 'yargs';
import lodash   from 'lodash';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import del      from 'del';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';
const chalk = require('chalk')
const translations = require('./lib/tr/tr')
const commonConfigGenerator = require('./lib/common-config/generator')

const root = 'src';

// helper method for resolving paths
const resolveToApp = (glob = '') => {
  return path.join(root, 'app', glob); // app/{glob}
};

const resolveToComponents = (glob = '') => {
  return path.join(root, 'app/components', glob); // app/components/{glob}
};

// map of all paths
const paths = {
  js: resolveToComponents('**/*!(.spec).ts'), // exclude spec files
  scss: resolveToApp('**/*.scss'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/app.ts')
  ],
  output: root,
  blankTemplates: path.join(__dirname, 'lib/generator', 'component/**/*.**'),
  dest: path.join(__dirname, 'dist')
};

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], (cb) => {
  const config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('serve', () => {
  const config = require('./webpack.dev.config');
  config.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
  ].concat(paths.entry);

  const compiler = webpack(config);

  serve({
    port: process.env.PORT || 4242,
    open: false,
    server: {baseDir: root},
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpackHotMiddleware(compiler)
    ]
  });

});

gulp.task('watch', ['serve']);

gulp.task('component', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('clean', (cb) => {
  del([paths.dest]).then(function (paths) {
    gutil.log("[clean]", paths);
    cb();
  })
});

gulp.task('default', ['watch']);

gulp.task('download-translations', function (cb) {
  translations({
    outDir: './generated_modules/translations',
    collection: [
      {
        languageCode: 'pl-pl',
        url: 'https://tr.contactis.pl/api/Translations/export?projectId=4&projectLanguageId=3'
      },
      {
        languageCode: 'en-us',
        url: 'https://tr.contactis.pl/api/Translations/export?projectId=4&projectLanguageId=3'
      }
    ],
    ngModule: 'profitelo.translations',
    remoteTimeout: 30 * 1000, // on heavy loads tr responds after a long time
    success: cb,
    badRequest: function () {
      console.log(chalk.white.bgRed('[TRANSLATIONS] Bad request. Check if TR is up running'))
    },
    badRemoteFile: function (error) {
      console.log(chalk.white.bgRed('[TRANSLATIONS] Bad remote paths, check urls'))
      console.log(chalk.red('Last bad language url for lang: ' + error))
    },
    timeout: function () {
      console.log(chalk.white.bgRed('[TRANSLATIONS] Remote timeout'))
    },
    templateBuildFail: function (error) {
      console.log(chalk.white.bgRed('[TRANSLATIONS] Template build fail'))
      console.log(chalk.red(error))
    },
    successLangBuild: function (languageCode) {
      console.log(chalk.white.bgGreen('[TRANSLATIONS] Downloaded translation for: ' + chalk.yellow(languageCode)))
    }
  })
});

gulp.task('generate-common-config', function (next) {
  return commonConfigGenerator({
    ngModuleName: 'commonConfig',
    ngProviderName: 'CommonConfig',
    outputDir: './generated_modules/common-config',
    outputFileName: 'common-config.ts',
    fileGenerationSucceed: undefined,
    fileGenerationFailed: undefined,
    jsonSettingsEmpty: undefined
  })
})