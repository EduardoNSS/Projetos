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

        let key = e.target.closest('.pizza-item').getAttribute('data-key')

        c('.pizzaBig img').src = pizzaJson[key].img
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

        c('.pizzaWindowArea').style.opacity = 0
        c('.pizzaWindowArea').style.display = 'flex'
        setTimeout(_ => {
            c('.pizzaWindowArea').style.opacity = 1
        }, 100)
    })

    c('.pizza-area').append(pizzaItem)
})