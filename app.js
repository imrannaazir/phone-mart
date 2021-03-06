// loading spinner and common functions:
// function for spinning
const toggleSpinner = displaySpinner => {
    const spinner = document.getElementById('spinner').style.display = displaySpinner;
}

// function for no keyword 
const toggleNoKey = displayNoKey => {
    const noKeyword = document.getElementById('no-keyword').style.display = displayNoKey
}

// function for not founded 
const toggleNotFound = displayNotFound => {
    const notFound = document.getElementById('not-found').style.display = displayNotFound
}

// function for clear previous result 
const clearResult = () => {
    const cardsContainer = document.getElementById('cards-container').textContent = ''
}
// Search button event listener 
const getButton = () => {
    const searchField = document.getElementById('search-field')
    let searchValue = searchField.value
    toggleSpinner('block')
    if (searchValue === '') {
        clearResult();
        toggleNoKey('block')
        toggleNotFound('none')
        toggleSpinner('none')
    }
    else {
        toggleSpinner('block')
        toggleNoKey('none')
        toggleNotFound('none')
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
        searchField.value = ''
        toggleSpinner('none')


        //fetch frist api 
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data))
    }
}


// result showing in ux arrow function
const displayPhones = phones => {
    clearResult();
    toggleSpinner('block')
    if (phones.length === 0) {
        toggleNotFound('block');
        toggleNoKey('none')
        toggleSpinner('none')
    }
    else {
        const phoneLimit = phones.slice(0, 20);
        console.log(phoneLimit);
        for (const brand of phoneLimit) {
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
            toggleSpinner('none')

        }
    }
}


//fetch second api
const updateDetails = id => {
    const detailsUrl = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(detailsUrl)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}


const detailsDiv = document.createElement('div')
detailsDiv.innerHTML = ''

//display phone details on modal arrow function
const displayDetails = details => {
    if (details.releaseDate === '') {
        details.releaseDate = 'Released Date: N/A'
    }
    if (typeof details.others === 'undefined') {
        detailsDiv.innerHTML = `
    <div class="container">
    <div class="row">
        <div class="col-sm-12 col-lg-5 text-center">
            <img class="mt-3 mb-3" width="250px"
                src="${details.image}" alt="">
        </div>
        <div class="col-sm-12 col-lg-7">
            <div class="">
                <h1>${details?.name}</h1>
                <h3>Brand: ${details?.brand}</h3>
                <p class="text-muted">${details.releaseDate} </p>
                <h3>Features:</h3>
                <p>??? Storage: ${details?.mainFeatures?.storage}</p>
                <p>??? Display:${details?.mainFeatures?.displaySize}</p>
                <p>??? Chipset: ${details?.mainFeatures?.chipSet}</p>
                <p>??? Memory:${details?.mainFeatures?.memory}<p>
                <h3>Sensors:</h3>
                <p>${details?.mainFeatures?.sensors}</p>
                <h3>Others Info:</h3>
                <p>??? WLAN: N/A</p>
                <p>??? Bluetooth: N/A</p>
                <p>??? GPS: N/A</p>
                <p>??? NFC: N/A<p>
                <p>??? Radio: N/A<p>
                <p>??? USB: N/A<p>
            </div>
        </div>
    </div>
</div>`
        const modalBody = document.getElementById('modal-body')
        modalBody.appendChild(detailsDiv)
    }
    else {
        detailsDiv.innerHTML = `
    <div class="container">
    <div class="row">
        <div class="col-sm-12 col-lg-5 text-center">
            <img class="mt-3 mb-3" width="250px"
                src="${details.image}" alt="">
        </div>
        <div class="col-sm-12 col-lg-7">
            <div class="">
                <h1>${details?.name}</h1>
                <h3>Brand: ${details?.brand}</h3>
                <p class="text-muted">${details?.releaseDate}</p>
                <h3>Features:</h3>
                <p>??? Storage: ${details?.mainFeatures?.storage}</p>
                <p>??? Display:${details?.mainFeatures?.displaySize}</p>
                <p>??? Chipset: ${details?.mainFeatures?.chipSet}</p>
                <p>??? Memory:${details?.mainFeatures?.memory}<p>
                <h3>Sensors:</h3>
                <p>${details?.mainFeatures?.sensors}</p>
                <h3>Others Info:</h3>
                <p>??? WLAN: ${details?.others?.WLAN}</p>
                <p>??? Bluetooth:${details?.others?.Bluetooth}</p>
                <p>??? GPS: ${details?.others?.GPS}</p>
                <p>??? NFC:${details?.others?.NFC}<p>
                <p>??? Radio:${details?.others?.Radio}<p>
                <p>??? USB:${details?.others?.USB}<p>
            </div>
        </div>
    </div>
</div>`
        const modalBody = document.getElementById('modal-body')
        modalBody.appendChild(detailsDiv)
    }
}