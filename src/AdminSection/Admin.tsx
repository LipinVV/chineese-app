import React from "react";
import './admin.scss';
import {WordCreatorFireBase} from "./WordCreator/WordCreatorFireBase";
//FIX IT
// {matchedUser} : string | undefined)
export const Admin = ({matchedUser} : any) => {


    return (
        <div className='admin'>Admin is: {matchedUser}
            <WordCreatorFireBase/>
        </div>
    )
}