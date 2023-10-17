import {ExtendedEvent} from "../../classes/didlydooEvents.ts";
import {AvailibityHtmlStruc, NameHtmlStruc} from "../../HtmlManager/createHtmlElement.ts";
import {eventsHost} from "../../appConfig.js.ts";
import {ExtendedSlot} from "../../classes/slot.ts";
import {formatDay, formatMonth} from "../../helpers.ts";


export function DisplayAddAttendeeForm(event: ExtendedEvent) {

    let tableBodyEl = document.getElementById(event.id)!.querySelector(".tableBody")!;
    let nameEl = NameHtmlStruc("", false);

    for (let date of event.dates) {

        let availabilityEl = AvailibityHtmlStruc(date.date,"", event.id);
        nameEl.appendChild(availabilityEl);
    }

    tableBodyEl.appendChild(nameEl);
    return nameEl;

}
export async function CreateAttendee(eventId: string, eventDates: ExtendedSlot[], newAttendeeEl: HTMLTableRowElement) {

    let nameInput: HTMLInputElement = newAttendeeEl.querySelector(".attendeeNameInput")!;
    let bodyRequest =
        {
            name: nameInput.value,
            dates: createDatesForAttendee(eventId,eventDates, newAttendeeEl)
        };

    const httpHeaders = {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Host": "localhost:3000",
        "Accept-Encoding": "gzip, deflate, br"
    };
    const myHeaders = new Headers(httpHeaders);

    let url = `${eventsHost}${eventId}/attend`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(bodyRequest),
        headers: myHeaders
    }).then(res => res.json())
        .then(data => data.id)
        .catch(e => console.log(e.message));

}

function createDatesForAttendee(eventId:string,slots: ExtendedSlot[], newAttendeeEl: HTMLTableRowElement) {
    let datesForAttendee: any[] = [];
    slots.forEach(s => {
        let dateForAttendee = CreateDateForAttendee(eventId,s.date, newAttendeeEl);
        if (dateForAttendee !== null && dateForAttendee !== undefined)
            datesForAttendee.push(dateForAttendee);
    });

    return datesForAttendee;
}
function CreateDateForAttendee(eventId:string, d: Date, newAttendeeEl: HTMLTableRowElement) {
    let selectId = `availability_${eventId}__${d.getTime()}`;
    let availableOpt: HTMLSelectElement = newAttendeeEl.querySelector("select#" + CSS.escape(selectId))!;
    let formattedDate = `${d.getFullYear()}-${formatMonth(d.getMonth())}-${formatDay(d.getDate())}`;
    switch (availableOpt.value) {
        case"true":
            return {
                date: formattedDate,
                available: true
            }
        case"false":
            return {
                date: formattedDate,
                available: false
            }
    }
}

