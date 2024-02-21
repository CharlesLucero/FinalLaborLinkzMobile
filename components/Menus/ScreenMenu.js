import { View, Text } from "react-native";
import React, {useContext} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import Message from "../../screens/Message";
import Favorite from "../../screens/Favorite";
import Account from "../../screens/Account";
import SplashScreen from "../../screens/auth/SplashScreen";
import LoadingScreen from "../../screens/auth/LoadingScreen";
import TermsnCondition from "../../screens/auth/TermsnCondition";
import PrivacyPolicy from "../../screens/auth/PrivacyPolicy";
import CreatePost from "../../screens/CreatePost";
import Setting from "../../screens/Setting";
import AccountSetting from "../../screens/AccountSetting";
import EditProfile from "../../screens/EditProfile";
import Carpenter from "../../screens/Carpenter";
import Technician from "../../screens/Technician";
import Driver from "../../screens/Driver";
import Maid from "../../screens/Maid";
import Electrician from "../../screens/Electrician";
import Plumber from "../../screens/Plumber"
import ViewProfile from "../../screens/ViewProfile";
import Chat from "../../screens/Chat"
import Process from "../../screens/Process";
import Notifications from "../../screens/Notifications";
import Chats from "../../screens/Chats";



const ScreenMenu = () => {
    //global state
    const [state] = useContext(AuthContext);
    //auth condition true false
    const authenticatedUser = state?.user && state?.token
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator initialRouteName="Login">
        {authenticatedUser ? (
          <>
          <Stack.Screen 
          name= "Home" 
          component={Home} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Process" 
          component={Process} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Chats" 
          component={Chats} 
          options={{headerShown: false}}
          />
        <Stack.Screen 
          name= "Notifications" 
          component={Notifications} 
          options={{headerShown: false}}
          />
       
          <Stack.Screen 
          name= "Message" 
          component={Message} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Favorite" 
          component={Favorite} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Account" 
          component={Account} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "CreatePost" 
          component={CreatePost} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Setting" 
          component={Setting} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "AccountSetting" 
          component={AccountSetting} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "EditProfile" 
          component={EditProfile} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Carpenter" 
          component={Carpenter} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Technician" 
          component={Technician} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Driver" 
          component={Driver} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Maid" 
          component={Maid} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Electrician" 
          component={Electrician} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Plumber" 
          component={Plumber} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Chat" 
          component={Chat} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "ViewProfile" 
          component={ViewProfile} 
          options={{headerShown: false}}
          />

        </>) : 
        (
          <>
          <Stack.Screen 
          name= "SplashScreen" 
          component={SplashScreen} 
          options={{headerShown: false}}
          />

          <Stack.Screen 
          name= "LoadingScreen" 
          component={LoadingScreen} 
          options={{headerShown: false}}
          />
       
          <Stack.Screen 
          name= "TermsnCondition" 
          component={TermsnCondition} 
          options={{headerShown: false}}
          />

          <Stack.Screen 
          name= "PrivacyPolicy" 
          component={PrivacyPolicy} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Register" 
          component={Register} 
          options={{headerShown: false}}
          />
          <Stack.Screen 
          name= "Login" 
          component={Login} 
          options={{headerShown: false}}
          /></>
        )}
        </Stack.Navigator>

    )
}
export default ScreenMenu;