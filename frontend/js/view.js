class View{
    constructor(){}

    errorMessage = (selector, content) => {
        let messageElt = document.querySelector(selector)
        messageElt.innerText = content
    }

    bindFormLoginSubmit(handler){
        const form = document.getElementById("formLogin").querySelector("form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            handler(form)
        })
    }

    bindFormSignupSubmit(handler){
        const form = document.getElementById("formSignup").querySelector("form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            handler(form)
        })
    }

    bindFormProfilModify(handler){
        const button = document.getElementById("profilFormEdit")
        button.addEventListener("click", (e) => {
            handler()
        })
    }

    bindFormProfilSubmit(handler){
        const form = document.getElementById("formProfil").querySelector("form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            handler(form)
        })
    }

    bindFormPasswordSubmit(handler){
        const form = document.getElementById("formPassword").querySelector("form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            handler(form)
        })
    }

    bindDeleteUserButton(handler){
        const button = document.getElementById("profilDelete")
        button.addEventListener("click", (e) => {
            e.preventDefault()
            handler()
        })
    }

    bindCheckFormLoginEmail(handler){
        const field = document.getElementById("loginEmail")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormLoginPassword(handler){
        const field = document.getElementById("loginPassword")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormSignupEmail(handler){
        const field = document.getElementById("signupEmail")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormSignupPassword(handler){
        const field = document.getElementById("signupPassword")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormSignupConfirmPassword(handler){
        const field = document.getElementById("signupConfirmPassword")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormSignupLastName(handler){
        const field = document.getElementById("signupLastName")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormSignupFirstName(handler){
        const field = document.getElementById("signupFirstName")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormProfilEmail(handler){
        const field = document.getElementById("profilEmail")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormProfilLastName(handler){
        const field = document.getElementById("profilLastName")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormProfilFirstName(handler){
        const field = document.getElementById("profilFirstName")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormProfilFirstOldPassword(handler){
        const field = document.getElementById("profilOldPassword")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormProfilFirstNewPassword(handler){
        const field = document.getElementById("profilNewPassword")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormProfilFirstConfirmPassword(handler){
        const field = document.getElementById("profilConfirmPassword")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    valideFormInput = (id, valideInput, idMessage, message) => {
        const elt = document.getElementById(id)
        if(valideInput){
            //elt.style.border = "3px solid green"
            elt.style.background = "#157145"
            elt.style.color = "white"
            elt.classList.add("valide")
            this.errorMessage(idMessage, "\u00A0")
        }else {
            //elt.style.border = "3px solid red"
            elt.style.background = "#9b1d31"
            elt.style.color = "white"
            if(message) this.errorMessage(idMessage, message)
            document.getElementById(id).classList.remove("valide")
        }
    }

    emptyFormField = (id) => {
        const elt = document.getElementById(id)
        elt.value = ""
    }

    // showModal = (id) => {
    //     const elt = document.getElementById(id)
    //     elt.style.display = "flex"
    // }

    createElement = (tag, className, id, src, alt) => {
        const element = document.createElement(tag)
        element.tag = tag
        if(className) element.className = className
        if (id) element.id = id
        element.src = src
        element.alt = alt

        return element
    }

    createCarousel = (avatars, id) => {
        const carouselElt = document.querySelector(".avatar__carousel")
        const active = id ? id -1 : 0
        const next = active === avatars.length -1 ? 0 : active +1
        const preview = active === 0 ? avatars.length -1 : active -1

        for (let i in avatars){
            const avatarElt = this.createElement("img", "avatar__carousel--img", "", avatars[i].url, avatars[i].id)
           
            if (i == active) avatarElt.classList.add("active")
            if ( i == next ) avatarElt.classList.add("next")
            if (i == preview ) avatarElt.classList.add("prev")

            carouselElt.appendChild(avatarElt)
        }
    }

    resetAvatarProfil = () => {
        const avatarElt = document.querySelector(".avatar__carousel--img")
        avatarElt.remove()

        const arrowsElt = document.querySelectorAll(".avatar__carousel--arrow")

        arrowsElt.forEach(arrow => {
            arrow.classList.remove("hidden")
        })

    }

    fillUserProfil = (user) => {
        const helloElt = document.querySelector(".profil__hello")
        const avatarCarousel = document.querySelector(".avatar__carousel--profil")
        const emailElt = document.getElementById("profilEmail")
        const LastNameElt = document.getElementById("profilLastName")
        const firstNameElt = document.getElementById("profilFirstName")
        const avatarElt = this.createElement("img", "avatar__carousel--img  active", "", user.avatarUrl, user.avatarId)


        helloElt.textContent = "Bonjour " + user.firstName +" " + user.lastName
        avatarCarousel.appendChild(avatarElt)
        emailElt.placeholder = user.emailMask
        LastNameElt.value = user.lastName
        firstNameElt.value = user.firstName
    }

    toggleButtonFormProfil = () => {
        const modifyButtonElt = document.getElementById("profilFormEdit")
        const submitButtonElt = document.getElementById("profilFormSubmit")

        modifyButtonElt.classList.remove("button--show")
        modifyButtonElt.classList.add("button--hide")

        submitButtonElt.classList.remove("button--hide")
        submitButtonElt.classList.add("button--show")
    }

    enableEditProfil = () => {
        const profilEmail = document.getElementById("profilEmail")
        const profilLastName = document.getElementById("profilLastName")
        const profilFirstName = document.getElementById("profilFirstName")

        profilEmail.removeAttribute("disabled")
        profilLastName.removeAttribute("disabled")
        profilFirstName.removeAttribute("disabled")
    }

    loaderText = (selector) => {
        const messageElt = document.querySelector(selector)
        messageElt.textContent="Envoie en cours ..."
    }

    showModal = (id) => {
        const modalElt = document.getElementById(id)
        modalElt.style.display = "flex"
    }

    hideModal = (id) => {
        const modalElt = document.getElementById(id)
        modalElt.style.display = "none"
    }

    fillModalText = (id, text) => {
        const textElt = document.getElementById(id)
        textElt.textContent = text
    }

    bindConfirmDeleteProfil(handler){
        const button = document.getElementById("confirmDeleteProfil")
        button.addEventListener("click", (e) => {
            handler()
        })
    }

    bindCancelDeleteProfil(handler){
        const button = document.getElementById("cancelDeleteProfil")
        button.addEventListener("click", (e) => {
            handler()
        })
    }

}