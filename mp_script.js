const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/music/Daniel - Frontal Impact.m4a',
        displayName: 'Frontal Impact',
        cover: 'assets/image/D-FI.jpg',
        artist: 'Daniel',
    },
    {
        path: 'assets/music/Dave Rodgers - Deja Vu.m4a',
        displayName: 'Deja Vu',
        cover: 'assets/image/DR-DV.jpg',
        artist: 'Dave Rodgers',
    },
    {
        path: 'assets/music/Dave Simon - I Need Your Love.mp3',
        displayName: 'I Need Your Love',
        cover: 'assets/image/DS-INYL.jpg',
        artist: 'Dave Simon',
    },
    {
        path: 'assets/music/Delta Queens - Dance Around The World.m4a',
        displayName: 'Dance Around The World',
        cover: 'assets/image/DQ-DATW.jpg',
        artist: 'Delta Queens',
    },
    {
        path: 'assets/music/Denise - Burning Like a Flame.m4a',
        displayName: 'Burning Like a Flame',
        cover: 'assets/image/D-BLAF.jpg',
        artist: 'Denise',
    },
    {
        path: 'assets/music/Ducky Chix - Prayer.mp3',
        displayName: 'Prayer',
        cover: 'assets/image/DC-P.jpg',
        artist: 'Ducky Chix',
    },
    {
        path: 'assets/music/Go 2 - Power.m4a',
        displayName: 'Power',
        cover: 'assets/image/G2-P.jpg',
        artist: 'Go 2',
    },
    {
        path: 'assets/music/Ken Blast - The Top.m4a',
        displayName: 'The Top',
        cover: 'assets/image/KB-TT.jpg',
        artist: 'Ken Blast',
    },
    {
        path: 'assets/music/Leslie Parrish - Killing My Love.mp3',
        displayName: 'Killing My Love',
        cover: 'assets/image/LP-KML.jpg',
        artist: 'Leslie Parrish',
    },
    {
        path: 'assets/music/Leslie Parrish - Remember Me.mp3',
        displayName: 'Remember Me',
        cover: 'assets/image/LP-RM.jpg',
        artist: 'Leslie Parrish',
    },
    {
        path: 'assets/music/Leslie Parrish - Save Me.mp3',
        displayName: 'Save Me',
        cover: 'assets/image/LP-SM.jpg',
        artist: 'Leslie Parrish',
    },
    {
        path: 'assets/music/Lupin - Black U.F.O.m4a',
        displayName: 'Black UFO',
        cover: 'assets/image/L-BUFO.jpg',
        artist: 'Lupin',
    },
    {
        path: 'assets/music/m.o.v.e. - Rage Your Dream.m4a',
        displayName: 'Rage Your Dream',
        cover: 'assets/image/MOVE-RYD.jpg',
        artist: 'm.o.v.e.',
    },
    {
        path: 'assets/music/Max Coveri - Running In The 90s.mp3',
        displayName: 'Running In The 90s',
        cover: 'assets/image/MC-RIT90s.jpg',
        artist: 'Max Coveri',
    },
    {
        path: 'assets/music/Niko - Night of Fire.m4a',
        displayName: 'Night of Fire',
        cover: 'assets/image/N-NOF.jpg',
        artist: 'Niko',
    },
    {
        path: 'assets/music/Priscilla - Love Is In Danger.mp3',
        displayName: 'Love Is In Danger',
        cover: 'assets/image/P-LIID.jpg',
        artist: 'Priscilla',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);