var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js' // bundle.js to wynik kompilacji projektu przez webpacka
    },
    mode: 'development', // none, development, production
    devServer: {
        port: 8080,
        contentBase: ['./dist', './src'],
        inline: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: './index.html', //relative to root of the application
            title: "FPS GAME",
            template: './src/index.html',
           // h1: "h1",
           // h2: "h2"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(md2)$/i,
                type: 'asset/resource',
            }

        ]
    },
};