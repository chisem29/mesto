const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanPlugin } = require('webpack');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;



const config = {
    entry: './src/pages/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),

        new MiniCssExtractPlugin(),
        new CleanPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                }, 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|png|jpg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'images/[name]_[hash][ext]',
                }
            },
            {
                test: /\.(ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name]_[hash][ext]',
                }
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};