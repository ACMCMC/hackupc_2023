# Mikasa Frontend

This is the React TypeScript frontend for Mikasa, an AI-powered home search application.

## Tech Stack

- **React** 18.2 with TypeScript
- **Material-UI** (MUI) 5.13 for UI components
- **Auth0** for authentication
- **React Router** v6 for routing
- **Axios** for API calls

## Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── Components/   # Reusable React components
│   ├── pages/        # Page components
│   │   ├── LandingPage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── Profile.tsx
│   │   └── AboutUs.tsx
│   ├── api/          # API integration layer
│   ├── models/       # TypeScript interfaces
│   └── static/       # Images and static files
└── package.json
```

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## Environment Setup

The frontend connects to the backend API. Make sure the backend is running on port 9991, or update the API configuration in `src/api/api.ts`.

## Authentication

This application uses Auth0 for authentication. You'll need to configure Auth0 credentials in your environment.

## Learn More

- [React Documentation](https://reactjs.org/)
- [Material-UI Documentation](https://mui.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
