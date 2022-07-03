module.exports = {
    images: {
        domains: ["a.thumbs.redditmedia.com"]
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        
        config.module.rules.push({
            test: /\.js$/,
            exclude: /node_modules\/(?!tonweb\/).*/,
            loader: defaultLoaders.babel,
        });

        // Important: return the modified config
        return config;
    },
}