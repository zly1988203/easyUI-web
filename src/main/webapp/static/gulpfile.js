/**
 * 黄江 on 2015/12/08
 * 描述:gulp配置文件
 */
//npm install gulp gulp-sass gulp-concat gulp-minify-css gulp-rev gulp-rev-collector gulp-dom-src gulp-uglify gulp-cheerio
var gulp = require('gulp');
var sass = require('gulp-sass');
//var concat = require('gulp-concat');                            //- 多个文件合并为一个；
//var minifyCss = require('gulp-minify-css');                     //- 压缩CSS为一行；
//var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
//var revCollector = require('gulp-rev-collector');               //- 路径替换
//var domSrc = require('gulp-dom-src');
////var cssmin = require('gulp-cssmin');
//var uglify = require('gulp-uglify');
//var cheerio = require('gulp-cheerio');

/* 环境信息 */
var isDist = false;
var buildPath = isDist?'./build/dist':'./build/develop';

var arrCss = [{name:'wap.min.css',type:'wap'},
  {name:'base.min.css',type:'base'}
];
var arrJs = [{name:'app.min.js',type:'app'},
  {name:'base.min.js',type:'base'}
];


//编译scss
gulp.task("scss",function(){
  gulp.src(["./css/*.scss"])
      .pipe(sass())
      .pipe(gulp.dest("./css/"));

  //gulp.src(["./css/*.css"])
  //    .pipe(sass())
  //    .pipe(minifyCss())
  //    .pipe(concat('app.min.css'))
  //    .pipe(gulp.dest("./css/min/"));
});
return;
gulp.task('css', function() {
  cssHandel();
});

function cssHandel(){
  for(var i=0;i<arrCss.length;i++){
    var item = arrCss[i];
    domSrc({file:'index.html',selector:'link[data-type="'+item.type+'"]',attribute:'href'})
        .pipe(concat(item.name))
        .pipe(minifyCss())
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest(buildPath+'/css'))                    //- 输出文件本地
        .pipe(rev.manifest(item.name+'.json'))                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest(buildPath+'/rev'));                   //- 将 rev-manifest.json 保存到 rev 目录内
  }
}

gulp.task('js', function() {
  jsHandel();
});
function jsHandel(){
  for(var i=0;i<arrJs.length;i++){
    var item = arrJs[i];
    domSrc({file:'index.html',selector:'script[data-type="'+item.type+'"]',attribute:'src'})
        .pipe(concat(item.name))
        .pipe(uglify())
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest(buildPath+'/js'))                    //- 输出文件本地
        .pipe(rev.manifest(item.name+'.json'))                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest(buildPath+'/rev'));                   //- 将 rev-manifest.json 保存到 rev 目录内
  }
}

gulp.task('indexHtml', function() {
  return gulp.src('index.html')
      .pipe(cheerio(function ($) {
        $('script.java').remove();
        $('link').remove();
        for(var i=0;i<arrCss.length;i++){
          $('head').append('<link rel="stylesheet" href="'+arrCss[i].name+'">\n');
        }
        for(var j=0;j<arrJs.length;j++){
          $('body').append('<script src="'+arrJs[j].name+'" ><\/script>\n');
        }
      }))
      .pipe(gulp.dest(buildPath));
});

gulp.task('rev', function() {
  gulp.src([buildPath+'/rev/*.json', buildPath+'/index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
      .pipe(revCollector())                                   //- 执行文件内css名的替换
      .pipe(gulp.dest(buildPath));                     //- 替换后的文件输出的目录
});


gulp.task('default', ['css', 'js','indexHtml','html','img','rev']);
