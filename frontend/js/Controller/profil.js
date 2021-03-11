class ProfilController{
    constructor(request, view, user, sessionStorage, formValidator, carousel){
        this.request = request
        this.view = view
        this.user = user
        this.sessionStorage = sessionStorage
        this.formValidator = formValidator
        this.carousel = carousel

        this.user = {
            emailMask : "",
            lastName : "",
            firstName: "",
            avatarId: "",
            avatarUrl: ""
        } 

        this.routeUser = "http://localhost:3000/api/user/"
    }

    getUserInfos = () => {
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
                this.user = {...response.user}
                this.view.fillUserProfil(this.user)
            }
        })
    }
}

const pageProfil = new ProfilController(new Request(), new View(), new User(), new SessionStorage(), new FormValidator(), new Carousel())

pageProfil.getUserInfos()