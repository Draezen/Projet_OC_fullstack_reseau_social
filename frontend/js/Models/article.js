class Article {
    constructor(){}

    createArticle = (form) => {
        const article = {
            heading : form.elements.modalArticleHeading.value,
            text : form.elements.modalArticleText.value
        }
            return article
        }

    createArticleWithImage = (form) => {
        const article = {
            heading : form.elements.modalArticleHeading.value,
            text : form.elements.modalArticleText.value
        }

        const dataMessage = new FormData()
        dataMessage.append("article", JSON.stringify(article))
        dataMessage.append("image", form.elements.modalArticleImage.files[0])

        return dataMessage
    }

}