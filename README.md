# Archetype Quiz

A React-based personality quiz that helps users discover their dominant archetypes. The app features a comprehensive questionnaire and provides detailed results with visual charts and descriptions.

## Features

- **Interactive Quiz**: 10 carefully crafted questions to determine your archetype profile
- **12 Archetypes**: Based on Jungian psychology including Sage, Hero, Explorer, Creator, and more
- **Visual Results**: Radar charts and detailed descriptions for each archetype
- **Stateless Sharing**: Share your results via tokenized URLs without requiring a backend
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Stateless Results Sharing

The app implements a unique stateless sharing system that allows users to share their quiz results via a single link without requiring a backend server.

### How It Works

1. **Quiz Completion**: When a user completes the quiz, their scores are encoded into a Base64 token
2. **Token Generation**: The scores object is converted to JSON, then Base64 encoded
3. **Shareable URL**: A URL is generated in the format `/results/<token>`
4. **Result Decoding**: When someone visits the link, the token is decoded to reconstruct the results

### Example

```javascript
// User's quiz results
const results = {
  Sage: 45,
  Hero: 38,
  Explorer: 32,
  // ... all 12 archetypes
};

// Token generation
const json = JSON.stringify(results);
const token = btoa(json);
// Result: "eyJTYWdlIjo0NSwiSGVybyI6MzgsIkV4cGxvcmVyIjozMiw...="

// Shareable URL
const shareUrl = `https://yourapp.com/results/${token}`;
```

### Benefits

- **No Backend Required**: All encoding/decoding happens client-side
- **Privacy Preserving**: Results never leave the user's browser unless shared
- **Instant Sharing**: No database queries or server processing needed
- **Cross-Platform**: Works on any device with a web browser

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
