import { MONTHS, dateAsString } from "./schedule_params";
import { notNull } from "./helpers";

const _scheduleData = ({
    title,
    id,
    source,
}) => ({
    title,
    id,
    source,
});

export const _data = ({ 
    title,
    category,
    source,
    description,
    id,
    location,
    storageKey,
    date,
    col,
    row,
}) => ({
    title,
    category,
    source,
    description,
    id,
    location,
    storageKey,
    date,
    col,
    row,
});

export const _date = ({
    weekDay,
    monthName,
    mm,
    dd,
    yyyy,
    hour,
    minutes,
    seconds,
    endTime,
}) => ({
    weekDay,
    monthName,
    mm,
    dd,
    yyyy,
    hour,
    minutes,
    seconds,
    endTime,
});

export class CustomDate {
    constructor({
        weekDay, monthName,
        mm, dd, yyyy,
        hour, minutes, seconds,
        date
    }){
        this.weekDay = weekDay;
        this.monthName = monthName;
        this.mm = mm;
        this.dd = dd;
        this.yyyy = yyyy;
        this.hour = hour;
        this.minutes = minutes;
        this.seconds = seconds;
        if (notNull(date)){
            this._date = date;
            this.setValues(this._date);
        } else {
            this.synchDate();
        }
    }

    synchDate = () => {
        this._date = _date({
            weekDay: this.weekDay,
            monthName: this.monthName, 
            mm: this.mm,
            dd: this.dd,
            yyyy: this.yyyy,
            hour: this.hour, 
            minutes: this.minutes, 
            seconds: this.seconds,
        });
    }

    setValues = (date) => {
        this.weekDay = date.weekDay;
        this.monthName = date.monthName;
        this.mm = date.mm;
        this.dd = date.dd;
        this.yyyy = date.yyyy;
        this.hour = date.hour;
        this.minutes = date.minutes;
        this.seconds = date.seconds;
    }

    addSeconds = (val) => {
        this.seconds += val;
    }

    addMinutes = (val) => {
        this.minutes += val;
    }

    addHour = (val) => {
        this.hour += val;
    }

    setYYYY = (val) => {
        this.yyyy += val;
    }

    setYYYY = (val) => {
        this.yyyy = val;
    }

    setSeconds = (val) => {
        this.seconds = val;
    }

    setMinutes = (val) => {
        this.minutes = val;
    }

    setHour = (val) => {
        this.hour = val;
    }

    setWeekDay = (val) => {
        this.weekDay = val;
    }

    setMonthName = (name) => {
        this.monthName = name;
        this.mm = MONTHS[name];
    }

    setMM = (val) => {
        this.mm = val;
        this.monthName = MONTHS[mm];
    }

    asString = () => {
        this.synchDate();
        return dateAsString(this._date) 
    };
};

export const EMPTY_DATA = _data({});
export const EMPTY_SCHED_DATA = _scheduleData({});
export const EMPTY_DATE = _date({});
export const JSON_DATA = require('../web-scrape/sample.json')
