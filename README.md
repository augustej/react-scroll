# React Infinite Scroll Web Application

This is a simple web application that allows users to browse items from the Pexels API and favorite them. The application features responsive design, infinite scroll, and the ability to save favorite items, which persist even after page reload.

## Getting Started

Follow these steps to set up and run the project on your local machine:

1. Extract .zip file.

2. Navigate to the project directory.

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your web browser and access the application at `http://localhost:3000`.

## Comments on the process

I have created this React app using the default create-react-app command.

For responsive design, I targeted screens with widths of 375px, 820px, and 1440px. Images are loaded lazily. The implementation follows responsive image principles, selecting either a 'large' or 'large2x' image based on the width of the image displayed on the screen.

I have written a couple of tests with the help of ChatGPT. Until now, I had no previous testing experience, but I have accepted this challenge, and I hope to improve my testing skills in the future.

## Possible Improvements

1. More extensive testing.
2. Better error handling.
3. Consider separating index.scss into multiple files.
4. Better naming of variables.
