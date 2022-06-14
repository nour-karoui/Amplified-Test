const http = require('http'), fs = require('fs');

const error = (message, res) => {
  res.writeHeader(500, {"Content-Type": "application/json"});
  res.write(JSON.stringify({message, status: 500}));
  res.end();
}
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Max-Age": 2592000, // 30 days
  /** add other headers as per requirement */
};
const badRequest = (message, res) => {
  res.writeHead(400, {"Content-Type": "application/json"})
  res.write(JSON.stringify({message, status: 500}));
  res.end();
}
const okJSON = (data, res) => {
  res.writeHead(200, headers);
  res.write(JSON.stringify(data));
  res.end();
}
const returnHTML = (filePath, res) => {
  try{
    fs.readFile(filePath, function (err, html) {
      if (err) {
        return error(err.message, res);
      }
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  } catch (err) {
    console.error(err);
    return error("internal server error", res);
  }
}
const routes = {};

routes[''] = (route, req, res) => {
  returnHTML('./client/index.html', res)
}

const assetTypes = {".js": "text/javascript", ".css": "text/css", ".html": "text/html"};
routes['assets'] = (route, req, res) => {
  try{
    if(route[2] && route[2].indexOf("..") > -1){
      throw("no going back");
    }

    let contentType = assetTypes[route[2].substring(route[2].lastIndexOf("."))];
    if(!contentType){
      throw("unsupported asset");
    }
    
    fs.readFile(`./client/assets/${route[2]}`, function (err, file) {
      if (err) {
          return error(err.message, res);
      }
      res.writeHeader(200, {"Content-Type": contentType});  
      res.write(file);  
      res.end();  
    });
  } catch (err) {
    console.error(err);
    return error("internal server error", res);
  }
} 

http.createServer(function (req, res) {
  const route = (req.url || "").split("/");
  if(!routes[route[1]]){
    return returnHTML('./client/assets/pageNotFound.html', res)
  }
  routes[route[1]](route, req, res);
}).listen(8080, () => {
  console.log('server listening at 8080')});

let WebSocket = null;
let webSocketServer = null; 

try{
  WebSocket = require('ws');
  webSocketServer = new WebSocket.Server({ port: 8081 });
}catch(err){
  console.error(err);
}

// implement a really simple cache class so the returned data is cached for some time
// cached data should be able to be invalidated both manually and by time
const CachedDataset = require('./cached-dataset');
const cachedDataset = new CachedDataset();

webSocketServer && webSocketServer.on('connection', function connection(wSocket) {
  wSocket.on('message', function incoming(message) {
    // implement me
    // return cached data
    
    if(message === "task"){
      wSocket.send(JSON.stringify(cachedDataset.returnCachedResults()));
    }else{
      console.log('received: %s', message);
      wSocket.send("i got the message already... stahp, get some help...");
    }
  });
 
  wSocket.send('connected');
});

routes['task'] = (route, req, res) => {
  // implement me
  // return cached data
  okJSON(cachedDataset.returnCachedResults(), res);
}