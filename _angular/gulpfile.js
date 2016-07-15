var gulp = require("gulp"),
  concat = require("gulp-concat"),
  tsc = require("gulp-typescript"),
  jsMinify = require("gulp-uglify"),
  cssPrefixer = require("gulp-autoprefixer"),
  cssMinify = require("gulp-cssnano"),
  del = require("del"),
  merge = require("merge-stream"),
  minifyHTML = require('gulp-htmlmin'),
  SystemBuilder = require("systemjs-builder");

var appFolder = "./app";
var outFolder = "dist";

gulp.task("clean", function () {
  return del(outFolder);
});

gulp.task("shims", function () {
  return gulp.src([
      "node_modules/es6-shim/es6-shim.js",
      "node_modules/zone.js/dist/zone.js",
      "node_modules/reflect-metadata/Reflect.js"
    ])
    .pipe(concat("shims.js"))
    .pipe(jsMinify())
    .pipe(gulp.dest(outFolder + "/js/"));
});

gulp.task("tsc", function () {
  var tsProject = tsc.createProject("./tsconfig.json");
  var tsResult = gulp.src([
      appFolder + "/**/*.ts"
    ])
    .pipe(tsc(tsProject), undefined, tsc.reporter.fullReporter());

  return tsResult.js.pipe(gulp.dest("build/"));
});

gulp.task("system-build", ["tsc"], function () {
  var builder = new SystemBuilder();

  return builder.loadConfig("systemjs.config.js")
    .then(function () {
      builder.buildStatic(appFolder + '/**/*.js', outFolder + "/js/bundle.js")
    })
    .then(function () {
      del("build")
    });
});


gulp.task("buildAndMinify", ["system-build"], function () {
  var bundle = gulp.src(outFolder + "/js/bundle.js")
    .pipe(jsMinify())
    .pipe(gulp.dest(outFolder + "/js/"));

  var css = gulp.src(outFolder + "/css/styles.css")
    .pipe(cssMinify())
    .pipe(gulp.dest(outFolder + "/css/"));

  return merge(bundle, css);
});


gulp.task("favicon", function () {
  return gulp.src(appFolder + "/favicon.ico")
    .pipe(gulp.dest(outFolder));
});

gulp.task("css", function () {
  return gulp.src(appFolder + "/**/*.css")
    .pipe(cssPrefixer())
    .pipe(cssMinify())
    .pipe(gulp.dest(outFolder));
});

gulp.task("templates", function () {
  return gulp.src(appFolder + "/**/*.html")
    .pipe(minifyHTML())
    .pipe(gulp.dest(outFolder));
});

gulp.task("assets", ["templates", "css", "favicon"], function () {
  return gulp.src(appFolder + "/**/*.png")
    .pipe(gulp.dest(outFolder));
});


gulp.task("otherScriptsAndStyles", function () {
  gulp.src([
      "jquery/dist/jquery.*js",
      "bootstrap/dist/js/bootstrap*.js"
    ], {
      cwd: "node_modules/**"
    })
    .pipe(gulp.dest(outFolder + "/js/"));

  gulp.src([
    "node_modules/bootstrap/dist/css/bootstrap.css"
  ]).pipe(cssMinify()).pipe(gulp.dest(outFolder + "/css/"));

  gulp.src([
    "node_modules/bootstrap/fonts/*.*"
  ]).pipe(gulp.dest(outFolder + "/fonts/"));
});


//gulp.task("watch.tsc", ["tsc"], function () {
//    return gulp.watch(appFolder + "/**/*.ts", ["tsc"]);
//});

//gulp.task("watch", ["watch.tsc"]);


gulp.task("default", [
  "shims",
  "buildAndMinify",
  "assets",
  "otherScriptsAndStyles"
  //,"watch"
]);
