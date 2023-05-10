const imageDomains = [ "m.media-amazon.com","res.cloudinary.com","www.animefreaks.es","www.poolortega.com","http2.mlstatic.com","www.banpresto.es",];

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: imageDomains,
  },
};

module.exports = nextConfig;