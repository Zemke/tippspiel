# Tippspiel

This project is basing on two projects: [Zemke/starter-laravel-angular](Zemke/starter-laravel-angular: Laravel and AngularJS…) and [angular/quickstart](https://github.com/angular/quickstart). So you might want to read those two first to know how to set these apps up individually. Th PHP part is everything, but the Angular part is in `_angular`.

## `dist.sh`

This copies the Angular parts in `_angular` into the PHP structure, so that you can use both worlds in one context. This could then be deployed.

## API Endpoint

```sh
cp _angular/app/api-endpoint.ts.default _angular/app/api-endpoint.ts
```

And adjust the variable in `_angular/app/api-endpoint.ts` as you need. Like when you host your backend somewhere else, you would change `/` to `http://localhost:8080/`.