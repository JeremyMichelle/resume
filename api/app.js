let { app, query } = require('./config/config');
var dateUtils = require("date-utils");
let count = 0;
app.post('/subMessage', function (req, res) {
  let data = req.body;
  data.time = new Date().toFormat("YYYY-MM-DD HH24:MI:SS");
  console.log('data.time', data.time);
  let sql = `INSERT INTO  message (header,name,time,content)  VALUES("${data.header}","${data.name}","${data.time}","${data.content}")`;
  query(sql).then(function (data) {
    res.status(200);
    res.json(data);
  });
})
function msgCount() {
  let sql = `select count(*) as count from message`;
  return new Promise(function (resolve,reject) {
    query(sql).then(function (data) {
      resolve(data[0].count);
    });
  })
}
app.get('/messageList', function (req, res) {
    let body = req.query;
    let result = {lastPage:false,data:[]};
    let sql = `select * from message order by time desc limit ${(body.pageNo-1)*body.pageSize},${body.pageSize}`;

    msgCount().then(function (total) {
      if(body.pageNo*body.pageSize>total){
        result.lastPage = true;
      }
      query(sql).then(function (data) {
        res.status(200);
        result.data = data;
        res.json(result);
      });
    });

    
});
// console.log('new Date()', new Date().format("yyyy/mm/dd"));