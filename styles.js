import {StatusBar,Dimensions} from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const numInfoSections = 3;
const thinBorder = 2;
const imageFont = "Times New Roman";

const styles = {
    container:{
        flex:1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:"black",
    },
    descriptionText:{
        fontFamily: "Times New Roman",
        fontSize: 20,
        padding: 10,
        color: "black",
    },
    eventItems:{
        width:screenWidth / 2,
        height:screenWidth / 2-25,
        backgroundColor:"gray",
        borderRadius:10,
        borderWidth: thinBorder,
        borderColor:"black",
        resizeMode:"contain",
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
        flex:0,
        backgroundColor: "powderblue",
        width: screenWidth,
        height: screenHeight / numInfoSections,
        borderWidth: thinBorder,
        borderColor: "black",
    },
    infoImgView:{
        width:screenWidth,
        height:screenHeight / numInfoSections,
        borderColor:"black",
        borderWidth: thinBorder,
        borderRadius:5,
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
        backgroundColor:"rgba(0,0,0,0.8)",
        alignItems:"center",
        justifyContent:"flex-start",
    },
    menuSidebarBtn:{
        width:250,
        height:45,
        backgroundColor:"rgba(0,0,0,0.5)",
        borderColor:"red",
        alignItems:"center",
        justifyContent:"center",
        borderWidth:thinBorder,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        paddingTop:10,
    },
    headerText:{
        color:"red",
    },
    headerBar:{
        backgroundColor:"black",
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
    }
};

export default styles;