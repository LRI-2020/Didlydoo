import {ExtendedEvent} from "../classes/didlydooEvents.ts";
import {convertToExtendedEvent} from "./converters.ts";

let apiHost="http://localHost:3000/api/";
let eventsHots=`${apiHost}events/`;

export async function GetAllEvents():Promise<ExtendedEvent[]>{
    
   return fetch(eventsHots)
       .then(r => r.json())
       .then((data) => Array.isArray(data)? data.map(d => convertToExtendedEvent(d)):undefined)
       .catch(e => e.message);
}
