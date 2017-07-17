let webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path:  __dirname+"/public/build/",
        publicPath:"/build",
        filename: "bundle.js"
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        contentBase: __dirname + "/public",
        port: 3000
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
}
