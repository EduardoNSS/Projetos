let cart = []
let modalQt = 1
let modalKey = 0

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
        modalKey = key

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

c('.pizzaInfo--addButton').addEventListener('click', e => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'))

    let indentifier = pizzaJson[modalKey].id + "@" + size
    let key = cart.findIndex((item) => item.indentifier == indentifier)

    if (key >= 0){
        cart[key].qt += modalQt
    }else{
        cart.push({
        indentifier,
        id: pizzaJson[modalKey].id,
        size,
        qt: modalQt
        })
    }

    updateCart()
    closeModal()
})

c('.menu-openner').addEventListener('click', _=>{
    if(cart.length > 0){
        c('aside').style.left = '0'
    }
})

c('.menu-closer').addEventListener('click', _=> {
    c('aside').style.left = '100vw'
})

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length

    if(cart.length > 0){
        c('aside').classList.add("show")
        c('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0


        for(let i in cart){
            let pizzaItem = pizzaJson.find(item => item.id == cart[i].id)
            let cartItem = c('.models .cart--item').cloneNode(true)

            subtotal += pizzaItem.price * cart[i].qt

            let pizzaSize = ''
            switch (cart[i].size) {
                case 0:
                    pizzaSize = 'P'
                    break;
                case 1:
                    pizzaSize = 'M'
                    break;
                case 2:
                    pizzaSize = 'G'
                    break;                  
            
                default:
                    break;
            }

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (${pizzaSize})`
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', _ => {
                if(cart[i].qt > 1){
                    cart[i].qt--;                    
                }else{
                    cart.splice(i, 1)
                }

                updateCart()
            
            })
            
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', _ => {
                cart[i].qt++;
                updateCart()
            })

            c('.cart').append(cartItem)

            desconto = subtotal * 0.1
            total = subtotal - desconto

            c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
            c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
            c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
        }
    }else{
        c('aside').classList.remove("show")
        c('aside').style.left = '100vw'
    }
}