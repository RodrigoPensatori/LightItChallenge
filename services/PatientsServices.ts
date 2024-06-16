import { IUserInfo } from "@/types";
import axios from "axios";

export const getUsersInfoApi = async (): Promise<IUserInfo | null> => {
    try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/users`);
       
        return res.data;
    } catch (error) {
        console.log(error);
    }

    return null;
};

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

export const editUserInfoApi = async (user:IUserInfo) => {
    try {
        const res = await axios.patch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/user/${user.id}`, user);

        return res.data;
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const addUserApi = async (name:string,description:string,website:string) => {
    try {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_BASE_URL}/user/add`, {name,description,website});

        return res.data;
    } catch (error) {
        console.log(error);
    }

    return null;
};