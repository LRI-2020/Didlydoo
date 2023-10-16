// @ts-ignore

import {CreateEvent} from "./eventsManager/EventCreation.ts";

let addEvent = document.querySelector(".addEvent")!;
let createEventForm: HTMLFormElement = document.querySelector(".createEvent")!;

let dateList: HTMLFieldSetElement = document.querySelector(".datesList")!;
let addDate = document.querySelector((".addDate"))!;


let attendeesList: HTMLFieldSetElement = document.querySelector(".attendeesList")!;
let addAttendee = document.querySelector((".addAttendee"))!;

export function SetAllListeners() {
    addEvent.addEventListener('click', function () {

        createEventForm.classList.remove("d-none");

    });

    addDate.addEventListener("click", function (e) {
        e.preventDefault();
        let input = document.createElement("input");
        input.setAttribute("type", "date");
        input.setAttribute("name", "createEventDate");
        dateList.appendChild(input);
    });

    addAttendee.addEventListener("click", function (e) {
        e.preventDefault();
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "eventAttendee");
        attendeesList.appendChild(input);
    });

    createEventForm.addEventListener("submit", function () {
        let nameEl : HTMLInputElement = document.querySelector("#eventName")!;
        let name: string = nameEl.value;
        let authorEl: HTMLInputElement = document.querySelector("#eventAuthor")!;
        let author: string = authorEl.value;
        let descriptionEL: HTMLInputElement = document.querySelector("#eventDescription")!;
        let description: string = descriptionEL.value;
        let dateFields: HTMLInputElement[] = document.getElementsByName("createEventDate")!;
        let dates: Date[] = [];
        for (let dateField of dateFields) {
            dates.push(new Date(dateField.value));
        }
        CreateEvent(name, author, description, dates)
    });
}















