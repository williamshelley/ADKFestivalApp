
//data format per item being stored in async storage
//deprecated
export const _data_ = (item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image,
    location: item.location,
    date: item.date,
    time: item.time,
});

export const _week_ = {
        0:"Sunday","Sunday":0,0:"SUN","SUN":0,
        1:"Monday","Monday":1,1:"MON","MON":1,
        2:"Tuesday","Tuesday":2,2:"TUE","TUE":2,
        3:"Wednesday","Wednesday":3,3:"WED","WED":3,
        4:"Thursday","Thursday":4,4:"THU","THU":4,
        5:"Friday","Friday":5,5:"FRI","FRI":5,
        6:"Saturday","Saturday":6,6:"SAT","SAT":6,
};

export const _formal_week_ = {
    0:"Sunday","Sunday":0,
    1:"Monday","Monday":1,
    2:"Tuesday","Tuesday":2,
    3:"Wednesday","Wednesday":3,
    4:"Thursday","Thursday":4,
    5:"Friday","Friday":5,
    6:"Saturday","Saturday":6,
}

export const _formal_months_ = {
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
    11:"December","December":11,
}

export const _venue_name_img_separator_ = ":::::";