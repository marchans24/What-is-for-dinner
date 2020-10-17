// Constants
const BASE_URL = 'https://api.punkapi.com/v2/beers';

// Variables
let beerData;


// Cached Element References
const $cardsEl = $('#cards');


// Event Listeners
$cardsEl.on('click', 'article', handleClick);



// Functions

init();

function init() {
    getData();
}

function getData() {
    $.ajax(BASE_URL)
    .then(function(data) {
        beerData = data;
        render();
    }, function(error) {
        console.log('Error: ', error);
    });
}


function handleClick() {
    console.log(this);
}

function generateUI() {
    return beerData.map(function(beer) {
        return `
            <article class="card flex-ctr outline">
                <h3>${beer.name}</h3>
            </article>`;
    });
}

function render() {
    $cardsEl.html(generateUI())
}

// console.log('Beer Data: ', data);



