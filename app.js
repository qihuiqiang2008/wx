


var express = require('express');
var app = express();
var wechat = require('wechat');
var elasticsearch = require('elasticsearch');
var connect=require('connect');
var async=require("async");
/////////
app.use(connect.query());
app.use(connect.cookieParser());
app.use(connect.session({secret: 'keyboard cat', cookie: {maxAge: 60000}}));
//////////



var client = elasticsearch.Client({
  host: '123.57.49.48:9200',
  log: 'trace'
});
var config = {
  token: 'qihuiqiang',
  appid: 'wx8f708305b914a282',
  encodingAESKey: '1111111111111111111111111111111111111111111'
};







app.use('/wechat',wechat(config, function (req, res, next) {
 
 console.log("----------------------这是刚进来的---------"+res)
 client.search({
  index: 'schools',
  type:'muc',
  size: 1,
  body: {
    'min_score':6,
    "query" :{
      "match" :{"content": "赵娇" }
    }
  }
}).then(function (err, response) {
  var hits = resp.body.hits;
  console.log(hits)
  console.log("这是处理后的"---------+res)
  res.reply('你好');
})


/*async.waterfall([
  function(callback){
    callback(null, 'one', 'two');
  },
  function(arg1, arg2, callback){
    // arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three');
  },
  function(arg1, callback){


client.search({
  index: 'schools',
  type:'muc',
  size: 1,
  body: {
    'min_score':6,
    "query" :{
      "match" :{"content": "赵娇" }
  }
  }
}).then(function (resp) {
  var hits = resp.body.hits;
  console.log(hits)
  re1s.reply('我今年18岁');

  
}, function (err) {
 callback(null, 'done');});
    // arg1 now equals 'three'

  }
], function (err, result) {
   // result now equals 'done'
});*/


/*var List = require('wechat').List;
List.add('view', [
  ['回复{a}查看我的性别', function (info, req, res) {
    res.reply('我是个妹纸哟');
  }],
  ['回复{b}查看我的年龄', function (info, req, res) {
    res.reply('我今年18岁');
  }],
  ['回复{c}查看我的性取向', '这样的事情怎么好意思告诉你啦- -']
]);*/




/*  // 微信输入信息都在req.weixin上
  var message = req.weixin;
      res.wait('view');*/

  /*var rr=res;
  console.log(message)
  client.search({
  index: 'schools',
  type:'muc',
  size: 1,
  body: {
    'min_score':6,
    "query" :{
      "match" :{"content": "赵娇" }
  }
  }
}).then(function (resp) {
  var hits = resp.body.hits;
  rr.reply('hehe');
  console.log(hits)
  
});*/

/*  res.reply('hehe');
*/

/*res.reply({
      content: '那个对美院刘畅有意思的妹子，这是他的联系方式，不用谢我，叫我雷锋阿姨。刘畅：132-6176-5153"\n\n回复上上期表白5，我是她朋友，她有一个特别特别喜欢的人了，她希望你可以找到更好的女孩:\n\n致偷暖瓶的：放于四食堂东门前的绿色暖瓶和紫色暖瓶被偷，已调取监控视频，限两日内放回原位，否则被抓的时候再见吧～:))',
      type: 'text'
    });*/

  /*if (message.FromUserName === 'diaosi') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }*/
}));

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
