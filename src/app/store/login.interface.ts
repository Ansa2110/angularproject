export interface User {
    id?: number;
    login: string;
    password: string;
    name:string;
    surname:string;
    age:string;
    phonenumber:string;
    email: string;
  }
export interface AppliedUser
{
  id: number;
  name:string;
  surname:string;
  age:string;
  phonenumber:string;
  email: string;
}
export interface SuggestedEvent {
  id?: number;
  eventname: string;
  date: Date;
  location: string;
  description: string;
  typeevent: string;
  deadline: Date;
  photourl: string;
  email: string;
}
export interface Participant {
  name: string;
  surname: string;
  age: string;
  phonenumber: string;
  email: string;
  status: string;
}

export interface StartupEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  type: string;
  deadline: string;
  participants: Participant[];
  photourl: string;
}