var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var parsedUrl = require('url-parse');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
};

exports.isUrlInList = function(){
};

exports.addUrlToList = function(requestedUrl, listPath){
  console.log('URL', requestedUrl);
  requestedUrl += '\n';
  console.log('NEW URL', requestedUrl);
  fs.appendFile(listPath, requestedUrl);
  console.log('addedData');
};

exports.isUrlArchived = function(sitesPath, requestedUrl){
  // if req.url starts with www. split on
  var route = '';
  if ((/www/i).test(requestedUrl)) {
    requestedUrl.split('.');
    route = '/' + requestedUrl[1];
  } else {
    // else assume / somename we could check for the /
    route = requestedUrl;
  }

  // look inside sitesPath (archives/sites)
  fs.readdir(sitesPath,function(err,files){
    var result = null;
    files.forEach(function(file){
    // check if file that corresponds to requestedUrl
      if(file === requestedUrl){
      // if yes return the file
        result = route;
      }
    });
    // else null would be treated by request-handler.js
    return result;
  });
};

exports.downloadUrls = function(){
};
