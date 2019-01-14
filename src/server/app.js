import compression from 'compression';
import express from 'express';
import path from 'path';
import {Config} from './config/AppConfig.js';

const app = express();

app.use(compression());

let server = app.listen(4000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

app.use(express.static('build'));

const APP_ROOT="/#";

const indexHtml=path.join(Config.projectRoot+'/public/index.html');

// For direct url bar addressing, will send home page directly for client router rendering
app.get([APP_ROOT, `${APP_ROOT}/*`, '/'], (req, res) => {
    res.sendFile(indexHtml);
});

app.get('/api/admin/stores/_all/remote', (req, res) => {
  let remoteList = require('./mock/list/FakeRemoteList.json');
  res.status(200).json(remoteList);
});

app.get('/api/admin/stores/_all/hosted', (req, res) => {
  let hostedList = require('./mock/list/FakeHostedList.json');
  res.status(200).json(hostedList);
});

app.get('/api/admin/stores/_all/group', (req, res) => {
  let groupList = require('./mock/list/FakeGroupList.json');
  res.status(200).json(groupList);
});

app.get('/api/admin/schedule/store/all/disable-timeout', (req, res) => {
  let disableTimeouts = require('./mock/FakeDisableTimeouts.json');
  res.status(200).json(disableTimeouts);
});

app.get('/api/admin/schedule/store/:packageType/:type/:name/disable-timeout', (req, res) => {
  let group = `${req.params.packageType}:${req.params.type}:${req.params.name}`;
  if(group && group.length > 0){
    let disList = require('./mock/FakeDisableTimeouts.json');
    let result = disList.items.find(item=>item.group.includes(group));
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({error: "No such store!"});
    }
  }
});

app.get('/api/admin/stores/maven/remote/:name', (req, res) => {
  let name = req.params.name;
  if(name){
    let remoteList = require('./mock/list/FakeRemoteList.json');
    let result = remoteList.items.find(item=>item.name===name);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({error: "No such store!"});
    }
  }else{
    res.status(400).json({error: "Missing store name"});
  }
});

app.get('/api/admin/stores/maven/hosted/:name', (req, res) => {
  let name=req.params.name;
  if(name){
    let remoteList = require('./mock/list/FakeHostedList.json');
    let result = remoteList.items.find(item=>item.name===name);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({error: "No such store!"});
    }
  }else{
    res.status(400).json({error: "Missing store name"});
  }
});

app.get('/api/admin/stores/maven/group/:name', (req, res) => {
  let name=req.params.name;
  if(name){
    let remoteList = require('./mock/list/FakeGroupList.json');
    let result = remoteList.items.find(item=>item.name===name);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({error: "No such store!"});
    }
  }else{
    res.status(400).json({error: "Missing store name"});
  }
});
