let { app, query } = require('./config/config');
var fs = require('fs');
var documentRoot = 'file:///Users/gzx/resume/api/file/imgs';
app.post('/subMessage', function (req, res) {
  let data = req.body;
  data.time = new Date().toLocaleDateString().toString();
  let sql = `INSERT INTO  message (header,name,time,content)  VALUES("${data.header}","${data.name}","${data.time}","${data.content}")`;
  query(sql).then(function (data) {
    res.status(200);
    res.json(data);
  });
})
app.get('/messageList', function (req, res) {
  var sql = 'select * from message';
  query(sql).then(function (data) {
    res.status(200);
    res.json(data);
  });
});