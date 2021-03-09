class User {
    constructor(){}

    login = (form) => {
        const user = {
            email : form.elements.loginEmail.value,
            password : form.elements.loginPassword.value
        }
        return user
    }

    signup = (form) => {
        const user = {
            email : form.elements.signupEmail.value,
            password : form.elements.signupPassword.value
        }
        return user
    }

}