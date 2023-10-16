import {ExtendedSlot} from "./slot.ts";

export interface RawExtendedEvent {
    id: string;
    name: string;
    author: string;
    dates: string;
    created_at:string;    
    num_modification:string;
    last_modification:string;
    description: string | undefined;
}

export interface ExtendedEvent {
    id: string,
    name: string,
    description: string | undefined,
    author: string,
    dates: ExtendedSlot[],
    createdAt: Date,
    numModification: number,
    lastModification: Date
}


export class DidlydooEvent implements ExtendedEvent {
    
    private readonly _id: string;
    private _name: string;
    private _author: string;
    private _dates: ExtendedSlot[];
    private _description: string | undefined;
    private _createdAt: Date;
    private _numModification: number;
    private _lastModification: Date;


    constructor(id: string, name: string, author: string, dates: ExtendedSlot[], createdAt:Date, numModification: number, lastModification:Date, description?: string) {
        this._id = id;
        this._name = name;
        this._author = author;
        this._dates = dates;
        this._createdAt= createdAt;
        this._numModification= numModification;
        this._lastModification = lastModification;
        this._description = description;
    }

    get lastModification(): Date {
        return this._lastModification;
    }

    set lastModification(value: Date) {
        this._lastModification = value;
    }
    get numModification(): number {
        return this._numModification;
    }

    set numModification(value: number) {
        this._numModification = value;
    }
    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get description(): string | undefined {
        return this._description;
    }

    set description(value: string | undefined) {
        this._description = value;
    }

    get dates(): ExtendedSlot[] {
        return this._dates;
    }

    set dates(value: ExtendedSlot[]) {
        this._dates = value;
    }

    get author(): string {
        return this._author;
    }

    set author(value: string) {
        this._author = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get id(): string {
        return this._id;
    }


}

