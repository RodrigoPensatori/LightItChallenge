//Abrir URL en el navegador del dispositivo
import { Linking } from "react-native";

export function openURL(url:string){
    Linking.openURL(url).catch(err => console.error("Error = ", err));
  };