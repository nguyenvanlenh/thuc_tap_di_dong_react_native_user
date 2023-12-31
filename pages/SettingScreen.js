import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View } from 'react-native'
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/slices/AuthSlice';

function SettingScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(removeUser())
    navigation.goBack()
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  )
}

export default SettingScreen