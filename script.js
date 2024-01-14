let isLocked = false;
let soundEnabled = true;

const soundFiles = [
    'sounds/sound1.mp3',
    'sounds/sound2.mp3',
    'sounds/sound3.mp3'
];

document.getElementById('lockButton').addEventListener('click', function() {
    isLocked = !isLocked;
    this.textContent = isLocked ? 'Unlock Keyboard' : 'Lock Keyboard';

    const alertBox = document.getElementById('alertBox');
    if (isLocked) {
        alertBox.style.display = 'block';
        toggleFullScreen();

        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 10000);
    } else {
        alertBox.style.display = 'none';
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (isLocked) {
        if (event.code === 'Space') {
            event.preventDefault();
        }
        changeBackgroundColor();

        if (soundEnabled) {
            playRandomSound();
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (isLocked) {
        changeBackgroundColor();
    }
});

function changeBackgroundColor() {
    const newColor = getRandomColor();
    document.body.style.transition = 'background-color 1s';
    document.body.style.backgroundColor = newColor;
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

document.getElementById('soundButton').addEventListener('click', function() {
    soundEnabled = !soundEnabled;
    updateSoundIcon();
});

function updateSoundIcon() {
    const soundIcon = document.getElementById('soundIcon');
    soundIcon.src = soundEnabled ? 'imgs/volume_on.svg' : 'imgs/volume_off.svg';
}

function playRandomSound() {
    const randomIndex = Math.floor(Math.random() * soundFiles.length);
    const soundToPlay = soundFiles[randomIndex];
    const audio = new Audio(soundToPlay);
    audio.play();
}

function updateSoundIcon() {
    const soundIcon = document.getElementById('soundIcon');
    soundIcon.src = soundEnabled ? 'imgs/volume_on.svg' : 'imgs/volume_off.svg';
}