#!/bin/env node
var express = require('express');
var path = require('path');
var fs = require('fs')
var logger = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var debug = require('debug')('debug')
var cors  = require('cors')
var multer = require('multer')
var mkdirp = require('mkdirp')


var base_path = process.argv[2]
if(base_path )
  base_path = path.isAbsolute(base_path) ? base_path : path.join(process.cwd(),base_path)
else
  base_path = process.cwd()



//上传
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let upload_path =path.join(base_path, req.body.name || 'upload')
    debug(upload_path)
    mkdirp.sync(upload_path)

    cb(null, upload_path)
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname )
  }
})

var upload = multer({ storage: storage })

var upload_function = function(req,res,next){

  // 表单的其它内容
  debug("body:",req.body)
  res.end()
}



var app = express();

var server = require('http').Server(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// enable all cors
if (process.env.DEBUG){
  debug("开启跨域!")
  app.use(cors())
}

//主页
app.use(express.static("./dist"))


//上传
app.post('/upload',upload.single('file'),upload_function)
//app.use('/', require('./routes/index.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if(err.status == 404)
    res.status(404);
  else
    res.status(500);
  res.json({
    status:-1,
    err:err.message
  })
});
server.listen(5050,function(){
  debug("listen on port",5050)
});
