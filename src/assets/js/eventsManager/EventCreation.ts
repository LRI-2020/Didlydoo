import {eventsHost} from "../appConfig.js.ts";


export function formatMonth(month: number):string {

    return month<9 ? `0${month + 1}` : `${month + 1}`;
}

export function formatDay(day:number):string{
    return day<10 ? `0${day}`:`${day}`;
}

export async function CreateEvent(name:string,author:string,description:string,dates:Date[]){
    
     let formattedDates : string[]=[];
     
     for(let date of dates){
       
         let res = `${date.getFullYear()}-${formatMonth(date.getMonth())}-${formatDay(date.getDate())}`
         formattedDates.push(res);
     }
     
     let bodyRequest= 
     {
     name: name,
     dates:formattedDates,
     author:author,
     description:description
     };

    const httpHeaders = {
        "Content-Type": "application/json",
    "Accept": "*/*",
"Host":"localhost:3000",
"Accept-Encoding": "gzip, deflate, br"};
    const myHeaders = new Headers(httpHeaders);

    return fetch(eventsHost, {
        method: "POST",
        body: JSON.stringify(bodyRequest),
        headers: myHeaders
    }).then(res => res.json())
        .then(data => data.id)
        .catch(e => console.log(e.message));
     
}