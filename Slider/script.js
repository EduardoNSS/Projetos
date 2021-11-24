let totalSlides = document.querySelectorAll('.slider--item').length
let currentSlide = 0

document.querySelector('.slider--width').style.width = `calc(100vw * ${totalSlides})`
document.querySelector('.slider--controls').style.height = `${document.querySelector('.slider').clientHeight}px`

function voltar(){
    currentSlide--
    if(currentSlide < 0)
        currentSlide = totalSlides - 1
    
    updateMargin()
}

function avancar(){
    currentSlide++
    if( currentSlide > (totalSlides - 1))
        currentSlide = 0

    updateMargin()
}

function updateMargin(){
    let newMargin = (currentSlide * document.querySelector('.slider--item').clientWidth)
    document.querySelector('.slider--width').style.marginLeft = `-${newMargin}px`

}

setInterval(avancar, 4000)