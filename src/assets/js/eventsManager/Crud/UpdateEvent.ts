import {IsNullOrEmpty} from "../../helpers.ts";
import {eventsHost} from "../../appConfig.js.ts";

export async function UpdateEvent(eventId: string, name: string, author: string, description: string) {

    let url = `${eventsHost}${eventId}`;
    let bodyRequest=
        {
            name: name,
            author:author,
            description:description
        };

    const httpHeaders = {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Host":"localhost:3000",
        "Accept-Encoding": "gzip, deflate, br"};
    const myHeaders = new Headers(httpHeaders);

    return fetch(url, {
        method: "PATCH",
        body: JSON.stringify(bodyRequest),
        headers: myHeaders
    }).then(res => res.json())
        .then(data => data.id)
        .catch(e => console.log(e.message));}

export function EventPropValid(name: string, author: string, description: string) {

    return !IsNullOrEmpty(author) && !IsNullOrEmpty(name)&& !IsNullOrEmpty(description)
}