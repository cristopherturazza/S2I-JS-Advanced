const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { LoaderOptionsPlugin } = require('webpack');

module.exports = {
    entry: {
        index: './src/js/index.js',
        city: './src/js/city.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true
    },
    module: { rules:[
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'],
            }

    ]},
    plugins: [
        new HtmlWebpackPlugin({
            title: "test webpack",
            template: './src/index.html'
        })
    ],
    devServer:{
        port: 5000,
        open: {
            app: {
                name: 'firefox'
            }
        },
        static: path.resolve(__dirname, 'src')
    },
    mode: "development"
}