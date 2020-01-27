import {StatusBar,Dimensions} from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = {
    container:{
        flex:1,
        justifyContent: "center",
        alignItems:"center",
    },
    eventItems:{
        width:screenWidth / 2,
        height:screenWidth / 2 - 50,
        backgroundColor:"gray",
        borderRadius:10,
        borderWidth:2,
        borderColor:"black",
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
        height: 50,
        backgroundColor:"blue",
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
    infoAbout:{
        backgroundColor: "powderblue",
        width: screenWidth,
        height: screenHeight / 3,
    }
};

export default styles;