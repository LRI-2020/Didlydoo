import {ExtendedEvent} from "../../classes/didlydooEvents.ts";

export function DisplaySlots(event: ExtendedEvent, eventDatesEl: HTMLTableRowElement) {

    let slots = CreateSlots(event);

    slots.forEach(s => eventDatesEl.appendChild(s));

}
function CreateSlots(event: ExtendedEvent) {

    let res : HTMLTableCellElement[]=[];

    for (let slot of event.dates) {

        let slotElement: HTMLTableCellElement = document.createElement("th");
        slotElement.setAttribute("scope", "col");
        slotElement.classList.add("eventDate");
        slotElement.innerText = slot.date.toDateString();
        res.push(slotElement);
    }

    return res;
}
