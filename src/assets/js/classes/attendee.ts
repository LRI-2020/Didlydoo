
export interface ExtendedAttendee{
    name:string,
    available:boolean|undefined
}


export class attendee implements ExtendedAttendee{
    get available(): boolean | undefined {
        return this._available;
    }

    set available(value: boolean | undefined) {
        this._available = value;
    }
    
    constructor(name:string, available?:boolean) {
        this._name=name;
        this._available=available;
    }
   
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    
    private _name:string;
    private _available:boolean|undefined
}
