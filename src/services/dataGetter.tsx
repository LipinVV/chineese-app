import {server} from "./server";

export interface userInterface  {
    id: number,
    nickname: string,
    mail: string,
    globalPoints: number,
    sessionPoints: number
}

export const statusOfPersonalInfo = async () => {
    const { data }: any = await server
        .from<userInterface>('users')
        .select('*')
    if(data.length !== 0) {
        return data
    }
}