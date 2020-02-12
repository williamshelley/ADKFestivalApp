import {StatusBar,Dimensions} from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const numInfoSections = 3;
const thinBorder = 2;
const imageFont = "Times New Roman";
const infoTitleHeight = 44;
const tabBarHeight = 25;

const styles = {
    windowWidth: Math.round(Dimensions.get('window').height),
    windowHeight: Math.round(Dimensions.get('window').height),
    infoImgHeight: screenHeight / numInfoSections,
    infoTitleHeight: infoTitleHeight,
    tabBarHeight:tabBarHeight,
    container:{
        flex:1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:"black",
    },
    middleTabBar:{
        backgroundColor: "rgba(45,45,45,1)",
        position:"relative",
    },
    tabBtn:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "rgba(45,45,45,1)",
        borderColor:"white",
        borderWidth:0.5,
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