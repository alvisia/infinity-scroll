const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let loadMorePhotos = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let loadImageCount = 5;

let isInitialLoad = true;

// Unsplash API
const apiKey = 'YOUR_API_KEY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${loadImageCount}`;

function updateApiUrlWithNewCount(newLoadImageCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newLoadImageCount}`;

}

function imagesLoadedCheck() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        loadMorePhotos = true;
        loader.hidden = true;
    }
}

function setElementAttributesHandler(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setElementAttributesHandler(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setElementAttributesHandler(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each img is finished loading
        img.addEventListener('load', imagesLoadedCheck);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateApiUrlWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        alert(`ERROR: ${error}`);
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && loadMorePhotos) {
        loadMorePhotos = false;
        getPhotos();
    }
});

// On Load
getPhotos();