import{attendee} from "./attendee.ts";

export interface ExtendedSlot{
    date: Date,
    attendees:[attendee]|undefined
}

class Slot implements ExtendedSlot{

    constructor(date: Date, attendees?: [attendee]) {
        this._date = date;
        this._attendees = attendees;
    }

    get attendees(): [attendee] | undefined {
        return this._attendees;
    }

    set attendees(value: [attendee]) {
        this._attendees = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    private _date: Date;
    private _attendees: [attendee] | undefined;
}

export{Slot}