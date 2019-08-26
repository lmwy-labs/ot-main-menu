const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/index.jsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};