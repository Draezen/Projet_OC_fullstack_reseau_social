class Request {
    constructor(){
    }

    async request (url, init) {
        try{
            const response = await fetch(url, init)
            if (response.ok) {
                const data = await response.json()
                return data
            } else {
                return response.json()
            }
        } catch(e) {
            console.log("Problème avec l'opération fetch");
            console.error(e)
            return e
        }
    }

    initPost(data){
        return  {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }
    }

    initPostAuth(data, token){
        return  {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + token
            },
            body : JSON.stringify(data)
        }
    }

    initPostArticleAuth(formData, token){
        return  {
            method : "POST",
            headers : {
                "Authorization" : "Bearer " + token
            },
            body : formData
        }
    }

    initPutAuthArticle(formData, token){
        return  {
            method : "PUT",
            headers : {
                "Authorization" : "Bearer " + token
            },
            body : (formData)
        }
    }

    initPutAuth(data, token){
        return  {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + token
            },
            body : JSON.stringify(data)
        }
    }

    initGetAuth(token){
        return  {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + token
            }
        }
    }

    initDeleteAuth(token){
        return  {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + token
            }
        }
    }
}
