document.addEventListener('DOMContentLoaded', function() {
    const playPauseButtons = document.querySelectorAll('.play-pause-button');
    const progressBars = document.querySelectorAll('.progress-bar');
    const timeContainers = document.querySelectorAll('.time-container');
    const Audiofiles = document.querySelectorAll('.AudioFile');
    const volumeBars = document.querySelectorAll('.volume-bar');
    let currentAudio = null;

    playPauseButtons.forEach((playPauseButton) => {
        playPauseButton.addEventListener('click', () => {
            const audioPlayer = playPauseButton.closest('.audio-player').querySelector('.AudioFile');

            if (currentAudio && currentAudio !== audioPlayer) {
                currentAudio.pause();
                currentAudio.closest('.audio-player').querySelector('.play-pause-button').classList.remove('fa-pause');
                currentAudio.closest('.audio-player').querySelector('.play-pause-button').classList.add('fa-play');
            }

            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseButton.classList.remove('fa-play');
                playPauseButton.classList.add('fa-pause');
                currentAudio = audioPlayer;
            } else {
                audioPlayer.pause();
                playPauseButton.classList.remove('fa-pause');
                playPauseButton.classList.add('fa-play');
                currentAudio = null;
            }
        });
    });

    Audiofiles.forEach((Audiofile) => {
        Audiofile.addEventListener('timeupdate', () => {
            const currentTime = Audiofile.currentTime;
            const duration = Audiofile.duration;
            const progress = (currentTime / duration) * 100;
            const progressBar = Audiofile.closest('.audio-player').querySelector('.progress-bar');
            const timeContainer = Audiofile.closest('.audio-player').querySelector('.time-container');

            progressBar.value = progress;
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            timeContainer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`;
        });

        const progressBar = Audiofile.closest('.audio-player').querySelector('.progress-bar');
        progressBar.addEventListener('input', () => {
            const currentTime = Audiofile.duration * (progressBar.value / 100);
            Audiofile.currentTime = currentTime;
        });
    });
    volumeBars.forEach((volumeBar) => {
        const Audiofile = volumeBar.closest('.audio-player').querySelector('.AudioFile');
        volumeBar.addEventListener('input', () => {
            const volume = volumeBar.value / 100;
            Audiofile.volume = volume;
        });
    });
});
