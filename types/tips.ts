export interface Tip {
  UUID: number;
  RaceID: string;
  formula: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  method: 1 | 2 | 3;
  banker: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  multi: 0 | 1;
  First: string;
  FirstComment: string;
  FirstName: string;
  Second: string;
  SecondName: string;
  SecondComment: string;
  Third: string;
  ThirdName: string;
  ThirdComment: string;
  comments: string;
  amount: number;
  confirmationFlag: number;
  tipOfTheDay: number;
  ok: string[];
  good: string[];
  sub: string;
}
