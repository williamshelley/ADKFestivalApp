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
    //return year + "-" + month + "-" + day + "T" + roundMinutes(hour, minutes, am_pm);
    return year + "-" + month + "-" + day + "T" + hour + ":" + minutes + ":00";
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

export const getNumQuarters = (date) => {
    return date.getUTCHours() * 4 + date.getUTCMinutes() / 15;
}

export const getNumQuartersBetween = (startDate, endDate) => {
    return getNumQuarters(endDate) - getNumQuarters(startDate);
}

export const getFormattedStartDate = (string) => {
    return formatDate(string.split(" to ")[0]);
}

export const parseTime = (timeString) => (timeString.slice(11));

export const arrayifyDate = (data)=>{
    if (notNull(data) && notNull(data.date)) {
        const date = data.date;
        const dateList = date.split(",");
        return dateList;
    }
    return [];
}

export const formatDateForDetails = (dateStr) => {
    let startTime = getFormattedStartDate(dateStr);
    let startDate = new Date(startTime);
    let weekDay = _formal_week_[startDate.getUTCDay()];
    let month = _formal_months_[startDate.getUTCMonth()];
    let hours = startDate.getUTCHours();
    let am_pm = "am";
    if (hours > 12){
        hours-=12;
        am_pm = "pm";
    }
    let minutes = startDate.getUTCMinutes();
    let strMins = String(minutes);
    if (minutes < 10){
        strMins = "0"+strMins;
    }
    let timeStr = String(hours) + ":" + strMins + am_pm;
    return weekDay + ", " + month + " @ " + timeStr;
}

export const parseDateFromArr = (listOfDates, index) => {
    return listOfDates[index].split(" to ");
}

export const getDatePosition = (dateString) => {
    const dateArr = dateString.split(" to ");

    const start = dateArr[0];
    const end = dateArr[1];
    if (notNull(start) && notNull(end)) {
        const startDate = new Date(formatDate(start));
        const endDate = new Date(formatDate(end));

        durationInQuarters = getNumQuartersBetween(startDate, endDate);
        startInQuarters = getNumQuarters(startDate);
        weekDay = _week_[startDate.getUTCDay()];
    }
    return {
        day: weekDay,
        durationInQuarters: durationInQuarters,
        startInQuarters: startInQuarters,
    }
}

export const getStartTime = (timeStr) => {
    return timeStr.split(" to ")[0].slice(11);
}

export const getEndTime = (timeStr) => {
    return timeStr.split(" to ")[1].slice(11);
}