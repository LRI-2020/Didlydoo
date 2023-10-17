// @ts-ignore

import {CreateEvent, formatDay, formatMonth} from "./eventsManager/Crud/EventCreation.ts";
import {GetAllEvents} from "./eventsManager/Crud/GetEvents.ts";
import {ExtendedEvent} from "./classes/didlydooEvents.ts";
import {CreateAttendee, DisplayAddAttendeeForm} from "./eventsManager/Crud/addAttendee.ts";

let createEventBtn: HTMLButtonElement = document.querySelector(".addEvent")!;
let createEventForm: HTMLFormElement = document.querySelector(".createEvent")!;

let dateList: HTMLFieldSetElement = document.querySelector(".datesList")!;
let addDate: HTMLButtonElement = document.querySelector((".addDate"))!;


export function SetAllListeners() {

    AddAnEventListener(createEventBtn, createEventForm);
    CreateEventListener(createEventForm);
    AddDateInputListener(addDate,dateList);
}

export function AddAttendeesListener(event: ExtendedEvent) {

    let evenCard = document.getElementById(event.id)!;
    let addAttendeeBtn: HTMLButtonElement = evenCard.querySelector(".card-footer")!
        .querySelector(".addAttendeesBtn")!;
    let saveAttendeesBtn: HTMLButtonElement = evenCard.querySelector("button.saveAttendees")!;
    let cancelEventBtn: HTMLButtonElement = evenCard.querySelector("button.cancelEventModif")!;

    addAttendeeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        DisplayAddAttendeeForm(event);
        cancelEventBtn.disabled=false;
        saveAttendeesBtn.disabled = false;
    });
}
function AddAnEventListener(addEventBtn: HTMLButtonElement, form: HTMLFormElement) {
    addEventBtn.addEventListener('click', function () {

        form.classList.remove("d-none");

    });
}
export function CancelButtonListener(event:ExtendedEvent) {
    let evenCard = document.getElementById(event.id)!;
    let cancelBtn:HTMLButtonElement = evenCard.querySelector("button.cancelEventModif")!;
    let saveAttendeeBtn: HTMLButtonElement = evenCard.querySelector(".saveAttendees")!;

    cancelBtn.addEventListener('click', function () {
        let elementsToCancel = evenCard.querySelectorAll("[editing='true']");
        
        if(elementsToCancel!==null && elementsToCancel!==undefined && elementsToCancel.length>0){
            elementsToCancel.forEach(element => {
                if (element.parentNode !== null)
                    element.parentNode.removeChild(element);
            })
        }

        saveAttendeeBtn.disabled=true;
        cancelBtn.disabled=true;
    });
}
export function SaveAttendeesListener(event:ExtendedEvent) {
    // @ts-ignore
    let evenCard:HTMLDivElement = document.getElementById(event.id)!;
    let saveAttendeeBtn: HTMLButtonElement = evenCard.querySelector(".saveAttendees")!;
    let cancelBtn: HTMLButtonElement = evenCard.querySelector(".cancelEventModif")!;
    
    saveAttendeeBtn.addEventListener('click', async function(){
        let newAttendeesElements: NodeListOf<HTMLTableRowElement> = evenCard.querySelectorAll(".attendeeInfo[editing='true']");
       
        if(newAttendeesElements!==null && newAttendeesElements.length>0){
            
            for (const attendee of newAttendeesElements) {
                await CreateAttendee(event.id,event.dates,attendee);
                attendee.setAttribute("editing","false");
            }
        }

        saveAttendeeBtn.disabled=true;
        cancelBtn.disabled=true;
        
       
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
        // @ts-ignore
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

function AddDateInputListener(addDateButton: HTMLButtonElement, dateList: HTMLFieldSetElement) {

    addDateButton.addEventListener("click", function (e) {
        e.preventDefault();
        let input = document.createElement("input");
        input.setAttribute("type", "date");
        input.setAttribute("name", "createEventDate");
        dateList.appendChild(input);
    });
}
















