import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { useFetch } from '@/hooks';
import { useRouter } from 'expo-router';


const Page = () => {
  const { onLogout } = useAuth();
  const [student, setStudent] = useState<any>();
  const router = useRouter()
  const { data, isLoading, error, refetch } = useFetch('/student/me');

  useEffect(() => {
    setStudent(data);
    if(error) router.replace('/logoIn')
  }, [isLoading])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background, paddingHorizontal: 50 }}>
      <View style={{ alignItems: 'flex-end', marginVertical: 50 }}>
        <Image source={{ uri: student?.PersonalPicture }} style={{ width: 120, height: 120, borderRadius: 70 }} />
        <Text> الاسم :{student?.StudentName}</Text>
        <Text>رقم القيد :{student?.RegistrationNumber}</Text>
        <Text>القسم العملي :{student?.DepartmentName}</Text>
        <Text>تاريخ الميلاد :{student?.DateOfBirth}</Text>
        <Text>الجنسية :{student?.Nationality}</Text>
        <Text>الجنس :{student?.gender}</Text>
        <Text>البريد الالكترونية الجامعي :{student?.citemail || 'لا يوجد حاليا'}</Text>
        <Text>المعدل العام :{student?.CumulativeAverage}</Text>
        <Text>الوحدات المنجزة :{student?.UnitsCompleted}</Text>
        <Text>المعدل الدبلوم :{student?.DiplomaGPA}</Text>
        <Text>رقم الهاتف : {student?.PhoneNumber}</Text>
        {/* For properties like PersonalPicture, you might want to use an Image component */}
        <Text>{student?.QrCode} : QR Code</Text>
        <Text>النظام الدراسي: {student?.SchoolSystem == 'Regular' ? "نظامي" : student?.SchoolSystem}</Text>
      </View>
      <View style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={() => {onLogout;router.replace('/logoIn')}}
                style={{
                  backgroundColor:Colors.primary,
                  borderRadius:15,
                  width:170,
                  height:50,
                }}>
          <Text
          style={{
            color:Colors.dark.text,
            fontSize:15,
            textAlign:'center',
            paddingVertical:14,
          }}
          >تسجيل الخروج</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Page;

const styles = StyleSheet.create({
})