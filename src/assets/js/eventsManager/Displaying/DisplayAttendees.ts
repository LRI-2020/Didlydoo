import {ExtendedEvent} from "../../classes/didlydooEvents.ts";
import {GetAttendeesNames, GetAvailabilityForDate} from "../Crud/GetEvents.ts";
import {AvailibityHtmlStruc, NameHtmlStruc} from "../../HtmlManager/createHtmlElement.ts";



export function DisplayAttendees(event: ExtendedEvent, tableBodyEl: HTMLTableElement) {

    let dates: Date[] = event.dates.map(i => i.date);
    let attendeesNames = GetAttendeesNames(event);

    for (let name of attendeesNames) {
        
        let attendeeEl = NameHtmlStruc(name, true);

        for(let date of dates){
            
            let availabilityEl = DisplayAvailability(date,name,event);

            attendeeEl.appendChild(availabilityEl);
        }

        tableBodyEl.appendChild(attendeeEl);

    }

}


function SetAvailability(availabilityEl: HTMLTableCellElement, available: undefined | boolean) {

    let select = availabilityEl.querySelector("select")!;
    //ToDo enum here
    switch(available){
        case true: select.value="true";
            break;
        case false:select.value="false";
            break;
        case undefined:
        case null:select.value="null";
            break;
    }
    
    return availabilityEl;
    
}

function DisplayAvailability(date:Date, name:string, event:ExtendedEvent){
    
    let availabilityEl = AvailibityHtmlStruc(date,name,event.id);
    let available = GetAvailabilityForDate(date,name, event);
    SetAvailability(availabilityEl, available);   
   
    return availabilityEl;
}
