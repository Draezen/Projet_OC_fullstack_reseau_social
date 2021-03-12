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
                //serveur hs
                 console.error(response)
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
        this.view.enableFormProfil()
    }

    modifyProfil = (form) => {
        const user = this.user.updateUser(form)
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
}

const pageProfil = new ProfilController(new Request(), new View(), new User(), new SessionStorage(), new FormValidator(), new Carousel())

pageProfil.show()