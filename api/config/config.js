var express=require('express');
var fs = require('fs');
var http = require('http');
var app =express();
var bodyParser = require('body-parser'); 
var mysql      = require('mysql');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });
var documentRoot = 'file:///Users/vansoft1/resume/api/file/imgs';
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '556656.com',
  database : 'test'
});
//配置服务端口
// var server = app.listen(3001, function () {

//   var host = server.address().address;

//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// })
connection.connect(function(err){
  if(err){
      console.log(`mysql连接失败: ${err}!`);
  }else{
      console.log("mysql连接成功!");
  }
});
var server= http.createServer(function(req,res){

  var url = req.url; 
  //客户端输入的url，例如如果输入localhost:8888/index.html
  //那么这里的url == /index.html 

  var file = documentRoot + url;
  console.log('url',file);
  //E:/PhpProject/html5/websocket/www/index.html 


  fs.readFile( file , function(err,data){
  /*
      一参为文件路径
      二参为回调函数
          回调函数的一参为读取错误返回的信息，返回空就没有错误
          二参为读取成功返回的文本内容
  */
    console.log('err',err)
      if(err){
          res.writeHeader(404,{
              'content-type' : 'text/html;charset="utf-8"'
          });
          res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
          res.end();
      }else{
          res.writeHeader(200,{
              'content-type' : 'text/html;charset="utf-8"'
          });
          res.write(data);//将index.html显示在客户端
          res.end();

      }

  });



}).listen(8888);

console.log('服务器开启成功');
function query(sql){
  return new Promise(function(resolve,reject){
    connection.query(sql,function (err, result) {
      if(err){
        reject(err.message);
      }else{
        resolve(result);
      }
    });
  });
  
}

exports.query = query;
exports.app = app;