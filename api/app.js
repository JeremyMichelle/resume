let { app, query } = require('./config/config');
var fs = require('fs');
var dateUtils = require("date-utils");
var documentRoot = 'file:///Users/gzx/resume/api/file/imgs';
var dt = new Date();
app.post('/subMessage', function (req, res) {
  let data = req.body;
  data.time = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
  console.log('data.time', data.time);
  let sql = `INSERT INTO  message (header,name,time,content)  VALUES("${data.header}","${data.name}","${data.time}","${data.content}")`;
  query(sql).then(function (data) {
    res.status(200);
    res.json(data);
  });
})
app.get('/messageList', function (req, res) {
  var sql = 'select * from message order by time desc';
  query(sql).then(function (data) {
    res.status(200);
    res.json(data);
  });
});
// console.log('new Date()', new Date().format("yyyy/mm/dd"));