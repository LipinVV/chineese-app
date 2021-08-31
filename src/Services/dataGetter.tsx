import {server} from "../App";

export interface userInterface  {
    id: number,
    nickname: string,
    mail: string,
    globalPoints: number,
    sessionPoints: number
}

export const statusOfPersonalInfo = async () => {
    // FIX IT -> data: any
    const { data }: any = await server
        .from<userInterface>('users')
        .select('*')
    if(data.length !== 0) {
        return data
    }
}