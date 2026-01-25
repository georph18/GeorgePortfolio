/**
 * George Orphanides Portfolio - Interactive JavaScript
 *
 * This file handles:
 * - Smooth scrolling between sections
 * - Audio player initialization with WaveSurfer.js
 * - Waveform visualization for audio files
 * - Play/pause controls
 * - Time display updates
 *
 * Dependencies: WaveSurfer.js (loaded via CDN in HTML)
 */

// ==========================================================================
// SMOOTH SCROLLING FUNCTIONS
// ==========================================================================

/**
 * Scrolls smoothly to the portfolio section
 * Called when user clicks "View My Work" button
 */
function scrollToPortfolio() {
    const portfolioSection = document.getElementById('portfolio');
    portfolioSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Scrolls smoothly back to the landing page
 * Called when user clicks "Back to Top" button
 */
function scrollToLanding() {
    const landingSection = document.getElementById('landing');
    landingSection.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================================================
// AUDIO PLAYER CONFIGURATION
// ==========================================================================

/**
 * Audio project configuration
 * Maps each project to its audio file path
 * Add or remove projects here as needed
 */
const audioProjects = {
    1: {
        file: 'music/audio/MELISSA - I TOLD YOU THINGS.wav',
        title: 'Melissa - I Told You Things'
    },
    2: {
        file: 'https://github.com/georph18/GeorgeOrphanidesPortfolio/releases/download/v1/CORP.6.wav',
        title: 'Corporate 6 - Library Music'
    },
    3: {
        file: 'https://github.com/georph18/GeorgeOrphanidesPortfolio/releases/download/v1.3.1/Silent.Waters.wav',
        title: 'Rock Band - Silent Waters'
    },
    6: {
        file: 'https://github.com/georph18/GeorgeOrphanidesPortfolio/releases/download/v1.2/No.More.Excuses.-.MIX.wav',
        title: 'Rock Band - No More Excuses'
    }
};

/**
 * Store WaveSurfer instances
 * This object will hold all initialized audio players
 */
const waveSurfers = {};

// ==========================================================================
// WAVESURFER INITIALIZATION
// ==========================================================================

/**
 * Initialize all audio players when the page loads
 * This function creates a WaveSurfer instance for each audio project
 */
function initializeAudioPlayers() {
    // Loop through each audio project
    Object.keys(audioProjects).forEach(projectId => {
        const project = audioProjects[projectId];
        const htmlAudio = document.querySelector(`audio.hidden-audio[data-player="${projectId}"]`);
        const waveformElement = document.getElementById(`waveform-${projectId}`);

        if (htmlAudio) {
            setupHtmlAudioPlayer(projectId, htmlAudio);
            return;
        }

        // Skip if the waveform container doesn't exist in the DOM
        if (!waveformElement) {
            console.warn(`Waveform container for project ${projectId} not found`);
            return;
        }

        try {
            // Create a new WaveSurfer instance
            const wavesurfer = WaveSurfer.create({
                container: `#waveform-${projectId}`,
                waveColor: '#4a5568',        // Dark gray for unwaved portion
                progressColor: '#9f7aea',     // Purple accent color for played portion
                cursorColor: '#b794f4',       // Light purple cursor
                barWidth: 3,                  // Width of each waveform bar
                barRadius: 3,                 // Rounded corners on bars
                barGap: 2,                    // Space between bars
                responsive: true,             // Responsive to container size
                height: 80,                   // Height of waveform in pixels
                normalize: true,              // Normalize waveform peaks
                backend: 'MediaElement',      // Use MediaElement for better compatibility with large WAV files
                mediaControls: false,         // Hide native media controls
                xhr: {                        // Configure CORS and caching
                    cache: 'default',
                    mode: 'cors',
                    credentials: 'same-origin'
                }
            });

            // Load the audio file
            wavesurfer.load(project.file);

            // Store the instance for later use
            waveSurfers[projectId] = wavesurfer;

            // Setup event listeners for this player
            setupPlayerEvents(projectId, wavesurfer);

        } catch (error) {
            console.error(`Error initializing player ${projectId}:`, error);
            // Display error message to user
            waveformElement.innerHTML = `
                <p style="color: #e53e3e; padding: 1rem;">
                    Error loading audio. Please check if the file exists at: ${project.file}
                </p>
            `;
        }
    });
}

// ==========================================================================
// PLAYER EVENT HANDLERS
// ==========================================================================

/**
 * Setup event listeners for a custom HTML audio element (no waveform)
 * @param {string} projectId - The project identifier
 * @param {HTMLAudioElement} audioElement - The audio element
 */
function setupHtmlAudioPlayer(projectId, audioElement) {
    const playButton = document.querySelector(`.play-btn[data-player="${projectId}"]`);
    const playIcon = playButton ? playButton.querySelector('.play-icon') : null;
    const currentTimeElement = document.getElementById(`current-time-${projectId}`);
    const durationElement = document.getElementById(`duration-${projectId}`);
    const seekSlider = document.querySelector(`.seek-slider[data-player="${projectId}"]`);
    const volumeSlider = document.querySelector(`.volume-slider[data-player="${projectId}"]`);
    const volumeValue = volumeSlider ? volumeSlider.nextElementSibling : null;
    let isSeeking = false;

    audioElement.volume = 0.7;
    if (volumeSlider) {
        volumeSlider.value = 70;
        if (volumeValue) {
            volumeValue.textContent = '70%';
        }
        volumeSlider.addEventListener('input', (e) => {
            const volume = Number(e.target.value) / 100;
            audioElement.volume = Math.min(Math.max(volume, 0), 1);
            if (volumeValue) {
                volumeValue.textContent = `${e.target.value}%`;
            }
        });
    }

    if (playButton) {
        playButton.addEventListener('click', () => {
            if (audioElement.paused) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
        });
    }

    audioElement.addEventListener('play', () => {
        if (playIcon) {
            playIcon.textContent = '⏸';
        }
        if (playButton) {
            playButton.setAttribute('aria-label', 'Pause');
        }
    });

    audioElement.addEventListener('pause', () => {
        if (playIcon) {
            playIcon.textContent = '▶';
        }
        if (playButton) {
            playButton.setAttribute('aria-label', 'Play');
        }
    });

    audioElement.addEventListener('loadedmetadata', () => {
        if (durationElement) {
            durationElement.textContent = formatTime(audioElement.duration);
        }
        if (currentTimeElement) {
            currentTimeElement.textContent = formatTime(0);
        }
        if (seekSlider) {
            seekSlider.value = 0;
        }
    });

    audioElement.addEventListener('timeupdate', () => {
        if (currentTimeElement) {
            currentTimeElement.textContent = formatTime(audioElement.currentTime);
        }
        if (seekSlider && !isSeeking && audioElement.duration) {
            seekSlider.value = (audioElement.currentTime / audioElement.duration) * 100;
        }
    });

    audioElement.addEventListener('ended', () => {
        if (playIcon) {
            playIcon.textContent = '▶';
        }
        if (playButton) {
            playButton.setAttribute('aria-label', 'Play');
        }
        if (currentTimeElement) {
            currentTimeElement.textContent = formatTime(0);
        }
        if (seekSlider) {
            seekSlider.value = 0;
        }
    });

    if (seekSlider) {
        const endSeek = () => {
            isSeeking = false;
        };

        const startSeek = () => {
            isSeeking = true;
        };

        seekSlider.addEventListener('input', (e) => {
            if (!audioElement.duration) {
                return;
            }
            const value = Number(e.target.value);
            audioElement.currentTime = (value / 100) * audioElement.duration;
        });

        seekSlider.addEventListener('pointerdown', startSeek);
        seekSlider.addEventListener('pointerup', endSeek);
        seekSlider.addEventListener('pointercancel', endSeek);
        seekSlider.addEventListener('lostpointercapture', endSeek);
        seekSlider.addEventListener('mousedown', startSeek);
        seekSlider.addEventListener('mouseup', endSeek);
        seekSlider.addEventListener('touchstart', startSeek, { passive: true });
        seekSlider.addEventListener('touchend', endSeek);
        seekSlider.addEventListener('touchcancel', endSeek);
    }
}

/**
 * Setup event listeners for a specific audio player
 * @param {string} projectId - The project identifier
 * @param {WaveSurfer} wavesurfer - The WaveSurfer instance
 */
function setupPlayerEvents(projectId, wavesurfer) {
    const playButton = document.querySelector(`.play-btn[data-player="${projectId}"]`);
    const playIcon = playButton.querySelector('.play-icon');
    const currentTimeElement = document.getElementById(`current-time-${projectId}`);
    const durationElement = document.getElementById(`duration-${projectId}`);

    // Volume control elements
    const volumeSlider = document.querySelector(`.volume-slider[data-player="${projectId}"]`);
    const volumeValue = volumeSlider.nextElementSibling; // The volume percentage display
    const volumeIcon = volumeSlider.previousElementSibling; // The volume icon

    // Set initial volume to 70%
    wavesurfer.setVolume(0.7);

    // Volume slider change handler
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100; // Convert 0-100 to 0-1
        wavesurfer.setVolume(volume);
        volumeValue.textContent = `${e.target.value}%`;

        // Update volume icon based on level
        if (e.target.value == 0) {
            volumeIcon.textContent = '🔇'; // Muted
        } else if (e.target.value < 33) {
            volumeIcon.textContent = '🔈'; // Low volume
        } else if (e.target.value < 66) {
            volumeIcon.textContent = '🔉'; // Medium volume
        } else {
            volumeIcon.textContent = '🔊'; // High volume
        }
    });

    // Play/Pause button click handler
    playButton.addEventListener('click', () => {
        wavesurfer.playPause();
    });

    // Update play/pause icon when playback state changes
    wavesurfer.on('play', () => {
        playIcon.textContent = '⏸'; // Pause icon
        playButton.setAttribute('aria-label', 'Pause');
    });

    wavesurfer.on('pause', () => {
        playIcon.textContent = '▶'; // Play icon
        playButton.setAttribute('aria-label', 'Play');
    });

    // Update time display during playback
    wavesurfer.on('audioprocess', () => {
        const currentTime = wavesurfer.getCurrentTime();
        currentTimeElement.textContent = formatTime(currentTime);
    });

    // Update duration when audio is ready
    wavesurfer.on('ready', () => {
        const duration = wavesurfer.getDuration();
        durationElement.textContent = formatTime(duration);
        currentTimeElement.textContent = formatTime(0);
        console.log(`Player ${projectId} ready. Duration: ${duration}s`);
    });

    // Update time display when seeking
    wavesurfer.on('seek', () => {
        const currentTime = wavesurfer.getCurrentTime();
        currentTimeElement.textContent = formatTime(currentTime);
    });

    // Reset icon when audio finishes playing
    wavesurfer.on('finish', () => {
        playIcon.textContent = '▶';
        playButton.setAttribute('aria-label', 'Play');
    });

    // Handle loading errors
    wavesurfer.on('error', (error) => {
        console.error(`Player ${projectId} error:`, error);
        playButton.disabled = true;
        playButton.style.opacity = '0.5';
        playButton.style.cursor = 'not-allowed';

        // Show error in the waveform container
        const waveformContainer = document.getElementById(`waveform-${projectId}`);
        waveformContainer.innerHTML = `
            <div style="padding: 1rem; color: #fc8181; background: #742a2a; border-radius: 5px;">
                <strong>⚠ Error loading audio</strong><br>
                <small>Make sure to run from a local server (not file://)</small>
            </div>
        `;
    });

    // Show loading state
    wavesurfer.on('loading', (percent) => {
        if (percent < 100) {
            currentTimeElement.textContent = `${Math.round(percent)}%`;
        }
    });
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

/**
 * Format time in seconds to MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string (e.g., "3:45")
 */
function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) {
        return '0:00';
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Pause all other audio players when one starts playing
 * This ensures only one audio plays at a time
 * @param {string} currentPlayerId - The ID of the currently playing audio
 */
function pauseOtherPlayers(currentPlayerId) {
    Object.keys(waveSurfers).forEach(playerId => {
        if (playerId !== currentPlayerId && waveSurfers[playerId].isPlaying()) {
            waveSurfers[playerId].pause();
        }
    });
}

// ==========================================================================
// ENHANCED FEATURES (Optional - can be enabled)
// ==========================================================================

/**
 * Add keyboard shortcuts for audio control
 * Space: Play/Pause the first audio
 * You can expand this to control other players
 */
function enableKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Space bar to play/pause (when not focused on a button)
        if (e.code === 'Space' && e.target.tagName !== 'BUTTON') {
            e.preventDefault();
            const firstPlayer = waveSurfers[Object.keys(waveSurfers)[0]];
            if (firstPlayer) {
                firstPlayer.playPause();
            }
        }
    });
}

/**
 * Add intersection observer to pause audio when scrolled out of view
 * This improves user experience by auto-pausing off-screen audio
 */
function enableAutoPauseOnScroll() {
    const projectCards = document.querySelectorAll('.project-card[data-type="audio"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Find the audio player in this card and pause it
                const playButton = entry.target.querySelector('.play-btn');
                if (playButton) {
                    const playerId = playButton.getAttribute('data-player');
                    const player = waveSurfers[playerId];
                    if (player && player.isPlaying()) {
                        player.pause();
                    }
                }
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the card is visible
        rootMargin: '-50px' // Add some margin
    });

    // Observe each audio card
    projectCards.forEach(card => observer.observe(card));
}

// ==========================================================================
// VIDEO PLAYER ENHANCEMENTS
// ==========================================================================

/**
 * Pause videos when they scroll out of view
 * This saves bandwidth and improves performance
 */
function enableVideoPauseOnScroll() {
    const videos = document.querySelectorAll('.video-player video');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (!entry.isIntersecting && !video.paused) {
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Pause when less than 50% visible
    });

    videos.forEach(video => observer.observe(video));
}

// ==========================================================================
// COPY BUTTONS
// ==========================================================================

/**
 * Enable copy buttons for contact details
 */
function setupCopyButtons() {
    document.addEventListener('click', async (event) => {
        const button = event.target.closest('[data-copy]');
        if (!button) {
            return;
        }

        const value = button.getAttribute('data-copy');
        const status = button.parentElement.querySelector('.copy-status');

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(value);
            } else {
                const tempInput = document.createElement('textarea');
                tempInput.value = value;
                tempInput.setAttribute('readonly', '');
                tempInput.style.position = 'absolute';
                tempInput.style.left = '-9999px';
                document.body.appendChild(tempInput);
                tempInput.select();
                const success = document.execCommand('copy');
                document.body.removeChild(tempInput);
                if (!success) {
                    throw new Error('execCommand copy failed');
                }
            }

            if (status) {
                status.textContent = 'Copied!';
                window.setTimeout(() => {
                    status.textContent = '';
                }, 1500);
            }
        } catch (error) {
            console.error('Copy failed:', error);
            if (status) {
                status.textContent = 'Copy failed';
                window.setTimeout(() => {
                    status.textContent = '';
                }, 1500);
            }
        }
    });
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================

/**
 * Initialize everything when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Initializing George Orphanides Portfolio...');

    // Initialize audio players
    initializeAudioPlayers();

    // Enable optional features (uncomment to activate)
    // enableKeyboardShortcuts();
    // enableAutoPauseOnScroll();
    enableVideoPauseOnScroll();
    setupCopyButtons();

    console.log('✅ Portfolio initialized successfully!');
});

// ==========================================================================
// INSTRUCTIONS FOR ENHANCEMENT
// ==========================================================================

/**
 * HOW TO ADD A NEW AUDIO PROJECT:
 *
 * 1. Add the audio file to the music/audio/ folder
 *
 * 2. Add a new project card in index.html (copy existing card structure)
 *
 * 3. Add the project to the audioProjects object above:
 *    7: {
 *        file: 'music/audio/your-file.wav',
 *        title: 'Your Project Title'
 *    }
 *
 * 4. The player will automatically initialize!
 */

/**
 * HOW TO CUSTOMIZE WAVEFORM COLORS:
 *
 * In the WaveSurfer.create() function above, modify:
 * - waveColor: Color of the unplayed waveform
 * - progressColor: Color of the played portion
 * - cursorColor: Color of the playback cursor
 *
 * You can use any valid CSS color (hex, rgb, color names)
 */

/**
 * HOW TO CUSTOMIZE VOLUME CONTROL:
 *
 * The volume control includes:
 * - Dynamic volume icon (🔇 🔈 🔉 🔊) that changes based on volume level
 * - Slider with range 0-100%
 * - Visual percentage display
 * - Default volume is set to 70%
 *
 * To change the default volume:
 * 1. Modify the value attribute in HTML: value="70" (line ~68, 95, 122, 184)
 * 2. Update wavesurfer.setVolume(0.7) in setupPlayerEvents (line 154)
 *
 * Volume levels:
 * - 0: Muted (🔇)
 * - 1-32: Low (🔈)
 * - 33-65: Medium (🔉)
 * - 66-100: High (🔊)
 */

/**
 * HOW TO ADD VIDEO PROJECTS:
 *
 * 1. Add the video file to music/video/ folder
 *
 * 2. Copy an existing video project card in index.html
 *
 * 3. Update the source path to point to your new video
 *
 * 4. No JavaScript changes needed - HTML5 video works automatically!
 */

/**
 * PERFORMANCE TIPS:
 *
 * - For very large audio files (>100MB), consider using MP3 instead of WAV
 * - WAV files provide best quality but are larger in size
 * - Compress videos to reduce loading time (recommended: H.264, 720p-1080p)
 * - Enable lazy loading by adding loading="lazy" to video tags
 */
