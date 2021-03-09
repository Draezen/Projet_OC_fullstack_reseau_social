class SessionStorage {
    constructor(){}

    create = (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }
    
    // read = (key) => {
    //     return JSON.parse(localStorage.getItem(key))
    // }
}