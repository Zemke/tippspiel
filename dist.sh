#!/usr/bin/env bash

cd _angular
npm install
npm run-script tsc
gulp

cd ../

rm -r public/i18n
cp -r _angular/i18n/ public/i18n

cp _angular/styles.css public/
cp _angular/powered-pi.svg public/
cp _angular/grassy.jpg public/

mkdir -p public/app
cp _angular/app/*.html public/app/

cp _angular/dist/js/perf.js public/perf.js

echo "Done."
