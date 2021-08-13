import {server} from "../App";

interface users  {
    id: number,
    nickname: string,
    mail: string,
}

export const statusOfPersonalInfo = async () => {
    // FIX IT -> data: any
    const { data }: any = await server
        .from<users>('users')
        .select('*')
    if(data.length !== 0) {
        console.log('users', data)
        return data
    }
}

export const statusOfProducts= async () => {
    const { data } = await server
        .from('products')
        .select('*')
    console.log(data)
}