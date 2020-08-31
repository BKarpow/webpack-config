import '@babel/polyfill'
import Post from "./Post"
import * as $ from 'jquery'
import './babel'
import './styles/style.scss'
import xml from './assets/data.xml'
import csv from './assets/data.csv'

import WebPackLogo from './assets/webpack-logo.png'

const post = new Post('New Post', WebPackLogo);

$('pre').text( JSON.stringify(xml, null, 3) )

console.log(post.toString())
console.log(xml)
console.log("CSV: ", csv)

document.querySelector('.link').addEventListener('click', function(){
    const dataAttribute = 'data-toggle'
    const text = this.parentElement.children[1];
    let toggle = text.getAttribute(dataAttribute)
    if (!toggle || toggle === '0'){
        text.setAttribute(dataAttribute, '1')
        text.style.display = 'block'
    }else if (toggle === '1'){
        text.setAttribute(dataAttribute, '0')
        text.style.display = 'none'
    }
} )