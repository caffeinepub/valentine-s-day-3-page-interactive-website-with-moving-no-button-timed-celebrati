# Valentine's Day Interactive Website

A beautiful three-page Valentine's Day experience built with React and TypeScript.

## Features

- **Page 1**: Interactive question page with a continuously moving "No" button
- **Page 2**: Celebration page with live fireworks animation (5-second timer)
- **Page 3**: Image finale with romantic message

## Image Setup

To add your own image to the finale page:

1. Place your primary image at: `frontend/public/assets/IMG_6912-3.jpeg`
2. (Optional) Place a fallback image at: `frontend/public/assets/IMG_6912-4.jpeg`
3. The app will try to display `IMG_6912-3.jpeg` first, then fall back to `IMG_6912-4.jpeg` if the first image fails to load
4. If neither image is found, a placeholder message will be shown instead

## Development
