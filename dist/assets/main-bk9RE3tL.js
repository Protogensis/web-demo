import"./modulepreload-polyfill-9p4a8sJU.js";let r=document.getElementById("search"),a=document.getElementsByClassName("sample");r.addEventListener("input",()=>{let t=r.value;if(t==""){for(const s of a){let e=s;e.style.display="block"}console.log(t);return}for(const s of a){let e=s;e.innerText.indexOf(t)===-1?e.style.display="none":e.style.display="block"}});window.addEventListener("hashchange",n);window.addEventListener("DOMContentLoaded",n);const o=document.querySelector("iframe");if(!o)throw new Error("not found iframe");o.src="../views/helloweb.html";const i=document.querySelectorAll(".sample");for(let t of i)t.addEventListener("click",s=>{window.location.hash=s.target+"";const e=document.querySelector(".active");if(!e)throw new Error;e.classList.remove("active"),t.classList.add("active")});function n(){const t=document.querySelectorAll(".sample");for(let e of t)if(e.href.split("#")[1]===location.hash.split("#")[1]){const l=document.querySelector(".active");if(!l)throw new Error;l.classList.remove("active"),e.classList.add("active")}if(!o)throw new Error;const s=location.hash;switch(location.hash){case"":o.src="./views/helloweb.html";return;case"#":o.src="./views/helloweb.html";return;default:o.src="./views/"+s.split("#")[1]+".html";return}}