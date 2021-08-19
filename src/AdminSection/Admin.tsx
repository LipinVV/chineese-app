import React from "react";
import './admin.scss';
import {WordCreator} from "./WordCreator/WordCreator";


export const Admin = ({matchedUser}: any) => {


    return (
        <div className='admin'>Admin is: {matchedUser}
            <WordCreator/>
        </div>
    )
}