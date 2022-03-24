const container = document.querySelector(".container"),
musicImg = container.querySelector(".image_box img"),
musicName = container.querySelector(".song_title .name")
musicArtist = container.querySelector(".song_title .artist"),
mainAudio = container.querySelector("#main_audio"),
playPauseBtn = container.querySelector(".play_pause"),
prevBtn = container.querySelector("#previous"),
nextBtn = container.querySelector("#next"),
progressArea = container.querySelector(".progress_area"),
progressBar = container.querySelector(".progress_bar"),
musicList = container.querySelector(".music_list"),
showMoreBtn = container.querySelector("#more_music"),
hideMusicBtn = musicList.querySelector("#close");

let musicIndex = 10;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
})

function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb-1].name;
    musicArtist.innerText = allMusic[indexNumb-1].artist;
    // musicImg.src = allMusic[indexNumb-1].img;
    musicImg.src = `${allMusic[indexNumb-1].img}`;
    mainAudio.src = `songs/${allMusic[indexNumb-1].src}`;
}

function playMusic(){
    container.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

function pauseMusic(){
    container.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

function nextMusic(){
    musicIndex++;
    musicIndex>allMusic.length ? musicIndex=1: musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic(){
    musicIndex--;
    musicIndex<1 ? musicIndex=allMusic.length: musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = container.classList.contains("paused")
    isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", ()=>{
    nextMusic();
})

prevBtn.addEventListener("click", ()=>{
    prevMusic();
})

mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration; 
    let progressWidth = (currentTime/duration)*100;
    progressBar.style.width = `${progressWidth}%`

    let musicCurrentTime = container.querySelector(".starting"),
    musicDuration = container.querySelector(".ending");
    mainAudio.addEventListener("loadeddata", ()=>{

        let audioDuration = mainAudio.duration;
        let totalMinute = Math.floor(audioDuration/60);
        let totalsecond = Math.floor(audioDuration%60);
        if(totalsecond<10){
            totalsecond = `0${totalsecond}`;
        }
        musicDuration.innerText = `${totalMinute}:${totalsecond}`;

    });
    
    let currentMinute = Math.floor(currentTime/60);
    let currentsecond = Math.floor(currentTime%60);
    if(currentsecond<10){
                currentsecond = `0${currentsecond}`;
    }
    musicCurrentTime.innerText = `${currentMinute}:${currentsecond}`;
});

progressArea.addEventListener("click", (e)=>{
    let progressWidthvalue = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX/progressWidthvalue)*songDuration;
});

const repeatBtn = container.querySelector("#suffle");
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random()* allMusic.length)+1);
            do{
                randIndex = Math.floor((Math.random()* allMusic.length)+1);
            }
            while(musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
});

showMoreBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", ()=>{
    showMoreBtn.click();
});

const ulTag = container.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li onClick=()>
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                 </div>
                    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}"></audio>
                    <span id="${allMusic[i].src}" class="audio_duration">5:41</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
    
}
// const heading =document.querySelector("#heading");
// console.log(document.innerWidth);
// if (window.innerWidth<300){

// heading.innerHTML="fuckoff"
// }