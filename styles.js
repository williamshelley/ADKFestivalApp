import {StatusBar,Dimensions} from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const numInfoSections = 3;
const thinBorder = 2;
const imageFont = "Times New Roman";
const infoTitleHeight = 44;
const tabBarHeight = 25;

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
    main: "rgba(200,200,210,1)",
    accent: "rgba(100,100,110,1)",
    mainText: "black",
    offText: "white",
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
        backgroundColor: theme.accent,
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
    middleTabBar:{
        backgroundColor: "rgba(45,45,45,1)",
        position:"relative",
    },
<<<<<<< HEAD
    tabBtn:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "rgba(45,45,45,1)",
        borderColor:"white",
        borderWidth:0.5,
=======
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
        height: "25%",
        marginBottom: 20,
        backgroundColor: theme.accent,
    }],
    detailsText: [{
        color: theme.offText,
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
        marginBottom: 20,
    }],
    detailsDateText: [{
        color: theme.mainText,
        margin: 10,
        alignSelf: "center",
    }],
    addButtonContainer: [centered, {
        ///alignSelf:"center",
        //width: "100%",
        borderBottomWidth: 2,
        borderColor: "black",
        backgroundColor: theme.button,
    }],
    addButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 16,
        color: theme.buttonAccent,
        margin:16,
        fontWeight: "900",
>>>>>>> 2b89995... fixed background color issues, fixed non sponsor items from appearing on sponsor page
    },
    imgTitle:{
        height: infoTitleHeight,
        flexDirection:"row",
        backgroundColor: "black",
        borderWidth: 0.5,
        borderColor: "white",
        alignContent:"center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionText:{
        fontFamily: "Times New Roman",
        fontSize: 20,
        padding: 10,
        color: "white",
        
    },
    categoryPicker:{
        width:screenWidth,
        height:screenWidth / 2.5,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems:"center",
    },
    categoryItem:{
        width:screenWidth/1.5,
        height:screenHeight/20,
        backgroundColor:"rgba(0,0,0,0.8)",
        borderColor:"red",
        borderWidth:thinBorder,
        alignItems:"center",
        justifyContent:"center",
        margin:5,
    },
    eventItems:{
        width:screenWidth / 2,
        height:screenWidth / 2-25,
        backgroundColor:"gray",
        borderRadius:10,
        borderWidth: thinBorder,
        borderColor:"black",
        resizeMode:"stretch",
    },
    testScreenView:{
        flex:1,
        alignItems:"center",
    },
    roundDrawerBtn:{
        borderRadius:30,
        width:50,
        height: StatusBar.currentHeight,
        backgroundColor:"blue",
    },
    roundButton:{
        borderRadius:30,
        width:250,
        height: 50,
        backgroundColor:"blue",
        alignItems:"center",
        justifyContent:"center",
    },
    statBarWhiteText:{
        color:"white",
        fontSize: 5,
    },
    medWhiteText:{
        color:"white",
        fontSize:20,
        textAlign:"center",
        padding:10,
    },
    bigWhiteText:{
        color:"white",
        fontSize:30,
    },
    navBar:{
        width:StatusBar.width,
        height:StatusBar.currentHeight,
    },
    icon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    descriptionView:{
        flex:1,
        alignSelf:"center",
        backgroundColor: "black",
        width: screenWidth,
        height: screenHeight / numInfoSections,
        borderWidth: 0.5,
        borderColor: "white",
    },
    infoImgView:{
        alignSelf:"center",
        width:screenWidth,
        height:screenHeight / numInfoSections,
        borderColor:"black",
        borderWidth: thinBorder,
        resizeMode:"stretch",
    },
    imgText:{
        backgroundColor:"rgba(0,0,0,0.5)",
        color:"white",
        fontSize: 15,
        fontFamily: imageFont,
        //borderRadius: 10,
        borderWidth: thinBorder,
        borderColor: "rgba(0,0,0,0.5)",
    },

    imgTextWrapper:{
        //borderRadius:10,
        backgroundColor:"rgba(0,0,0,0.3)",
        borderWidth: thinBorder,
        borderColor: "rgba(128,128,128,0.3)",
        position: 'absolute', 
        alignItems: 'flex-start',
        justifyContent: 'flex-end', 
        top: 0, left: 0, right: 0, bottom: 0, 
    },
    scheduleScrollView:{
        backgroundColor:"gray",
        flex: 1,
        scrollingDirection:"horizontal",
        justifyContent: "center",
        alignContent: "center",
    },
    menuSidebar:{
        flex:1,
        flexDirection:"row",
        backgroundColor:"rgba(0,0,0,0.8)",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    menuSidebarBtn:{
        flex:1,
        flexDirection:"row",
        backgroundColor:"rgba(0,0,0,0.5)",
        borderColor:"red",
        alignItems:"center",
        justifyContent:"center",
        borderWidth:thinBorder,
        paddingLeft:50,
        paddingRight:50,
        margin:10,
    },
    headerText:{
        color:"red",
    },
    headerBar:{
        backgroundColor:"black",
    },
    headerBtnText:{
        color:"white",
    },
    headerBtn:{
        width: StatusBar.currentHeight,
        height: StatusBar.currentHeight,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
        alignItems:"center",
        justifyContent:"center",
    },
    sectionText:{
        flex:1,
        textAlign:"center",
        padding:5,
        color:"red",
        fontSize:20,
    },
    sectionContainer:{
        width:screenWidth/2,
        height:50,
        backgroundColor:"rgba(0,0,255,0.5)",
        borderWidth: 0.5,
        borderColor: "white",
        alignContent: "center",
        margin: 5,
    },
    sidebarSectionContainer:{
        width:screenWidth/6,
        height:50,
        backgroundColor:"rgba(255,0,255,0.5)",
        borderWidth: 0.5,
        borderColor: "white",
        alignContent: "center",
        marginRight: 10, marginLeft: 10, marginBottom: 5, marginTop: 5,
    },
    sectionData:{
        flex:1,
        textAlign:"center",
        padding:5,
        color:"white",
        fontSize:15,
    },

};

export default styles;