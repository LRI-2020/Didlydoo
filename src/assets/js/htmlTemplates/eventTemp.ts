import {DidlydooEvent} from "../classes/didlydooEvents.ts";

function createEventCard(event: DidlydooEvent) {
    let eventTemp = `        <div class="card didlydooEvent">
            <div class="card-header">
                <h2 class="eventName">Event NAme</h2>
                <h3 class="eventAuthor"> Author name</h3>
                <p class="eventDesc">une longue description d'une veent ou pas</p>
            </div>
            <div class="card-body ">
                <table class="table">
                    <thead>
                    <tr class="DatesList">
                        <th scope="col">#</th>
                        <th scope="col" class="eventDate">01/01/2001</th>
                        <th scope="col" class="eventDate">01/01/2001</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="attendeeInfo">
                        <td class="attendeeName">Mark</td>
                        <td class="attendeeAvailability">ok</td>
                        <td class="attendeeAvailability">ok</td>
                    </tr>
                    <tr class="attendeeInfo">
                        <td class="attendeeName">Mark</td>
                        <td class="attendeeAvailability">ok</td>
                        <td class="attendeeAvailability">ok</td>
                    </tr>
                    <tr class="attendeeInfo">
                        <td class="attendeeName">Mark</td>
                        <td class="attendeeAvailability">ok</td>
                        <td class="attendeeAvailability">ok</td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
`
    let card = document.createElement('div');
    card.classList.add("card", "didlydooEvent");
    card.innerHTML = eventTemp;
    FulfillCard(event, card);
}

function FulfillCard(event: DidlydooEvent, card: HTMLDivElement) {

    let eventNameEl : HTMLParagraphElement = card.querySelector(".eventName")!;
    eventNameEl.innerText = event.name;    
    
    let eventAuthorEl : HTMLParagraphElement = card.querySelector(".eventAuthor")!;
    eventAuthorEl.innerText = event.author;
    
    let eventDescEl : HTMLParagraphElement = card.querySelector(".eventDesc")!;
    if(event.description !== undefined)
        eventDescEl.innerText = event.description;
    
    
}


export {createEventCard}


