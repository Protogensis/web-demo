import data from './json/test.json'
console.log(data)
let result = new String('<main>')
for (const item of data.sites) {
    let name = item.name
    let url = item.url
    let temp = '<p>name:'+name+' '+'url:'+url+'</p>'
    result = result + temp
}
result = result + '</main>'

document.body.innerHTML = result+''