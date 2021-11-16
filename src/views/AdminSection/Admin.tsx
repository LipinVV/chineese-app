import React from "react";
import {WordConstructor} from "./WordCreator/WordConstructor";
import './admin.scss';

export const Admin = ({matchedUser} : any) => {
    return (
        <div className='admin'>Admin is: {matchedUser}
            <WordConstructor/>
        </div>
    )
}