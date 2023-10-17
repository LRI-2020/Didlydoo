export function formatMonth(month: number):string {

    return month<9 ? `0${month + 1}` : `${month + 1}`;
}

export function formatDay(day:number):string{
    return day<10 ? `0${day}`:`${day}`;
}