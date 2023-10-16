﻿import {ExtendedEvent} from "../../classes/didlydooEvents.ts";
import {eventTemp} from "../../htmlTemplates/eventTemp.ts";
import {DisplaySlots} from "./DisplaySlots.ts";
import {DisplayAttendees} from "./DisplayAttendees.ts";

export function DisplayEvents(events: ExtendedEvent[]) {

    for (let event of events){

        createEventCard(event);
    }

}
export function createEventCard(event: ExtendedEvent) {
    let container: HTMLDivElement = document.querySelector(".eventsContainer")!;
    let card = document.createElement('div');
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

