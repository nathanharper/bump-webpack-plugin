'use strict';
var fs = require('fs');
var path = require('path');
var join = path.join;
var exec = require('child_process').exec;

function Plugin(files) {
  this.context = path.dirname(module.parent.filename);

  // allows for a single string entry
  if (typeof files == 'string' || files instanceof String){
    this.files = [files];
  } else {
    this.files = files || [];
  }
}

// hook into webpack
Plugin.prototype.apply = function(compiler) {
  var self = this;
  return compiler.plugin('done', function(stats) {
    self.files.forEach(function(file){
      var fullFile = join(self.context, file);
      exec('cd ' + self.context + '; git show HEAD:' + file, function (error, stdout, stderr) {
        var json = self.increment(fullFile, stats.hash, JSON.parse(stdout));
        fs.writeFile(fullFile, JSON.stringify(json, null, 2));
      });
    });
  });
}

// increment build number
Plugin.prototype.increment = function(file, hash, oldJSON) {
  var json = require(file);
  var versions = json.version.split('.');

  if (json.version === oldJSON.version && hash !== oldJSON.webpackAssetHash) {
    versions[2] = parseInt(versions[2]) + 1;
  }

  json.version = versions.join('.');
  json.webpackAssetHash = hash;
  return json;
}

module.exports = Plugin;
