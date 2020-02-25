import {emptyStorageItem, storageItem} from './storage_functions';

export const MONTHS = {
    0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
    6:"July", 7:"August", 8:"September", 9:"October",10:"November", 11: "December",
};

export default scheduleParams = {
    LOCATIONS: ["New York", "Florida", "Colorado", "Narnia"],
    DAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    DAYS_DICT: {"Sunday":0, "Monday":1, "Tuesday":2, "Wednesday":3, "Thursday":4, "Friday":5,"Saturday":6},
    START_HOUR: 5,
    END_HOUR: 22,
    YEAR: 2020,
};

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