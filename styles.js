import {StatusBar,Dimensions} from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const numInfoSections = 3;
const thinBorder = 2;
const imageFont = "Times New Roman";
const infoTitleHeight = 44;
const tabBarHeight = 25;
const schedHeaderSectHeight = screenHeight / 14;
const schedSectHeight = screenHeight / 10;
const schedSectWidth = screenWidth / 3;
const schedSidebarSectWidth = screenWidth / 6;
const theme = {
    header: "black",
    tab: "gray",
    container: "black",
    icon: "rgba(0,0,0,0)",
    overlay: "rgba(0,0,0,0.5)",
    button: "rgba(0,0,0,0.8)",
    navigationAccent: "white",
    card:"rgba(128,128,150,1)",
    alternateCard: "#0455BF",
};

const styles = {
    windowWidth: screenWidth,
    windowHeight: screenHeight,
    infoImgHeight: screenHeight / numInfoSections,
    infoTitleHeight: infoTitleHeight,
    tabBarHeight:tabBarHeight,
    mutableScheduleKey: "@mutable_schedule_key",
    container:{
        flex:1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: theme.container,
    },
    springEffectContainer:{
        position: "absolute", 
        top: 0, 
        bottom: 0, 
        justifyContent: "flex-start"
    },
    dropdownFlatlist:{
        flex: 0, 
        alignItems: "center", 
        justifyContent: "center", 
        padding: 10 ,
    },
    locationDropDown:{
        height: screenHeight / 20,
        width: screenWidth,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: theme.container,
    },
    middleTabBar:{
        backgroundColor: theme.tab,
        position:"relative",
    },
//used in Info View
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
        width: screenWidth,
        height: screenHeight / 2,
        backgroundColor: theme.overlay,
        justifyContent: "center",
        alignItems:"center",
        flexDirection:"row",
        position:"absolute",
        borderWidth: 5,
        borderColor: theme.overlay,
    },

    menuItem:{
        width:screenWidth/1.5,
        height:screenHeight/20,
        backgroundColor: theme.button,
        borderColor: theme.navigationAccent,
        borderWidth:thinBorder,
        alignItems:"center",
        justifyContent:"center",
        margin: 10,
    },

    drawerItem: {
        flex:1,
        flexDirection:"row",
        backgroundColor: theme.button,
        borderColor: theme.navigationAccent,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:thinBorder,
        paddingLeft:50,
        paddingRight:50,
        margin:10,
    },

    eventItems:{
        width:screenWidth / 2,
        height:screenWidth / 2-25,
        backgroundColor:"gray",
        borderRadius:10,
        borderWidth: thinBorder,
        borderColor: "black",
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

    icon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: theme.icon,
        margin:10,
    },
    descriptionView:{
        flex:1,
        alignSelf:"center",
        backgroundColor: theme.container,
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
        backgroundColor: theme.overlay,
        color:"white",
        fontSize: 15,
        fontFamily: imageFont,
        borderColor: theme.container,
    },

    imgTextWrapper:{
        borderRadius:10,
        borderWidth: thinBorder,
        borderColor: theme.container,
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
        backgroundColor: theme.header,
        alignItems:"center",
        justifyContent:"flex-start",
    },

    headerText:{
        color: theme.navigationAccent,
    },
    headerBar:{
        backgroundColor: theme.header,
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
        color: theme.navigationAccent,
        fontSize:20,
    },
    sectionContainer:{
        width:schedSectWidth,
        height:schedSectHeight,
        backgroundColor: theme.card,
        borderWidth: 0.5,
        borderColor: "white",
        alignContent: "center",
        margin: 5,
    },
    headerSectionContainer:{
        width:schedSectWidth,
        height:schedHeaderSectHeight,
        backgroundColor: theme.alternateCard,
        borderWidth: 0.5,
        borderColor: "white",
        alignContent: "center",
        margin: 5,
    },
    sidebarSectionContainer:{
        width:schedSidebarSectWidth,
        height:schedSectHeight,
        backgroundColor: theme.alternateCard,
        borderWidth: 0.5,
        borderColor: "white",
        alignContent: "center",
        marginRight: 10, marginLeft: 10, marginBottom: 5, marginTop: 5,
    },
    cornerSectionConteiner:{
        width: schedSidebarSectWidth,
        height: schedHeaderSectHeight,
        backgroundColor: theme.alternateCard,
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

    addScheduleBtn:{
        borderRadius: 15,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "gray",
        borderWidth: 1,
        borderColor: "gray",
    },
};

export default styles;