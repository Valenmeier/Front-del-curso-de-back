const imageDomains = [
  "m.media-amazon.com",
  "res.cloudinary.com",
  "www.animefreaks.es",
  "www.poolortega.com",
  "http2.mlstatic.com",
  "www.banpresto.es",
  "localhost",
  "backendcoder-final-production.up.railway.app",
];

const nextConfig = {
  images: {
    domains: imageDomains,
  },
  env: {
    DOMAIN_API_URL: "https://backendcoder-final-production.up.railway.app",
  },
};

module.exports = nextConfig;
