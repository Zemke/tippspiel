# Tippspiel

This project is basing on two projects: [Zemke/starter-laravel-angular](Zemke/starter-laravel-angular: Laravel and AngularJS…) and [angular/quickstart](https://github.com/angular/quickstart). So you might want to read those two first to know how to set these apps up individually. Th PHP part is everything, but the Angular part is in `_angular`.

## `dist.sh`

This copies the Angular parts in `_angular` into the PHP structure, so that you can use both worlds in one context. This could then be deployed.

## API Endpoint

```sh
cp _angular/app/api-endpoint.ts.default _angular/app/api-endpoint.ts
```

And adjust the variable in `_angular/app/api-endpoint.ts` as you need. Like when you host your backend somewhere else, you would change `/` to `http://localhost:8080/`.

## Environment conf

There are  two additional environment variables that you probably don’t know from the default `.env` file.

`FINAL_ROUND_START`: An ISO date string. This is basically the deadline for bets of the tournament champion. When this date is past, users won’t be able to submit bets for the champions of the tournament anymore. Most of the times you’d want that to be the start of the final round of the tournament or even the the first game.

`FINALE_MATCHDAY`: The matchday number of the finale of the tournament as seen on football-data.org. You know the final matchday by going to http://api.football-data.org/v1/soccerseasons/{seasonId} and then there’s the attribute `numberOfMatchdays` which is probably the finale. The information is important to know when the points for the bet of the champion on of the tournament should be added.
