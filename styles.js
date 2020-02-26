import { StatusBar, Dimensions } from "react-native";

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);
const numInfoSections = 3;
const thinBorder = 2;
const imageFont = "Times New Roman";
const infoTitleHeight = 44;
const tabBarHeight = 25;
const schedHeaderSectHeight = screenHeight / 14;
const schedSectHeight = screenHeight / 10;
const schedSectWidth = screenWidth / 3;
const schedSidebarSectWidth = screenWidth / 6;
export const theme = {
    header: "black",
    tab: "gray",
    container: "black",
    icon: "rgba(0,0,0,0)",
    overlay: "rgba(0,0,0,0.5)",
    button: "rgba(0,0,0,0.8)",
    navigationAccent: "white",
    card: "rgba(128,128,150,1)",
    alternateCard: "#0455BF",
};
export const opacityValue = (value) => ( value ? 0.5 : 1 );
export const filterIcon = require("./images/white_filter.png");
export const drawerIcon = require("./images/white_list.png");
export const emptyImage = require("./images/empty.png");

const minMargin = 2
const scheduleItemMarginsRL = 10;
const scheduleItemMarginsTB = 2;

const styles = {
    windowWidth: screenWidth,
    windowHeight: screenHeight,
    infoImgHeight: screenHeight / numInfoSections,
    infoTitleHeight: infoTitleHeight,
    tabBarHeight: tabBarHeight,
    mutableScheduleKey: "@mutable_schedule_key",
    emptySource: require("./images/empty.png"),
    dropdownOpenSpeed: 250,
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.container,
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: "row",
    },
    dropdownFilter: {
        height: screenHeight / 2,
    },
    dropdownFlatlist: {
        alignItems: "center",
        justifyContent: "center",
    },
    locationDropDown: {
        height: screenHeight / 20,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.container,
    },
    middleTabBar: {
        backgroundColor: theme.tab,
        position: "relative",
    },
    //used in Info View
    imgTitle: {
        height: infoTitleHeight,
        flexDirection: "row",
        backgroundColor: "black",
        borderWidth: 0.5,
        borderColor: "white",
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionText: {
        fontFamily: "Times New Roman",
        fontSize: 20,
        padding: 10,
        color: "white",
        textAlignVertical: "center",
    },

    categoryPicker: {
        width: screenWidth,
        height: screenHeight / 2,
        backgroundColor: theme.overlay,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
        borderWidth: 5,
        borderColor: theme.overlay,
    },

    drawerItemText: {
        color: theme.navigationAccent,
        fontSize: 20,
        textAlign: "center",
        padding: 10,
    },
    drawerItem: {
        width: screenWidth / 1.5,
        backgroundColor: theme.button,
        borderColor: theme.navigationAccent,
        justifyContent: "center",
        borderWidth: thinBorder,
        margin: 10,
    },

    eventItems: {
        width: screenWidth / 2,
        height: screenWidth / 2 - 25,
        backgroundColor: "gray",
        borderRadius: 10,
        borderWidth: thinBorder,
        borderColor: "black",
        resizeMode: "stretch",
    },
    statBarWhiteText: {
        color: "white",
        fontSize: 5,
    },
    medWhiteText: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        padding: 10,
    },
    bigWhiteText: {
        color: "white",
        fontSize: 30,
    },

    icon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: theme.icon,
        margin: 10,
    },
    topRightCornerContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignSelf: "flex-end"
    },
    miniIcon: {
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: theme.icon,
        margin: 5,
        tintColor: theme.navigationAccent,
        backgroundColor: theme.overlay,
        borderRadius: 15,

    },
    descriptionView: {
        flex: 1,
        alignSelf: "center",
        justifyContent:"center",
        backgroundColor: theme.container,
        width: screenWidth,
        height: String(100 / numInfoSections) + "%",
        borderWidth: 0.5,
        borderColor: "white",
    },
    infoImgView: {
        alignSelf: "center",
        width: screenWidth,
        height: String(100 / numInfoSections) + "%",
        borderColor: "black",
        borderWidth: thinBorder,
        resizeMode: "stretch",
    },
    imgText: {
        backgroundColor: theme.overlay,
        color: "white",
        fontSize: 15,
        fontFamily: imageFont,
        borderColor: theme.container,
    },

    imgTextWrapper: {
        position: 'absolute',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        top: 0, left: 0, right: 0, bottom: 0,
    },
    scheduleView: {
        backgroundColor: "gray",
        flex: 1,
        scrollingDirection: "horizontal",
        justifyContent: "center",
        alignContent: "center",
    },
    menuSidebar: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: theme.header,
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "flex-start",
    },

    headerText: {
        color: theme.navigationAccent,
    },
    headerBar: {
        backgroundColor: theme.header,
    },
    headerBtnText: {
        color: "white",
    },
    headerBtn: {
        width: StatusBar.currentHeight,
        height: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    sectionText: {
        flex: 1,
        textAlign: "center",
        padding: 5,
        color: theme.navigationAccent,
        fontSize: 20,
    },
    sectionContainer: {
        width: schedSectWidth,
        height: schedSectHeight,
        backgroundColor: theme.card,
        borderWidth: 0.5,
        borderColor: "white",
        alignSelf: "center",
        alignItems:"center",
        justifyContent: "center",
        margin: minMargin,
    },
    scrollContainer: {
        flexGrow:1,
        alignSelf: "center",
        justifyContent: "center",
    },
    headerSectionContainer: {
        width: schedSectWidth,
        height: schedHeaderSectHeight,
        backgroundColor: theme.alternateCard,
        alignSelf: "center",
        borderWidth: 0.5,
        borderColor: "white",
        alignContent: "center",
        justifyContent: "center",
        margin: minMargin,
    },
    sidebarSectionContainer: {
        width: schedSidebarSectWidth,
        height: schedSectHeight,
        backgroundColor: theme.alternateCard,
        borderWidth: 0.5,
        borderColor: "white",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        marginRight: scheduleItemMarginsRL, 
        marginLeft: scheduleItemMarginsRL, 
        marginBottom: scheduleItemMarginsTB,
        marginTop: scheduleItemMarginsTB,
    },
    cornerSectionConteiner: {
        width: schedSidebarSectWidth,
        height: schedHeaderSectHeight,
        backgroundColor: theme.alternateCard,
        borderWidth: 0.5,
        borderColor: "white",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginRight: scheduleItemMarginsRL, 
        marginLeft: scheduleItemMarginsRL, 
        marginBottom: scheduleItemMarginsTB, 
        marginTop: scheduleItemMarginsTB,
    },
    sectionData: {
        flex: 1,
        textAlign: "center",
        padding: 5,
        color: "white",
        fontSize: 15,
    },

    addScheduleBtn: {
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        borderWidth: 1,
        borderColor: "gray",
    },
};

export default styles;