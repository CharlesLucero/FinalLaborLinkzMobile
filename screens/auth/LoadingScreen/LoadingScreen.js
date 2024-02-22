import React from 'react';
import { View, StyleSheet, Text , TouchableOpacity, Image} from 'react-native';
import BodyText from '../../../components/BodyText';

const LoadingScreen = ({navigation}) => {

    const handlePress = () => {
        navigation.navigate('SplashScreen');
      };
      

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={(handlePress)}>
    <View style = {styles.container2}>
        <Image source={require('../../assets/image/logowhite.png')}></Image>
            <View>
                <BodyText
                text="LaborLinkz"
                color="white"
                marginTop = {10}
                fontWeight = 'bold'
                />
            </View>

            <View style = {{marginTop: '50%'}}>
  
            <BodyText
                text="Tap to Continue"
                color="white"
                marginTop = {10}
                /> 
            </View>
    </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00CCAA',
  }, 
  container2:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '80%'
  }
});

export default LoadingScreen;