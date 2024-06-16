import { IUserInfo } from '@/types';
import React, { useRef, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, ScrollView } from 'react-native';
import MainInput from '../inputs/MainInput';
import MainButton from '../buttons/MainButton';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { verifyPatientData } from '@/utils/verifyPatientData';
import Toast from 'react-native-toast-message';
import { showToast } from '@/utils/showToast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


type MainModalProps = {
  user: IUserInfo;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
};



function ValidateData(name:string,description:string,website:string){
  
  const res = verifyPatientData(name, description, website);
  console.log(res);
  if(res){
    showToast( res,'ERROR', 'error');
   
    return false;
  }
  return true;
   
}



export default function EditInfoModal({ user, modalVisible, setModalVisible }: MainModalProps) {
  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);
  const [website, setWebsite] = useState(user.website);
  
  return (
    <>
   
    
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <KeyboardAwareScrollView>
        <View style={styles.centeredView}>
        <ScrollView>
        <Toast />
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
            
              <Text style={styles.modalTitle}>EDIT USER #{user.id}</Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesomeIcon color='red' size={30} icon={faCircleXmark} />
              </TouchableOpacity>
            </View>
            
            <View>
            <View style={styles.viewData}>
              <Text style={styles.inputTitle}>Name</Text>
              <MainInput placeholder="Name" value={name} onChangeText={setName} />
            </View>
            <Toast />

           

            <View style={styles.viewData}>
              <Text style={styles.inputTitle}>Description</Text>
              <MainInput placeholder="Description" value={description} onChangeText={setDescription} />
            </View>
            
            <View style={styles.viewData}>
              <Text style={styles.inputTitle}>WebSite</Text>
              <MainInput placeholder="WebSite" value={website} onChangeText={setWebsite} />
            </View>
            
            <View style={styles.viewData}>
               
              <MainButton title="Save" onPress={() => {
                const res = ValidateData(name,description,website);
                if (res){
                  showToast( 'Patient Saved','SAVED', 'success');
                  
                  // Alert.alert('OK', 'User saved');
                }
                  
              }} />
            </View>
            </View>
            
            
          </View>
          
         
        </ScrollView>
        </View>
        </KeyboardAwareScrollView>
      </Modal>
   
  </>  
  );

};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  viewData:{
    marginBottom:15,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
