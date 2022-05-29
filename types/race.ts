export interface Race {
    UmanityID: string;
    DateString: string;
    RaceNumber: string;
    VenueID: string;
    VenueName: string;
    RaceName: string;
    Runners:  Runner[]
  }

  export interface Runner{
      Position: number;
      Competitor_ID: string;
      Name: string;
      WMODEL: number;
  }
  
  export interface UmanityRaceID{
      RaceDate: string;
      TrackID: string;
      RaceNumber: string;
      UmanityID: string;
  }