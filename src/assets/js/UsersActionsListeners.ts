// @ts-ignore

import {CreateEvent, formatDay, formatMonth} from "./eventsManager/Crud/EventCreation.ts";
import {GetAllEvents} from "./eventsManager/Crud/GetEvents.ts";
import {ExtendedEvent} from "./classes/didlydooEvents.ts";
import {CreateAttendee, DisplayAddAttendeeForm} from "./eventsManager/Crud/addAttendee.ts";
import {EventPropValid, UpdateEvent} from "./eventsManager/Crud/UpdateEvent.ts";
import {DeleteEvent} from "./eventsManager/Crud/deleteEvent.ts";

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
        cancelEventBtn.classList.remove("d-none");
        saveAttendeesBtn.classList.remove("d-none");
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

        saveAttendeeBtn.classList.add("d-none");
        cancelBtn.classList.add("d-none");
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

        saveAttendeeBtn.classList.add("d-none");
        cancelBtn.classList.add("d-none");      
       
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

export function EditAnEventListener(event:ExtendedEvent){
    
    let evenCard = document.getElementById(event.id)!;
    let editEventBtn: HTMLButtonElement = evenCard.querySelector(".editEventBtn")!;
    let saveEventBtn: HTMLButtonElement = evenCard.querySelector(".saveEventBtn")!;

    editEventBtn.addEventListener('click',function(){
        editEventBtn.classList.add("d-none");
        saveEventBtn.classList.remove("d-none");
        let eventCard = document.getElementById(event.id)!;
        let editableElements:NodeListOf<HTMLElement> = eventCard.querySelectorAll(".card-header .editableEventProp")!;
        MakeFieldsEditable(editableElements);

    })
}
export function MakeFieldsEditable(editableElements:NodeListOf<HTMLElement>) {
    
    editableElements.forEach(el => {
        el.contentEditable="true";
    })
}
export function SaveEventListener(event:ExtendedEvent){
    let eventCard = document.getElementById(event.id)!;
    let editEventBtn: HTMLButtonElement = eventCard.querySelector(".editEventBtn")!;
    let saveEventBtn:HTMLButtonElement = eventCard.querySelector(".saveEventBtn")!;
    
    saveEventBtn.addEventListener('click',async function(){
        
        let newName:HTMLElement = eventCard.querySelector(".eventName.editableEventProp")!;
        let newAuthor:HTMLElement = eventCard.querySelector(".eventAuthor.editableEventProp")!;
        let newDescription:HTMLElement = eventCard.querySelector(".eventDesc.editableEventProp")!;
        
        if (EventPropValid(newName.innerText,newAuthor.innerText,newDescription.innerText)){
            
            await UpdateEvent(event.id,newName.innerText,newAuthor.innerText,newDescription.innerText);
        }

        editEventBtn.classList.remove("d-none");
        saveEventBtn.classList.add("d-none");
        await GetAllEvents();        
        
    })
    
}
export function DeleteEventListener(event:ExtendedEvent){
    let eventCard = document.getElementById(event.id)!;
    let deleteBtn = eventCard.querySelector("button.deleteEventBtn")!;
    
    deleteBtn.addEventListener('click',async function(){
        await DeleteEvent(event.id);
        await GetAllEvents();
    })
}


















