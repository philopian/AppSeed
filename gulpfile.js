var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')();


var taskPath = './gulp-tasks/';
var taskList = require('fs').readdirSync(taskPath);
taskList.forEach(function(taskFile) {
  if (path.extname(taskFile) == '.js') require(taskPath + taskFile)(gulp, plugins);
});