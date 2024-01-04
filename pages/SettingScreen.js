import { CommonActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View } from 'react-native'
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/slices/AuthSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { removeUserAPI } from '../redux/slices/UserSlice';

function SettingScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(removeUser())
    dispatch(removeUserAPI())
    signOut(auth)
    // Thoát khỏi trang và đặt nó làm trang mặc định
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }] // Thay 'Home' bằng tên của trang mặc định của bạn
      })
    );
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  )
}

export default SettingScreen