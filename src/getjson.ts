import data from './json/test.json'
console.log(data)
let result = '<main>'

result = result + '<table>'
result = result+'<tr><th>name</th><th>url</th></tr>'


for (let item of data.sites) {
    result = result+'<tr>'
    result = result+'<td>'
    result = result+item.name
    result = result+'</td>'
    result = result+'<td>'
    result = result+'<a href="' + item.url +'" target="_blank">'
    result = result+item.url
    result = result+'</a>'
    result = result+'</td>'
    result = result+'</tr>'
}

result = result+'</table>'
result = result+'</main>'

document.body.innerHTML =result