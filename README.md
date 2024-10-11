
# Next.js Application - 2024 Edition (Udemy Course by Traversy Media)

This project is a Next.js application built from scratch, following the 2024 edition of the Udemy course by Traversy Media. The project includes modern React components, TypeScript support, and integrations with various libraries and services.

## Features

- **Next.js Framework**: Server-side rendering, API routes, and optimized build for performance.
- **TypeScript Integration**: Strict type handling for a robust development experience.
- **Cloudinary Integration**: Used for media management and optimized image delivery.
- **Google OAuth**: Authentication via Google for secure user sign-in.
- **OpenStreetMap API**: Integration for displaying maps and geographic data without relying on Google Maps.
- **OpenCage Geocoding API**: Provides geocoding services for converting addresses into geographic coordinates.
- **Global Context**: State management using React's Context API.
- **Modular Architecture**: Organized into components, models, and utility functions for easy scalability.

## Refactoring Details

In the original Udemy course by Traversy Media, the project was built using:

- **Google Geocode** and **Mapbox**: These are paid services.  
- **JavaScript**: The project was developed using JavaScript.

In this version:

- **Open-source and free services**: I refactored the code to use the **OpenStreetMap API** and **OpenCage Geocoding API**, which are open-source and free alternatives to the original paid services.
- **TypeScript**: The project is built entirely using TypeScript for enhanced type safety and development efficiency.

## Live Demo

Check out the live version of the application hosted on Vercel:

[Next.js Application - 2024 Edition](https://next-js-from-scratch-2024-udemy-traversy-media.vercel.app/)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or later)
- **npm** (Node package manager) or **yarn**

To check if Node.js and npm are installed, run:

```bash
node -v
npm -v
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nextjs-from-scratch-2024.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nextjs-from-scratch-2024
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   Or if you prefer using yarn:

   ```bash
   yarn install
   ```

## Setting Up Environment Variables

To run this application locally, you need to create a `.env` file in the root of the project directory. This file should contain the following keys:

```env
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_DOMAIN=your_domain
NEXT_PUBLIC_API_DOMAIN=your_api_domain
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=your_nextauth_url
NEXTAUTH_URL_INTERNAL=your_nextauth_internal_url
NEXTAUTH_SECRET=your_nextauth_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
OPENCAGE_API_KEY=your_opencage_api_key
```

Make sure you have all the required keys set up in your `.env` file to ensure the application works correctly.

## Running the Application

To run the development server:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Building for Production

To build the application for production:

```bash
npm run build
```

This will create an optimized production build in the `.next` directory. You can then start the production server:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

## Project Structure

- **`/components`**: Contains reusable React components used throughout the application.
- **`/config`**: Configuration files for third-party services and application settings.
- **`/context`**: Global context for state management.
- **`/models`**: TypeScript models representing the data structures used in the app.
- **`/pages`**: Next.js pages following the file-based routing system.
- **`/utils`**: Utility functions for handling common tasks like authentication, data formatting, and more.

## Technologies Used

- **Next.js**: React framework for building server-side rendered and statically generated applications.
- **TypeScript**: Enhances code quality with static typing.
- **Google OAuth**: Secure authentication using Google as a provider.
- **OpenStreetMap API**: Map services without relying on Google Maps.
- **OpenCage Geocoding API**: Geocoding service for address-to-coordinate conversion.
- **NextAuth**: Authentication library for Next.js with support for various providers.
- **Cloudinary**: Media management and optimization service.
- **MongoDB** (via Mongoose): Database management for storing and retrieving user and property data.

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [NextAuth Documentation](https://next-auth.js.org/getting-started/introduction)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [OpenStreetMap Documentation](https://wiki.openstreetmap.org/wiki/API)
- [OpenCage Geocoding API Documentation](https://opencagedata.com/api)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

## License

This project is licensed under the MIT License.
