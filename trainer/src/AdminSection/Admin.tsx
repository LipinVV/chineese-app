import React from "react";
import {Access} from "./Access/Access";
import {Registration} from "./Access/Registration/Registration";
import {statusOfPersonalInfo} from "../Services/dataGetter";
import './admin.scss';

export const Admin = ({status}: any) => {

    return (
        <div className='admin'>Admin
            <Access/>
            {status  === false ? <Registration/> : 'yoho'}
            <div className='admin__data-updater'>Check the whole data
                <button
                    type='button'
                    onClick={statusOfPersonalInfo}>Check nicknames
                </button>
            </div>
        </div>
    )
}