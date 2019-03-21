var express=require('express');
var app =express();
var bodyParser = require('body-parser'); 
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '556656.com',
  database : 'test'
});
//引用bodyParser 这个不要忘了写
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
 var questions=[
    {
    data:213,
    num:444,
    age:12
    },
    {
    data:456,
    num:678,
    age:13
    }];
    
connection.connect(function(err){
  if(err){
      console.log(`mysql连接失败: ${err}!`);
  }else{
      console.log("mysql连接成功!");
  }
});
    var  sql = 'select * from runoob_tbl';
    //查
    connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
     
           console.log('--------------------------SELECT----------------------------');
           console.log(result);
           console.log('------------------------------------------------------------\n\n');  
    });
     
    connection.end();
//写个接口123
app.get('/123',function(req,res){
    res.status(200),
    res.json(questions)
    });
app.post('/wdltest',function(req,res){
    console.log(req.stack);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    res.json(req.body)
})
//配置服务端口
var server = app.listen(3001, function () {

    var host = server.address().address;

     var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    })