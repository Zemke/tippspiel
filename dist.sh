cd _angular
npm install
npm run-script tsc

cd ../

cp -r _angular/node_modules public/node_modules
cp -r _angular/i18n/ public/i18n

cp _angular/styles.css public/
cp _angular/systemjs.config.js public/

mkdir -p public/app
cp _angular/app/*.js public/app/
cp _angular/app/*.html public/app/
