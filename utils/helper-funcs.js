import { _week_, _formal_week_, _formal_months_ } from './architecture';

export const isNull = (object) => ( object == null || object == undefined );
export const notNull = (object) => (  !isNull(object) );

export const roundMinutes = (hh, mm, am_pm) => {
    const halfday = 12;
    const quarter = 15, half = quarter * 2, threeQ = quarter * 3;
    let hour = parseInt(hh), minutes = parseInt(mm);
    const modifier = (am_pm == "PM" && hour < halfday) ? halfday : 0;
    hour = hour + modifier;
    if (minutes > 0 && minutes <= quarter) {
        minutes = quarter;
    } else if (minutes > quarter && minutes <= half) {
        minutes = half;
    } else if (minutes > half && minutes <= threeQ) {
        minutes = threeQ;
    } else if (minutes > threeQ) {
        minutes = 0;
        hour = (hour + 1 >= 24) ? 0 : hour + 1;
    }
    let hourString = String(hour);
    hourString = (hourString.length < 2) ? "0" + hourString : hourString;

    let minString = String(minutes);
    minString = (minString.length < 2) ? "0" + minString : minString;

    return hourString + ":" + minString + ":00";
}

export const formatDateElements = (month, day, year, hour, minutes, am_pm) => {
    return year + "-" + month + "-" + day + "T" + roundMinutes(hour, minutes, am_pm);
}

export const formatDate = (timeString) => {
    const arr = timeString.split(" ");
    const month = arr[0].slice(0, 2);
    const day = arr[0].slice(3, 5);
    const year = arr[0].slice(6, 10);
    const hour = arr[1].slice(0, 2);
    const minutes = arr[1].slice(3, 5);
    const am_pm = arr[2];
    return formatDateElements(month, day, year, hour, minutes, am_pm);
}