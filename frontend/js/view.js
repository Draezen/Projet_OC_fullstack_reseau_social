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

    // bindFormProfilSubmit(handler){
    //     const form = document.getElementById("modalAuth").querySelector("form")
    //     form.addEventListener("submit", (e) => {
    //         e.preventDefault()
    //         handler(form)
    //     })
    // }

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
        const field = document.getElementById("authLastName")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    bindCheckFormSignupFirstName(handler){
        const field = document.getElementById("authFirstName")
        field.addEventListener("blur", elt => {
           handler(elt)
        })
    }

    valideFormInput = (id, valideInput, idMessage, message) => {
        const elt = document.getElementById(id)
        if(valideInput){
            elt.style.border = "3px solid green"
            elt.classList.add("valide")
            this.errorMessage(idMessage, "\u00A0")
        }else {
            elt.style.border = "3px solid red"
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
        const next = active +1
        const preview = id ? active -1 :avatars.length -1

        for (let i in avatars){
            const avatarElt = this.createElement("img", "avatar__carousel--img", "", avatars[i].url, avatars[i].id)
           
            if (i == active) avatarElt.classList.add("active")
            if ( i == next ) avatarElt.classList.add("next")
            if (i == preview ) avatarElt.classList.add("prev")

            carouselElt.appendChild(avatarElt)
        }
    }

    fillUserProfil = (user) => {
        const helloElt = document.querySelector(".profil__hello")
        const avatarElt = document.querySelector(".avatar__carousel--img.active")
        const emailElt = document.getElementById("emailProfil")
        const LastNameElt = document.getElementById("lastNameProfil")
        const firstNameElt = document.getElementById("firstNameProfil")

        helloElt.textContent = "Bonjour " + user.firstName +" " + user.lastName
        emailElt.placeholder = user.emailMask
        LastNameElt.placeholder = user.lastName
        firstNameElt.placeholder = user.firstName
    }

}