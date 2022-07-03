module.exports = {
    images: {
        domains: ["a.thumbs.redditmedia.com"]
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

        config.module.rules.push({
            test: /\.js$/,
            use: [
                defaultLoaders.babel
            ],
            exclude: /node_modules\/(?!tonweb\/).*/,
        })

        return config;
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}