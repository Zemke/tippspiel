cd _angular
npm install
npm run-script tsc

cd ../

rm -r public/node_modules
cp -r _angular/node_modules public/node_modules

rm -r public/i18n
cp -r _angular/i18n/ public/i18n

cp _angular/styles.css public/
cp _angular/systemjs.config.js public/
cp _angular/text.js public/
cp _angular/powered-pi.svg public/
cp _angular/grassy.jpg` public/

mkdir -p public/app
cp _angular/app/*.js public/app/
cp _angular/app/*.html public/app/

mkdir -p resources/views
cp _angular/index.html resources/views/layout.blade.php

echo "Done."
