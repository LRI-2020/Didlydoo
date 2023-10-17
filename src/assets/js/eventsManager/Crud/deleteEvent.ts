import {eventsHost} from "../../appConfig.js.ts";

export async function DeleteEvent(eventId: string) {

    let url=`${eventsHost}${eventId}`
    return fetch(url, {
        method: "DELETE"
    })
        .then(r => r.json())
        .then((data) => data.json())
             .catch(e => e.message);

}
