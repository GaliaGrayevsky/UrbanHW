/* 
const bodyParser = require("body-parser");
const jsonServer = require("json-server");

const ss = require('socket.io-stream');

const fs = require('fs');

const request = require('request');

// Create the json-server
const server = jsonServer.create();

// Setup express request body parsing.
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(jsonServer.defaults());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Start the server.
const serverInstance = server.listen(3000, () => {
  //util.consoleReset();
  console.log(`----------------------------------------------------------------------`);
  console.log(`Running Auth API Server on: http://localhost:3000`);
  console.log(`----------------------------------------------------------------------`);
  console.log("\n");

});

const URL_PREFIX = "https://ags.govmap.gov.il/proxy/proxy.ashx?http://govmap/arcgis/rest/services/AdditionalData/MapServer/export?";

// Post base64 string
server.post('/getLayerTile', (req, res) => {

  // Captured img [base64 string]
  let url = req.body.url;
  console.log(url);

  request("https://ags.govmap.gov.il/proxy/proxy.ashx?http://govmap/arcgis/rest/services/AdditionalData/MapServer/export?dynamicLayers=[{%22id%22:22,%22name%22:%22%D7%A2%D7%A1%D7%A7%D7%90%D7%95%D7%AA%20%D7%A0%D7%93%D7%9C\%22%D7%9F%22,%22source%22:{%22type%22:%22mapLayer%22,%22mapLayerId%22:22},%22minScale%22:10001,%22maxScale%22:0},{%22id%22:38,%22name%22:%22%D7%91%D7%AA%D7%99%20%D7%A1%D7%A4%D7%A8%20%22,%22source%22:{%22type%22:%22mapLayer%22,%22mapLayerId%22:38},%22minScale%22:25100,%22maxScale%22:0},{%22id%22:39,%22name%22:%22%D7%92%D7%A0%D7%99%20%D7%99%D7%9C%D7%93%D7%99%D7%9D%22,%22source%22:{%22type%22:%22mapLayer%22,%22mapLayerId%22:39},%22minScale%22:25100,%22maxScale%22:0}]&dpi=96&transparent=true&format=png32&layers=show:39,22,38&bbox=187889,660471,185500,657679&bboxSR=2039&imageSR=2039&size=651,754&f=image").pipe(res);
}) */

//server.js
const corsAnywhere = require('cors-anywhere');
const express = require('express');
const apicache = require('apicache');
const expressHttpProxy = require('express-http-proxy');
const CORS_PROXY_PORT = 5000;
// Create CORS Anywhere server
corsAnywhere.createServer({}).listen(CORS_PROXY_PORT, () => {
  console.log(
    `Internal CORS Anywhere server started at port ${CORS_PROXY_PORT}`
  );
});
// Create express Cache server
let app = express();
// Register cache middleware for GET and OPTIONS verbs
app.get('/*', cacheMiddleware());
app.options('/*', cacheMiddleware());
// Proxy to CORS server when request misses cache
app.use(expressHttpProxy(`localhost:${CORS_PROXY_PORT}`));
const APP_PORT = process.env.PORT || 8080;
app.listen(APP_PORT, () => {
  console.log(`External CORS cache server started at port ${APP_PORT}`);
});
/**
 * Construct the caching middleware
 */
function cacheMiddleware() {
  const cacheOptions = {
    statusCodes: { include: [200] },
    defaultDuration: 60000,
    appendKey: (req, res) => req.method
  };
  let cacheMiddleware = apicache.options(cacheOptions).middleware();
  return cacheMiddleware;
}