import React from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import CITLogo from '@/assets/images/CIT_Logo.png';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
const Page = () => {
    const openLink = () => { 
        Linking.openURL('https://cit.edu.ly')
     };
    return (
        <View style={styles.container}>
            <Image source={CITLogo} style={styles.welcomeImg} />
            <Text style={styles.headline}>مرحبا واهلا في تطبيق</Text>
            <Text style={styles.description}>
                
            <Text style={styles.link} onPress={openLink}>كلية التقنية الصناعية</Text>
            <Text style={styles.description}>
            {' '} لعرض نتائج و محضرات و مقررات الطلابة
            </Text>
            </Text>
            <Link href={'./logoIn'} replace asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} >البدء</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff'
    },
    welcomeImg: {
        width: "90%",
        height: 300,
        marginBottom: 80,
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        // fontFamily: 'Tajawal-Regular'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom:80,
        color: Colors.light.text
    },
    link: {
        color: Colors.primary,
        fontSize: 14,
    },
    button: {
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 22,
        color: Colors.primary,
        fontWeight:'bold',
    }
})

export default Page