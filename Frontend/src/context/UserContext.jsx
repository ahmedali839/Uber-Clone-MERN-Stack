import React, { createContext, useState } from 'react'

// export const createsContext = createContext()
export const UserDataContext = createContext()

export const UserContext = ({ children }) => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        fullName: {
            firstName: "",
            lastName: ""
        }
    });

    return (

        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>

        </div>
    )
}

export default UserContext