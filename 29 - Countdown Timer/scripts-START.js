let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime  = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer (seconds){
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds*1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(()=>{
        const secondLeft = Math.round((then - Date.now())/1000);
        if (secondLeft < 0 ) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondLeft);
    },1000)
}

function displayTimeLeft(seconds){
    const dakika = Math.floor(seconds/60);
    const remainderSeconds = seconds %60; 
    const display = `${dakika}:${remainderSeconds <10 ? '0' : ''}${remainderSeconds}`;

    document.title = display;
    timerDisplay.textContent = display;
    
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const saat = end.getHours();
    const dakika = end.getMinutes();
    const adjusthour = saat > 12 ? saat - 12 : saat;
    endTime.textContent = `bitiş ${adjusthour}:${dakika < 10 ? '0' : ''}${dakika}`;
}

function startTimer(){
        console.log(this.dataset.time);
        const seconds = parseInt(this.dataset.time);
        timer(seconds);
}

buttons.forEach(button => button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){//sumbit işlemleri formlar içinde olur
    e.preventDefault();//sayfa yenilenmesini engelledik
    const mins = this.minutes.value;
    console.log(mins);
   
    timer(mins*60)
    
    this.reset();
})