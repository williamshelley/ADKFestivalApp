import {StatusBar,Dimensions} from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = {
    screenView:{
        flex:1,
    },
    testScreenView:{
        flex:1,
        justifyContent:"center",
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
        backgroundColor:"blue",
    },
    statBarWhiteText:{
        color:"white",
        fontSize: StatusBar.currentHeight,
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
    },
    infoAbout:{
        backgroundColor: "powderblue",
        width: screenWidth,
        height: screenHeight / 3,
    }
};

export default styles;