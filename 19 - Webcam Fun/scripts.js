const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');//audi ye eriştik


function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio:false}).
        then(localmedia => {
            console.log(localmedia);
            video.srcObject =localmedia;
            video.play();
        }).catch(err => {
            console.log('olmadı',err);
        });
}


function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    console.log(width, height);

    setInterval(() => {//sürekli çalışacak
        ctx.drawImage(video, 0,0,width,height);//canvasın 2d alanına yanısıtıcaz
        let pixels= ctx.getImageData(0,0,width,height);
        // pixels= redEffect(pixels);//kırmızı efect


        // pixels= rgbSplit(pixels);//kayık efeect
        // ctx.globalAlpha=0.8;

        ctx.putImageData(pixels,0,0);

    }, 2);
}

function takePhoto(){
    snap.currentTime =0;
    snap.play();

    const data = canvas.toDataURL();//kameranın verisin urleye cevirdik  ve dataya attık
    const link = document.createElement('a');//yeni olulturduk
    link.href = data;//link olarak o anlık remin linkini loyduk
    link.setAttribute('download','handsome');//indirme özelliği ekledik handome inen dosyanın aadı
    link.textContent = 'download image';//hrefin adı
    link.innerHTML = `<img src="${data}" alt="handsome" man></img>`;
    strip.insertBefore(link, strip.firstChild);//linki stripin altına ekledik cocuğu yaptık insertBefore= ekleme işlemi
}

function redEffect(pixels){
    for (let i=0; i< pixels.data.length; i+=4){
        pixels.data[i + 0] = pixels.data[i + 0] + 100;//red
        pixels.data[i + 1] = pixels.data[i + 1] - 50;//green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;//blue

    }
    return pixels;
}

function rgbSplit(pixels){
    for (let i=0; i< pixels.data.length; i+=4){
        pixels.data[i - 150] = pixels.data[i + 0] ;//red
        pixels.data[i + 100] = pixels.data[i + 1] ;//green
        pixels.data[i - 150] = pixels.data[i + 2] ;//blue

    }
    return pixels;
}



getVideo();

video.addEventListener('canplay',paintToCanvas);