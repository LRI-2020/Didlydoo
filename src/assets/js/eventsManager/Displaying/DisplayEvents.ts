import {ExtendedEvent} from "../../classes/didlydooEvents.ts";
import {eventTemp} from "../../HtmlManager/templates.ts";
import {DisplaySlots} from "./DisplaySlots.ts";
import {DisplayAttendees} from "./DisplayAttendees.ts";
import {AddAttendeesListener, CancelButtonListener, EditAnEventListener, SaveAttendeesListener, SaveEventListener} from "../../UsersActionsListeners.ts";

export function DisplayEvents(events: ExtendedEvent[]) {

    let container: HTMLDivElement = document.querySelector(".eventsContainer")!;
    container.innerHTML="";

    for (let event of events){

        createEventCard(event);
        //add Listener for attendee and dates
        AddAttendeesListener(event);
        SaveAttendeesListener(event);
        CancelButtonListener(event);
        EditAnEventListener(event);
        SaveEventListener(event);
    }

}
export function createEventCard(event: ExtendedEvent) {
    let container: HTMLDivElement = document.querySelector(".eventsContainer")!;
    let card = document.createElement('div');
    card.setAttribute("id",event.id);
    card.classList.add("card", "didlydooEvent");
    card.innerHTML = eventTemp;
    FulfillCard(event, card);
    container.appendChild(card);

}

function FulfillCard(event: ExtendedEvent, card: HTMLDivElement) {

    let eventNameEl: HTMLParagraphElement = card.querySelector(".eventName")!;
    eventNameEl.innerText = event.name;

    let eventAuthorEl: HTMLParagraphElement = card.querySelector(".eventAuthor")!;
    eventAuthorEl.innerText = event.author;

    let eventDescEl: HTMLParagraphElement = card.querySelector(".eventDesc")!;
    if (event.description !== undefined)
        eventDescEl.innerText = event.description;

    let eventDatesEl: HTMLTableRowElement = card.querySelector(".DatesList")!;
    let tableBodyEl: HTMLTableElement = card.querySelector(".tableBody")!;


    DisplaySlots(event,eventDatesEl);

    DisplayAttendees(event,tableBodyEl);


}


