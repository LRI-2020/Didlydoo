
export let eventTemp = `        
            <div class="card-header d-flex flex-row justify-content-between">
            <div> 
            <h2 class="eventName editableEventProp" contenteditable="false"></h2>
            <h5 class="eventAuthor editableEventProp" contenteditable="false"></h5>
            <p class="eventDesc editableEventProp" contenteditable="false"></p>
            </div>
            <div class="d-flex flex-column">
            <button class="btn btn-secondary my-1 editEventBtn align-self-center">Edit</button>
            <button class="btn btn-secondary my-1 saveEventBtn align-self-center d-none">Save</button>
            <button class="btn btn-secondary my-1 deleteEventBtn align-self-center">Delete</button>
            </div>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                    <tr class="DatesList">
                        <th scope="col">#</th>
                    </tr>
                    </thead>
                    <tbody class="tableBody">
                    </tbody>
                </table>
            </div>
            <div class="card-footer">
            <button class="btn btn-secondary addAttendeesBtn">Add Attendees</button>
            <button class="btn btn-secondary addDatesBtn">Add Dates</button>
            <button class="btn btn-secondary saveAttendees" disabled>Save Attendees</button>
            <button class="btn btn-secondary cancelEventModif" disabled>Cancel</button>
            </div>`



