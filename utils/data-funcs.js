
import AsyncStorage from '@react-native-community/async-storage';
import { notNull, isNull, getFormattedStartDate, getDatePosition, arrayifyDate, getStartTime } from './helper-funcs';
import PushNotification from './notification-services';

//key for all items added to schedule
export const SCHEDULE_KEY = "$$$ACTIVE_SCHEDULE_STORAGE_KEY$$$";

//key for all unique categories (ie: Headliner, Drama, Short, etc.)
export const CATEGORY_STORAGE = "$$$CATEGORY_SET_STORAGE_KEY$$$";

//key for all unique locations of events
export const LOCATION_STORAGE = "$$$LOCATION_SET_STORAGE_KEY$$$";

export const MASTER_SCHEDULE_STORAGE = "$$$MASTER_SCHEDULE_STORAGE_KEY$$$";

//key for all sponsors
export const SPONSOR_STORAGE = "$$$SPONSOR_LIST_STORAGE_KEY$$$";

//url for the server that the necessary json file exists
export const GET_URL = "http://127.0.0.1:5000/";

/**
 * Gets all keys in async storage and sends result to callback
 *  callback: { function } -> usage is callback( array of string ), keys is array
 */
export const getAllKeys = async (callback) => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys();
        callback(keys);
    } catch (error) {
        console.log(error);
    }
}



/**
 * Batch storing of key value pairs from async storage
 *  keyValPairs: { array of [key, value] }
 */
export const multiSet = async (keyValPairs) => {
    try {
        await AsyncStorage.multiSet(keyValPairs);
    } catch (error) {
        console.log(error);
        return;
    }
}

/**
 * Batch getting of keys and values from async storage and sends result to callback
 *  callback: { function } -> used on each item individually in a 
 *                          Array.map call (callback([string, json-string]))
 */
export const multiGet = async (callback) => {
    try {
        let keys = await AsyncStorage.getAllKeys();
        let values = await AsyncStorage.multiGet(keys);
        values.map((store) => {
            const parsed = JSON.parse(store[1]);
            const isEvent = notNull(parsed) && notNull(parsed.title);
            if (isEvent) {
                callback(store);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllKeysAndDateIndices = async (callback)=>{
    try {
        let keys = await AsyncStorage.getAllKeys();
        let values = await AsyncStorage.multiGet(keys);
        let keysAndDateIndices = []
        values.map((store) => {
            const parsed = JSON.parse(store[1]);
            if (notNull(parsed) && notNull(parsed.title)){
                const parsedTL = JSON.parse(parsed.time_and_locations)
                const t_and_l = notNull(parsedTL) ? parsedTL : null
                if (notNull(t_and_l)){
                    for (var i = 0; i < t_and_l.length; i++){
                        let newKey = store[0]+":"+i
                        keysAndDateIndices.push(newKey);
                    }
                }
            }

        });
        callback(keysAndDateIndices)
    } catch (error) {
        console.log(error);
    }
}

export const multiGetFromAsyncUsingKeys = async (keys, callback) => {
    try {
        let values = await AsyncStorage.multiGet(keys);
        values.map((store) => {
            const parsed = JSON.parse(store[1]);
            const isEvent = notNull(parsed) && notNull(parsed.title);
            if (isEvent) {
                callback(store);
            }
        });
    } catch (error) {
        console.log(error);
    }
}



export const sortIDsByDate = async (ids, callbackOnSorted) => {
    try {
        let keys = []
        let dateIndices = []
        ids.map((preSplitIds, index)=>{
            let postSplitIds = preSplitIds.split(":");
            let key = postSplitIds[0];
            let dateIndex = postSplitIds[1];
            keys.push(key);
            dateIndices.push(dateIndex);
        });
        let values = await AsyncStorage.multiGet(keys);
        let singleDateValues = []
        values.map((store,index)=>{
            singleDateValues.push({ dateIndex: dateIndices[index], store: store});
        })

        let sortedValues = singleDateValues.sort((a, b) => {

           const fullTimeStrA = JSON.parse(JSON.parse(a.store[1]).time_and_locations)[a.dateIndex].time
           let dateA = new Date(getFormattedStartDate(fullTimeStrA));

            const fullTimeStrB = JSON.parse(JSON.parse(b.store[1]).time_and_locations)[b.dateIndex].time
            let dateB = new Date(getFormattedStartDate(fullTimeStrB));
            
            return (dateA - dateB)
        });
        let sortedKeys = []
        sortedValues.map(({dateIndex, store}) => {
            sortedKeys.push(store[0] + ":" + dateIndex);
        })

        callbackOnSorted(sortedKeys);

    } catch (error) {
        console.log(error);
    }
}


/**
 * Adds item to SCHEDULE_KEY of async storage
 *  value: { string } -> should be a key referencing some item in async storage
 *  toggleInSchedule: { function } -> callback with usage as toggleInSchedule(boolean)
 */
export const addToSchedule = async (value, toggleInSchedule) => {
    try {
        await getItem(SCHEDULE_KEY, (data) => {
            if (isNull(data)) {
                AsyncStorage.setItem(SCHEDULE_KEY, JSON.stringify([value]));
            }
            else {
                let appended = JSON.parse(data);
                let present = false;
                appended.map((id) => {
                    present = (value == id);
                });
                if (!present) {
                    appended.push(value);
                }
                AsyncStorage.setItem(SCHEDULE_KEY, JSON.stringify(appended));
            }
            toggleInSchedule(true);
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * Removes item from SCHEDULE_KEY of async storage
 *  **See AddToSchedule for parameter documentation**
 */
export const rmFromSchedule = async (value, toggleInSchedule) => {
    PushNotification.cancelLocalNotifications({ id: parseInt(value) });
    await getItem(SCHEDULE_KEY, (val) => {
        let data = JSON.parse(val);
        let filtered = null;
        if (notNull(data)) {
            filtered = data.filter(item => item != value);
            AsyncStorage.setItem(SCHEDULE_KEY, JSON.stringify(filtered));
            toggleInSchedule(false);
        }
    });
}

/**
 * Returns true if value is in SCHEDULE_KEY location of async storage
 *  **See AddToSchedule for parameter documentation**
 */
export const itemInSchedule = async (value, toggleInSchedule) => {
    await getItem(SCHEDULE_KEY, (val) => {
        let data = JSON.parse(val);
        let inSchedule = false;
        if (notNull(data)) {
            data.map((id) => {
                if (id == value) {
                    inSchedule = (id == value);
                    toggleInSchedule(inSchedule);
                    return;
                }
            })
        } else{
            toggleInSchedule(false);
        }
    })
}

/**
 * Retrieves item corresponding to key parameter from async storage 
 * and sends result to callback
 *  key: { string } -> id (key) for an item (value) in async storage
 *  callback: { function } -> usage is callback(json-string)
 */
export const getItem = async (key, callback) => {
    let value = null;
    try {
        value = await AsyncStorage.getItem(key);
        callback(value);
        return value;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Batch requests items from async storage, maps requested items, 
 * if item has the trait defined by category, then send the result to callback
 *  category: { string } -> sorting trait
 *  callback: { function } -> usage is callback( array of [string, json-string] )
 */
export const sort = async (category, callback) => {
    try {
        let data = []
        multiGet((store) => {
            const key = store[0];
            const value = JSON.parse(store[1]);
            if (notNull(value) && notNull(value.category)) {
                value.category.map((cat) => {
                    if (cat == category) {
                        data.push(key);
                    }
                });
            }
        }).then(() => {
            callback(data);
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Maps key-value pairs from 'data' to 'emptyKEYs' and 'emptyKEY_VAL_PAIRS'
 *  data: { dictionary } -> source data
 *  emptyKEYS: { array } -> location all keys in 'data' should be mapped to
 *  emptyKEY_VAL_PAIRS: { array of [string, json-string] } -> location all 
 *                                  key-value pairs from 'data' should be mapped to
 * NOTE: does not overwrite data already existing in 'emptyKEYS' or 'emptyKEY_VAL_PAIRS'
 */
const extractKeyValPairs = (data, emptyKEYS, emptyKEY_VAL_PAIRS) => {
    Object.keys(data).forEach((key) => {
        const value = data[key];
        Object.keys(value).forEach((nestedKey) => {
            emptyKEYS.push(nestedKey);
            const nestedValue = value[nestedKey];
            emptyKEY_VAL_PAIRS.push([String(nestedKey), JSON.stringify(nestedValue)]);
        });
    });
}

/**
 * Sends a GET request to 'GET_URL' and should receive a json object 
 * that will be stored in async storage, if the request fails, the 
 * data loaded into async storage will be a local json file
 * NOTE: NEED TO TURN OFF STORAGE CLEARING
 */
export const requestJson = async () => {

    let KEYS = [];
    let KEY_VAL_PAIRS = [];
    fetch(GET_URL, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((json) => {



            //STORAGE CLEARING
            //AsyncStorage.clear();



            const data = JSON.parse(json.data);
            KEY_VAL_PAIRS = [
                [CATEGORY_STORAGE, JSON.stringify(json.category_set)],
                [LOCATION_STORAGE, JSON.stringify(json.location_set)],
                [SPONSOR_STORAGE, JSON.stringify(json.sponsor_list)],
            ];
            extractKeyValPairs(data, KEYS, KEY_VAL_PAIRS);
            multiSet(KEY_VAL_PAIRS);
        })
        .catch((error) => {
            console.log(error);



            //STORAGE CLEARING
            //AsyncStorage.clear();



            const offline = require("../web-scrape/offline.json");
            const data = JSON.parse(offline.data);
            KEY_VAL_PAIRS = [
                [CATEGORY_STORAGE, JSON.stringify(offline.category_set)],
                [LOCATION_STORAGE, JSON.stringify(offline.location_set)],
                [SPONSOR_STORAGE, JSON.stringify(offline.sponsor_list)],
            ];
            extractKeyValPairs(data, KEYS, KEY_VAL_PAIRS);
            multiSet(KEY_VAL_PAIRS);
        })
};