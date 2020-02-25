
import AsynchStorage from '@react-native-community/async-storage';
import { notNull } from './helpers';

export const storeData = (targetKey, data, defaultData) => {
    let DATA = notNull(data) ? data : defaultData;
    AsynchStorage.setItem(targetKey, JSON.stringify(DATA));
}

export const storeItem = (data, defaultData, item, index) => {
    let id = data[index].id;
    data[index] = item;
    data[index].id = id;
    storeData(item.storageKey, data, defaultData);
};

export const retrieveData = (targetKey, callback) => {
    AsynchStorage.getItem(targetKey).then((data) => {
        callback(JSON.parse(data));
        return data;
    });
}

export const convertFromMilitaryTime = (time) => {
    let halfday = 12;
    let converted = ((time > halfday) ? (String(time - halfday) + "PM") : time + "AM");
    return (time == halfday) ? String(time) + "PM" : converted;
}

export const emptyStorageItem = ({col, row, storageKey}) => {
    return {
        title: null,
        source: null,
        description: null,
        location: null,
        date: null,
        row: row,
        col: col,
        storageKey: storageKey,
        id: String(col * Math.random()) + storageKey + String(row * Math.random()),
    };
};

export const storageItem = ({title, source, col, row, description, location, date, storageKey}) => {
    return {
        title: title,
        source: source,
        description: description,
        location: location,
        date: date,
        row: row,
        col: col,
        storageKey: storageKey,
        id: title + String(row + col * Math.random() * Math.random()),
    };
};

export const storageItemCopy = ({ item }) => {
    return storageItem({
        title: item.title, 
        source: item.source,
        col: item.col, 
        row: item.row,
        descriptions: item.description,
        location: item.location,
        date: item.date,
        storageKey: item.storageKey,
        id: title + item.id + String(row + col * Math.random() * Math.random()),
    });
};