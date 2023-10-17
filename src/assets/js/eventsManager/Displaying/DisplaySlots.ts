import {ExtendedEvent} from "../../classes/didlydooEvents.ts";
import {CreateSlotsElements} from "../../HtmlManager/createHtmlElement.ts";

export function DisplaySlots(event: ExtendedEvent, eventDatesEl: HTMLTableRowElement) {

    let slots = CreateSlotsElements(event);

    slots.forEach(s => eventDatesEl.appendChild(s));

}

