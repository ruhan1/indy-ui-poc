const express = require('express');
const os = require('os');

const app = express();


let server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});

app.use(express.static('build'));

app.get('/api/admin/stores/_all/remote', function (req, res){
  let remoteList  = require('./mock/list/FakeRemoteList.json');
  res.status(200).json(remoteList);
} );

app.get('/api/admin/stores/_all/hosted', function (req, res){
  let hostedList = require('./mock/list/FakeHostedList.json');
  res.status(200).json(hostedList);
} );

app.get('/api/admin/stores/_all/group', function (req, res){
  let groupList = require('./mock/list/FakeGroupList.json');
  res.status(200).json(groupList);
} );

app.get('/api/admin/schedule/store/all/disable-timeout', function (req, res){
  let disableTimeouts = require('./mock/FakeDisableTimeouts.json');
  res.status(200).json(disableTimeouts);
} );

app.get('/api/admin/stores/maven/remote/:name', function(req, res){
  var name=req.params.name;
  if(!name){
    res.status(400).json({error: "Missing store name"});
  }else{
    let remoteList  = require('./mock/list/FakeRemoteList.json');
    let result = remoteList.items.find(item=>item.name===name);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({error: "No such store!"});
    }
  }
});

app.get('/api/admin/stores/maven/hosted/:name', function(req, res){
  var name=req.params.name;
  if(!name){
    res.status(400).json({error: "Missing store name"});
  }else{
    let remoteList  = require('./mock/list/FakeHostedList.json');
    let result = remoteList.items.find(item=>item.name===name);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({error: "No such store!"});
    }
  }
});

app.get('/api/admin/stores/maven/group/:name', function(req, res){
  var name=req.params.name;
  if(!name){
    res.status(400).json({error: "Missing store name"});
  }else{
    let remoteList  = require('./mock/list/FakeGroupList.json');
    let result = remoteList.items.find(item=>item.name===name);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({error: "No such store!"});
    }
  }
});
