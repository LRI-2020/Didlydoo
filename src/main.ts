import './style.css';

// Import all of Bootstrap's JS
// @ts-ignore
import * as bootstrap from 'bootstrap';
//import {CreateEvent} from "./assets/js/eventsManager/EventCreation.ts";
import {GetAllEvents} from "./assets/js/eventsManager/GetEvents.ts";
import {SetAllListeners} from "./assets/js/UsersActionsListeners.ts";

await GetAllEvents();
SetAllListeners();





