import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { Image } from 'expo-image';
import CITLogo from '@/assets/images/CIT_Logo.png';
import { useRouter } from 'expo-router';


const logoIn = () => {
  const [RegNo, setRegNo] = useState('');
  const [Password, SetPassword] = useState('');
  const { onLogin } = useAuth();
  const router = useRouter()
  const login = async () => {
    const result =  await onLogin!(RegNo, Password);
    router.replace('/(tabs)/profile');
    if (result && result.message) {
      alert(result.message);
    }

  }
  return (
    <View style={styles.container}>
      <Image source={CITLogo} style={styles.image} />
      <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Registration number"
                    onChangeText={(text: string) => { setRegNo(text) }}
                    value={RegNo}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    keyboardType='numeric'
                    onChangeText={(text: string) => SetPassword(text)}
                    style={styles.input}
                    value={Password}
                />
                <Button
                    onPress={login}
                    title="Log in"
                    color="#0275d8"
                    accessibilityLabel="Login button"
                />
            </View>
    </View>
  )
}


const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '50%',
    resizeMode: 'center',
  },
  form: {
    gap: 10,
    width: '60%',
  },
input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FFF',
  },
container: {
  alignItems: 'center',
    width: '100%',
    backgroundColor:"#fff",
    height: "100%"
},
});

export default logoIn;