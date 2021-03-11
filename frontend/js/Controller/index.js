class IndexController{
    constructor(request, view, user, sessionStorage, formValidator){
        this.request = request
        this.view = view
        this.user = user
        this.sessionStorage = sessionStorage
        this.formValidator = formValidator

        this.routeLogin =  "http://localhost:3000/api/auth/login"

        this.view.bindCheckFormLoginEmail(this.handleLoginEmail)
        this.view.bindCheckFormLoginPassword(this.handleLoginPassword)

        this.view.bindFormLoginSubmit(this.login)
    }

    login = (form) => {
        const user = this.user.login(form)
        const init = this.request.initPost(user)
        const login = this.request.request(this.routeLogin, init)

        const formValide = document.getElementsByClassName("login__input  valide") 

        if(formValide.length === 2){
            login.then(response => {
                if(response.name === "TypeError"){
                    this.view.errorMessage("#loginMessage", "Problème de connexion ! Veuillez réessayer dans quelques instants !")
                } else if(response.error){
                    this.view.errorMessage("#loginMessage", response.error)
                }else {
                    this.sessionStorage.create("token", response.token)
                    this.sessionStorage.create("userId", response.userId)
                    window.location.href = "./home.html"
                }
           })
        }else {
            this.view.errorMessage("#loginMessage", "Formulaire non valide ! Vérifiez les informations entrées !")
        }
    }

    handleLoginEmail = (elt) => {
        const regex = /\b[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("loginEmail", valideInput, "#loginMessage")
    }
    
    handleLoginPassword = (elt) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%^*\-+_/]).{8,}$/;
        const valideInput = this.formValidator.checkInputField(elt, regex)
        this.view.valideFormInput("loginPassword", valideInput,"#loginMessage")
    }
}

const indexPage = new IndexController(new Request(), new View(), new User(), new SessionStorage(), new FormValidator())