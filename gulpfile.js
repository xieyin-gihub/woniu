const gulp = require('gulp'); //加载或者引入gulp 生成gulp对象。
const html = require('gulp-minify-html'); //引入html的压缩的包
const css = require('gulp-minify-css'); //引入css的压缩的包
// const sass = require('gulp-sass');//sass编译

// const sourcemaps = require('gulp-sourcemaps');//生成map文件
const plugins = require('gulp-load-plugins')();//生成map文件

const concat = require('gulp-concat');//js合并
const uglify = require('gulp-uglify');//js压缩
const rename = require('gulp-rename'); //重命名

const babel = require('gulp-babel'); //es6转es5主要模块
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块

const imagemin = require('gulp-imagemin');//图片压缩

const watch = require('gulp-watch');//监听

const browserify = require('browserify');//让浏览器支持require
const source = require('vinyl-source-stream');//文件流

//1.gulp.task(任务名,回调函数):创建新的任务。
//2.gulp.src('url'):引入文件的路径
//3.pipe 管道流
//4.gulp.dest():输出文件的路径，自动创建对应的文件名称。
//5.

//1.新建任务
gulp.task('hehe', function () {
  console.log('hello,gulp!!');
});

//2.copy文件
gulp.task('copyfile', function () {
  return gulp.src('src/font/*')
    .pipe(gulp.dest('dist/font/'));
});

//3.html文件的压缩
gulp.task('uglifyhtml', function () {
  return gulp.src('src/*.html')
    .pipe(html()) //应用html包
    .pipe(gulp.dest('dist/'));
});

//4.压缩css。
gulp.task('uglifycss', function () {
  return gulp.src('src/css/**/*')
    .pipe(css()) //应用html包
    .pipe(gulp.dest('dist/css/'));
});

//5.利用sass，生成压缩css。
gulp.task('compilesass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(plugins.sourcemaps.init()) // 初始化 gulp-sourcemaps 插件  生成.map文件初始化  
    .pipe(plugins.sass({ // 调用 sass 插件，编译 sass 文件
      outputStyle: 'compressed' //压缩一行
    }))
    .pipe(plugins.sourcemaps.write('.')) // 生成 sourcemap 生成.map文件 
    .pipe(gulp.dest('dist/style/'));
});

//6.将es6转成es5,再压缩js
gulp.task('uglifyjs', function () {
  return gulp.src('src/js/*.js')
    .pipe(babel({ //es6转es5
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

//合并js文件
// gulp.task('concatjs',function(){
//     return gulp.src('src/js/*.js')
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('dist/js/'));
// })

//7.png图片的压缩
//图片压缩的插件：gulp-imagemin
gulp.task('runimg', function () {
  return gulp.src('src/img/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'));
});

//8.让原生js支持模块化开发--require
gulp.task("browserify", function () {
  var b = browserify({
    entries: "dist/js/main1.js"//入口文件
  });

  return b.bundle()
    .pipe(source("main.js"))//编译后的入口文件
    .pipe(gulp.dest("dist/js"));//输出路径
});

//最终监听
//每一个任务先跑一次，再进行监听
gulp.task('default', function () {
  //文件路径
  //watch:监听
  watch(['src/font/*', 'src/*.html', 'src/sass/*.scss', 'src/js/*.js', 'src/img/*.png', 'bundle.js'],
    gulp.parallel('copyfile', 'uglifyhtml', 'compilesass', 'uglifyjs', 'runimg', 'browserify'));
  //gulp.parallel():让任务并行。
});



