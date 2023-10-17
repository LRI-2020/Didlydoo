import {ExtendedEvent} from "../classes/didlydooEvents.ts";
import {AvailibityHtmlStruc, NameHtmlStruc} from "../HtmlManager/createHtmlElement.ts";

export function DisplayAddAttendeeForm(event:ExtendedEvent) {

    let tableBodyEl = document.getElementById(event.id)!.querySelector(".tableBody")!;
    let nameEl = NameHtmlStruc("",false);

    for(let date of event.dates){

        let availabilityEl = AvailibityHtmlStruc(date.date);
        nameEl.appendChild(availabilityEl);
    }

    tableBodyEl.appendChild(nameEl);
    return nameEl;

}