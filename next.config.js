const imageDomains = [
  "m.media-amazon.com",
  "res.cloudinary.com",
  "www.animefreaks.es",
  "www.poolortega.com",
  "http2.mlstatic.com",
  "www.banpresto.es",
  "localhost",
  "railway.app",
];

const nextConfig = {
  images: {
    domains: imageDomains,
  },
  env: {
    DOMAIN_API_URL: "http://localhost:8080",
  },
};

module.exports = nextConfig;
