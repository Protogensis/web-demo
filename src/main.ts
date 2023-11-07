

//给搜索框添加输入事件
let search = document.getElementById('search') as HTMLInputElement

//获取所有的sampleclass 元素
let samplelist = document.getElementsByClassName('sample')



search.addEventListener('input',()=>{
    let inputvalue = search.value


    if(inputvalue == ''){
        for (const iterator of samplelist) {
            let e = iterator as HTMLAnchorElement
                e.style.display = 'block'
        }
        console.log(inputvalue)
        return
    }

    for (const iterator of samplelist) {
        let e = iterator as HTMLAnchorElement
        if(e.innerText.indexOf(inputvalue) === -1){
            e.style.display = 'none'
        }else{
            e.style.display = 'block'

        }
    }
})