//Mostrar Notificaciones en la pantalla
import Toast from "react-native-toast-message";


type ToastTypes = {
    type: 'error' | 'success' | 'info';
}

export function showToast(message:string,title:string,type:string) {
    Toast.show({
        type: type,
        text1: title,
        text2: message,
        position: 'top',
        visibilityTime: 4000,
      });
}