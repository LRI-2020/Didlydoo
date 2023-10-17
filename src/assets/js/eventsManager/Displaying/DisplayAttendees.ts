import {ExtendedEvent} from "../../classes/didlydooEvents.ts";
import {GetAttendeesNames, GetAvailabilityForDate} from "../GetEvents.ts";

export function DisplayAttendees(event: ExtendedEvent, tableBodyEl: HTMLTableElement) {

    let dates: Date[] = event.dates.map(i => i.date);
    let attendeesNames = GetAttendeesNames(event);

    for (let name of attendeesNames) {

        let attendeeEl: HTMLTableRowElement = document.createElement("tr")!;
        attendeeEl.classList.add("attendeeInfo");

        let nameEl: HTMLTableCellElement = document.createElement("td")!;
        nameEl.classList.add("attendeeName")
        nameEl.innerText = name;
        attendeeEl.appendChild(nameEl);

        for(let date of dates){
            
            let availabilityEl = DisplayAvailability(date,name,event);

            attendeeEl.appendChild(availabilityEl);
        }

        tableBodyEl.appendChild(attendeeEl);

    }

}

function AvailibityHtmlStruc(date: Date) {
    let availabilityEl:HTMLTableCellElement = document.createElement("td")!;
    availabilityEl.classList.add("attendeeAvailability");

    let select = document.createElement("select");
    select.setAttribute("id",`availability_${date.getTime()}`);

    let availableOpt = document.createElement("option");
    availableOpt.setAttribute("value","available");
    availableOpt.innerText="Available";
    let notAvailableOpt = document.createElement("option");
    notAvailableOpt.setAttribute("value","notAvailable")
    notAvailableOpt.innerText="Not available";
    let notAnsweredOpt = document.createElement("option");
    notAnsweredOpt.setAttribute("value","Don't know yet");
    notAnsweredOpt.innerText="Don't know yet";

    select.append(availableOpt,notAvailableOpt,notAnsweredOpt);
    availabilityEl.appendChild(select);

    return availabilityEl;
}

function SetAvailability(availabilityEl: HTMLTableCellElement, available: undefined | boolean) {

    let select = availabilityEl.querySelector("select")!;
    //ToDo enum here
    switch(available){
        case true: select.value="available";
            break;
        case false:select.value="notAvailable";
            break;
        case undefined:
        case null:select.value="Don't know yet";
            break;
    }
    
    return availabilityEl;
    
}

function DisplayAvailability(date:Date, name:string, event:ExtendedEvent){
    
    let availabilityEl = AvailibityHtmlStruc(date);
    let available = GetAvailabilityForDate(date,name, event);
    SetAvailability(availabilityEl, available);   

    
    return availabilityEl;
}
