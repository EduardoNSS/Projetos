let modalQt = 1

const c = el => document.querySelector(el)
const cs = el => document.querySelectorAll(el)

pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--name').append(item.name)
    pizzaItem.querySelector('.pizza-item--desc').append(item.description)
    pizzaItem.querySelector('.pizza-item--price').append(`R$ ${item.price.toFixed(2)}`)
    pizzaItem.querySelector('a').addEventListener('click', e => {
        e.preventDefault()

        modalQt = 1

        let key = e.target.closest('.pizza-item').getAttribute('data-key')

        c('.pizzaBig img').src = pizzaJson[key].img
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

        c('.pizzaInfo--size.selected').classList.remove('selected')

        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

        c('.pizzaInfo--qt').innerHTML = modalQt

        c('.pizzaWindowArea').style.opacity = 0
        c('.pizzaWindowArea').style.display = 'flex'
        setTimeout(_ => {
            c('.pizzaWindowArea').style.opacity = 1
        }, 100)
    })

    c('.pizza-area').append(pizzaItem)
})

//Eventos modal
const closeModal = _ => {
    c('.pizzaWindowArea').style.opacity = 0
    setTimeout(_ => {
        c('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(item => {
    item.addEventListener('click', closeModal)
})

c('.pizzaInfo--qtmenos').addEventListener('click', _ => {
    if(modalQt > 1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt
    }

})

c('.pizzaInfo--qtmais').addEventListener('click', _ => {
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt
})

cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', e => {
        c('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})