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
            let availabilityEl:HTMLTableCellElement = document.createElement("td")!;
            availabilityEl.classList.add("attendeeAvailability");
            availabilityEl.innerText = GetAvailabilityForDate(date, name, event);

            attendeeEl.appendChild(availabilityEl);
        }

        tableBodyEl.appendChild(attendeeEl);

    }

}
