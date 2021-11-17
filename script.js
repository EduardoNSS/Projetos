const c = el => document.querySelector(el)
const cs = el => document.querySelectorAll(el)

pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true)

    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--name').append(item.name)
    pizzaItem.querySelector('.pizza-item--desc').append(item.description)
    pizzaItem.querySelector('.pizza-item--price').append(`R$ ${item.price.toFixed(2)}`)

    c('.pizza-area').append(pizzaItem)
})