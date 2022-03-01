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
        <div class="col shadow ">
        <div class="card h-100">
                <img class="w-75 mx-auto mt-3 mb-3" src="${brand.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title text-center">Name: ${brand.phone_name}</h5>
                <h5 class="card-title text-center">Brand: ${brand.brand}</h5>

            </div>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
         Details</button>
        </div>
    </div>`

        const cardsContainer = document.getElementById('cards-container')
        cardsContainer.appendChild(cards)
        console.log(cards);
    }
}