const item = document.querySelectorAll('.item');
console.log(item);
item.forEach((item) => {
    const title = item.querySelector('.title');
    console.log(title);
    if(title){
    title.addEventListener('click',() => {
        console.log("!!!!");
        const activeItem = document.querySelector('.item.active');
        console.log(activeItem);
        if(activeItem && activeItem !== item){
            activeItem.classList.remove('active');
        }
        item.classList.toggle('active');
    })
}
    
});