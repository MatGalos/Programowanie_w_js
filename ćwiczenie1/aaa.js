//Pobranie referencji

const gallery=document.querySelectorAll('.gallery img');
const galleryCount=gallery.length;
//zapisanie się na zdarzenie click
for(let idx=0;idx<gallery.length;idx++){
    const img=gallery[idx];
    img.addEventListener('click',showLightbox);
}
//firstImage.addEventListener('click',showLightbox);
//firstImage.addEventListener('click',hideLightbox);

function showLightbox(ev){
    console.log(ev.target);
    const lightbox=document.querySelector('.lightbox');
    const img=document.querySelector('.lightbox img');
    const imgUrl=ev.target.src;
    img.src=imgUrl;
    lightbox.classList.add('visible');
}

/*function hideLightbox(){
    const lightbox=document.querySelector('.visible');
    lightbox.classList.remove('visible');
}*/
