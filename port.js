const writer=document.getElementById('writer');
const loader=document.getElementById('load');
const navbar=document.querySelector('.nav');
let lastscrolltop=0;

window.addEventListener('scroll',function(){
    let currentscroll=window.pageYOffset||document.documentElement.scrollTop;
    if(currentscroll>lastscrolltop){
        navbar.style.top='-80px';
    }else{
        navbar.style.top='0';
    }

    if(currentscroll<=0){
        lastscrolltop=0;
    }else{
        lastscrolltop=currentscroll
    }
})

const l=()=>{
  loader.classList.add('d-none')
}

setTimeout(l,2000);





const string1='Web Desiner';
const string2='Web Developer';
const cut ='|';
let ismove=true;
let current=string1;
let i=0;
const text = writer.textContent;
setInterval(()=>{
writer.innerHTML= text+current.slice(0,i+1)+cut;
if(ismove){
    i++;
    if(i==current.length){
      ismove=false;
      
    }
}else{
    i--;
    if(i<0){
        ismove=true;
       if(current==string1){
        current=string2;
       }else{
        current=string1;
       }
    }

}
}
    ,150)