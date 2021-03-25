
class Carousel {
    constructor(){
        this.slider = document.querySelector(".avatar__carousel");
        this.slides = "";
        this.button = document.querySelectorAll(".avatar__carousel--arrow");

        this.current = 0
        this.prev = 9
        this.next = 1
        this.max = 10
    }

    start = (avatarId = 0) => {   
        this.slides = document.querySelectorAll(".avatar__carousel--img");   
        this.current = avatarId
        this.next = this.current +1
        this.max = this.slides.length
        this.prev = this.max -1 ;

        for (let i = 0; i < this.button.length; i++) {
            this.button[i].addEventListener("click", () => i == 0 ? this.gotoPrev() : this.gotoNext());
        }

        for (let i = 0; i < this.button.length; i++) {
            this.button[i].addEventListener("keydown", (e) => {
                if(e.keyCode === 13){
                    i == 0 ? this.gotoPrev() : this.gotoNext()}
                }
                )
        }
    }

    gotoPrev = () => {
        this.current > 0 ? this.gotoNum(this.current - 1) : this.gotoNum(this.slides.length - 1);
    }

    gotoNext = () => {
        this.current < this.max-1 ? this.gotoNum(this.current + 1) : this.gotoNum(0);
    }

    gotoNum = (number) => {
        this.current = number;
        this.prev = this.current - 1;
        this.next = this.current + 1;

        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.remove("active");
            this.slides[i].classList.remove("prev");
            this.slides[i].classList.remove("next");
        }
    
        if (this.next == this.max) {
            this.next = 0;
        }
    
        if (this.prev == -1) {
            this.prev = this.max -1;
        }
    
        this.slides[this.current].classList.add("active");
        this.slides[this.prev].classList.add("prev");
        this.slides[this.next].classList.add("next");
    }

}
