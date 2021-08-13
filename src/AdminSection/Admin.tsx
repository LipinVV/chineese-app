import React from "react";
import {Access} from "./Access/Access";
import {Registration} from "./Access/Registration/Registration";
import {statusOfPersonalInfo} from "../Services/dataGetter";
import './admin.scss';

export const Admin = ({accessFn, state}: any) => {

    return (
        <div className='admin'>Admin

        </div>
    )
}


// in case of needed soon, or delete after a week
// <Access accessFn={accessFn} state={state}/>
// <br/>
// {!state && <Registration/>}
// <div className='admin__data-updater'>Check the whole data
//     <button
//         type='button'
//         onClick={statusOfPersonalInfo}>Check nicknames
//     </button>
// </div>