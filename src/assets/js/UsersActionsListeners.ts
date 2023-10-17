// @ts-ignore

import {CreateEvent, formatDay, formatMonth} from "./eventsManager/Crud/EventCreation.ts";
import {GetAllEvents} from "./eventsManager/Crud/GetEvents.ts";
import {ExtendedEvent} from "./classes/didlydooEvents.ts";
import {CreateAttendee, DisplayAddAttendeeForm} from "./eventsManager/Crud/addAttendee.ts";
import {ExtendedSlot} from "./classes/slot.ts";

let createEventBtn: HTMLButtonElement = document.querySelector(".addEvent")!;
let createEventForm: HTMLFormElement = document.querySelector(".createEvent")!;
//
// let dateList: HTMLFieldSetElement = document.querySelector(".datesList")!;
// let addDate: HTMLButtonElement = document.querySelector((".addDate"))!;


export function SetAllListeners() {

    AddAnEventListener(createEventBtn, createEventForm);
    CreateEventListener(createEventForm);
}

export function AddAttendeesListener(event: ExtendedEvent) {

    let evenCard = document.getElementById(event.id)!;
    let addAttendeeBtn: HTMLButtonElement = evenCard.querySelector(".card-footer")!
        .querySelector(".addAttendeesBtn")!;
    let saveEventBtn: HTMLButtonElement = evenCard.querySelector("button.saveEvent")!;
    let cancelEventBtn: HTMLButtonElement = evenCard.querySelector("button.cancelEventModif")!;

    addAttendeeBtn.addEventListener("click", function (e) {
        e.preventDefault();

        let newAttendeeEl = DisplayAddAttendeeForm(event);
        EnableCancelButton(cancelEventBtn, newAttendeeEl);

        //TODO validation here
        EnableSaveAttendeesButton(event.id,event.dates,saveEventBtn,newAttendeeEl);

    });
}

function AddAnEventListener(addEventBtn: HTMLButtonElement, form: HTMLFormElement) {
    addEventBtn.addEventListener('click', function () {

        form.classList.remove("d-none");

    });
}


function EnableCancelButton(cancelEventBtn: HTMLButtonElement, element: HTMLElement) {
    cancelEventBtn.disabled = false;

    cancelEventBtn.addEventListener('click', function () {
        if (element.parentNode !== null)
            element.parentNode.removeChild(element);
    });
}
function EnableSaveAttendeesButton(eventId:string, eventSlots:ExtendedSlot[],saveEventBtn: HTMLButtonElement, newAttendeeEl: HTMLTableRowElement) {

    saveEventBtn.disabled = false;
    saveEventBtn.addEventListener('click', async function(){
       await CreateAttendee(eventId,eventSlots,newAttendeeEl);
    })
    
}
function CreateEventListener(createForm: HTMLFormElement) {
    createForm.addEventListener("submit", async function () {

        //get all input values
        let nameEl: HTMLInputElement = document.querySelector("#eventName")!;
        let name: string = nameEl.value;
        let authorEl: HTMLInputElement = document.querySelector("#eventAuthor")!;
        let author: string = authorEl.value;
        let descriptionEL: HTMLInputElement = document.querySelector("#eventDescription")!;
        let description: string = descriptionEL.value;
        let dateFields: NodeListOf<HTMLInputElement> = document.getElementsByName("createEventDate")!;
        let dates: Date[] = [];

        for (let dateField of dateFields) {
            dates.push(new Date(dateField.value));
        }

        //create the event
        await CreateEvent(name, author, description, dates);
        createEventForm.classList.add("d-none");

        //reload all events with the new one
        await GetAllEvents();

    });

}

// function AddDateInputListener(addDateButton: HTMLButtonElement, dateList: HTMLFieldSetElement) {
//
//     addDateButton.addEventListener("click", function (e) {
//         e.preventDefault();
//         let input = document.createElement("input");
//         input.setAttribute("type", "date");
//         input.setAttribute("name", "createEventDate");
//         dateList.appendChild(input);
//     });
// }
















