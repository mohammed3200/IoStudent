import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fafafa',
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.light.background,
        tabBarActiveBackgroundColor: Colors.light.background,
        headerStyle:{
          backgroundColor: Colors.light.background
        },
        headerShadowVisible:false,
      }}>
        <Tabs.Screen name='profile' options={{
          title: 'profile',
          headerTitleAlign: 'center',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }} />
        <Tabs.Screen name='timetable' options={{
          title: 'Timetable',
          headerTitleAlign: 'center',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="table" size={size} color={color} />
          )
        }} />
        <Tabs.Screen name='grades' options={{
          title: 'Grades',
          headerTitleAlign: 'center',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="check-square" size={size} color={color} />
          )
        }}
        />
        <Tabs.Screen name='courses' options={{
          title: 'courses',
          headerTitleAlign: 'center',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="book" size={size} color={color} />
          )
        }} />
      </Tabs>
    </GestureHandlerRootView>
  )
}

export default Layout

const styles = StyleSheet.create({})