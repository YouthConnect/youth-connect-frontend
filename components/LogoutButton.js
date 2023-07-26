import { ThemeContext, UserContext } from "../App";
import { Button } from 'native-base'
import React, { useContext, useState, useEffect } from 'react'

export default function LogoutButton(){
    const { themeButtonStyle } = useContext(ThemeContext)
    const { user, room, setUser } = useContext(UserContext)
    
    const handleLogout = () => setUser(null) ;

    return(
        <Button
        style={[themeButtonStyle]}
        mt={10}
        size={'sm'}
        onPress={handleLogout}
      >
        Log Out
      </Button>
    )
}