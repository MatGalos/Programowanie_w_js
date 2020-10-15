//Pobranie referencji
const gallery=document.querySelectorAll('.gallery img');
const galleryCount=gallery.length;
var currentImg
//zapisanie się na zdarzenie click
for(let idx=0;idx<gallery.length;idx++){
    const img=gallery[idx];
    img.addEventListener('click',showLightbox);
    img.setAttribute('id','b'+idx);
}

function showLightbox(ev){
    currentImg=ev.target;
    const lightbox=document.querySelector('.lightbox');
    const img=document.querySelector('.lightbox img');
    const imgUrl=ev.target.src;
    img.src=imgUrl;
    img.setAttribute('onclick','hideLightbox()');
    lightbox.classList.add('visible');


}
function hideLightbox(){
    const lightbox=document.querySelector('.lightbox');
    lightbox.classList.remove('visible');
    lightbox.removeAttribute('onclick','hideLightbox');
}

function changeLightbox(change){
    let calcNewImg=change;
    if(calcNewImg>gallery.length-1){
        calcNewImg=0;
    }
    if(calcNewImg<0){
        calcNewImg=gallery.length-1;
    }
    const obraz=document.querySelector('#b'+calcNewImg);
    currentImg=obraz;
    const lightbox=document.querySelector('.lightbox');
    const img=document.querySelector('.lightbox img');
    const imgUrl=obraz.src;
    img.src=imgUrl;
    img.setAttribute('onclick','hideLightbox()');
    lightbox.classList.add('visible');
}

function leftright(number){
    let g=showId()+number;
    changeLightbox(showId()+number);
}

function showId(){
    let Id;
    for(let a=0;a<gallery.length;a++){
        const b='b'+a;
        const c=currentImg.id;
        if(b==currentImg.id){
            Id=a;
        }
    }
    return Id;
}

// można zrobić dzięki przypisanemu id