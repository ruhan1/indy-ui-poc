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
  let name=req.params.name;
  if(name){
    try{
      let result = require(`./mock/store/remote/${name}.json`);
      res.status(200).json(result);
    }catch(error){
      res.status(500).json({error: error});
    }
  }else{
    res.status(400).json({error: "Missing store name"});
  }
});
