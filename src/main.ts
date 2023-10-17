import './style.css';

// Import all of Bootstrap's JS
import {GetAllEvents} from "./assets/js/eventsManager/Crud/GetEvents.ts";
import {SetAllListeners} from "./assets/js/UsersActionsListeners.ts";

await GetAllEvents();
SetAllListeners();





