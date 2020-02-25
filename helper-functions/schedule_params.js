import {emptyStorageItem, storageItem} from './storage_functions';

export const MONTHS = {
    0:"January","January":0,
    1:"February","February":1,
    2:"March","March":2,
    3:"April","April":3,
    4:"May","May":4,
    5:"June","June":5,
    6:"July","July":6,
    7:"August","August":7,
    8:"September","September":8,
    9:"October","October":9,
    10:"November","November":10,
    11: "December","December":11,
};


export default scheduleParams = {
    LOCATIONS: ["New York", "Florida", "Colorado", "Narnia"],
    DAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    DAYS_DICT: {"Sunday":0, "Monday":1, "Tuesday":2, "Wednesday":3, "Thursday":4, "Friday":5,"Saturday":6},
    START_HOUR: 0,
    END_HOUR: 24,
    YEAR: 2020,
};

timeToString = (time) => (
    (time < 10) ? ("0" + String(time)) : String(time)
);

export const dateAsString = ( date ) => (
    date.monthName + " " + String(date.dd) + ", " + 
    String(date.yyyy) + " " + timeToString(date.hour) 
    + ":" + timeToString(date.minutes) + ":" + timeToString(date.seconds)
);

export const getIndex = ({ xcol, yrow }) => (
    yrow * scheduleParams.DAYS.length + xcol + scheduleParams.DAYS.length
);

export const createHourList = (startHour, endHour) => {
    let res = [];
    let currentHour = startHour;
    let halfDay = 12;
    let numModifier = 0;
    let a_m = " AM", p_m = " PM";
    let strModifier = a_m;
    while (currentHour < endHour + 1) {
        if (currentHour > halfDay) {
            numModifier = halfDay;
            strModifier = p_m;
        } else if (currentHour == halfDay) {
            strModifier = p_m;
        } else {
            numModifier = 0;
            strModifier = a_m;
        }
        res.push(String(currentHour - numModifier) + strModifier);
        currentHour++;
    }
    return res;
}

export const prepareSidebar = (startHour, endHour) => {
    let SIDEBAR_DATA = [emptyStorageItem({col:-1,row:-1})];
    let SIDEBAR = createHourList(startHour, endHour);
    for (var i = 0; i < SIDEBAR.length; i++) {
        SIDEBAR_DATA.push(storageItem({title:SIDEBAR[i], col:-1, row:i }));
    }
    return SIDEBAR_DATA;
}

export const prepareDropdownFilter = (data) => {
    let DROPDOWN_DATA = [];
    for (var i = 0; i < data.length; i++) {
        DROPDOWN_DATA.push({
            category: data[i],
            id: data[i] + String(i * Math.random()),
        })
    }
    return DROPDOWN_DATA;
}

export const prepareBlankData = (headerData, sidebarData, storageKey) => {
    let DATA = [];
    for (var i = 0; i < headerData.length; i++) {
        DATA.push(storageItem({title:headerData[i], col:i, row:-1}));
    }

    for (var i = 0; i < (sidebarData.length) * (headerData.length) - headerData.length; i++) {
        DATA.push(
            storageItem({
                title: null,
                row: Math.trunc(i / headerData.length),
                col:i % headerData.length,
                storageKey: storageKey,
            })
        );
    }
    return DATA;
}

export const BLANK_DATA = prepareBlankData(scheduleParams.DAYS, 
                        prepareSidebar(scheduleParams.START_HOUR, scheduleParams.END_HOUR));