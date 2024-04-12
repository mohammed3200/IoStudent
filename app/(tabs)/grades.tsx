import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFetch } from '@/hooks'
import { useRouter } from 'expo-router';
import { Dropdown } from '@/components/dropdown';

const grades = () => {
  const { data, error, isLoading } = useFetch('/student/grades');
  const [Grades, setGrades] = useState<any>(null);
  const router = useRouter()
  useEffect(() => {
    setGrades(data);
    // console.log(data);
    if (error) router.replace('/logoIn');
  }, [isLoading]);
  return (
    <View>
      <Text>grades</Text>
      <Dropdown/>
    </View>
  )
}

export default grades

const styles = StyleSheet.create({})