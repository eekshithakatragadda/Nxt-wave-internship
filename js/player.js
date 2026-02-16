// Function for the Hero "Listen Now" button - Only updates the bar
function listenNow(button) {
    const playerContainer = document.getElementById('player-container');
    
    // Get info from button attributes
    const title = button.getAttribute('data-title');
    const subtext = button.getAttribute('data-author');
    const imgSrc = button.getAttribute('data-img');
    const targetPage = button.getAttribute('data-link');

    // Update the bottom bar (No window.location.href here)
    playerContainer.innerHTML = `
        <div class="d-flex align-items-center gap-3" style="width: 25%; min-width: 250px;">
            <img src="${imgSrc}" style="width: 48px; height: 48px; border-radius: 8px;">
            <div style="overflow: hidden;">
                <div style="color: white; font-weight: 600; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${title}</div>
                <div style="color: #94A3B8; font-size: 13px;">${subtext}</div>
            </div>
        </div>
        <div class="player-controls">
            <i class="fa-solid fa-backward-step"></i>
            <div class="play-toggle" id="main-play-btn"><i class="fa-solid fa-pause"></i></div>
            <i class="fa-solid fa-forward-step"></i>
        </div>
        <div class="d-flex align-items-center justify-content-end gap-4" style="width: 25%;">
            <div class="volume-container">
                <i class="fa-solid fa-volume-low" style="color: #94A3B8; font-size: 14px;"></i>
                <input type="range" class="volume-slider" min="0" max="100" value="70">
            </div>
            <i class="fa-solid fa-expand" style="color: #94A3B8; cursor: pointer;" onclick="window.location.href='${targetPage}'"></i>
        </div>
    `;

    // Re-bind the play/pause toggle for the newly injected button
    const playBtn = document.getElementById('main-play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            const icon = playBtn.querySelector('i');
            icon.classList.toggle('fa-pause');
            icon.classList.toggle('fa-play');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // SECTION 1: BOTTOM BAR LOGIC (Home & Details Pages)
    const playerContainer = document.getElementById('player-container');
    const radioButtons = document.querySelectorAll('.pod-selector-logic');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const card = e.target.nextElementSibling;
            const title = card.querySelector('b').innerText;
            const subtext = card.querySelector('small').innerText;
            const imgSrc = card.querySelector('.thumb img').src;
            
            // Capture the custom data-link attribute from the radio input
            const targetPage = e.target.getAttribute('data-link');

            playerContainer.innerHTML = `
                <div class="d-flex align-items-center gap-3" style="width: 25%; min-width: 250px;">
                    <img src="${imgSrc}" style="width: 48px; height: 48px; border-radius: 8px;">
                    <div style="overflow: hidden;">
                        <div style="color: white; font-weight: 600; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${title}</div>
                        <div style="color: #94A3B8; font-size: 13px;">${subtext}</div>
                    </div>
                </div>
                <div class="player-controls">
                    <i class="fa-solid fa-backward-step"></i>
                    <div class="play-toggle" id="main-play-btn"><i class="fa-solid fa-pause"></i></div>
                    <i class="fa-solid fa-forward-step"></i>
                </div>
                <div class="d-flex align-items-center justify-content-end gap-4" style="width: 25%;">
                    <div class="volume-container">
                        <i class="fa-solid fa-volume-low" style="color: #94A3B8; font-size: 14px;"></i>
                        <input type="range" class="volume-slider" min="0" max="100" value="70">
                    </div>
                    <i class="fa-solid fa-expand" style="color: #94A3B8; cursor: pointer;" onclick="window.location.href='${targetPage}'"></i>
                </div>
            `;
            
            const playBtn = document.getElementById('main-play-btn');
            if (playBtn) {
                playBtn.addEventListener('click', () => {
                    const icon = playBtn.querySelector('i');
                    icon.classList.toggle('fa-pause');
                    icon.classList.toggle('fa-play');
                });
            }
        });
    });

    // SECTION 2: FULL-SCREEN PLAYER LOGIC (aiRev.html, etc.)
    
    // 1. Pause/Play Button Switch
    const playToggle = document.getElementById('playToggle');
    if (playToggle) {
        playToggle.addEventListener('click', () => {
            const icon = playToggle.querySelector('i');
            icon.classList.toggle('fa-pause');
            icon.classList.toggle('fa-play');
        });
    }

    // 2. Dynamic Time Update (Changes while dragging)
    const mainSeek = document.getElementById('mainSeek');
    const currentTimeText = document.getElementById('currentTime');
    
    if (mainSeek && currentTimeText) {
        mainSeek.addEventListener('input', (e) => {
            const seconds = e.target.value;
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            currentTimeText.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        });
    }

    // 3. Playback Speed Sequence Cycle
    const speedBtn = document.getElementById('speedToggle');
    const speedSequence = ['1x', '1.25x', '1.5x', '1.75x', '2x', '0.5x', '0.75x'];
    let currentSpeedIdx = 0; 

    if (speedBtn) {
        speedBtn.addEventListener('click', () => {
            currentSpeedIdx = (currentSpeedIdx + 1) % speedSequence.length;
            speedBtn.innerText = speedSequence[currentSpeedIdx];
        });
    }
});