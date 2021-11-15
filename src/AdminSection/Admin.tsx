import React from "react";
import './admin.scss';
import {WordCreatorFireBase} from "./WordCreator/WordCreatorFireBase";

export const Admin = ({matchedUser} : any) => {
    return (
        <div className='admin'>Admin is: {matchedUser}
            <WordCreatorFireBase/>
        </div>
    )
}