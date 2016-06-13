/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 * Override at the last minute with global.filterSystemConfig (as plunkers do)
 */
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    'rxjs':                       'node_modules/rxjs',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    '@angular':                   'node_modules/@angular',
    'ng2-translate':              'node_modules/ng2-translate',
    'angular2-jwt':               'node_modules/angular2-jwt',
    'ng2-toastr':                 'node_modules/ng2-toastr',
    'text':                       'text.js',
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/testing',
    '@angular/upgrade',
    'ng2-translate',
    'angular2-jwt',
    'ng2-toastr',
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

  // Cache Busting 
  var systemLocate = System.locate;
  System.locate = function (load) {
    var System = this; // its good to ensure exact instance-binding
    return Promise.resolve(systemLocate.call(this, load)).then(function (address) {

      if (address.endsWith('.html.js')) {
        //This feels a little hacky, not sure how to allow html files in the main config.
        address = address.slice(0, -3);
      }

      return address + System.cacheBust;
    });
  };
  System.cacheBust = '?v=1.2.1';

})(this);
