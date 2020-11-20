import React from 'react';

// Used to store global user data
const UserData = {
    isAuthenticated: false,
    accessToken: '',
    refreshToken: '',
    name: 'testing',
    email: '',
}

// Used to update context from chold Component
const setUserData = (name, value) => ({
    ...UserData,
    [name]: value,
});

const UserContext = React.createContext(UserData, setUserData)

 export default UserContext;