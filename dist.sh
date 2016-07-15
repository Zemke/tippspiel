#!/usr/bin/env bash

cd _angular
npm install
npm run-script tsc
gulp

cd ../

rm -r public/node_modules
cp -r _angular/node_modules public/node_modules

rm -r public/i18n
cp -r _angular/i18n/ public/i18n

cp _angular/styles.css public/
cp _angular/text.js public/
cp _angular/powered-pi.svg public/
cp _angular/grassy.jpg public/

mkdir -p public/app
cp _angular/app/*.html public/app/

cp _angular/dist/js/bundle.js public/bundle.js
cp _angular/dist/js/shims.js public/shims.js

echo "Done."
