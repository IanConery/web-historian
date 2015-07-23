var fs = require('fs');
var path = require('path');
var url = require('url');
var parsedUrl = require('url-parse');
var header = require('./http-helpers');
var headers = header.headers;
var archive = require('../helpers/archive-helpers');
var indexHtml;

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // grab the pathname from the request and parse it
  console.log('\n',archive.paths.archivedSites,"\n");
  var pathName = req.url.pathname
  if(req.method === 'GET') {
    if (req.url === '/') {
      indexHtml = archive.paths.siteAssets + '/index.html';
      fs.readFile(indexHtml, 'utf8' ,function (err, html) {
        if (err) {
          throw err;
        } else {
          res.writeHead(200, headers);
          res.end(html);
        }
      });

    } else if (req.url === '/www.google.com') {
      // if the pathname exits in sites.txt display sites folder
      console.log('req url', req.url);
      indexHtml = archive.paths.archivedSites + req.url;
      fs.readFile(indexHtml, 'utf8' ,function (err, html) {
        if (err) {
          throw err;
        } else {
          res.writeHead(200, headers);
          res.end(html);
        }
      });

    } else {

      res.writeHead(404, headers);
      res.end();
    }
  }
};