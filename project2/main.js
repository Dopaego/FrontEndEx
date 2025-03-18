const DOM = {
    navBar : document.getElementsByClassName("bar"),
    mainInfo : document.getElementsByClassName("model")

}
Array.from(DOM.navBar).forEach(bar => {
    console.log("success");
    bar.addEventListener('click', function(e){
        e.preventDefault();
        const id = e.target.id;
        updateContent(id);
    })
})
//更新当前页面：
function updateContent(id){
    Array.from(DOM.mainInfo).forEach(item => item.classList.remove("active"));
    addItem(id);

}

//获取所添加的页面
function addItem(id){
    const endId = "is" + id;
    console.log(endId);
    const curItem = document.getElementById(endId);
    console.log(curItem);
    curItem.classList.add("active");
}