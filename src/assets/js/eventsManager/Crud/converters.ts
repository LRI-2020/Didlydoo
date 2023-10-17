import {ExtendedSlot, Slot} from "../../classes/slot.ts";
import {DidlydooEvent, ExtendedEvent, RawExtendedEvent} from "../../classes/didlydooEvents.ts";
import {attendee, ExtendedAttendee} from "../../classes/attendee.ts";

export function convertToExtendedEvent(rawEvent: RawExtendedEvent): ExtendedEvent|undefined {

    let slots: ExtendedSlot[]=[];

    for (let date of rawEvent.dates) {
        let currentSlot = convertToSlot(date);

        if (currentSlot !== undefined)
            slots.push(currentSlot);
    }

    return slots? new DidlydooEvent(
            rawEvent.id,
            rawEvent.name,
            rawEvent.author,
            slots,
            new Date(rawEvent["created_at"]),
            Number(rawEvent["num_modification"]),
            new Date(rawEvent["last_modification"]),
            rawEvent.description?rawEvent.description:undefined)
        :undefined;

}
export function convertToSlot(data:any):ExtendedSlot|undefined{
    return data? new Slot(new Date(data.date), data.attendees.map((i:any) => convertToAttendee(i))) :undefined;
}

export function convertToAttendee(data:any):ExtendedAttendee|undefined{
    return data ? new attendee(data.name, data.available !==undefined ? data.available : null) : undefined
}

