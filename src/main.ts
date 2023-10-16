import './style.css';

// Import all of Bootstrap's JS
// @ts-ignore
import * as bootstrap from 'bootstrap';
import {GetAllEvents} from "./assets/js/eventsManager/eventsManager.ts";

let res = await GetAllEvents();

console.log(res);




