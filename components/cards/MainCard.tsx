import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IUserInfo } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserPen } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/utils/formatDate';
import { openURL } from '@/utils/openURL';
import EditInfoModal from '../modals/EditInfoModal';
import Colors from '@/constants/Colors';

type MainCardProps = {
  user: IUserInfo;
  setIsRefreshing: (isRefreshing: boolean) => void;
};

export default function MainCard({user,setIsRefreshing}: MainCardProps) {

  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  
  useEffect(() => {
    setIsRefreshing(isShowModal)
  }, [isShowModal]);

  return (
    
    <View style={styles.shadowContainer} >
      <TouchableOpacity onPress={() => { setIsShowInfo(!isShowInfo)}}>  
        <View style={styles.container}>
          <View style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',  
            justifyContent: 'center',
          }}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.title}>{user.name}</Text>
          </View>
          <View style={{
            width: '10%',
          }}>
              {!isShowInfo ? (
                <FontAwesome style={{
            
                }} name="eye" color='black' />
              ):(
                <FontAwesome style={{
            
                }} name="eye-slash" color='black' />
              )}
              
          </View>
        </View>  
      </TouchableOpacity>  
      
       
      {
        isShowInfo && (
        <View style={styles.containerInfo}>
          <View style={styles.containerEditButton}>
            <TouchableOpacity onPress={() => (setIsShowModal(!isShowModal)
            )}>
              <FontAwesomeIcon icon={faUserPen} size={25} color='blue' />
            </TouchableOpacity>  
            
          </View>
          <View style={styles.containerInfoData}>
            <Text style={styles.containerInfoDataTitle}>Id : </Text>
            <Text style={styles.containerInfoDataText}>{user.id}</Text>
            
          </View>

          <View style={styles.containerInfoData}>
            <Text style={styles.containerInfoDataTitle}>Created : </Text>
            <Text style={styles.containerInfoDataText}>{formatDate(user.createdAt)}</Text>
          </View>

          <View style={{marginBottom: 10}}>
            <Text style={styles.containerInfoDataTitle}>Description : </Text>
            <Text style={styles.containerInfoDataText}>{user.description}</Text>
           </View>  
          
           <View style={styles.containerInfoData}>
            <Text style={styles.containerInfoDataTitle}>Website : </Text>
            <TouchableOpacity onPress={() => openURL(user.website)}>
              <Text style={styles.linkText}>{user.website}</Text>
            </TouchableOpacity>
            
          </View> 
          
        </View>
        )
      }

      {isShowModal && (
        <EditInfoModal modalVisible={isShowModal} setModalVisible={setIsShowModal} user={user} />
      
      )}
        
    </View>
    
    
    
    
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    width: '90%',
    backgroundColor: 'white', // Especificar un color de fondo para la vista contenida
  },
  containerEditButton:{
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 5,
  },
  
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15, // La mitad del ancho y alto para hacerlo redondo
    marginRight: 10, // Añadir un espacio entre la imagen y el texto
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  containerInfo: {
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    width: '90%',
    backgroundColor: 'white', // Especificar un color de fondo para la vista contenida
  },
  containerInfoData: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
  },

  containerInfoDataText: {
    fontSize: 14,
    
  },
  containerInfoDataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});