const fs = require('fs')
const path = require('path')
const markdownMagic = require('markdown-magic')

const config = {
  transforms: {
    TYPE: require('./')
  }
}

const markdownPath = path.join(__dirname, 'example', 'README.md')
markdownMagic(markdownPath, config)