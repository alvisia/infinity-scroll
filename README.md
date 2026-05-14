# Infinity Scroll

A responsive image browsing app built with HTML, CSS, and JavaScript. It uses the Unsplash API to load images dynamically, supports infinite scrolling, and includes category filters for browsing different types of photos.

## Live Demo

https://alvisia.github.io/infinity-scroll/

## Features

- Infinite image scrolling
- Category filters for Nature, Technology, and People
- Dynamic Unsplash API requests based on selected category
- Photographer attribution with clickable profile links
- Image fade-in transitions when photos load
- Loading overlay for initial load and category changes
- Custom error overlay for failed API requests
- Responsive layout for mobile and desktop
- Improved scroll trigger based on screen height

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Unsplash API
- GitHub Pages

## What I Added

This project started as a tutorial project, but I customized and expanded it by:

- Added category buttons that update the image feed based on the selected topic
- Added a selected button state so users can see the active category
- Added photographer attribution under each image with clickable profile links
- Updated external links with `rel="noopener noreferrer"` for safer new-tab behavior
- Improved the loading experience with a loader state and image fade-in transitions
- Replaced browser alerts with a custom error overlay
- Refined the infinite scroll trigger behavior so it responds better to different screen sizes
- Updated the layout and styling to make the project feel more polished and responsive

## Setup

This project uses the Unsplash API. The API key is not included in the public repository.

To run the project locally:

1. Clone the repository
2. Create a free Unsplash developer account
3. Generate an Unsplash API access key
4. Replace `YOUR_API_KEY` in `script.js` with your own access key
5. Open `index.html` in your browser
