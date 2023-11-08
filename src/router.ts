window.addEventListener('hashchange',onHashChange)
window.addEventListener('DOMContentLoaded',onHashChange)

const iframe = document.querySelector('iframe')
if(!iframe)
    throw new Error('not found iframe')
iframe.src = '../views/' + 'helloweb' + '.html'


// 为列表每个元素创建切换事件
const samples = document.querySelectorAll('.sample')
for(let sample of samples){
    sample.addEventListener('click', (event)=>{
        
        window.location.hash = event.target +''
        const active = document.querySelector('.active')
        if(!active)
            throw new Error()
        active.classList.remove('active')
        sample.classList.add('active')
    })
}

// 路由变化时，根据路由渲染对应 UI
function onHashChange () {
    console.log(location.hash)

    const samples = document.querySelectorAll('.sample')
    for(let sample of samples){
        let a = sample as HTMLAnchorElement
        if(a.href.split('#')[1] === location.hash.split('#')[1] ){
            const active = document.querySelector('.active')
        if(!active)
            throw new Error()
            active.classList.remove('active')
            sample.classList.add('active')
        }
            

    }
    

    if(!iframe)
        throw new Error()

    const re = location.hash
    switch (location.hash) {
        case '':
            iframe.src = './web-demo/views/' + 'helloweb' + '.html'
            return
        
            case '#':
            iframe.src = './web-demo/views/' + 'helloweb' + '.html'
            return
       
        default:
            iframe.src = './web-demo/views/' + re.split('#')[1] + '.html'
            return
}
}
    
