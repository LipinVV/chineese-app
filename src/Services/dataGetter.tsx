import {server} from "../App";

export const statusOfPersonalInfo = async () => {
    const { data } = await server
        .from('users')
        .select('*')
    console.log(data)
}

export const statusOfProducts= async () => {
    const { data } = await server
        .from('products')
        .select('*')
    console.log(data)
}