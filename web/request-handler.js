var fs = require('fs');
var path = require('path');
var url = require('url');
var parsedUrl = require('url-parse');
var header = require('./http-helpers');
var headers = header.headers;
var archive = require('../helpers/archive-helpers');
var indexHtml = archive.paths.siteAssets + '/index.html';
var pathToSites = archive.paths.archivedSites;
var pathToText = archive.paths.list;

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // grab the pathname from the request and parse it
  var pathName = req.url.pathname
  if(req.method === 'GET') {
    // console.log('\n\n', 'req url', req.url, '\n\n');
    if (req.url === '/') {
      fs.readFile(indexHtml, 'utf8' ,function (err, html) {
        if (err) {
          throw err;
        } else {
          res.writeHead(200, headers);
          res.end(html);
        }
      });

    }else{

      if (archive.isUrlArchived(pathToSites, req.url) !== null) {
        var temp = path.join(pathToSites, req.url);
        fs.readFile(temp, 'utf8' ,function (err, html) {
          if (err) {
            res.writeHead(404, headers);
            res.end(); 
          } else {
            res.writeHead(200, headers);
            res.end(html);
          }
        });
      }
    }

  } else if (req.method === 'POST') {
    console.log('POSTING');
    if ((/www/i).test(req.url)) {
      console.log('url well formed');
      archive.addUrlToList(pathToText, req.url);
    } else {
      console.log('url ILL formed');
      res.writeHead(302, headers);
      res.end();
    }
  }
};