var gulp = require("gulp"),
  concat = require("gulp-concat"),
  tsc = require("gulp-typescript"),
  jsMinify = require("gulp-uglify"),
  cssMinify = require("gulp-cssnano"),
  del = require("del"),
  merge = require("merge-stream"),
  injectString = require("gulp-inject-string"),
  copy = require("gulp-copy"),
  rename = require("gulp-rename"),
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

gulp.task("intls", function () {
  return gulp.src([
      "node_modules/intl/dist/Intl.min.js",
      "node_modules/intl/locale-data/jsonp/en.js",
      "node_modules/intl/locale-data/jsonp/de.js"
    ])
    .pipe(concat("intls.js"))
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
  var mergeJs = gulp.src([
      outFolder + "/js/shims.js",
      outFolder + "/js/intls.js", // https://github.com/angular/angular/issues/3333#issuecomment-188976442
      "node_modules/material-design-lite/material.min.js",
      outFolder + "/js/bundle.js",
    ])
    .pipe(concat("perf.js"))
    .pipe(jsMinify())
    .pipe(gulp.dest(outFolder + "/js/"));

  var mergeCss = gulp.src([
      "node_modules/material-design-lite/material.min.css",
      "node_modules/ng2-toastr/bundles/ng2-toastr.min.css",
      "node_modules/material-design-lite/material.min.css",
      "styles.css",
    ])
    .pipe(concat("perf.css"))
    .pipe(cssMinify())
    .pipe(gulp.dest(outFolder + "/css/"));

  return merge(mergeJs, mergeCss);
});

gulp.task("cacheBust", function () {
  gulp.src('./../resources/views/layout.blade.php.default')
    .pipe(rename('./../resources/views/layout.blade.php'))
    .pipe(injectString.replace('@cacheBustMe@', new Date().getTime().toString()))
    .pipe(gulp.dest('.'));
});

gulp.task("default", [
  "shims",
  "intls",
  "buildAndMinify",
  "cacheBust",
]);