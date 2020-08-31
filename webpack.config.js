const path = require('path')
const HTMLWebpackPlugib  = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// Test dev profile
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

console.log('isDev', isDev)

const filename = ext => isDev ? `[name].${ext}` : `[name]-[hash].${ext}`;
const optimize = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd){
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}
const preProcCss = processorLoader => {
    const config = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true
        }
    }, 'css-loader']
    if (processorLoader){
        config.push(processorLoader)
    }
    return config
}

const babelConfig = () => {
    const conf = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }
    return conf
}

const useJsRules = () => {
    const use = [{
        loader: "babel-loader",
        options: babelConfig()
    }]
    if (isDev){
        use.push('eslint-loader');
    }
    return use
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        app: './index.js',
        analytic: './analytics.js'
    },
    optimization: optimize(),
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    devServer:{
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugib({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: useJsRules()
            },
            {
                test: /\.css$/,
                use: preProcCss()
            },
            {
                test: /\.less$/,
                use: preProcCss('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: preProcCss('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }

        ]
    }
}