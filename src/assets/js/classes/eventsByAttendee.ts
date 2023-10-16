// import {ExtendedAttendee} from "./attendee.ts";
// import {convertToExtendedEvent} from "../eventsManager/converters.ts";
// import {ExtendedEvent} from "./didlydooEvents.ts";
// import {apiHost, DisplayEvents} from "../eventsManager/eventsManager.ts";
//
// export interface RawEventsByAttendee {
//     name: string,
//     events: string,
// }
//
// export interface RawEventForAttendee {
//     id: string,
//     dates: string[]
// }
//
// export class DateByAttendee {
//     get available(): boolean {
//         return this._available;
//     }
//
//     set available(value: boolean) {
//         this._available = value;
//     }
//
//     get date(): Date {
//         return this._date;
//     }
//
//     set date(value: Date) {
//         this._date = value;
//     }
//
//     private _date: Date
// ,
//     private _available: boolean
//
//     constructor(date: Date, available: boolean) {
//         this._date = date;
//         this._available = available;
//     }
// }
//
// export interface ExtendedEventForAttendee {
//
//     id: string,
//     dates: DateByAttendee[]
// }
//
// class EventForAttendee implements ExtendedEventForAttendee {
//     get id(): string {
//         return this._id;
//     }
//
//     set id(value: string) {
//         this._id = value;
//     }
//
//     get dates(): DateByAttendee[] {
//         return this._dates;
//     }
//
//     set dates(value: DateByAttendee[]) {
//         this._dates = value;
//     }
//
//     private _dates: DateByAttendee[];
//     private _id: string;
//
//     constructor(id: string, dates: DateByAttendee[]) {
//         this._id = id;
//         this._dates = dates;
//     }
// }
//
// export interface ExtendedEventsByAttendee {
//     name: string,
//     events: ExtendedEventForAttendee[]
// }
//
// class EventsByAttendee implements ExtendedEventsByAttendee {
//     get name(): string {
//         return this._name;
//     }
//
//     set name(value: string) {
//         this._name = value;
//     }
//
//     get events(): ExtendedEventForAttendee[] {
//         return this._events;
//     }
//
//     set events(value: ExtendedEventForAttendee[]) {
//         this._events = value;
//     }
//
//     private _events: ExtendedEventForAttendee[];
//     private _name: string;
//
//     constructor(name: string, events: ExtendedEventForAttendee[]) {
//         this._name = name,
//             this._events = events;
//     }
//
// }
//
// export function convertToExtendedEventsByAttendee(data: any): ExtendedEventsByAttendee | undefined {
//
//     return new EventsByAttendee(data.name, data.events.map((i: any) => ConvertToEventForAttendee(i)))
// }
//
// function ConvertToEventForAttendee(data: any): ExtendedEventForAttendee {
//     return new EventForAttendee(data.id, data.dates.map((d: any) => new DateByAttendee(new Date(d.date), d.available)))
// }
//
// let
//
//     attendeesHost = `${apiHost}attendees/`;
//
// export async function GetAttendeesNameForEvent(eventId: number): string[] {
//
//     let allEventsByAttendees = GetAllEventsByAttendee();
//
//
//     for (let attendee of allEventsByAttendees) {
//
//
//     }
//     return attendees
// }
//
// export async function GetAllEventsByAttendee(): Promise<ExtendedEventsByAttendee[]> {
//
//     return fetch(attendeesHost)
//         .then(r => r.json())
//         .then((data) => Array.isArray(data) ? data.map(d => convertToExtendedEventsByAttendee(d)) : [])
//         .then((data) => {
//
//             let res: ExtendedEventsByAttendee[] = [];
//             data.forEach(i => {
//                     if (i !== undefined)
//                         res.push(i)
//                 }
//             );
//           
//           
//         })
//         .catch(e => e.message);
//
// }
//
//
