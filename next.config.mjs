/** @type {import('next').NextConfig} */
const nextConfig = {
    // add cloudinary here
    images: {
        // Allows us to use images from other domains
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: "**"
            }
        ]
    }
};

export default nextConfig;
