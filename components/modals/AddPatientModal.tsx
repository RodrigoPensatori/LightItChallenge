import { IUserInfo } from '@/types';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, ScrollView } from 'react-native';
import MainInput from '../inputs/MainInput';
import MainButton from '../buttons/MainButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { verifyPatientData } from '@/utils/verifyPatientData';
import { showToast } from '@/utils/showToast';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type AddPatientModalProps = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
};

function ValidateData(name:string,description:string,website:string){
  const res = verifyPatientData(name, description, website);
  if(res){
    showToast( res,'ERROR', 'error');
   return false;
  }
  return true;
}

export default function AddPatientModal({modalVisible, setModalVisible }: AddPatientModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      
      >
        <KeyboardAwareScrollView>
        <ScrollView>
          <View style={styles.modalView}>
          <View style={styles.zIndex}>
              <Toast />
          </View>
          <View style={styles.modalHeader}>
          
              <Text style={styles.modalTitle}>ADD PATIENT</Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesomeIcon color='red' size={30} icon={faCircleXmark} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.viewData}>
              <Text style={styles.inputTitle}>Name</Text>
              <MainInput placeholder="Name" value={name} onChangeText={setName} />
            </View>
            <View style={styles.viewData}>
              <Text style={styles.inputTitle}>Description</Text>
              <MainInput placeholder="Description" value={description} onChangeText={setDescription} />
            </View>
            
            <View style={styles.viewData}>
              <Text style={styles.inputTitle}>WebSite</Text>
              <MainInput placeholder="WebSite" value={website} onChangeText={setWebsite} />
            </View>
            
            <View style={styles.viewData}>
              
              <MainButton title="ADD" onPress={() => {
                const res = ValidateData(name,description,website);
                console.log(res); 
                if (res){
                Alert.alert('OK', 'Patient saved');
                setModalVisible(false);
                }
              }} />
            </View>

          </View>
        </ScrollView>
        </KeyboardAwareScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  zIndex:{
    zIndex:1000
  },
  viewData:{
    marginBottom:15,
    width:'80%'
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
    marginBottom: 15,
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
