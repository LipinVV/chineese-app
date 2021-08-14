import {server} from "../App";
import {wordInterface} from "../AdminSection/WordCreator/WordCreator";
import {wordCard} from "../types/types";

export interface userInterface  {
    id: number,
    nickname: string,
    mail: string,
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

export const getWordsDataBase = async () => {
    const { data }: any = await server
        .from<wordCard>('database')
        .select('*')
    return data
}