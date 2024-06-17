import MainCard from '@/components/cards/MainCard';
import { getUserInfoApi, getUsersInfoApi } from '@/services/PatientsServices';
import { IUserInfo } from '@/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faFilter } from '@fortawesome/free-solid-svg-icons'
import AddPatientModal from '@/components/modals/AddPatientModal';
import MainInput from '@/components/inputs/MainInput';
import MainButton from '@/components/buttons/MainButton';
import Header from '@/components/header/Header';


const timeout = 100;
export default function index() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [users, setUsers] = useState<IUserInfo[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  
  const [refreshing, setRefreshing] = useState(false);
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  
  const getUsersInfo = async () => {
    setIsLoadingUsers(true);
    
    const apiUsers = await getUsersInfoApi();
    setUsers(Array.isArray(apiUsers) && apiUsers.length > 0 ? apiUsers : []);
    setTimeout(() => {
      setIsLoadingUsers(false);
    }, timeout);
};

const getUserInfo = async () => {
  setIsLoadingUsers(true);
  
  const apiUser = await getUserInfoApi(nameFilter);
  setUsers(Array.isArray(apiUser) && apiUser.length > 0 ? apiUser : []);
  setTimeout(() => {
    setIsLoadingUsers(false);
  }, timeout);
};

useEffect(() => {
  getUsersInfo(); 
}, []);

useEffect(() => {
  if (isShowModalAdd === false){
    getUsersInfo(); 
  }  

}, [isShowModalAdd]);

useEffect(() => {
  if (isRefreshing == false){
    getUsersInfo(); 
  }  

}, [isRefreshing]);

useEffect(() => {
  if (isShowFilters == false){
    getUsersInfo(); 
  }  

}, [isShowFilters]);

    
  return (
      
      <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getUsersInfo}/>}
      >
      <Header/>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={{
          width: '100%',
          alignItems: 'flex-end', 
          justifyContent: 'flex-end', 
          paddingHorizontal: 10, 
          paddingVertical: 5,
          flexDirection: 'row',
          }}>
          
          <TouchableOpacity  onPress={()=>{
            setIsShowFilters(!isShowFilters)
          }}>
            <FontAwesomeIcon icon={faFilter} color='#CB271A' size={30}/>
          </TouchableOpacity>
          
          <TouchableOpacity style={{marginLeft:10}} onPress={()=>{
              setIsShowModalAdd(!isShowModalAdd)
            }}>
              <FontAwesomeIcon icon={faCirclePlus} color='blue' size={30}/>
          </TouchableOpacity>
        
        </View>

        {/* Filtros */}
        {isShowFilters && (
          <View style={{ marginBottom:30, width:'80%', height:45,flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{width:'70%'}}><MainInput value={nameFilter} placeholder='Name' onChangeText={setNameFilter}></MainInput></View>
            
            <MainButton title='Search' onPress={()=>{getUserInfo()}}></MainButton>
          </View>
        )}

         {/* Carga de las Cards de pacientes */}
        {!isLoadingUsers ?
        
        (
          
          users.length ===0 || users== null? (
              <Text>No users found :c</Text>
    
            
          ) : (
          
            //Carga de Pacientes
            <FlatList data={users} renderItem={({ item }) => 
            
              <View style={styles.separator} >
                <MainCard setIsRefreshing={setIsRefreshing} user={item} />
              </View>
          
          } />
          )
          
          
        ): 
        (
            <ActivityIndicator color='blue' size="large" />
            
            
        )}
        
         {/* Modal para agregar Pacientes */}
        {isShowModalAdd && (
          <AddPatientModal
            modalVisible={isShowModalAdd}
            setModalVisible={setIsShowModalAdd}
          />
        )}
        


      
      </View>
      
      </ScrollView>
   
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
  },
});
