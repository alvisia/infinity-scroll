// DOM Elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const categoryBtns = document.querySelectorAll('.category-buttons button');
const errorOverlay = document.getElementById('error-overlay');

// App State
let loadMorePhotos = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let loadImageCount = 5;
let isInitialLoad = true;
let category = '';

// Unsplash API
const apiKey = 'YOUR_API_KEY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${loadImageCount}`;

// Update API URL based on image count and selected category
function updateApiUrlWithNewCount(newLoadImageCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newLoadImageCount}&query=${category}`;
}

// Set multiple attributes on an element
function setElementAttributesHandler(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Check when all images in the current batch are finished loading
function imagesLoadedCheck() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        loader.classList.remove('show');
        loadMorePhotos = true;
    }
}

// Create photo elements and add them to the page
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setElementAttributesHandler(item, {
            href: photo.links.html,
            target: '_blank',
            rel: 'noopener noreferrer',
        });
        
        const img = document.createElement('img');
        setElementAttributesHandler(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        
        const photographerLink = document.createElement('a');
        setElementAttributesHandler(photographerLink, {
            href: photo.user.links.html,
            target: '_blank',
            rel: 'noopener noreferrer',
            title: `View ${photo.user.name}'s profile`,
        });
        photographerLink.textContent = photo.user.name;
        photographerLink.classList.add('photographer-link');

        const photographerText = document.createElement('p');
        photographerText.textContent = 'Photo by ';
        photographerText.classList.add('photographer-text');

        // If an image fails, remove its card and keep the loading logic moving
        img.addEventListener('error', () => {
            item.remove();
            photographerText.remove();
            imagesLoadedCheck();
        });

        // Reveal each image after it finishes loading
        img.addEventListener('load', () => {
            img.classList.add('display');
            imagesLoadedCheck();
        });

        item.appendChild(img);
        photographerText.appendChild(photographerLink);

        imageContainer.appendChild(item);
        imageContainer.appendChild(photographerText);
    });
}

// Fetch photos from Unsplash
async function getPhotos() {
    try {
        errorOverlay.classList.remove('active');

        if (isInitialLoad) {
            loader.hidden = false;
            loader.classList.add('show');
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch photos');
        }

        photosArray = await response.json();
        displayPhotos();

        if (isInitialLoad) {
            updateApiUrlWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        errorOverlay.classList.add('active');
        loader.classList.remove('show');
        loader.hidden = true;
        loadMorePhotos = false;
    }
}

// Load a new category and reset the current image feed
function handleCategoryClick(button) {
    category = button.value;

    categoryBtns.forEach(categoryButton => {
        categoryButton.classList.remove('selected');
    });

    button.classList.add('selected');

    updateApiUrlWithNewCount(5);
    photosArray = [];
    imageContainer.replaceChildren();
    loadMorePhotos = false;
    isInitialLoad = true;

    getPhotos();
}

// Event Listeners
categoryBtns.forEach((button) => {
    button.addEventListener('click', () => handleCategoryClick(button));
});

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    const scrollThreshold = window.innerHeight * 1.5;

    if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - scrollThreshold && 
        loadMorePhotos
    ) {
        loadMorePhotos = false;
        getPhotos();
    }
});

// Initial Load
getPhotos();