


var express = require('express');
var app = express();
var wechat = require('wechat');
var elasticsearch = require('elasticsearch');
var connect=require('connect');
var crypto = require('crypto');

/////////
app.use(connect.query());
app.use(connect.cookieParser());
app.use(connect.session({secret: 'keyboard cat', cookie: {maxAge: 60000}}));
//////////



var client = elasticsearch.Client({
  host: '123.57.49.48:9200'
/*  log: 'trace'
*/});

md5=function (str) {
var md5sum = crypto.createHash('md5');
md5sum.update(str);
str = md5sum.digest('hex');
return str;
};

var config={
     school: "bgu",
     region: "bj",
     token: 'qihuiqiang',
     appid: 'wx8f708305b914a282123213',
     encodingAESKey: '1111111111111111111111111111111111111111111'
   };

var appidmap = {};
appidmap.bgu ="wx8f708305b914a282";
appidmap.bj="wxaf8f8567014f584f"


var schoolnameMap={};

schoolnameMap.天津工业大学="tjpu"
schoolnameMap.上海高校微生活="sh"
schoolnameMap.西安高校微生活="xa"
schoolnameMap.北京高校微生活="bj"
schoolnameMap.吉利大学="bgu"
schoolnameMap.中南民族大学="scuec"
schoolnameMap.南京师范大学="njnu"
schoolnameMap.上海工程技术大学="sues"
schoolnameMap.南京工程学院="njit"
schoolnameMap.南京农业大学="njau"
schoolnameMap.南京理工大学="njust"
schoolnameMap.东南大学="seu"
schoolnameMap.南京航空航天大学="nuaa"
schoolnameMap.河海大学="hhu"
schoolnameMap.武汉理工大学="whut"
schoolnameMap.南开大学="nankai"
schoolnameMap.华东政法大学="ecupl"
schoolnameMap.南京邮电大学="nupt"
schoolnameMap.天津科技大学="tuli"
schoolnameMap.中国民航大学="cauc"
schoolnameMap.陕西师范大学="snnu"
schoolnameMap.西北政法大学="nwupl"
schoolnameMap.西安建筑科技大学="xauat"
schoolnameMap.华东师范大学="ecnu"
schoolnameMap.上海大学="shu"
schoolnameMap.复旦大学="fudan"
schoolnameMap.北京科技大学="ustb"
schoolnameMap.北京化工大学="buct"
schoolnameMap.北京林业大学="bjfu"
schoolnameMap.首都经济贸易大学="cueb"
schoolnameMap.西安邮电大学="xiyou"
schoolnameMap.西安医学院="xiyi"
schoolnameMap.华东理工大学="ecust"
schoolnameMap.上海交通大学="sjtu"
schoolnameMap.同济大学="tongji"
schoolnameMap.北京大学="pku"
schoolnameMap.北京交通大学="bjtu"
schoolnameMap.中国传媒大学="cuc"
schoolnameMap.中央财经大学="cufe"
schoolnameMap.北京联合大学="buu"
schoolnameMap.天津商业大学="tjcu"
schoolnameMap.华北电力大学="ncepu"
schoolnameMap.西北大学="nwu"
schoolnameMap.西安交通大学="xjtu"
schoolnameMap.西安电子科技大学="xdu"
schoolnameMap.西安科技大学="xust"
schoolnameMap.西安财经学院="xaufe"
schoolnameMap.上海师范大学="shnu"
schoolnameMap.清华大学="tsinghua"
schoolnameMap.北京师范大学="bnu"
schoolnameMap.中国石油大学="cup"
schoolnameMap.中央民族大学="muc"
schoolnameMap.北京城市学院="bcu"
schoolnameMap.天津财经大学="tjufe"
schoolnameMap.河北工业大学="hebut"
schoolnameMap.北京邮电大学="bupt"
schoolnameMap.北方民族大学="nwsni"
schoolnameMap.长安大学="xahu"
schoolnameMap.陕西科技大学="sust"
schoolnameMap.西安文理学院="xawl"
schoolnameMap.上海海洋大学="shfu"
schoolnameMap.上海理工大学="usst"
schoolnameMap.北京理工大学="bit"
schoolnameMap.对外经济贸易大学="uibe"
schoolnameMap.中国人民大学="ruc"
schoolnameMap.北京航空航天大学="buaa"
schoolnameMap.中国矿业大学="cumt"
schoolnameMap.天津师范大学="tjnu"
schoolnameMap.华中农业大学="hzau"
schoolnameMap.天津大学="tju"
schoolnameMap.武汉大学="whu"
schoolnameMap.宁夏医科大学="nxmu"
schoolnameMap.西北工业大学="nwpu"
schoolnameMap.西安外国语大学="xisu"
schoolnameMap.西安理工大学="xaut"
schoolnameMap.东华大学="dhu"
schoolnameMap.上海财经大学="shufe"
schoolnameMap.上海海事大学="shmtu"
schoolnameMap.中国政法大学="cupl"
schoolnameMap.北京工业大学="bjut"
schoolnameMap.中国农业大学="cau"
schoolnameMap.中国地质大学="cugb"
schoolnameMap.宁夏大学="nxu"



var regionnameMap={};
regionnameMap.天津工业大学="022"
regionnameMap.上海高校微生活="111"
regionnameMap.西安高校微生活="111"
regionnameMap.北京高校微生活="111"
regionnameMap.吉利大学="010"
regionnameMap.中南民族大学="027"
regionnameMap.南京师范大学="025"
regionnameMap.上海工程技术大学="021"
regionnameMap.南京工程学院="025"
regionnameMap.南京农业大学="025"
regionnameMap.南京理工大学="025"
regionnameMap.东南大学="025"
regionnameMap.南京航空航天大学="025"
regionnameMap.河海大学="025"
regionnameMap.武汉理工大学="027"
regionnameMap.南开大学="022"
regionnameMap.华东政法大学="021"
regionnameMap.南京邮电大学="025"
regionnameMap.天津科技大学="022"
regionnameMap.中国民航大学="022"
regionnameMap.陕西师范大学="029"
regionnameMap.西北政法大学="029"
regionnameMap.西安建筑科技大学="029"
regionnameMap.华东师范大学="021"
regionnameMap.上海大学="021"
regionnameMap.复旦大学="021"
regionnameMap.北京科技大学="010"
regionnameMap.北京化工大学="010"
regionnameMap.北京林业大学="010"
regionnameMap.首都经济贸易大学="010"
regionnameMap.西安邮电大学="029"
regionnameMap.西安医学院="029"
regionnameMap.华东理工大学="021"
regionnameMap.上海交通大学="021"
regionnameMap.同济大学="021"
regionnameMap.北京大学="010"
regionnameMap.北京交通大学="010"
regionnameMap.中国传媒大学="010"
regionnameMap.中央财经大学="010"
regionnameMap.北京联合大学="010"
regionnameMap.天津商业大学="022"
regionnameMap.华北电力大学="010"
regionnameMap.西北大学="029"
regionnameMap.西安交通大学="029"
regionnameMap.西安电子科技大学="029"
regionnameMap.西安科技大学="029"
regionnameMap.西安财经学院="029"
regionnameMap.上海师范大学="021"
regionnameMap.清华大学="010"
regionnameMap.北京师范大学="010"
regionnameMap.中国石油大学="010"
regionnameMap.中央民族大学="010"
regionnameMap.北京城市学院="010"
regionnameMap.天津财经大学="022"
regionnameMap.河北工业大学="022"
regionnameMap.北京邮电大学="010"
regionnameMap.北方民族大学="0951"
regionnameMap.长安大学="029"
regionnameMap.陕西科技大学="029"
regionnameMap.西安文理学院="029"
regionnameMap.上海海洋大学="021"
regionnameMap.上海理工大学="021"
regionnameMap.北京理工大学="010"
regionnameMap.对外经济贸易大学="010"
regionnameMap.中国人民大学="010"
regionnameMap.北京航空航天大学="010"
regionnameMap.中国矿业大学="010"
regionnameMap.天津师范大学="022"
regionnameMap.华中农业大学="027"
regionnameMap.天津大学="022"
regionnameMap.武汉大学="027"
regionnameMap.宁夏医科大学="0951"
regionnameMap.西北工业大学="029"
regionnameMap.西安外国语大学="029"
regionnameMap.西安理工大学="029"
regionnameMap.东华大学="021"
regionnameMap.上海财经大学="021"
regionnameMap.上海海事大学="021"
regionnameMap.中国政法大学="010"
regionnameMap.北京工业大学="010"
regionnameMap.中国农业大学="010"
regionnameMap.中国地质大学="010"
regionnameMap.宁夏大学="0951"




var appidRequired = function (req, res, next) {
  config.appid=appidmap[req.query.s]
  config.school=req.query.s
  config.region=regionnameMap[req.query.s]
  next();
};
var school="";
var name="";

app.use('/wechat',appidRequired,wechat(config, function (req, res, next) {

 console.log(req.weixin)
 if(!(req.weixin.Content.split(" ").length>1)){
    res.reply("输入格式错误，请回复学校+名字的形式，例如:清华大学 王晓春");
    return;
 }
 school=schoolnameMap[req.weixin.Content.split(" ")[0]]
 name=req.weixin.Content.split(" ")[1]

 if(!school){
    res.reply("没有找到相关表白.....");
   return;
 }

config.school=school;
 client.search({
  index: 'schools',
  type:config.school,
  size: 1,
  body: {
    'min_score':6,
    "query" :{
      "match" :{"content": name}
    }
  }
}).then(function (response) {
  console.log('http://welife001.com:1234/search?key='+md5(name)+'&r='+config.region+'&s='+school+'&name='+name+''
)
    var hits = response.hits.hits;
    if(hits.length>0){
     console.log(hits[0]._source.content)
     res.reply([   
      {
        title: hits[0]._source.content,
        description:hits[0]._source.content,
        picurl: 'https://mmbiz.qlogo.cn/mmbiz/icFGyJ0J3K6E21Fr1cc3AXMltD4M9qv6ubupBYA6WtZEYKF647kibazDmlALFs0PdlqE3ehPbQC2TteXfAe0tibSQ/0?wx_fmt=jpeg',
        url: http://welife001.com:1234/search?key='+md5(name)+'&r='+config.region+'&s='+school+'&name='+name+''
      }
     ]);
    }else{
      res.reply("没有和你相关的表白呀，努力努力！！！")
    }
    
}).catch(function(err){
   console.log(err)
});


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
