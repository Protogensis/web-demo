window.addEventListener('hashchange',onHashChange)

const iframe = document.querySelector('iframe')

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
    

    if(!iframe)
        throw new Error()

    const re = location.hash
    switch (location.hash) {
        case '':
            iframe.src = '../views/' + 'helloweb' + '.html'
            return
        
            case '#':
            iframe.src = '../views/' + 'helloweb' + '.html'
            return
       
        default:
            iframe.src = '../views/' + re.split('#')[1] + '.html'
            return
}
}
    
