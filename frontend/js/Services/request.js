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

    // initPostAuth(data, token){
    //     return  {
    //         method : "POST",
    //         headers : {
    //             "Content-Type" : "application/json",
    //             "Authorisation" : token
    //         },
    //         body : JSON.stringify(data)
    //     }
    // }

    // initPutAuth(data, token){
    //     return  {
    //         method : "PUT",
    //         headers : {
    //             "Content-Type" : "application/json",
    //             "Authorisation" : token
    //         },
    //         body : JSON.stringify(data)
    //     }
    // }
}
