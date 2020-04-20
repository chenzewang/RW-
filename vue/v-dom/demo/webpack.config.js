/*
 * @Author: your name
 * @Date: 2020-03-24 12:30:29
 * @LastEditTime: 2020-03-24 12:34:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\webpack.config.js
 */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};