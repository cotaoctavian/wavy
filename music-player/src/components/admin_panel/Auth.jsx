import React from 'react';

class Auth extends React.Component{

    constructor() {
        super();
        this.authenticated = false;
    }

    login(){
        this.authenticated = true;
    }

    logout() {
        this.authenticated = false
    }

    isAuthenticated() {
        return this.authenticated;
    }
    
};

export default new Auth();