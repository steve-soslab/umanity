export interface Tip {
    UUID: number;
    RaceID: String;
    formula: 1 | 2 | 3 | 4 | 5 | 6 | 7 |8;
    method: 1 | 2| 3;
    nagoshi: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |8;
    multi: 0 | 1;
    First: String;
    Second: String;
    Third: String;
    amount: number;
}