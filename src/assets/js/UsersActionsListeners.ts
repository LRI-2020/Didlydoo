// @ts-ignore

import {CreateEvent, formatDay, formatMonth} from "./eventsManager/EventCreation.ts";
import {GetAllEvents} from "./eventsManager/GetEvents.ts";
import {ExtendedEvent} from "./classes/didlydooEvents.ts";

let createEventBtn: HTMLButtonElement = document.querySelector(".addEvent")!;
let createEventForm: HTMLFormElement = document.querySelector(".createEvent")!;

let dateList: HTMLFieldSetElement = document.querySelector(".datesList")!;
let addDate: HTMLButtonElement = document.querySelector((".addDate"))!;


export function SetAllListeners() {

    AddAnEventListener(createEventBtn, createEventForm);
    AddDateInputListener(addDate, dateList);
    CreateEventListener(createEventForm);
}

function AddAnEventListener(addEventBtn: HTMLButtonElement, form: HTMLFormElement) {
    addEventBtn.addEventListener('click', function () {

        form.classList.remove("d-none");

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

export function SaveAttendeeListener(eventId: string) {
    let eventCard: HTMLDivElement = document.getElementById(eventId)!;
    let saveAttendeeBtn: HTMLButtonElement = eventCard
        .querySelector(".card-footer")!
        .querySelector(`.attendeesList`)!
        .querySelector(`.saveAttendeesBtn`)!;

    saveAttendeeBtn.addEventListener('click', function () {
        let attendeesNameInput: NodeListOf<HTMLInputElement> = eventCard.querySelector("fieldset.eventAttendee")!
            .querySelector(".eventAttendeeInput")!;
        let attendeesNames:string[]=[];
        attendeesNameInput.forEach(input => attendeesNames.push(input.value));
        
    })
}


function DisplayAddAttendeeForm(event:ExtendedEvent, addAttendeeForm:HTMLFormElement) {
    addAttendeeForm.classList.remove("d-none");
    let eventNameEl : HTMLSpanElement = addAttendeeForm.querySelector("span.addAttendeeForm__EventName")!;
    eventNameEl.innerText = event.name;
    
    let dateTemp = `
            <span class="addAttendeeDateText">01/01/2022</span>
            <label for="<available_TimeStamp>">available : </label>
            <input type="checkbox" class="available" id="<available_TimeStamp>">
            <label for="<notAvailable_TimeStamp>">not available : </label>
            <input type="checkbox" id="<notAvailable_TimeStamp>" class="notAvailable">`;
    
    for(let slot of event.dates){
        
        let addAttendeesDateEL = document.createElement("div");
        addAttendeesDateEL.classList.add("form-group","addAttendeesDate","d-flex","flex-row","justify-content-around","align-items-center","text-center")
        addAttendeesDateEL.setAttribute("id",`${slot.date.getTime()}`);
        addAttendeesDateEL.innerHTML=dateTemp;
        
        let dateTextEl :HTMLSpanElement = addAttendeesDateEL.querySelector(".addAttendeeDateText")!;
        dateTextEl.innerText = `${slot.date.getFullYear()}-${formatMonth(slot.date.getMonth())}-${formatDay(slot.date.getDate())}`;
        
        let availableInput : HTMLInputElement = addAttendeesDateEL.querySelector("input.available")!;
        availableInput.setAttribute("id",`available_${slot.date.getTime()}`);        
        
        let notAvailableInput : HTMLInputElement = addAttendeesDateEL.querySelector("input.notAvailable")!;
        notAvailableInput.setAttribute("id",`notAvailable_${slot.date.getTime()}`);
        addAttendeeForm.appendChild(addAttendeesDateEL);
        
    }

}

export function AddAttendeesListener(event:ExtendedEvent) {
    let addAttendeeBtn: HTMLButtonElement = document.getElementById(event.id)!.querySelector(".card-footer")!
        .querySelector(".addAttendeesBtn")!;
    let addAttendeeForm: HTMLFormElement = document.querySelector(".addAttendeeForm")!;

    addAttendeeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        
        DisplayAddAttendeeForm(event,addAttendeeForm)

    });


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
        let createdEvent: Number = await CreateEvent(name, author, description, dates);
        createEventForm.classList.add("d-none");

        //reload all events with the new one
        await GetAllEvents();

    });

}

















