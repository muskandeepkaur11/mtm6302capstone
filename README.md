# Capstone Project

**Name:** Muskan Deep Kaur 
**Student Number:** 90541152565 
**Chosen Project:** Astronomy Picture of the Day Search

## Project Overview

This project is a web application that allows users to explore NASA’s Astronomy Picture of the Day (APOD) by selecting dates and viewing the corresponding images and descriptions. Users can save their favorite pictures locally and switch between light and dark themes for better usability.

## Features Implemented

- **Date Selection:** Users can select a date using a date picker limited to today’s date or earlier.
- **Dynamic APOD Display:** Fetches and displays NASA’s APOD image, title, date, and explanation.
- **Favorites:** Users can add or remove pictures from their favorites list, which is saved in browser localStorage for persistence.
- **Favorites Management:** Displays saved favorites with thumbnails, titles, dates, and delete buttons.
- **Theme Toggle:** Users can switch between light and dark themes for improved accessibility and viewing comfort.
- **Responsive Design:** The interface adapts to multiple screen sizes, including desktop and mobile devices.

## Design Decisions

- **Clean and Minimal UI:** Used a simple layout with a clear hierarchy to highlight NASA’s stunning images.
- **Typography:** Chose 'Poppins' font for modern and readable text.
- **Colors:** Light theme uses a soft gray background and dark text; dark theme uses dark backgrounds with light text to reduce eye strain.
- **Accessibility:** Added ARIA labels and live regions for better screen reader support.
- **Favorites Storage:** Used localStorage for easy persistent data without server-side requirements.


## Development Notes

- **Technologies Used:** HTML5, CSS3, JavaScript (vanilla)
- **API:** NASA APOD API (https://api.nasa.gov/)
- **Challenges Faced:**
  - Handling media types other than images (e.g., videos) gracefully.
  - Managing favorites and syncing UI state with localStorage.
  - Implementing theme toggle efficiently without external libraries.
- **Resources:**
  - NASA API Documentation
  - MDN Web Docs for Fetch API and localStorage
  - CSS Tricks for responsive design and theming

## How to Run

1. Clone the repository and checkout the `part-3` branch.
2. Open `index.html` in any modern web browser.
3. Select a date and click "Get Picture" to fetch the APOD.
4. Use the "Add to Favorites" button to save images.
5. Use the theme toggle button to switch between light and dark modes.


## Future Improvements

- Support for video APOD media.
- User authentication and cloud sync for favorites.
- Enhanced UI with animations and loading states.
- Improved error handling and offline support.


Thank you for reviewing my capstone project!
