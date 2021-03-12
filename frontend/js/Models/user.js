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
        const avatarId = document.querySelector(".avatar__carousel--img.active").alt
        const user = {
            email : form.elements.signupEmail.value,
            password : form.elements.signupPassword.value,
            lastName : form.elements.signupLastName.value,
            firstName : form.elements.signupFirstName.value,
            avatarId : avatarId
        }
        return user
    }

    // createUser = (form) => {
    //     const avatarId = document.querySelector(".avatar__carousel--img.active").alt
    //     const user = {
    //         lastName : form.elements.authLastName.value,
    //         firstName : form.elements.authFirstName.value,
    //         avatarId : avatarId
    //     }
    //     return user
    // }

    updateUser = (form) => {
        const avatarId = document.querySelector(".avatar__carousel--img.active").alt
        const user = {
            lastName : form.elements.profilLastName.value,
            firstName : form.elements.profilFirstName.value,
            avatarId : avatarId
        }
        return user
    }
}