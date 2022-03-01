console.log('where is the problem');
const getButton = () => {
    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}

const displayPhones = phones => {
    for (const brand of phones) {
        const cards = document.createElement('div')
        console.log(brand.phone_name);
        cards.innerHTML = `
        <div class="col">
        <div class="card h-100">
                <img src="${brand.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">Name: ${brand.phone_name}</h5>
                <h5 class="card-title">Brand: ${brand.brand}</h5>

            </div>
            <div class="card-footer">
                <button>Details</button>
            </div>
        </div>
    </div>`

        const cardsContainer = document.getElementById('cards-container')
        cardsContainer.appendChild(cards)
        console.log(cards);
    }
}