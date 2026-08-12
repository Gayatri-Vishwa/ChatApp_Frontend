import React from 'react'
import { isValidUsername } from '6pp'

function usernameValidator(Username) {
    if(!isValidUsername(Username)){
        
        return   isValidUsername(Username) ? "" : "Username is invalid";
    }

}


export default usernameValidator

