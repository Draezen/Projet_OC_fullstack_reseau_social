class Like{
    constructor(){}

    createLike = (target , id, thumb) => {
        const cible = document.getElementById(target + id)

        switch(thumb){
            case "up":
                const thumbsUpElt = cible.querySelector(".fa-thumbs-up")
                const liked = thumbsUpElt.classList.contains("thumbs--liked")
                return liked ? {like: 0} : {like: 1}
                break
            case "down":
                const thumbsDownElt = cible.querySelector(".fa-thumbs-down")
                const disliked = thumbsDownElt.classList.contains("thumbs--disliked")
                return disliked ? {like: 0} : {like: -1}
                break
            default:
                break
        }
    }
}