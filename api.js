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
        cards.innerHTML = `
        <div class="col shadow ">
        <div class="card h-100">
                <img class="w-75 mx-auto mt-3 mb-3" src="${brand.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title text-center">Name: ${brand.phone_name}</h5>
                <h5 class="card-title text-center">Brand: ${brand.brand}</h5>

            </div>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="updateDetails('${brand.slug}')">
         Details</button>
        </div>
    </div>`

        const cardsContainer = document.getElementById('cards-container')
        cardsContainer.appendChild(cards)

    }
}
const updateDetails = id => {
    const detailsUrl = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(detailsUrl)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}
const displayDetails = details => {
    const detailsDiv = document.createElement('div')
    console.log();
    detailsDiv.innerHTML = `
    <div class="container">
    <div class="row">
        <div class="col-5 text-center">
            <img class="mt-3 mb-3" width="250px"
                src="${details.image}" alt="">
        </div>
        <div class="col-7">
            <div class="">
                <h1>${details.name}</h1>
                <h3>Brand:${details.brand}</h3>
                <p>Released 2021, September 24</p>
                <h3>Features:</h3>
                <p>>Storage: ${details.storage}</p>
                <p>>Display:${details.displaySize}</p>
                <p>>Chipset: ${details.chipSet}</p>
                <p>>Memory:${details.memory}<p>
                <h3>sensors:</h3>
                <p>${details.sensors}</p>
            </div>
        </div>
    </div>

</div>`
    const modalBody = document.getElementById('modal-body')
    modalBody.appendChild(detailsDiv)



}


const clearModal = () => {
    const modalBody = document.createElement('modal-body').innerHTML = ''




}