import {ExtendedEvent} from "../classes/didlydooEvents.ts";

export function NameHtmlStruc(name: string, readOnly:boolean) {

    let attendeeEl: HTMLTableRowElement = document.createElement("tr")!;
    attendeeEl.classList.add("attendeeInfo");

    let nameEl: HTMLTableCellElement = document.createElement("td")!;
    nameEl.classList.add("attendeeName");
    let nameInput = document.createElement("input");
    nameInput.classList.add("attendeeNameInput");
    nameInput.setAttribute("type","text");
    nameInput.required=true;
    nameInput.value = name;
    nameInput.readOnly = readOnly;    
    nameEl.appendChild(nameInput);    
    attendeeEl.appendChild(nameEl);

    return attendeeEl;
}

export function AvailibityHtmlStruc(date: Date) {
    let availabilityEl:HTMLTableCellElement = document.createElement("td")!;
    availabilityEl.classList.add("attendeeAvailability");

    let select = document.createElement("select");
    select.setAttribute("id",`availability_${date.getTime()}`);

    let availableOpt = document.createElement("option");
    availableOpt.setAttribute("value","true");
    availableOpt.innerText="Available";
    let notAvailableOpt = document.createElement("option");
    notAvailableOpt.setAttribute("value","false")
    notAvailableOpt.innerText="Not available";
    let notAnsweredOpt = document.createElement("option");
    notAnsweredOpt.setAttribute("value","null");
    notAnsweredOpt.innerText="Don't know yet";

    select.append(availableOpt,notAvailableOpt,notAnsweredOpt);
    availabilityEl.appendChild(select);

    return availabilityEl;
}

export function CreateSlotsElements(event: ExtendedEvent) {

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