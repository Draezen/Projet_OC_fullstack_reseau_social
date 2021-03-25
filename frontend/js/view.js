class View{
    constructor(){}

    errorMessage = (selector, content) => {
        let messageElt = document.querySelector(selector)
        messageElt.innerText = content
    }

    resetErrorMessage = (selector) => {
        const messageElt = document.querySelector(selector)
        messageElt.textContent =  "\u00A0"
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

    bindDisconnectUser(handler){
        const button = document.getElementById("disconnect")
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
            elt.style.background = "#157145"
            elt.style.color = "white"
            elt.classList.add("valide")
            this.errorMessage(idMessage, "\u00A0")
        }else {
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

    createElement = (tag, className, id, src, alt, textContent) => {
        const element = document.createElement(tag)
        element.tag = tag
        if(className) element.className = className
        if (id) element.id = id
        if (src) element.src = src
        if (alt) element.alt = alt
        element.textContent = textContent

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
        emailElt.value = user.email
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

    fillModalText = (id, text) => {
        const textElt = document.getElementById(id)
        textElt.textContent = text
    }

    bindShowModalArticle = (handler) => {
        const button = document.getElementById("postArticleButton")
        button.addEventListener("click", (e) => {
            handler()
        })
    }

    fillHomePage = (user) => {
        const avatarUserElt = document.querySelector(".articles__post--img")
        avatarUserElt.src = user.avatarUrl
    }

    getCreationTime = (time) => {
        const second = 1000, minute = second*60, hour = minute*60, day = hour*24, week = day*7, month = week*4, year = month*12;

        const dateCreation = new Date(time)
        const dateNow = new Date()

        const timeDiff =  dateNow - dateCreation

        if (isNaN(timeDiff)) return NaN;
        switch (true) {
            case timeDiff > year: 
                return date2.getFullYear() - date1.getFullYear() + " an(s)";
            case timeDiff > month: 
                return (
                    ( dateNow.getFullYear() * 12 + date2.getMonth() )
                    -
                    ( dateCreation.getFullYear() * 12 + date1.getMonth() )
            ) + " mois";
            case timeDiff > week  : 
                return Math.floor(timeDiff / week) + " semaine(s)";
            case (timeDiff > day) : 
                return Math.floor(timeDiff / day) + " jour(s)"; 
            case timeDiff > hour  : 
                return Math.floor(timeDiff / hour) + " heure(s)"; 
            case timeDiff > minute: 
                return Math.floor(timeDiff / minute) + " minute(s)";
            case timeDiff > second: 
                return Math.floor(timeDiff / second) + " seconde(s)";
            default: 
                return undefined;
        }
    }

    showArticles = (articles, user) => {
        const articlesContainer = document.querySelector(".articles__container")

        articles.forEach(article => {
            //create the article
            const articleElt = this.createElement("article", "article", `article${article.id}`)
            //create the 3 sections
            const headerElt = this.createElement("div", "article__header")
            const bodyElt = this.createElement("div", "article__body")
            const footerElt = this.createElement("div", "article__footer")

            articleElt.append(headerElt, bodyElt, footerElt)

            //fill the header
            const headerAvatarElt = this.createElement("img", "article__header--avatar", "", article.avatarUrl, "l'avatar du créateur de l'article" )
            const headerNameElt = this.createElement("p", "article__header--name", "", "", "", article.authorFirstName + " " + article.authorLastName)
            const headerDateElt = this.createElement("p", "article__header--date", "", "", "", "Posté il y a " + this.getCreationTime(article.dateCreation))
            const headerFormElt = this.createElement("form", "article__header--form")
            headerElt.append(headerAvatarElt, headerNameElt, headerDateElt, headerFormElt)
            
            const headerFormSelectElt = this.createElement("select", "", "articleEdit")
            headerFormSelectElt.addEventListener("change", function(){
                switch (this.value){
                    case "modify":
                        homePage.showModalModifyArticle(article.id)
                        break
                    case "delete":
                        homePage.handleDeleteArticle(article.id)
                        break
                    default :
                        break
                }
            })
            headerFormSelectElt.name = "articleEdit"
            headerFormSelectElt.setAttribute("aria-label", "Editer l'article")

            const authorArticle = article.authorFirstName + " " + article.authorLastName
            const username = user.firstName + " " + user.lastName
            if(authorArticle !==username && user.role !=="admin") headerFormSelectElt.disabled = "disabled"
            headerFormElt.appendChild(headerFormSelectElt)

            const headerFormEditElt = this.createElement("option")
            headerFormEditElt.value = "edit"
            headerFormEditElt.textContent = "--Editer--"
            const headerFormModifyElt = this.createElement("option")
            headerFormModifyElt.value = "modify"
            headerFormModifyElt.textContent = "Modifier"
            headerFormModifyElt.setAttribute("aria-label", "Modifier l'article")
            const headerFormDeleteElt = this.createElement("option")
            headerFormDeleteElt.value = "delete"
            headerFormDeleteElt.textContent = "Supprimer"
            headerFormDeleteElt.setAttribute("aria-label", "Supprimer l'article")
            headerFormSelectElt.append(headerFormEditElt, headerFormModifyElt, headerFormDeleteElt)

            //fill the body
            const bodyHeadingElt = this.createElement("h2", "article__body--heading", "", "", "", article.heading)
            bodyElt.appendChild(bodyHeadingElt)
            if(article.image !== null){
                const bodyImageElt = this.createElement("img", "article__body--img", "", article.image, "Une image postée par un utilisateur")
                bodyElt.appendChild(bodyImageElt)
            }
            if(article.text !== null){
                const bodyTextElt = this.createElement("p", "article__body--text", "", "", "", article.text)
                bodyElt.appendChild(bodyTextElt)
            }

            //fill the footer
            const footerStatsElt = this.createElement("div", "article__footer--stats")
            const footerCommentElt = this.createElement("div","article__footer--comment")
            footerElt.append(footerStatsElt, footerCommentElt)

            const footerCommentsElt = this.createElement("p", "article__footer--comments", "", "", "", article.nbComments + " commentaire(s)")    
            //shows comments
            footerCommentsElt.addEventListener("click", () => {
                homePage.handleComments(article.id)
            })    
            footerCommentsElt.addEventListener("keydown", (e) => {
                if (e.keyCode == 13){
                    homePage.handleComments(article.id)
                }
            })    
            footerCommentsElt.setAttribute("tabindex", "0")
            const footerLikesElt = this.createElement("p", "article__footer--likes")
            const footerNbLikesElt = this.createElement("span", "article__footer--nbLikes")
            footerNbLikesElt.textContent = article.nbLikes === null ? 0 : article.nbLikes
            const footerDislikesElt = this.createElement("p", "article__footer--dislikes")
            const footerNbDislikesElt = this.createElement("span", "article__footer--nbDislikes")
            footerNbDislikesElt.textContent = article.nbDislikes === null ? 0 : article.nbDislikes
            footerStatsElt.append(footerCommentsElt, footerLikesElt, footerDislikesElt)
            
            const thumbUp = this.createElement("i", "far fa-thumbs-up") 
            thumbUp.addEventListener("click", () => {
                homePage.handleLikes("article", article.id, "up")
            })
            thumbUp.addEventListener("keydown", (e) => {
                if (e.keyCode == 13){
                    homePage.handleLikes("article", article.id, "up")
                }
            })
            thumbUp.setAttribute("tabindex", "0")
            footerLikesElt.append(footerNbLikesElt, thumbUp)
            const thumbDown = this.createElement("i", "far fa-thumbs-down")
            thumbDown.addEventListener("click", () => {
                homePage.handleLikes("article", article.id, "down")
            })
            thumbDown.addEventListener("keydown", (e) => {
                if (e.keyCode == 13){
                    homePage.handleLikes("article", article.id, "down")
                }
            })
            thumbDown.setAttribute("tabindex", "0")
            footerDislikesElt.append(footerNbDislikesElt, thumbDown)

            const footerAvatarElt = this.createElement("img", "article__footer--avatar","", user.avatarUrl, "avatar de l'utilisateur")
            const footerFormElt = this.createElement("form", "article__footer--form")
            footerCommentElt.append(footerAvatarElt, footerFormElt)

            const footerInput = this.createElement("input")
            footerInput.type = "text"
            footerInput.placeholder = "Ecrivez un commentaire..."
            footerInput.setAttribute("aria-label", "Ecrivez un commentaire")
            //submit comment
            footerInput.addEventListener("keydown", (e) => {
                if (e.keyCode == 13){
                    e.preventDefault()
                    homePage.handlePostComment(footerInput.value, article.id)
                }
            })
            footerFormElt.appendChild(footerInput)

            articlesContainer.appendChild(articleElt)
        })
    }

    showComments = (comments, id, user) => {
        const commentsContainerElt = this.createElement("div", "article__footer--comments-container")
        const articleElt = document.getElementById("article"+id)
        const parentElt = articleElt.querySelector(".article__footer")
        const nodeBeforeElt = articleElt.querySelector(".article__footer--comment")

        parentElt.insertBefore(commentsContainerElt, nodeBeforeElt)

        comments.forEach(comment => {
            //create the com
            const commentElt = this.createElement("div", "comment", `comment${comment.id}`)
            // create the 3 sections
            const commentHeaderElt = this.createElement("div", "comment__header")
            const commentBodyElt = this.createElement("div", "comment__body")
            const commentFooterElt = this.createElement("div", "comment__footer")
            commentElt.append(commentHeaderElt, commentBodyElt, commentFooterElt)
            
            //header
            const headerAvatarElt = this.createElement("img", "comment__header--avatar", "", comment.avatarUrl, "l'avatar de l'auteur du commentaire")
            const headerNameElt = this.createElement("p", "comment__header--name", "", "", "", comment.authorFirstName + " " + comment.authorLastName)
            const headerFormElt = this.createElement("form", "comment__header--form")
            commentHeaderElt.append(headerAvatarElt, headerNameElt, headerFormElt)

            const headerFormSelectElt = this.createElement("select", "", "commentEdit")
            headerFormSelectElt.addEventListener("change", function(){
                switch (this.value){
                    case "modify":
                        homePage.editCommentText(comment)
                        break
                    case "delete":
                        homePage.deleteComment(comment.id, comment.idArticle)
                        break
                    default :
                        break
                }
            })
            headerFormSelectElt.name = "articleEdit"
            headerFormSelectElt.setAttribute("arai-label", "Editer le commentaire")
            
            const authorArticle = comment.authorFirstName + " " + comment.authorLastName
            const username = user.firstName + " " + user.lastName
            if(authorArticle !==username && user.role !=="admin") headerFormSelectElt.disabled = "disabled"
            headerFormElt.appendChild(headerFormSelectElt)

            const headerFormEditElt = this.createElement("option")
            headerFormEditElt.value = "edit"
            headerFormEditElt.textContent = "--Editer--"
            const headerFormModifyElt = this.createElement("option")
            headerFormModifyElt.value = "modify"
            headerFormModifyElt.textContent = "Modifier"
            const headerFormDeleteElt = this.createElement("option")
            headerFormDeleteElt.value = "delete"
            headerFormDeleteElt.textContent = "Supprimer"
            headerFormSelectElt.append(headerFormEditElt, headerFormModifyElt, headerFormDeleteElt)


            //body
            const bodyTextElt = this.createElement("p", "comment__body--text", "", "", "", comment.text)
            commentBodyElt.appendChild(bodyTextElt)
            //footer
            const footerLikesElt = this.createElement("p", "comment__footer--likes")
            const footerNbLikesElt = this.createElement("span", "comment__footer--nbLikes")
            footerNbLikesElt.textContent = comment.nbLikes === null ? 0 : comment.nbLikes
            const footerDislikesElt = this.createElement("p", "comment__footer--dislikes")
            const footerNbDislikesElt = this.createElement("span", "comment__footer--nbDislikes")
            footerNbDislikesElt.textContent = comment.nbDislikes === null ? 0 : comment.nbDislikes
            commentFooterElt.append(footerLikesElt, footerDislikesElt)
            
            const thumbUp = this.createElement("i", "far fa-thumbs-up")   
            thumbUp.addEventListener("click", () => {
                homePage.handleLikes("comment", comment.id, "up")
            })
            thumbUp.addEventListener("keydown", (e) => {
                if (e.keyCode == 13){
                    homePage.handleLikes("comment", comment.id, "up")
                }
            })
            thumbUp.setAttribute("tabindex", "0")
            footerLikesElt.append(footerNbLikesElt, thumbUp)
            const thumbDown = this.createElement("i", "far fa-thumbs-down")
            thumbDown.addEventListener("click", () => {
                homePage.handleLikes("comment", comment.id, "down")
            })
            thumbDown.addEventListener("keydown", (e) => {
                if (e.keyCode == 13){
                    homePage.handleLikes("comment", comment.id, "down")
                }
            })
            thumbDown.setAttribute("tabindex", "0")
            footerDislikesElt.append(footerNbDislikesElt, thumbDown)

            commentsContainerElt.appendChild(commentElt)
        })
    }

    hideComments = (id) => {
        const parentNode = document.getElementById("article"+id).querySelector(".article__footer")
        const commentsContainerElt = document.getElementById("article"+id).querySelector(".article__footer--comments-container")

        parentNode.removeChild(commentsContainerElt)
    }

    toggleComments = (id) =>{
        const commentsElt = document.getElementById("article"+id).querySelector(".article__footer--comments")
        const nbComments = commentsElt.innerText.split(" ")[0]
        if(nbComments > 0){
            const commentsContainerElt = document.getElementById("article"+id).querySelector(".article__footer--comments-container")
            if (commentsContainerElt === null){
                return "show"
            }else {
                return "hide"
            }
        }else {
            return undefined
        }
    }

    emptyCommentField = (id) => {
        const inputElt = document.getElementById("article" + id).querySelector("input")
        inputElt.value = ""
    }

    updateNbComments = (idArticle, action) => {
        const article = document.getElementById("article" + idArticle)
        const nbCommentsElt = article.querySelector(".article__footer--comments")
        let nbComments = nbCommentsElt.innerText.split(" ")[0]

        switch(action){
            case "add":
                nbComments ++
                nbCommentsElt.innerText = nbComments + " commentaire(s)"
                break
            case "remove":
                nbComments --
                nbCommentsElt.innerText = nbComments + " commentaire(s)"
                break
            default:
                break
        }
    }

    addComment = (idArticle) => {
        const articleElt = document.getElementById("article" + idArticle)
        const containerCommentsElt = articleElt.querySelector(".article__footer--comments-container")

        if(containerCommentsElt !== null){
            return "present"
        }
    }

    deleteComment = (idComment, idArticle) => {
        const articleElt = document.getElementById("article" + idArticle)
        const containerCommentsElt = articleElt.querySelector(".article__footer--comments-container")
        const commentElt = document.getElementById("comment" + idComment)

        containerCommentsElt.removeChild(commentElt)
    }

    modifyComment = (comment) => {
        const commentBodyElt = document.getElementById("comment" + comment.id).querySelector(".comment__body")
        const bodyTextElt = commentBodyElt.querySelector(".comment__body--text")

        const bodyFormElt = this.createElement("form", "comment__body--form")
        const bodyTextarea = this.createElement("textarea")
        bodyTextarea.value = comment.text
 
        //submit comment
        bodyTextarea.addEventListener("keydown", (e) => {
            if (e.keyCode == 13){
                e.preventDefault()
                homePage.handleModifyComment(bodyTextarea.value, comment)
            }
        })
        bodyTextarea.addEventListener("keyup", (e) => {
            e.preventDefault()       
            e.target.style.height = 0  
            e.target.style.height = e.target.scrollHeight + 10 + 'px'
        })
        bodyFormElt.appendChild(bodyTextarea)
        
        bodyTextElt.replaceWith(bodyFormElt)

        const textarea = commentBodyElt.querySelector(".comment__body--form").querySelector("textarea")
        textarea.style.height = textarea.scrollHeight + 10 + "px"
    }

    colorLikes = (selector, likes) => {
        switch(selector){
            case "article":
                likes.forEach(like => {
                    if(like.idArticle !== null){
                        const article = document.getElementById(selector + like.idArticle)
                        switch (like.likeDislike){
                            case 1:
                                const thumbsUpElt = article.querySelector(".fa-thumbs-up")
                                thumbsUpElt.classList.add("thumbs--liked")
                                break
                            case -1 :
                                const thumbsDownElt = article.querySelector(".fa-thumbs-down")
                                thumbsDownElt.classList.add("thumbs--disliked")
                                break
                            default :
                            break
                        }
                    }
                })
                break
            case "comment":
                likes.forEach(like => {
                    if(like.idComment !==null){
                        const comment = document.getElementById(selector + like.idComment)
                        if(comment !==null){
                            switch (like.likeDislike){
                                case 1:
                                    const thumbsUpElt = comment.querySelector(".fa-thumbs-up")
                                    thumbsUpElt.classList.add("thumbs--liked")
                                    break
                                case -1 :
                                    const thumbsDownElt = comment.querySelector(".fa-thumbs-down")
                                    thumbsDownElt.classList.add("thumbs--disliked")
                                    break
                                default :
                                break
                            }
                        }
                    }
                })
                break
            default:
                break
        }
    }

    updateLikes = (selector, id, like) => {
        const container = document.getElementById(selector + id)
        const thumbsUpElt = container.querySelector(".fa-thumbs-up")
        const thumbsDownElt = container.querySelector(".fa-thumbs-down")

        const nbLikesElt = container.querySelector(`.${selector}__footer--nbLikes`)
        let nbLikes = parseInt(nbLikesElt.innerText)
        const nbDislikesElt = container.querySelector(`.${selector}__footer--nbDislikes`)
        let nbDislikes = parseInt(nbDislikesElt.innerText)

        switch(like){
            case 1:
                thumbsUpElt.classList.add("thumbs--liked")
                nbLikesElt.innerText = nbLikes +1
                break
            case -1:
                thumbsDownElt.classList.add("thumbs--disliked")
                nbDislikesElt.innerText = nbDislikes +1
                break
            case 0:
                if(thumbsUpElt.classList.contains("thumbs--liked")){
                    thumbsUpElt.classList.remove("thumbs--liked")
                    nbLikesElt.innerText = nbLikes -1
                }

                if(thumbsDownElt.classList.contains("thumbs--disliked")){
                    thumbsDownElt.classList.remove("thumbs--disliked")
                    nbDislikesElt.innerText = nbDislikes -1
                }
                break
            default:
                break
        }
    }

    deleteArticle = (idArticle) => {
        const articleContainerElt = document.querySelector(".articles__container")
        const articleElt = document.getElementById("article" + idArticle)

        articleContainerElt.removeChild(articleElt)
    }

    showModal = (id) => {
        const modalElt = document.getElementById(id)
        modalElt.style.display = "flex"
    }

    hideModal = (id) => {
        const modalElt = document.getElementById(id)
        modalElt.style.display = "none"
    }

    createModalDeleteProfil = () => {
        const bodyElt = document.querySelector(".page__container--profil")

        const modalElt = this.createElement("section", "modal  modal__delete--profil", "modalDeleteProfil", )
        const modalContainerElt = this.createElement("div")
        modalElt.appendChild(modalContainerElt)

        const modalHeading = this.createElement("h2", "modal__heading", "", "", "", "Supprimer mon compte")
        const modalText = this.createElement("p", "modal__text", "deleteMessage", "", "", " Vous êtes sur le point de supprimer votre profil, en êtes vous sur ?")
        const modalButtonsContainerElt = this.createElement("div", "modal__buttons-container")
        modalContainerElt.append(modalHeading, modalText, modalButtonsContainerElt)
    
        const modalButtonValiateElt = this.createElement("button", "modal__button  button  button--blue", "confirmDeleteProfil", "", "", "Oui ! Supprimer")
        modalButtonValiateElt.addEventListener("click", () => {
            pageProfil.confirmDeleteProfil()
        })
        const modalButtonCancelElt = this.createElement("button", "modal__button  button  button--blue", "cancelDeleteProfil", "", "", "Non ! Annuler")
        modalButtonCancelElt.addEventListener("click", () => {
            pageProfil.cancelDeleteProfil()
        })
        modalButtonsContainerElt.append(modalButtonValiateElt, modalButtonCancelElt)

        bodyElt.appendChild(modalElt)
    }

    deleteModalDeleteProfil = () => {
        const bodyElt = document.querySelector(".page__container--profil")
        const modalElt = document.getElementById("modalDeleteProfil")

        bodyElt.removeChild(modalElt)
    }

    createModalAddArticle = (user) => {
        const bodyElt = document.querySelector(".page__container--home")

        const modalElt = this.createElement("section", "modal  modal__article", "modalAddArticle", )
        const modalContainerElt = this.createElement("div")
        modalElt.appendChild(modalContainerElt)

        const modalHeadingElt = this.createElement("div", "modal__heading  modal__heading--article")
        const modalUserElt = this.createElement("div", "modal__user")
        const formElt = this.createElement("form")
        formElt.addEventListener("submit", function(e) {
            e.preventDefault()
            homePage.handlePostArticle(this)
        })
        modalContainerElt.append(modalHeadingElt, modalUserElt, formElt)

        const modalHeaderElt = this.createElement("h2", "", "", "", "", "Ajouter un article")
        const modalCloseElt = this.createElement("p", "", "modalClose", "", "", "X")
        modalCloseElt.addEventListener("click", () => {
            homePage.hideModalAddArticle()
        })
        modalCloseElt.addEventListener("keydown", (e) => {
            if (e.keyCode == 13){
                homePage.hideModalAddArticle()
            }
        })
        modalCloseElt.setAttribute("aria-label", "Fermer la fenêtre de création d'article")
        modalCloseElt.setAttribute("tabindex", "0")
        modalHeadingElt.append(modalHeaderElt, modalCloseElt)

        const modalUserImgElt = this.createElement("img", "", "", user.avatarUrl, "l'avatar de l'utilisateur")
        const modalUsernameElt = this.createElement("p", "modal__user--name", "", "", "", user.firstName + " " + user.lastName)
        modalUserElt.append(modalUserImgElt, modalUsernameElt)

        const modalInputHeadingElt = this.createElement("input", "form__input-text  form__input-text--white", "modalArticleHeading")
        modalInputHeadingElt.type = "text"
        modalInputHeadingElt.name = "modalArticleHeading"
        modalInputHeadingElt.placeholder = "Titre"
        modalInputHeadingElt.required = "required"
        const modalTextAreaElt = this.createElement("textarea", "form__input-text  form__input-text--white  form__input-textarea", "modalArticleText")
        modalTextAreaElt.name = "modalArticleText"
        const modalFileElt = this.createElement("input", "form__input-file", "modalArticleImage")
        modalFileElt.type = "file"
        modalFileElt.name = "modalArticleImage"
        modalFileElt.accept = "image/*"
        const modalMessageElt = this.createElement("span", "form__message", "modalMessage", "", "", "\u00A0")
        const modalSubmitElt = this.createElement("input", "modal__button  button  button--blue  modal__button--article", "modalArticelSubmit")
        modalSubmitElt.type = "submit"
        modalSubmitElt.value = "Créer"
        formElt.append(modalInputHeadingElt, modalTextAreaElt, modalFileElt, modalMessageElt, modalSubmitElt)

        bodyElt.appendChild(modalElt)
    }

    deleteModalAddArticle = () => {
        const bodyElt = document.querySelector(".page__container--home")
        const modalElt = document.getElementById("modalAddArticle")

        bodyElt.removeChild(modalElt)
    }

    createModalDeleteArticle = (idArticle) => {
        const bodyElt = document.querySelector(".page__container--home")

        const modalElt = this.createElement("section", "modal  modal__delete--article", "modalDeleteArticle", )
        const modalContainerElt = this.createElement("div")
        modalElt.appendChild(modalContainerElt)

        const modalHeading = this.createElement("h2", "modal__heading", "", "", "", "Supprimer l'article")
        const modalText = this.createElement("p", "modal__text", "deleteMessage", "", "", " Vous êtes sur le point de supprimer cet article, en êtes vous sur ?")
        const modalButtonsContainerElt = this.createElement("div", "modal__buttons-container")
        modalContainerElt.append(modalHeading, modalText, modalButtonsContainerElt)
    
        const modalButtonValiateElt = this.createElement("button", "modal__button  button  button--blue", "confirmDeleteArticle", "", "", "Oui ! Supprimer")
        modalButtonValiateElt.addEventListener("click", () => {
            homePage.deleteArticle(idArticle)
        })
        const modalButtonCancelElt = this.createElement("button", "modal__button  button  button--blue", "cancelDeleteArticle", "", "", "Non ! Annuler")
        modalButtonCancelElt.addEventListener("click", () => {
            this.deleteModalDeleteArticle()
        })
        modalButtonsContainerElt.append(modalButtonValiateElt, modalButtonCancelElt)

        bodyElt.appendChild(modalElt)
    }

    deleteModalDeleteArticle = () => {
        const bodyElt = document.querySelector(".page__container--home")
        const modalElt = document.getElementById("modalDeleteArticle")

        bodyElt.removeChild(modalElt)
    }

    createModalModifyArticle = (user, idArticle) => {
        //get article content
        const articleElt = document.getElementById("article" + idArticle)
        const articleHeading = articleElt.querySelector(".article__body--heading").textContent
        const articleText = articleElt.querySelector(".article__body--text").textContent

        const bodyElt = document.querySelector(".page__container--home")

        const modalElt = this.createElement("section", "modal  modal__article", "modalModifyArticle", )
        const modalContainerElt = this.createElement("div")
        modalElt.appendChild(modalContainerElt)

        const modalHeadingElt = this.createElement("div", "modal__heading  modal__heading--article")
        const modalUserElt = this.createElement("div", "modal__user")
        const formElt = this.createElement("form")
        formElt.addEventListener("submit", function(e) {
            e.preventDefault()
            homePage.handleModifyArticle(idArticle, this)
        })
        modalContainerElt.append(modalHeadingElt, modalUserElt, formElt)

        const modalHeaderElt = this.createElement("h2", "", "", "", "", "Modifier l'article")
        const modalCloseElt = this.createElement("p", "", "modalClose", "", "", "X")
        modalCloseElt.addEventListener("click", () => {
            homePage.hideModalModifyArticle()
        })
        modalCloseElt.addEventListener("keydown", (e) => {
            if (e.keyCode == 13){
                homePage.hideModalModifyArticle()
            }
        })
        modalCloseElt.setAttribute("aria-label", "Fermer la fenête de modification de l'article")
        modalCloseElt.setAttribute("tabindex", "0")
        modalHeadingElt.append(modalHeaderElt, modalCloseElt)

        const modalUserImgElt = this.createElement("img", "", "", user.avatarUrl, "l'avatar de l'utilisateur")
        const modalUsernameElt = this.createElement("p", "modal__user--name", "", "", "", user.firstName + " " + user.lastName)
        modalUserElt.append(modalUserImgElt, modalUsernameElt)

        const modalInputHeadingElt = this.createElement("input", "form__input-text  form__input-text--white", "modalArticleHeading")
        modalInputHeadingElt.type = "text"
        modalInputHeadingElt.name = "modalArticleHeading"
        modalInputHeadingElt.value = articleHeading
        modalInputHeadingElt.required = "required"
        const modalTextAreaElt = this.createElement("textarea", "form__input-text  form__input-text--white  form__input-textarea", "modalArticleText")
        modalTextAreaElt.name = "modalArticleText"
        modalTextAreaElt.textContent = articleText
        const modalFileElt = this.createElement("input", "form__input-file", "modalArticleImage")
        modalFileElt.type = "file"
        modalFileElt.name = "modalArticleImage"
        modalFileElt.accept = "image/*"
        const modalMessageElt = this.createElement("span", "form__message", "modalMessage", "", "", "\u00A0")
        const modalSubmitElt = this.createElement("input", "modal__button  button  button--blue  modal__button--article", "modalArticelSubmit")
        modalSubmitElt.type = "submit"
        modalSubmitElt.value = "Modifier"
        formElt.append(modalInputHeadingElt, modalTextAreaElt, modalFileElt, modalMessageElt, modalSubmitElt)

        bodyElt.appendChild(modalElt)
    }

    deleteModalModifyArticle = () => {
        const bodyElt = document.querySelector(".page__container--home")
        const modalElt = document.getElementById("modalModifyArticle")

        bodyElt.removeChild(modalElt)
    }

    createModalServerDown = (body) => {
        const modalServerDown = document.querySelector(".modal__server-down")
        if(modalServerDown === null){
            const bodyElt = document.querySelector(body)

            const modalElt = this.createElement("section", "modal  modal__server-down",)
            const modalContainerElt = this.createElement("div")
            modalElt.appendChild(modalContainerElt)

            const modalHeading = this.createElement("h2", "modal__heading", "", "", "", "Problème de connexion")
            const modalText = this.createElement("p", "modal__text", "", "", "", " Veuillez réessayer dans quelques instants !")
            modalContainerElt.append(modalHeading, modalText)
        
            bodyElt.appendChild(modalElt)  
        }

    }

    createModalLoader = (body) => {
        const modalLoader = document.querySelector(".modal__loader")
        if(modalLoader === null){
            const bodyElt = document.querySelector(body)
    
            const modalElt = this.createElement("section", "modal  modal__loader")
            const modalContainerElt = this.createElement("div")
            modalElt.appendChild(modalContainerElt)
    
            const loaderHeadingElt = this.createElement("h2", "modal__heading", "", "", "", "Chargement")
            const loaderElt = this.createElement("div", "lds-roller")
    
            //création des noeuds pour l'animation
            modalContainerElt.append(loaderHeadingElt,loaderElt)
    
            for (let i = 0; i < 8; i++) {
                const divElt = this.createElement("div", "div__loader")
                loaderElt.appendChild(divElt)
            }
    
            bodyElt.appendChild(modalElt)
        }
    }

    deleteModalLoader = (body) => {
        const modalLoader = document.querySelector(".modal__loader")
        if(modalLoader !== null){
            const bodyElt = document.querySelector(body)
            const modalElt = document.querySelector(".modal__loader")

            bodyElt.removeChild(modalElt)
        }
    }

    getFocus = (id) => {
        document.getElementById(id).focus()
    }
    
}