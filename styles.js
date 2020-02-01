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
        backgroundColor:"rgba(255,255,255,0.3)",
        color:"black",
        fontSize: 15,
        fontFamily: imageFont,
        //borderRadius: 10,
        borderWidth: thinBorder,
        borderColor: "rgba(255,255,255,0.3)",
    },
    imgTextWrapper:{
        //borderRadius:10,
        backgroundColor:"rgba(255,255,255,0.3)",
        borderWidth: thinBorder,
        borderColor: "rgba(255,255,255,0.3)",
    }
};

export default styles;