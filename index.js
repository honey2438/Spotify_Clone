// initialize elements
let search=document.getElementById("search");
let masterPlay = document.getElementById("master-play");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let forwardPlay = document.getElementById("forward-play");
let backwardPlay = document.getElementById("backward-play");
let plButton = Array.from(document.getElementsByClassName("pl-button"));
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songTitle= document.getElementById("song_title");
let currentDuration=document.getElementById("currentDuration");
let mxDuration=document.getElementById("mxDuration");
let container=document.getElementsByClassName('container')[0];
let loop=document.getElementById("loop");
let flag=false;

// array of songs
let songs = [
  { title: "perfect", spath: "songs/1.mp3", ipath: "image/1.jpg" },
  { title: "Aaja We Mahiya", spath: "songs/2.mp3", ipath: "image/2.jpg" },
  { title: "Yarrian", spath: "songs/3.mp3", ipath: "image/3.jpg" },
  { title: "Arrogant", spath: "songs/4.mp3", ipath: "image/4.jpg" },
  { title: "Champagne", spath: "songs/5.mp3", ipath: "image/5.jpg" },
  { title: "Dholna", spath: "songs/6.mp3", ipath: "image/6.jpg" },
  { title: "Love the way you lie", spath: "songs/7.mp3", ipath: "image/7.jpg" },
  { title: "Till I collapse", spath: "songs/8.mp3", ipath: "image/8.jpg" },
  {
    title: "Kabhi Kabhi Aditi Zindgi",
    spath: "songs/9.mp3",
    ipath: "image/9.jpg",
  },
  { title: "Kaun Hoyega", spath: "songs/10.mp3", ipath: "image/10.jpg" },
  { title: "I Like me Better", spath: "songs/11.mp3", ipath: "image/11.jpg" },
  { title: "Legacy", spath: "songs/12.mp3", ipath: "image/12.jpg" },
  { title: "Dildara", spath: "songs/13.mp3", ipath: "image/13.jpg" },
  {
    title: "Pata nahi kis roop me",
    spath: "songs/14.mp3",
    ipath: "image/14.jpg",
  },
  { title: "Quismat", spath: "songs/15.mp3", ipath: "image/15.jpg" },
  { title: "Udaarian", spath: "songs/16.mp3", ipath: "image/16.jpg" },
  { title: "Dusk till Down", spath: "songs/17.mp3", ipath: "image/17.jpg" },
];

let n=songs.length;
let audioElement = new Audio(songs[0].spath);
let check=songs[0].spath;

// play function
let play=()=>{
    closePlay();
    audioElement.play();
    plButton[j%n].classList.remove("fa-play-circle");
    plButton[j%n].classList.add("fa-pause-circle");
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    songTitle.innerHTML=songs[j%17].title;
    container.style.background=`url(${songs[j%17].ipath})`;
    dur;
}
// pause function
let pause=()=>{
    audioElement.pause();
    plButton[j%n].classList.add("fa-play-circle");
    plButton[j%n].classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    masterPlay.classList.remove("fa-pause-circle");
    gif.style.opacity = 0;
}

// control play pause button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused == true) {
    play();
  } else {
    pause();
  }
});

// to update the progressbar as per the song duration
audioElement.addEventListener("timeupdate", () => {
    currentDuration
  myProgressBar.value =
    parseFloat(audioElement.currentTime / audioElement.duration) * 100;
});

// to update current time per second
setInterval( () => {
    if(flag==true && audioElement.currentTime==audioElement.duration){
      audioElement.currentTime=0;
      audioElement.play();
    }
    else if(audioElement.currentTime==audioElement.duration)forwardPlay.onclick();

    let min = Math.floor(audioElement.currentTime / 60);
    let sec = Math.floor(audioElement.currentTime % 60);
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    currentDuration.innerHTML=min+":"+sec;
  },1000);

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    parseFloat(myProgressBar.value * audioElement.duration) / 100;
});


// setting all the properties to the song list using songs array
let i = 0;
songItem.forEach((e) => {
  e.getElementsByTagName("span")[0].innerHTML = songs[i].title;
  e.firstElementChild.src = songs[i].ipath;
  let audio = new Audio(songs[i].spath);
  audio.addEventListener("loadedmetadata", () => {
    let min = Math.floor(audio.duration / 60);
    let sec = Math.floor(audio.duration % 60);
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    e.lastElementChild.firstElementChild.innerHTML = min + ":" + sec;
  });
  i++;
});


//   closePlay
let closePlay = () => {
  plButton.forEach((e) => {
    e.classList.add("fa-play-circle");
    e.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    masterPlay.classList.remove("fa-pause-circle");
    
  });
};

// choosing songs from the given list
let j=0;
plButton.forEach((e) => {
  e.addEventListener("click", () => {
    let index = e.getAttribute("index");
    j=index;
    if(check!=songs[index].spath)audioElement.src = songs[index].spath;
    check=songs[index].spath;

      if(audioElement.currentTime<=0){
        play();
      }
      else if(audioElement.paused==true){
        play();
      }
      else{
        pause();
      }
  });
});

// setting duration of the songs given in the list
let dur=audioElement.addEventListener("loadedmetadata", () => {
    let min = Math.floor(audioElement.duration / 60);
    let sec = Math.floor(audioElement.duration % 60);
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    mxDuration.innerHTML = min + ":" + sec;
  });

// backward button function
backwardPlay.onclick = () => {
  j--;
  if (j <=0) j = 16;
  audioElement.src=songs[j%n].spath;
  play();
};

// forward button function
forwardPlay.onclick = () => {
  j++;
  audioElement.src=songs[j%n].spath;
  play();
};

// loop function
loop.addEventListener('click',()=>{
    if(flag==false){
      flag=true;
      loop.style.color='rgb(255, 124, 124)';
    }
    else{
      flag=false;
      loop.style.color='white';
    }
})

// search bar coding
    search.oninput=function(){
        let i;
        let filter=search.value.toLowerCase();
        for(i=0;i<songItem.length;i++){
            let song=songItem[i].getElementsByTagName('span')[0].innerHTML.toLowerCase();
            
            if(song.indexOf(filter)>-1)songItem[i].style.display="";
            else{
                songItem[i].style.display="none";
            }
        }
    }
