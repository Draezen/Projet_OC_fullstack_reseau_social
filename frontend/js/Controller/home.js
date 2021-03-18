class HomeController{
    constructor(request, view, user, sessionStorage, formValidator, like){
        this.request = request
        this.view = view
        this.user = user
        this.sessionStorage = sessionStorage
        this.formValidator = formValidator
        this.like = like
        this.userProfil = {
            lastName: "",
            firstName: "",
            avatarUrl: ""
        } 

        this.userLikes = []

        this.routeArticles = "http://localhost:3000/api/articles"
        this.routeComments = "http://localhost:3000/api/comments"
        this.routeUser = "http://localhost:3000/api/user/"
        this.routeAvatars = "http://localhost:3000/api/avatars"
        this.routeLikes = "http://localhost:3000/api/likes"
    }

    show = () => {
        const token = this.sessionStorage.read("token")
        if(token){
            this.getUserInfos()
            this.getLikes()
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

    getLikes = () => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initGetAuth(token)
        const getUserLikes = this.request.request(this.routeLikes, init)

        getUserLikes.then(response => {
            if(response.name === "TypeError"){
                this.view.errorMessage("#profilMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
            }else if(response.error){
                console.error(response.error)
            }else {
                this.userLikes =  [...response]
                //console.log(this.userLikes);
                //this.view.colorLikes("article", this.userLikes)
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
                this.view.showArticles(response, this.userProfil, this.userLikes)
                this.view.colorLikes("article", this.userLikes)
            }
        })
    }

    handleComments = (id) => {
        const commentsContainer = this.view.toggleComments(id)
        switch(commentsContainer){
            case "show":
                this.getComments(id) 
                break
            case "hide":
                this.view.hideComments(id)
                break
            default:
                break
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
                this.view.showComments(response, id)
                this.view.colorLikes("comment", this.userLikes)
            }
        })
    }

    handleLikes = (target, id, thumb) => {
        switch (target){
            case "article" :
                const likeArticleValue = this.like.createLike(target, id, thumb)
                //console.log(likeArticleValue);
                this.postLikeArticle(id, likeArticleValue)
                //this.view.colorLikes(target, this.userLikes)
                break
            case "comment" :
                const likeCommentValue = this.like.createLike(target, id, thumb)
                //console.log(likeCommentValue);
                this.postLikeComment(id, likeCommentValue)
                //this.view.colorLikes(target, this.userLikes)
                break
            default :
            break
        }
    } 

    postLikeArticle = (id, data) => {
        const token = this.sessionStorage.read("token")
        const routeLikeArticle = this.routeArticles + "/"+ id + "/like" 
        const init = this.request.initPostAuth(data, token)

        const postLikeArticle = this.request.request(routeLikeArticle, init)

        postLikeArticle.then(response => {
            if(response.name === "TypeError"){
                console.error(response.name)
                //modal erreur
                //this.view.errorMessage("#homeMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
            }else if(response.error){
                //modal erreur
                console.error(response.error)
            }else {
                this.getLikes()
                switch(response.message){
                    case "Like créé !":
                        console.log(response.message);
                        this.view.updateLikes("article", id, data.like)
                        break
                    case "Like supprimé !":
                        console.log(response.message);
                        this.view.updateLikes("article", id, data.like)
                        break
                    case "Vous avez déjà noté cet article !":
                        console.log(response.message);
                        break
                    default:
                        break
                }
            }
        })
    }

    postLikeComment = (id, data, thumb) => {
        const token = this.sessionStorage.read("token")
        const routeLikeComment = this.routeComments + "/"+ id + "/like"
        const init = this.request.initPostAuth(data, token)

        const postLikeComment = this.request.request(routeLikeComment, init)

        postLikeComment.then(response => {
            if(response.name === "TypeError"){
                console.error(reponse.name)
                //modal erreur
                //this.view.errorMessage("#homeMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
            }else if(response.error){
                //modal erreur
                console.error(response.error)
            }else {
                this.getLikes()
                console.log(response);
                switch(response.message){
                    case "Like créé !":
                        console.log(response.message);
                        this.view.updateLikes("comment", id, data.like)
                        break
                    case "Like supprimé !":
                        console.log(response.message);
                        this.view.updateLikes("comment", id, data.like)
                        break
                    case "Vous avez déjà noté cet commentaire !":
                        console.log(response.message);
                        break
                    default:
                        break
                }
            }
        })
    }
}

const homePage = new HomeController(new Request(), new View(), new User(), new SessionStorage(), new FormValidator(), new Like())

homePage.show()