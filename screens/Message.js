import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import FooterMenu from '../components/Menus/FooterMenu';

const Message = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {/* Your content here */}
      </View>
      <View style={{ backgroundColor: '#ffffff', borderWidth: 0.5, borderColor: 'gray', paddingHorizontal: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop: 5 }}>
        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Message;
