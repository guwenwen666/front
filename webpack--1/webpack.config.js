const pathlib = require('path');
//require('http')
module.exports={
    mode:'development',

    //entry:'./src/1.js',
    entry:{
        'index':'./src/2.js',
        'test':'./src/2.js'
    },
    output:{
        path:pathlib.resolve('dest/'),
        //filename:'bundle.js'
        filename:'[name].bundle.js'
    },
    devServer:{
        contentBase:pathlib.resolve('static'),
        port:8090
    }
}