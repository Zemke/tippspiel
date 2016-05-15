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