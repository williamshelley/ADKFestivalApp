import { Dimensions } from 'react-native';

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);
export const drawerWidth = screenWidth / 1.5;
export const stackHeaderIconSize = 24;
export const eventCardWidth = screenWidth / 2;
export const eventCardHeight = screenWidth / 2 - 25;
export const removeIconSize = 18;
export const quarterHourHeight = 30;
export const hourHeight = quarterHourHeight * 4;
export const scheduleItemWidth = 150;
export const scheduleHeaderItemHeight = hourHeight / 1.5;

// CHANGE 'weekDays' TO ALTER THE DAYS SHOWN ON A SINGLE SCHEDULE PAGE
export const weekDays = ["THU", "FRI", "SAT", "SUN"];

export const createHourList = (startHour, endHour) => {
    let res = [];
    let currentHour = startHour;
    let halfDay = 12;
    let numModifier = 0;
    let a_m = ":00 AM", p_m = ":00 PM";
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

export const START_HOUR = 7;
export const END_HOUR = 20;
export const hourList = createHourList(START_HOUR, END_HOUR);

export const clear = "rgba(0,0,0,0)";

export const details = {
    flex: 1,
}

export const theme = {
    main: "rgba(248,248,255,1)",
    accent: "rgba(100,100,110,1)",
    mainText: "black",
    offText: "black",
    iconTint: "black",
    loadingColor: "rgba(100,100,110,1)",

    navigation: "black",
    navigationAccent: "black",

    overlay: "rgba(0,0,0,0.5)",
    lightOverlay: "rgba(255,255,255,0.5)",
    overlayText: "white",

    scheduleItem: "rgba(100,0,120,0.5)",
    scheduleHeader: "rgba(100,100,110,1)",
    scheduleColumn: "rgba(200,200,210,0.8)",
    scheduleBorders: "black",

    sponsorPage: "black",
    sponsor: "rgba(0,0,0,0.5)",

    button: "#58B3E8",
    buttonAccent: "white",
};


export const centered = {
    justifyContent: "center",
    alignItems: "center",
}

export const styles = {
    container: [centered, {
        flex: 1,
    }],
    homeContainer: [{
        justifyContent: "flex-start",
        alignItems: "center",
    }],
    drawerScrollView: [centered, {
        flexGrow: 1,
        width: drawerWidth,
        flexDirection: "column",
        backgroundColor: clear,
        alignItems: "stretch",
    }],
    drawerItem: [centered, {
        backgroundColor: theme.overlay,
        borderColor: theme.navigationAccent,
        borderWidth: 2,
        alignItems: "stretch",
    }],
    drawerLabel: [centered, {
        color: theme.overlayText,
        fontSize: 20,
        textAlignVertical: "center",
        textAlign: "center",
    }],
    stackHeaderIcon: [centered, {
        width: stackHeaderIconSize,
        height: stackHeaderIconSize,
        margin: 10,
    }],
    stackHeader: [{
        backgroundColor: theme.main,
    }],
    detailsTabBar: [{
        backgroundColor: theme.overlay,
        borderColor: theme.main,
    }],
    detailsTabIndicator: [{
        backgroundColor: theme.navigationAccent,
        height: 3,
        borderRadius: 5,
    }],
    eventCard: [centered, {
        backgroundColor: theme.accent,
        width: eventCardWidth,
        height: eventCardHeight,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        justifyContent: "space-between"
    }],
    eventCardCorner: [{
        justifyContent: "flex-start",
        alignSelf: "flex-end",
        height: removeIconSize,
        width: removeIconSize,
    }],
    eventCardText: {
        justifyContent: "flex-end",
        alignSelf: "flex-start",
        backgroundColor: theme.overlay,
        color: theme.overlayText,
        borderColor: theme.main,
    },
    eventCardContainer: [centered, {
        justifyContent: "flex-start",
        backgroundColor: theme.loadingColor,
        flexGrow: 1,
    }],
    eventCardImage: {
        flex:1, 
        alignSelf: "stretch", 
        justifyContent: "space-between",
        borderWidth: 0.5,
        borderRadius: 10,
    },
    detailsContainer: [{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: theme.main,
    }],
    detailsImage: [centered, details, {
        width: "100%",
        resizeMode: "contain",
    }],
    detailsTextWrapper: [centered, details, {
        width: "100%",
        //borderColor: theme.accent,
        //borderWidth: 3,
        //borderRadius: 10,
        height: "25%",
        marginBottom: 20,
    }],
    detailsText: [{
        color: theme.mainText,
        fontSize: 18,
        margin: 10,
        marginBottom: "50%",
    }],
    detailsTextScroll: [{
        flexGrow: 1,
        margin: 10,
    }],
    detailsDateWrapper: [{
        flex: 1,
        width: "100%",
        marginBottom: 20,
    }],
    detailsDateText: [{
        color: theme.mainText,
        margin: 10,
        alignSelf: "center",
    }],
    addButtonContainer: [centered, {
        flex: 1,
        borderRadius: 5,
        width: "100%",
        height: "100%",
        backgroundColor: theme.button,
        marginVertical: 5,
    }],
    addButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
        color: theme.buttonAccent,
        margin:16,
        fontWeight: "900",
    },
    rmIcon: [{
        //justifyContent: "flex-start",
        //alignSelf: "flex-end",
        width: 18,
        height: 18,
        tintColor: theme.navigationAccent,
        borderRadius: 15,
        backgroundColor: theme.lightOverlay,
    }],
    scheduleHeaderItem: [centered,{
        width: scheduleItemWidth,
        height: scheduleHeaderItemHeight,
        backgroundColor: theme.scheduleHeader,
        borderWidth: 0.5,
    }],
    scheduleHeader: {
        height: scheduleHeaderItemHeight,
        borderWidth: 0.5,
    },
    scheduleHeaderText: {
        backgroundColor: theme.overlay,
        color: theme.overlayText,
        textAlign: "center",
        textAlignVertical: "center",
        margin: 10,
    },
    scheduleItem: {
        width: "98%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 0,
        backgroundColor: theme.scheduleItem,
        borderWidth: 0.5,
        borderRadius: 10,
    },
    scheduleColumn: {
        justifyContent: "flex-start",
        width: scheduleItemWidth,
        height: 24*hourHeight,//hourList.length * hourHeight,
        backgroundColor: theme.scheduleColumn,
        borderWidth: 0.5,
        borderColor: theme.scheduleBorders,
    },
    scheduleTabBar: {
        backgroundColor: theme.overlay,
        borderColor: theme.main,
    },
    sponsorCard: [centered, {
        backgroundColor: theme.sponsor,
        margin:2,
        borderRadius: 5,
        height: 50,
        width: screenWidth - screenWidth / 10,
    }],
    sponsorCardText: {
        textAlign: "center",
        textAlignVertical: "center",
        color: theme.overlayText,
    },
    dropdownFilter: [centered, {
        height: "100%",
        width: "100%",
        backgroundColor: theme.overlay,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    }],
    dropdownFilterItem: [centered, {
        width: screenWidth * 0.9,
        height: (screenHeight / 2) * 0.1,
        margin: 5,
        backgroundColor: theme.loadingColor,
        borderRadius: 5,
    }],
    dropdownFilterItemText: {
        color: theme.buttonAccent,
    },
};
