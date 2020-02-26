
import AsynchStorage from '@react-native-community/async-storage';
import { notNull } from './helpers';
import { MONTHS } from './schedule_params';
import { _data, _date } from './data';

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

export const OFFLINE_STORAGE_KEY = 'OFFLINE_STORAGE_KEY';


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

export const emptyStorageItem = ({ item, col, row, storageKey }) => {
    let empty = {col:null, row:null, storageKey:null};
    empty.col = notNull(item) ? item.col : col;
    empty.row = notNull(item) ? item.row : row;
    empty.storageKey = notNull(item) ? item.storageKey : storageKey;
    return {
        title: null,
        source: null,
        description: null,
        location: null,
        date: null,
        row: empty.row,
        col: empty.col,
        storageKey: empty.storageKey,
        id: String(empty.col * Math.random()) + empty.storageKey + String(empty.row * Math.random()),
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

const parseData = ({ originalJson, index }) => (
    JSON.parse( JSON.parse( originalJson[index]) )
);

export const pushCategories = ({ json, destination, index }) => {
    let i = index;
    destination.push({
        category: json.category_set[i],
        id: String(i * Math.random()) + json.category_set + String(i * Math.random()),
      });
}

export const getID = ({ json }) => (
    Object.keys(json)[0]
);

export const getScheduleCol = (weekDay) => (
    scheduleParams.DAYS_DICT[weekDay]
);

export const getScheduleRow = (hour) => (
    Math.abs(hour - scheduleParams.START_HOUR)
);

export const putDataInStructFromID = (id) => {
    AsynchStorage.getItem(OFFLINE_STORAGE_KEY).then((data)=>{
        let data_i = parseData({ originalJson: jsonData, index: index})
        let id = getID({ json: data_i });
        let json = data_i[id];
    });
};

export const pushData = ({ jsonData, destination, index }) => {
    let data_i = parseData({ originalJson: jsonData, index: index})
    let id = getID({ json: data_i });
    let json = data_i[id];

    let date = new Date(Date.now());

    let weekDay = scheduleParams.DAYS[index % scheduleParams.DAYS.length];
    let numHours = scheduleParams.END_HOUR - scheduleParams.START_HOUR;

    let startHour = date.getHours();

    let location = scheduleParams.LOCATIONS[index % scheduleParams.LOCATIONS.length];
    let storageKey = location;
    
    let col = getScheduleCol(weekDay);
    let row = getScheduleRow(startHour);
    
    let endHour = startHour + 1;
    let mm = date.getMonth();
    let dd = date.getDate();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let monthName = MONTHS[mm];

    destination.push(
      _data({
      title: json.title,
      category: json.category,
      source: json.source,
      description: json.description,
      id: id,
      location: location,
      storageKey: storageKey,
      date: _date({
        weekDay: weekDay,
        monthName: monthName, 
        mm: mm,
        dd: dd,
        yyyy: scheduleParams.YEAR,
        hour: startHour, //military time
        minutes: minutes, 
        seconds: seconds,
        endTime: endHour,
      }),
      col: col, //column for schedule component
      row: row, //row for schedule component
    }));
  }