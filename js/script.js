// Constants

const BASE_URL = 'https://api.punkapi.com/v2/beers';

// Variables
let beerData, beerDetail;


// Cached Element References

const $cardsEl = $('#cards');
const $modal = $('#modal');
const $image = $('#image');
const $name = $('#name');
const $pairing = $('#pairing');


// Event Listeners
$cardsEl.on('click', 'article', handleClick);



// Functions



init();

function init() {
    getData();
}

function getData(detailURL) {

    const url = detailURL ? detailURL : BASE_URL;

    $.ajax(url)
        .then(function (data) {
            if (detailURL) {
                beerDetail = data;
                render(true);
            } else {
                beerData = data;
                render();
            }
        }, function (error) {
            console.log('Error: ', error);
        });
}


function handleClick() {
    const url = this.dataset.url;
    getData(url);
}

function generateUI() {
    return beerData.map(function (beer) {
        return `
            <article data-url="https://api.punkapi.com/v2/beers/${beer.id}" class="card flex-ctr outline">
                <h3>${beer.tagline}</h3>
            </article>`;
    });
}

function render(isDetail) {
    if (isDetail) {
        $image.attr({
            src: beerDetail[0].image_url,
            alt: beerData[0].name
        });
        $name.text(`BEER CHOICE: ${beerDetail[0].name}`);
        $pairing.text(`FOR DINNER: ${beerDetail[0].food_pairing}`)
        $modal.modal();
    } else {
        $cardsEl.html(generateUI());
    }
}