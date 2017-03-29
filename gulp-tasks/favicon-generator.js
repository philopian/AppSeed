var path = require('path');
var config = require('../config');
var realFavicon = require('gulp-real-favicon');
var fs = require('fs');


/**************************************************************************************/
/*          FAVICON GENERATOR                                                         */
/**************************************************************************************/
module.exports = function(gulp, $) {
  'use strict';

  gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
      masterPicture: config.logo,
      dest: config.favicons,
      iconsPath: 'assets/favicon',
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#ffffff',
          margin: '14%',
          assets: {
            ios6AndPriorIcons: true,
            ios7AndLaterIcons: true,
            precomposedIcons: true,
            declareOnlyDefaultIcon: true
          }
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#2d89ef',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: true,
            windows10Ie11EdgeTiles: {
              small: true,
              medium: true,
              big: true,
              rectangle: true
            }
          }
        },
        androidChrome: {
          pictureAspect: 'backgroundAndMargin',
          margin: '17%',
          backgroundColor: '#ffffff',
          themeColor: '#ffffff',
          manifest: {
            name: 'AppSeed',
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: true
          }
        },
        safariPinnedTab: {
          pictureAspect: 'silhouette',
          themeColor: '#5bbad5'
        }
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false
      }
    }, function() {
      done();
    });
  });
};