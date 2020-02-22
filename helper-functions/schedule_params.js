import {emptyStorageItem, storageItem} from './storage_functions';


export default scheduleParams = {
    LOCATIONS: ["New York", "Florida", "Colorado", "Narnia"],
    DAYS: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    DAYS_DICT: {"Monday":0, "Tuesday":1, "Wednesday":2, "Thursday":3, "Friday":4},
    START_HOUR: 7,
    END_HOUR: 20,
    YEAR: 2020,
};


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