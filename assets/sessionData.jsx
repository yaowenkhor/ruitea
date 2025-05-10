import AsyncStorage from '@react-native-async-storage/async-storage';

export const _saveUserSession = async(id, name, email, phone) =>{
    try {
        await AsyncStorage.multiSet([['user_id', String(id)],['user_name', name], ['user_email', email], ['user_phone', String(phone)]]);
    } catch (error) {
        console.error("Error: ", error);
    }
}


export const _deleteUserSession = async() =>{
    try {
        await AsyncStorage.multiRemove(['user_id', 'user_name', 'user_email', 'user_phone','theme']);
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const _readUserSession = async() =>{
    try {
        const user_id = await AsyncStorage.getItem('user_id');
        const name = await AsyncStorage.getItem('user_name');
        const email = await AsyncStorage.getItem('user_email');
        const phone = await AsyncStorage.getItem('user_phone');

        return {user_id, name, email, phone}

    } catch (error) {
        console.error("Error: ", error);
    }
}
