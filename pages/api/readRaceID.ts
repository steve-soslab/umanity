import type { NextApiRequest, NextApiResponse } from "next";
import { Tip } from "../../types/tips";
import {UmanityRaceID} from "../../types/race"
import awsExports from "../../src/aws-exports";
import AWS from "aws-sdk";
import { Resolver } from "dns";

AWS.config.update({
    region: awsExports.aws_project_region,
});


/**
 * This API takes a UmanityRaceID structure and returns the structure with the correct ID completed
  eg:
  POST 
      {
      "RaceDate": "20220528",           // YYYYMMDD
      "TrackID": "04010",               // 4 digit track ID
      "RaceNumber": "01",               // 2 digit race Number
      "UmanityID": ""
    }

    returns:
    {
    "RaceDate": "20220528",
    "TrackID": "04010",
    "RaceNumber": "01",
    "UmanityID": "2022052804010701"     // Umanity RaceID
}
 */

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try{
        const url="https://umanity.jp/racedata/race_8.php?code="
        const race: UmanityRaceID = JSON.parse(req.body);    
        const raceids= new Array(10).fill("").map((_,i)=>{ return `${race.RaceDate}${race.TrackID}${i.toString()}${race.RaceNumber}`})

        const promises=[];
        raceids.forEach(r=>{promises.push(fetch(`${url}${r}`))})
        const results =await Promise.all(promises)  
        results.forEach((r,i) =>{
            if(r.status==200){
                race.UmanityID=raceids[i]                
            }
        })        
        if(race.UmanityID){
            res.status(200).json(race)
        }else{
            res.status(404).json("Race Not Found")    
        }    

    }
    catch(e){        
        res.status(404).json(JSON.stringify((e as Error).message))
    }
}
