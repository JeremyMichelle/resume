var express = require('express');
var http = require('http');
var url = require('url');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '556656.com',
  database: 'resume'
});
//配置服务端口
var server = app.listen(3001, function () {

  var host = server.address().address;

  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
})
connection.connect(function (err) {
  if (err) {
    console.log(`mysql连接失败: ${err}!`);
  } else {
    console.log("mysql连接成功!");
  }
});
console.log('服务器开启成功');
function query (sql) {
  return new Promise(function (resolve, reject) {
    connection.query(sql, function (err, result) {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });

}

exports.query = query;
exports.app = app;