
//data format per item being stored in async storage
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

export const _venue_name_img_separator_ = ":::::";