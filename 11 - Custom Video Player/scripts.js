/* elementler */

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progress_bar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipbuttons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* FUNCİTONLAR */

function toggleplay(){
    if (video.paused) {
        video.play();
    }else{
        video.pause();
    }
}
function updateButton(){
    const icon= this.paused ? '►' : '❚ ❚';//
    
    toggle.textContent = icon;//toogle ın yazı yazılcak kısımı
    // console.log("butona basıldı");
}

function skip(){
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);//video currenttime vidyounun zamanı 
    
    
     
}

function handelLuncUpdate(){
    // console.log(this.name);
    if (this.name=='volume') {
        video.volume=this.value;
    }else if(this.name=='playbackRate'){
        video.playbackRate=this.value;

    }
}

function handeleProgress(){
    const percent = (video.currentTime/ video.duration)*100;
    progress_bar.style.flexBasis = `${percent}%`;
    // console.log(video.duration);
    
}

function handelekonum(e){
    // 0 - 464
    const deger  = (e.offsetX / progress.offsetWidth) * video.duration;//olduğu konumu max gidebileceği konuma böl ve durationla çarp
    video.currentTime=deger;
}


/* dinleme işlemleri */
video.addEventListener("click",toggleplay);
video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);
video.addEventListener("timeupdate",handeleProgress);

toggle.addEventListener("click",toggleplay);
skipbuttons.forEach(element =>  element.addEventListener("click",skip));
ranges.forEach(range => range.addEventListener('change',handelLuncUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handelLuncUpdate));
let mousedown=false;
progress.addEventListener('click',handelekonum);
progress.addEventListener('mousemove',() =>{ 
        if (mousedown) {
            handelekonum
        }
    }); 
progress.addEventListener('mousedown',() => mousedown=true); 
progress.addEventListener('mouseup',() => mousedown=false); 
