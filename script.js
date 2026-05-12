const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const categoryBtns = document.querySelectorAll('button');
const errorMessage = document.getElementById('error-overlay');

let loadMorePhotos = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let loadImageCount = 5;
let isInitialLoad = true;
let category = '';
let isLoading = false;

// Unsplash API
const apiKey = 'YOUR_API_KEY'; // Replace with 'YOUR_API_KEY' before commit
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${loadImageCount}`;

function updateApiUrlWithNewCount(newLoadImageCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newLoadImageCount}&query=${category}`;
}

categoryBtns.forEach(button => {
    button.addEventListener('click', () => {
        category = button.value;
        updateApiUrlWithNewCount(5);
        photosArray = [];
        imageContainer.replaceChildren();
        loadMorePhotos = false;
        isInitialLoad = true;
        getPhotos();
    });
});

function imagesLoadedCheck() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        isLoading = false;
        loader.hidden = true;
        loader.classList.remove('show');
        loadMorePhotos = true;
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
            src: photo.urls.small,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Create <p> to display photographer text, create <a> to display name & make it clickable, add class for styling
        const photographerLink = document.createElement('a');
        setElementAttributesHandler(photographerLink, {
            href: photo.links.html,
            target: '_blank',
            title: `View ${photo.user.name}'s profile`,
        });
        photographerLink.textContent = photo.user.name;
        photographerLink.classList.add('photographer-link');

        const photographerText = document.createElement('p');
        photographerText.textContent = 'Photo by ';
        photographerText.classList.add('photographer-text');

        // Event Listener, check when each img is finished loading
        img.addEventListener('load', () => {
            img.classList.add('display');
            imagesLoadedCheck();
        });
        // Put <img> inside <a>, put both inside imageContainer Element, put photographerlink inside photographerText, put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
        photographerText.appendChild(photographerLink);
        imageContainer.appendChild(photographerText);
    });
}

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        errorMessage.classList.remove('active');
        isLoading = true;
        if (isInitialLoad) {
            loader.hidden = false;
            loader.classList.add('show');
        }
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateApiUrlWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        errorMessage.classList.add('active');
        loader.classList.remove('show');
        loader.hidden = true;
        isLoading = false;
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    const scrollThreshold = window.innerHeight * 1.5;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - scrollThreshold && loadMorePhotos) {
        loadMorePhotos = false;
        getPhotos();
    }
});

// On Load
getPhotos();