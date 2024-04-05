[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U6U8WFUVX)

# JC-Movies

JC-Movies is an open-source project created with Next.js to provide users with a platform to discover and explore movies. This README provides an overview of the project, installation instructions, usage guidelines, and contribution guidelines.

##

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Donations](#donations)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **Movie Discovery**: Browse a wide range of movies and explore details such as title, release date, genre, and synopsis.
- **Search Functionality**: Easily search for movies by title.
- **Responsive Design**: The website is designed to be responsive and accessible across various devices.
- **Vidstack Integration**: Utilizes Vidstack for smooth video playback and streaming experience.

## Installation

To run JC-Movies locally, follow these steps:

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/JC-Movies/main-website.git
   ```

2. Navigate to the project directory:

   ```
   cd main-website
   ```

3. Install dependencies:

   ```
   npm install or pnpm install
   ```

4. Create a `.env.local` or `.env` file in the root directory and add your TNDB API key:
   - Get the API KEY and Token for free [**TMDB API**](https://developer.themoviedb.org/docs/getting-started)

   ```
   NEXT_PUBLIC_BASEURL=http://localhost:3000
   NEXT_PUBLIC_APIKEY="Your TMDB API KEY"
   NEXT_PUBLIC_API_TOKEN="Your TMDB TOKEN"
   ```

5. Run the development server:

   ```
   npm run dev or pnpm run dev
   ```

6. Open your browser and visit `http://localhost:3000` to view JC-Movies.

## Usage

Once the development server is running, you can start exploring JC-Movies in your browser. Use the navigation menu to browse movies, search for specific titles, and view movie details. Click on a movie to watch it using Vidstack integration.

## Contributing

Contributions to JC-Movies are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new Pull Request.

Please ensure that your code adheres to the existing code style and that you have thoroughly tested your changes.

## Donations

JC-Movies is provided free of charge and is ad-free. If you find this project helpful, please consider supporting its development by donating through [Ko-Fi](https://ko-fi.com/U6U8WFUVX).

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U6U8WFUVX)

## Technologies Used

- [**@movie-web/providers**](https://movie-web.github.io/providers/): This package enables JC-Movies to fetch movie data from third party providers without the need to store any media files or copyrighted content locally.
- [**Vidstack (Video Player)**](https://vidstack.io/): A video player library used for smooth video playback and streaming experience.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
