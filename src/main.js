const $siteList = $('.siteList');
 /*在siteList里面找class=last的li */
const $lastLi = $siteList.find('li.last');
/*本地存储先读取x里面是否有存储着hash */
const x = localStorage.getItem('x');
/*它把x重新转换成对象 */
const xObject = JSON.parse(x);
/*在网站初始化时,如果x有值就读取x,要不然就取默认值 */
const hashMap = xObject || [
    { logo: 'A' ,logoType:'text',url: 'https://www.acfun.cn'},
    { logo: 'B' ,logoType:'image', url:'https://www.bilibili.com'},
]

/* 把url地址前的https省略掉*/
const simplifyUrl = (url) =>{
    return url.replace('https://','')
    .replace('http://','').replace('www.','')
    .replace(/\/.*/,'');
}

const render = ()=>{
     /*找到sitelist 里面所有的li,但唯独去掉最后一个.last*/
     $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
            <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
            </div> 
        </li>`).insertBefore($lastLi);

        $li.on('click',()=>{
            window.open(node.url);
        });
        $li.on('click','.close',(e)=>{
            console.log('这里阻止冒泡传递');
            e.stopPropagation();
            console.log(hashMap);
            /*删除掉hashMap里面的任意一个网站地址 */
            hashMap.splice(index,1);
            /*重新渲染 */
            render();
        })


    })
};

render();


$('.addButton')
  .on('click',()=>{
    let url = window.prompt('需要添加什么网站');
    if(url.indexOf('http')!=0){
        url = 'https://' + url;
    }
    console.log(url);
    hashMap.push({
        logo:simplifyUrl(url)[0],
        logoType:'text',
        url:url
    });
   render();
 });
/*js关闭页面前触发监听 */
window.onbeforeunload = ()=>{
    console.log('页面要关闭了');
    const string = JSON.stringify(hashMap);
    /*localStorage只能存储字符串,它表示在本地存储里面,保存一个字符串,为X */
    /*存储时间为,用户离开页面时 */
    localStorage.setItem('x',string);
}

$(document).on('keypress',(e)=>{
    const {key} = e;
    for(let i =0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url);
        }
    }
})
