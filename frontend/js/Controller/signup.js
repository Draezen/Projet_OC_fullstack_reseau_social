class SignupController{
    constructor(request, view, user, sessionStorage, formValidator, carousel){
        this.request = request
        this.view = view
        this.user = user
        this.sessionStorage = sessionStorage
        this.formValidator = formValidator
        this.carousel = carousel

        this.routeSignup = "http://localhost:3000/api/auth/signup"
        this.routeLogin =  "http://localhost:3000/api/auth/login"
        this.routeAvatars = "http://localhost:3000/api/avatars"

        this.view.bindCheckFormSignupEmail(this.handleSignupEmail)
        this.view.bindCheckFormSignupPassword(this.handleSignupPassword)
        this.view.bindCheckFormSignupConfirmPassword(this.handleSignupConfirmPassword)
        this.view.bindCheckFormSignupLastName(this.handleSignupLastName)
        this.view.bindCheckFormSignupFirstName(this.handleSignupFirstName)
        this.view.bindFormSignupSubmit(this.signup)

    }

    signup = (form) => {
        const user = this.user.signup(form)
        const init = this.request.initPost(user)
        const signup = this.request.request(this.routeSignup, init)

        const formValide = document.getElementsByClassName("signup__input  valide") 

        if(formValide.length === 5){
            signup.then(response => {
                console.log(response);
                if(response.name === "TypeError"){
                    this.view.errorMessage("#signupMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
                } else if(response.error){
                    this.view.errorMessage("#signupMessage", "Email invalide !")
                } else if(response.errors){
                    this.view.errorMessage("#signupMessage", response.errors[0].msg)
                }else {
                    const login = this.request.request(this.routeLogin, init)

                    login.then(response => {
                        if(response.name === "TypeError"){
                            this.view.errorMessage("#signupMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
                        } else if(response.error){
                            this.view.errorMessage("#signupMessage", response.error)
                        }else {
                            this.sessionStorage.create("token", response.token)
                            this.sessionStorage.create("userId", response.userId)
                            window.location.href = "./home.html"
                        }
                   })
                }
                })
        } else {
            this.view.errorMessage("#authMessage", "Formulaire non valide ! Vérifiez les informations entrées !")
        }
    }

    handleSignupEmail = (elt) => {
        const regex = /\b[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("signupEmail", valideInput, "#signupMessage")
    }
    
    handleSignupPassword = (elt) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%^*\-+_/]).{8,}$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.emptyFormField("signupConfirmPassword")
        this.view.valideFormInput("signupPassword", valideInput,"#signupMessage")
    }

    handleSignupConfirmPassword = (elt) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%^*\-+_/]).{8,}$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        if(valideInput){
            const validePassword = this.formValidator.checkConfirmPassword("signupConfirmPassword", "signupPassword")
            this.view.valideFormInput("signupConfirmPassword", validePassword,"#signupMessage")
        }else {
            this.view.valideFormInput("signupConfirmPassword", valideInput,"#signupMessage")
        }
    }

    handleSignupLastName = (elt) => {
        const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("signupLastName", valideInput, "#authMessage")
    }

    handleSignupFirstName = (elt) => {
        const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("signupFirstName", valideInput, "#authMessage")
    }

    carouselHandler = () => {
        const token = this.sessionStorage.read("token")
        const init = this.request.initGetAuth(token)
        const getAvatars = this.request.request(this.routeAvatars, init)

        getAvatars.then(response => {
            if(response.error){
                console.error(response)
            }else {
                this.view.createCarousel(response)
                this.carousel.start(response)
            }
        })
    }
}

const signupPage = new SignupController(new Request(), new View(), new User(), new SessionStorage(), new FormValidator(), new Carousel())

signupPage.carouselHandler()
