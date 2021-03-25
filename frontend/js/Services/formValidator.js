class FormValidator{
    constructor(){}

    //check input
    checkRegex = (input, regex) => {
        if (!regex.test(input.target.value)) {
            return false;
        }
    }

    checkInputField = (input, regex) => {
        const valide = this.checkRegex(input, regex)
        if(valide === false){
            return false
        }else {
            return true
        }
    }

    checkConfirmPassword = (idConfirmPassword, idPassword) => {
        const password = document.getElementById(idPassword).value
        const confirmPassword = document.getElementById(idConfirmPassword).value

        return confirmPassword === password
    }

    checkComment = (input) => {
        const form = input.trim()

        return form
    }

    checkArticleHeading = (form) => {
        const formHeading = form.elements.modalArticleHeading.value
        const heading = formHeading.trim()

        return heading
    }
}