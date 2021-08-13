import React from "react";
import {statusOfPersonalInfo} from "../Services/dataGetter";
import './admin.scss';
import {WordCreator} from "./WordCreator/WordCreator";


export const Admin = ({matchedUser}: any) => {


    return (
        <div className='admin'>Admin is: {matchedUser}
            {/*<button onClick={statusOfPersonalInfo} className='admin__button'>Get users</button>*/}
            <WordCreator/>
        </div>
    )
}