export class User {

  constructor(public id:number,
              public first_name:string,
              public last_name:string,
              public email:string,
              public password:string,
              public created_at:string,
              public updated_at:string) {
  }
}