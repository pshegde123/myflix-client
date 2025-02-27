# myFlix App 
![myFlix Home Page](./myflix_screenshot.png)
##### This project is part of [CareerFoundry](https://careerfoundry.com/) coursework.
##### This repository contains the code for the client side of a React based single-page application - myFlix. 
##### This app allows users to explore a movie database(custom MongoDB database) , view movie details, manage favorites, and interact with user profiles through a responsive interface.
##### The server-side code is avaible at [myflix_server](https://github.com/pshegde123/cf_myflix_server).
---

## Features
- **Movie Catalog**: View a list of movies fetched from the API.
- **Movie Details**: Click on any movie to view information such as synopsis, genre, and director.
- **Favorite Movies**: Add or remove movies from your list of favorites.
- **User Profile Management**:
  - Register a new account.
  - Log in to access features.
  - Update personal information.
  - Deregister your account.

---

## Technologies Used
- **React** - Component-based UI library for building user interfaces.
- **Parcel** - Module bundler for building and running the project.
- **MongoDB** - Movie data is preloaded and retrieved from mongodb
---

## Setup and Installation
Follow these steps to run the myFlix Client locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pshegde123/myflix-client.git
   cd myflix-client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application using Parcel**:
   ```bash
   parcel src/index.html
   ```
   The application will be available at `http://localhost:1234/`.
---

## Usage
- Open the app in a browser at `http://localhost:1234/`.
- Register for a new account or log in with existing credentials.
- Browse the list of movies and view details about genres and directors.
- Use the "Add to Favorites" button to manage your favorite movies.
- Access your profile to update personal information or deregister your account.
