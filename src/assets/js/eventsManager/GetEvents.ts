import {ExtendedEvent} from "../classes/didlydooEvents.ts";
import {convertToExtendedEvent} from "./converters.ts";
import {attendee} from "../classes/attendee.ts";
import {DisplayEvents} from "./Displaying/DisplayEvents.ts";

export let apiHost = "http://localHost:3000/api/";
let eventsHots = `${apiHost}events/`;

export async function GetAllEvents(): Promise<ExtendedEvent[]> {

    return fetch(eventsHots)
        .then(r => r.json())
        .then((data) => Array.isArray(data) ? data.map(d => convertToExtendedEvent(d)) : [])
        .then((data) => {

            let events: ExtendedEvent[] = [];
            data.forEach(i => {
                    if (i !== undefined)
                        events.push(i)
                }
            );
            
            DisplayEvents(events)
        })
        .catch(e => e.message);
}

export function GetAvailabilityForDate(date: Date, name: string, event: ExtendedEvent) {

    let slot = event.dates !==undefined? event.dates.find(d => d.date===date) : undefined;
    let attendee = slot !==undefined && slot.attendees !==undefined? slot.attendees.find(a => a.name === name) : undefined;
    let availability = attendee!== undefined? attendee.available : undefined;

    return   availability!==undefined && availability!== null? availability.toString() : "null";

}


export function GetAttendeesNames(event: ExtendedEvent): string[] {

    let attendees: attendee[] = [];

    for (let date of event.dates) {

        if (date.attendees !== undefined) {
            for (let attendee of date.attendees)
                if (attendee != undefined)
                    attendees.push(attendee)
        }

    }

    return [...new Set(attendees.map(a => a.name))]

}


