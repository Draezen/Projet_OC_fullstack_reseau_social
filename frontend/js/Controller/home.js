class HomeController{
    constructor(request, view, user, sessionStorage, formValidator, like, comment, article){
        this.request = request
        this.view = view
        this.user = user
        this.sessionStorage = sessionStorage
        this.formValidator = formValidator
        this.like = like
        this.comment = comment
        this.article = article
        this.userProfil = {
            id: "",
            lastName: "",
            firstName: "",
            avatarUrl: "",
            role: ""
        } 

        this.userLikes = []

        this.routeArticles = "http://localhost:3000/api/articles"
        this.routeComments = "http://localhost:3000/api/comments"
        this.routeUser = "http://localhost:3000/api/user/"
        this.routeAvatars = "http://localhost:3000/api/avatars"
        this.routeLikes = "http://localhost:3000/api/likes"
    
        this.view.bindShowModalArticle(this.showModalArticle)

        this.view.bindDisconnectUser(this.disconnectUser)

    }


    show = () => {
        const token = this.sessionStorage.read("token")
        if(token){
            this.getUserInfos()
            this.getLikes()
            this.getAllArticles()
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

        this.view.createModalLoader(".page__container--home")

        getUser.then(response => {
            this.view.deleteModalLoader(".page__container--home")
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else {
                this.userProfil = {
                    id: response.user.id,
                    lastName: response.user.lastName,
                    firstName: response.user.firstName,
                    avatarUrl: response.user.avatarUrl,
                    role: response.user.role
                }
                   this.view.fillHomePage(this.userProfil)
            }
        })
    }

    getLikes = () => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initGetAuth(token)
        const getUserLikes = this.request.request(this.routeLikes, init)

        getUserLikes.then(response => {
            this.view.deleteModalLoader(".page__container--home")
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else if(response.error){
                console.error(response.error)
            }else {
                this.userLikes =  [...response]
            }
        })
    }

    getAllArticles = () => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initGetAuth(token)
        const getArticles = this.request.request(this.routeArticles, init)

        this.view.createModalLoader(".page__container--home")

        getArticles.then(response => {
            this.view.deleteModalLoader(".page__container--home")
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else if(response.error){
                //modal erreur
                console.error(response.error)
            }else {
                this.view.showArticles(response, this.userProfil)
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
                this.view.createModalServerDown(".page__container--home")
            }else if(response.error){
                //modal erreur
                console.error(response.error)
            }else {
                this.view.showComments(response, id, this.userProfil)
                this.view.colorLikes("comment", this.userLikes)
            }
        })
    }

    handleLikes = (target, id, thumb) => {
        switch (target){
            case "article" :
                const likeArticleValue = this.like.createLike(target, id, thumb)
                this.postLikeArticle(id, likeArticleValue)
                break
            case "comment" :
                const likeCommentValue = this.like.createLike(target, id, thumb)
                this.postLikeComment(id, likeCommentValue)
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
                this.view.createModalServerDown(".page__container--home")
            }else if(response.error){
                //modal erreur
                console.error(response.error)
            }else {
                this.getLikes()
                switch(response.message){
                    case "Like créé !":
                        this.view.updateLikes("article", id, data.like)
                        break
                    case "Like supprimé !":
                        this.view.updateLikes("article", id, data.like)
                        break
                    case "Vous avez déjà noté cet article !":
                        break
                    default:
                        break
                }
            }
        })
    }

    postLikeComment = (id, data) => {
        const token = this.sessionStorage.read("token")
        const routeLikeComment = this.routeComments + "/"+ id + "/like"
        const init = this.request.initPostAuth(data, token)

        const postLikeComment = this.request.request(routeLikeComment, init)

        postLikeComment.then(response => {
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else if(response.error){
                //modal erreur
                console.error(response.error)
            }else {
                this.getLikes()
                switch(response.message){
                    case "Like créé !":
                        this.view.updateLikes("comment", id, data.like)
                        break
                    case "Like supprimé !":
                        this.view.updateLikes("comment", id, data.like)
                        break
                    case "Vous avez déjà noté cet commentaire !":
                        break
                    default:
                        break
                }
            }
        })
    }

    showModalArticle = () => {
        this.view.createModalAddArticle(this.userProfil)
    }

   hideModalAddArticle = () => {
        this.view.deleteModalAddArticle()
    }

    handlePostArticle = (form) => {
        const image = document.getElementById("modalArticleImage").value

        this.view.loaderText("#modalMessage")

        if(image.length === 0){
            const data = this.article.createArticle(form)
            this.postArticle(data)
        }else {
            const dataMessage = this.article.createArticleWithImage(form)
            this.postArticleWithImage(dataMessage)
        }
    }

    postArticle = (data) => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initPostAuth(data, token)

        const postArticle = this.request.request(this.routeArticles, init)

        postArticle.then(response => {
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else{
                window.location.reload()
            }
        })
    }

    postArticleWithImage = (dataMessage) => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initPostArticleAuth(dataMessage, token)

        const postArticle = this.request.request(this.routeArticles, init)

        postArticle.then(response => {
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else{
                window.location.reload()
            }
        })
    }

    handleDeleteArticle = (idArticle) => {
        this.view.createModalDeleteArticle(idArticle)
    }

    deleteArticle = (idArticle) => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initDeleteAuth(token)
        const routeDeleteArticle = this.routeArticles + "/"+ idArticle

        const deleteArticle = this.request.request(routeDeleteArticle, init)

        deleteArticle.then(response => {
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else{
                this.view.deleteModalDeleteArticle()
                this.view.deleteArticle(idArticle)
            }
        })
    }

    showModalModifyArticle = (idArticle) => {
        this.view.createModalModifyArticle(this.userProfil, idArticle)
    }

    hideModalModifyArticle = () => {
        this.view.deleteModalModifyArticle()
    }

    handleModifyArticle = (idArticle, form) => {
        const image = document.getElementById("modalArticleImage").value

        this.view.loaderText("#modalMessage")

        if(image.length === 0){
            const data = this.article.createArticle(form)
            this.modifyArticle(data, idArticle)
        }else {
            const dataMessage = this.article.createArticleWithImage(form)
            this.modifyArticleWithImage(dataMessage, idArticle)
        }
    }

    modifyArticle = (data, idArticle) => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initPutAuth(data, token)

        const routeModifyArticle = this.routeArticles + "/" + idArticle

        const putArticle = this.request.request(routeModifyArticle, init)

        putArticle.then(response => {
            console.log(response);
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else{
                window.location.reload()
            }
        })
    }

    modifyArticleWithImage = (dataMessage, idArticle) => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initPutArticleAuth(dataMessage, token)

        const routeModifyArticle = this.routeArticles + "/" + idArticle

        const putArticle = this.request.request(routeModifyArticle, init)

        putArticle.then(response => {
            console.log(response);
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else{
                window.location.reload()
            }
        })
    }

    handlePostComment = (form, idArticle) => {
        form = this.formValidator.checkComment(form)

        if (form.length > 0){
            this.postComment(form, idArticle)
        } 
    }

    postComment = (form, idArticle) => {
        const token = this.sessionStorage.read("token")
        const comment = this.comment.createComment(form)
        const init = this.request.initPostAuth(comment, token)
        const routeCommentArticle = this.routeArticles + "/" + idArticle + "/comment"

        const postComment = this.request.request(routeCommentArticle, init)

        postComment.then(response => {
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else{
                this.view.emptyCommentField(idArticle)
                this.view.updateNbComments(idArticle, "add")
                const containerComments = this.view.addComment(idArticle)
                if(containerComments === "present") this.view.hideComments(idArticle)
                this.handleComments(idArticle)
            }
        })
    }

    deleteComment = (idComment, idArticle) => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initDeleteAuth(token)
        const routeDeleteComment =this.routeComments +"/" + idComment

        const deleteComment = this.request.request(routeDeleteComment, init)

        deleteComment.then(response => {
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else if(response.error){
                console.error(response.error)
            }else {
                this.view.deleteComment(idComment, idArticle)
                this.view.updateNbComments(idArticle, "remove")
            }
        })
    }

    editCommentText = (comment) => {
        this.view.modifyComment(comment)
    }

    handleModifyComment = (form, comment) => {
        form = this.formValidator.checkComment(form)

        if (form.length > 0){
            this.modifyComment(form, comment.id, comment.idArticle)
        } 
    }

    modifyComment = (form, idComment, idArticle) => {
        const token = this.sessionStorage.read("token")
        const comment = this.comment.createComment(form)
        const init = this.request.initPutAuth(comment, token)
        const routeModifyComment =this.routeComments +"/" + idComment

        const modifyComment = this.request.request(routeModifyComment, init)

        modifyComment.then(response => {
            if(response.name === "TypeError"){
                this.view.createModalServerDown(".page__container--home")
            }else{
                this.view.hideComments(idArticle)
                this.handleComments(idArticle)
            }
        })
    }

    disconnectUser = () => {
        this.sessionStorage.delete()
        window.location.href = "./index.html"
    }
}

const homePage = new HomeController(new Request(), new View(), new User(), new SessionStorage(), new FormValidator(), new Like(), new Comment(), new Article())

homePage.show()