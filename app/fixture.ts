export class Fixture {

  constructor(public _links:Object,
              public id:number,
              public date:Date,
              public status:string,
              public matchday:number,
              public homeTeamName:string,
              public awayTeamName:string,
              public result:FixtureResult) {
  }
}

class FixtureResult {

  constructor(public goalsHomeTeam?:number,
              public goalsAwayTeam?:number) {

  }
}

// "_links": {
//   "self": {
//     "href": "http://api.football-data.org/v1/fixtures/149875"
//   },
//   "soccerseason": {
//     "href": "http://api.football-data.org/v1/soccerseasons/424"
//   },
//   "homeTeam": {
//     "href": "http://api.football-data.org/v1/teams/792"
//   },
//   "awayTeam": {
//     "href": "http://api.football-data.org/v1/teams/805"
//   }
// },
// "date": "2016-06-22T19:00:00Z",
// "status": "TIMED",
// "matchday": 3,
// "homeTeamName": "Sweden",
// "awayTeamName": "Belgium",
// "result": {
//   "goalsHomeTeam": null,
//   "goalsAwayTeam": null
// }