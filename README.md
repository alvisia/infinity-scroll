# Infinity Scroll

A responsive image browsing app built with HTML, CSS, and JavaScript. The app uses the Unsplash API to load images dynamically, supports infinite scrolling, and includes category filters for browsing different types of photos.

## Live Demo

https://alvisia.github.io/infinity-scroll/

## Screenshots

### Desktop

<img width="1894" height="947" alt="Screenshot (466)" src="https://github.com/user-attachments/assets/7c0d9380-5825-43c7-93fd-3041a1584618" />

### Mobile

<img width="390" height="794" alt="Screenshot (467)" src="https://github.com/user-attachments/assets/583d7e6a-d06c-497f-84e3-9e287b45f708" />

## Features

- Infinite image scrolling
- Category filters for Nature, Technology, and People
- Dynamic Unsplash API requests based on selected category
- Photographer attribution with clickable profile links
- Image fade-in transitions when photos load
- Loading overlay for initial load and category changes
- Custom error overlay for failed API requests
- Responsive layout for desktop and mobile screens
- Improved scroll trigger based on screen height

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Unsplash API
- GitHub Pages

## What I Customized

This project began as an infinite scroll JavaScript course project from ZTM. I customized and expanded it by adding category filters, improving API request behavior, refining the UI, and adding a more polished loading and error experience.

Key Improvements I made:

- Added category buttons that update the image feed based on the selected topic
- Added an active button state so users can see the selected category
- Added photographer attribution below each image with clickable profile links
- Updated external links with `rel="noopener noreferrer"` for safer new-tab behavior
- Improved the loading experience with a loader state and image fade-in transitions
- Replaced browser alerts with a custom error overlay
- Refined the infinite scroll trigger so it responds better to different screen sizes
- Improved the layout and styling to make the project feel more polished and responsive

## What I Learned

While improving this project, I practiced:

- Fetching and displaying data from a third-party API
- Building dynamic API URLs with query parameters
- Handling loading and error states in JavaScript
- Updating the DOM based on API response data
- Resetting and rebuilding content when a user selects a new category
- Using scroll position and viewport height to trigger new API requests
- Adding safer external links with `target="_blank"` and `rel="noopener noreferrer"`
- Improving responsive image layouts with CSS

## Future Improvements

Possible future improvements include:

- Add a search feature so users can search for custom photo topics
- Add more image categories
- Add a “Load More” fallback button for better accessibility
- Add skeleton loading cards instead of a full-page loader
- Improve keyboard accessibility for category filters
- Add a light/dark theme toggle

## Setup

This project uses the Unsplash API. The API key is not included in the public repository.

To run the project locally:

1. Clone the repository
2. Create a free Unsplash developer account
3. Generate an Unsplash API access key
4. Replace `YOUR_API_KEY` in `script.js` with your own access key
5. Open `index.html` in your browser
