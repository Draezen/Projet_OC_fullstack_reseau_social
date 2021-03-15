class ProfilController{
    constructor(request, view, user, sessionStorage, formValidator, carousel){
        this.request = request
        this.view = view
        this.user = user
        this.sessionStorage = sessionStorage
        this.formValidator = formValidator
        this.carousel = carousel
        this.userProfil = {
            emailMask : "",
            lastName : "",
            firstName: "",
            avatarId: "",
            avatarUrl: ""
        } 

        this.routeUser = "http://localhost:3000/api/user/"
        this.routeAvatars = "http://localhost:3000/api/avatars"

        this.view.bindCheckFormProfilEmail(this.handleProfilEmail)
        this.view.bindCheckFormProfilLastName(this.handleProfilLastName)
        this.view.bindCheckFormProfilFirstName(this.handleProfilFirstName)
        this.view.bindFormProfilModify(this.editProfil)
        this.view.bindFormProfilSubmit(this.modifyProfil)

        this.view.bindCheckFormProfilFirstOldPassword(this.handleProfilOldPassword)
        this.view.bindCheckFormProfilFirstNewPassword(this.handleProfilNewPassword)
        this.view.bindCheckFormProfilFirstConfirmPassword(this.handleProfilConfirmPassword)
        this.view.bindFormPasswordSubmit(this.modifyPassword)

        this.view.bindDeleteUserButton(this.deleteProfil)
        this.view.bindConfirmDeleteProfil(this.confirmDeleteProfil)
        this.view.bindCancelDeleteProfil(this.cancelDeleteProfil)
    }

    show = () => {
        const token = this.sessionStorage.read("token")
        if(token){
            this.getProfilInfos()
        }else {
            window.location.href = "./index.html"
        }
    }

    getProfilInfos = () => {
        const token = this.sessionStorage.read("token")
        const userId = this.sessionStorage.read("userId")
        const init = this.request.initGetAuth(token)
        const routeUserId = this.routeUser + userId
        const getUser = this.request.request(routeUserId, init)

        getUser.then(response => {
            if(response.name === "TypeError"){
                this.view.errorMessage("#profilMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
            }else if(response.error){
                console.error(response.error)
            }else {
                this.userProfil = {...response.user}
                this.view.fillUserProfil(this.userProfil)
            }
        })
    }

    editProfil = () => {
        this.view.toggleButtonFormProfil()
        this.view.enableEditProfil()
        this.carouselHandler()
    }

    modifyProfil = (form) => {
        const formValide = document.getElementsByClassName("profil__input  valide") 

        if(formValide.length === 3){
            const token = this.sessionStorage.read("token")
            const userId = this.sessionStorage.read("userId")
            const routeModifyProfil = this.routeUser + userId + "/modifyProfil"
            const user = this.user.updateUser(form)
            const init = this.request.initPutAuth(user, token)
            const updateUser = this.request.request(routeModifyProfil, init)

            this.view.loaderText("#profilMessage")

            updateUser.then(response => {
                if(response.name === "TypeError"){
                    this.view.errorMessage("#profilMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
                }else {
                    window.location.href = "./profil.html"
                }
            })
        }else {
            this.view.errorMessage("#profilMessage", "Formulaire non valide ! Vérifiez les informations entrées !")
        }
    }

    handleProfilEmail = (elt) => {
        const regex = /\b[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("profilEmail", valideInput, "#profilMessage")
    }    

    handleProfilLastName = (elt) => {
        const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("profilLastName", valideInput, "#profilMessage")
    }    

    handleProfilFirstName = (elt) => {
        const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("profilFirstName", valideInput, "#profilMessage")
    }    

    carouselHandler = () => {
        const getAvatars = this.request.request(this.routeAvatars)

        getAvatars.then(response => {
            if(response.name === "TypeError"){
                this.view.errorMessage("#profilMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
            }else if(response.error){
                console.error(response)
            }else {
                this.view.resetAvatarProfil()
                this.view.createCarousel(response, this.userProfil.avatarId)
                this.carousel.start(this.userProfil.avatarId -1)
            }
        })
    }

    modifyPassword = (form) => {
        const formValide = document.getElementsByClassName("password__input  valide") 

        if(formValide.length === 3){
            const token = this.sessionStorage.read("token")
            const userId = this.sessionStorage.read("userId")
            const routeModifyPassword = this.routeUser + userId + "/modifyPassword"
            const user = this.user.updatePassword(form)
            const init = this.request.initPutAuth(user, token)
            const updatePassword = this.request.request(routeModifyPassword, init)

            this.view.loaderText("#passwordMessage")

            updatePassword.then(response => {
                if(response.name === "TypeError"){
                    this.view.errorMessage("#passwordMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
                }else if(response.error){
                    this.view.errorMessage("#passwordMessage", response.error)
                }else if(response.errors){
                    this.view.errorMessage("#passwordMessage", response.errors[0].msg)
                }else {
                    window.location.href = "./index.html"
                }
            })
        }else {
            this.view.errorMessage("#passwordMessage", "Formulaire non valide ! Vérifiez les informations entrées !")
        }
    }

    handleProfilOldPassword = (elt) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%^*\-+_/]).{8,}$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("profilOldPassword", valideInput,"#passwordMessage")
    }

    handleProfilNewPassword = (elt) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%^*\-+_/]).{8,}$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.emptyFormField("profilConfirmPassword")
        this.view.valideFormInput("profilNewPassword", valideInput,"#passwordMessage")
    }

    handleProfilConfirmPassword = (elt) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%^*\-+_/]).{8,}$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        if(valideInput){
            const validePassword = this.formValidator.checkConfirmPassword("profilConfirmPassword", "profilNewPassword")
            this.view.valideFormInput("profilConfirmPassword", validePassword,"#passwordMessage", "Vos mots de passe doivent être identiques !")
        }else {
            this.view.valideFormInput("profilConfirmPassword", valideInput,"#passwordMessage")
        }
    }

    deleteProfil = () => {
        this.view.showModal("modalDeleteProfil")
    }

    confirmDeleteProfil = () => {
        const token = this.sessionStorage.read("token")
        const userId = this.sessionStorage.read("userId")
        const routeDeleteProfil = this.routeUser + userId 
        const init = this.request.initDeleteAuth(token)
        const deleteUser = this.request.request(routeDeleteProfil, init)

        deleteUser.then(response => {
            if(response.name === "TypeError"){
                this.view.errorMessage("#deleteMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
            }else if(response.error){
                this.view.errorMessage("#deleteMessage", response.error)
            }else {
                window.location.href = "./index.html"
            }
        })
    }

    cancelDeleteProfil = () => {
        this.view.hideModal("modalDeleteProfil")
        this.view.fillModalText("deleteMessage", "Vous êtes sur le point de supprimer votre profil, en êtes vous sur ?")
    }
}

const pageProfil = new ProfilController(new Request(), new View(), new User(), new SessionStorage(), new FormValidator(), new Carousel())

pageProfil.show()