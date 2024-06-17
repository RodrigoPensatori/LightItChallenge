import { IUserInfo } from "@/types";
import axios from "axios";

//Obtener datos de los usuarios
export const getUsersInfoApi = async (): Promise<IUserInfo | null> => {
    try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/users`);
        return res.data;
    } catch (error) {
        console.log(error);
    }

    return null;
};

//Obtener dato de 1 usuario a partir del nombre
export const getUserInfoApi = async (name: string): Promise<IUserInfo | null> => {
    try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/users`);
        const users: IUserInfo[] = res.data;
        const usersArray:IUserInfo[]=[];
        
        const matchingUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        if (matchingUsers.length > 0) {
            //@ts-ignore
            return matchingUsers;
         null;
        }
    } catch (error) {
        console.error(error);
    }

    return null;
};

//editar usuario
export const editUserInfoApi = async (id:string,name:string,description:string,website:string) => {
    try {
        const res = await axios.patch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/user/${id}`, {name,description,website});

        return res.data;
    } catch (error) {
        console.log(error);
    }

    return null;
};

//agregar usuario
export const addUserApi = async (name:string,description:string,website:string) => {
    try {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_BASE_URL}/user/add`, {name,description,website});

        return res.data;
    } catch (error) {
        console.log(error);
    }

    return null;
};