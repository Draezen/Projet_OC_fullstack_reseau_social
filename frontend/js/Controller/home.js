class HomeController{
    constructor(request, view, user, sessionStorage){
        this.request = request
        this.view = view
        this.user = user
        this.sessionStorage = sessionStorage
        this.userProfil = {
            lastName : "",
            firstName: "",
            avatarUrl: ""
        } 

        this.routeArticles = "http://localhost:3000/api/articles"
        this.routeComments = "http://localhost:3000/api/comments"
        this.routeUser = "http://localhost:3000/api/user/"
        this.routeAvatars = "http://localhost:3000/api/avatars"
    }

    show = () => {
        const token = this.sessionStorage.read("token")
        if(token){
            this.getUserInfos()
            this.getArticles()
        }else {
            window.location.href = "./index.html"
        }
    }

    getUserInfos = () => {
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
                this.userProfil = {
                    lastName:response.user.lastName,
                    firstName:response.user.firstName,
                    avatarUrl:response.user.avatarUrl
                }
            }
        })
    }

    getArticles = () => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initGetAuth(token)
        const getArticles = this.request.request(this.routeArticles, init)

        getArticles.then(response => {
            if(response.name === "TypeError"){
                console.error(reponse.name)
                //modal erreur
                //this.view.errorMessage("#homeMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
            }else if(response.error){
                //modal erreur
                console.error(response.error)
            }else {
                this.view.showArticles(response, this.userProfil)
            }
        })
    }

    handleComments = (id) => {
        const commentsContainer = this.view.toggleComments(id)
        if(!commentsContainer){
            this.getComments(id) 
        }else {
            this.view.hideComments(id)
        }
    }
    
    getComments = (id) => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initGetAuth(token)
        const routeComments = this.routeComments + "/" +id
        const getComments = this.request.request(routeComments, init)

        getComments.then(response => {
            if(response.name === "TypeError"){
                console.error(reponse.name)
                //modal erreur
                //this.view.errorMessage("#homeMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
            }else if(response.error){
                //modal erreur
                console.error(response.error)
            }else {
                // console.log(response);
                // console.log(id);
                this.view.showComments(response, id)
            }
        })

    }
}

const homePage = new HomeController(new Request(), new View(), new User(), new SessionStorage(), new FormValidator())

homePage.show()