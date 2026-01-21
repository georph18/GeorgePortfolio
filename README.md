# George Orphanides - Audio Engineering & Music Portfolio

A professional, responsive portfolio website showcasing audio engineering and music production work.

## 🎯 Overview

This portfolio website features:

- **Landing Page**: Elegant introduction with bio, photo, and smooth animations
- **Portfolio Section**: Showcase of audio and video projects with interactive media players
- **Audio Player**: Custom waveform visualization using WaveSurfer.js with volume control
- **Volume Control**: Interactive volume slider with dynamic icons and percentage display
- **Video Player**: Native HTML5 video player with controls
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Professional fade-in effects and transitions
- **Dark Theme**: Professional dark grey and purple color scheme

## 📁 Project Structure

```
George-Orphanides-Portfolio/
│
├── index.html          # Main HTML file (landing + portfolio pages)
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality and audio players
├── README.md           # This file
│
├── images/
│   └── Bio Photo.jpeg  # Profile photo
│
├── Text/
│   └── Bio.txt         # Biography text
│
└── music/
    ├── audio/          # Audio files (.wav, .mp3)
    │   ├── MELISSA - I TOLD YOU THINGS.wav
    │   ├── CORP 6.wav
    │   ├── Silent Waters - Mix.mp3
    │   └── No More Excuses - MIX.wav
    │
    └── video/          # Video files (.mp4)
        ├── MELISSA - WILDFLOWER.mp4
        └── Too Close For Comfort  Cover by Chara Miller Quintet.mp4
```

## 🚀 Getting Started

**⚠️ IMPORTANT: Audio files (.wav) require a local server to work properly!**

### Easiest Method: Use the Start Scripts

**For Windows:**
1. Double-click `start-server.bat`
2. Open `http://localhost:8000` in your browser

**For Mac/Linux:**
1. Run `./start-server.sh` in terminal
2. Open `http://localhost:8000` in your browser

### Manual Method: Start a Local Server

```bash
# Using Python 3 (recommended)
python -m http.server 8000

# Using Python 3 on some systems
python3 -m http.server 8000

# Using PHP
php -S localhost:8000

# Using Node.js
npx http-server
```

Then open `http://localhost:8000` in your browser.

### Why a Local Server?

Audio files (especially large .wav files) cannot be loaded properly when opening HTML files directly (file:// protocol) due to browser security restrictions. A local server serves files over HTTP (http://localhost), which allows audio players to function correctly.

## 🛠 Technology Stack

### Core Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and responsive design
- **Vanilla JavaScript**: Clean, dependency-free interactivity

### Libraries
- **WaveSurfer.js v7.7.3**: Audio waveform visualization
  - Loaded via CDN (no installation needed)
  - Creates beautiful, interactive audio waveforms
  - Shows playback progress visually

### Features
- CSS Grid & Flexbox for responsive layouts
- CSS Custom Properties (variables) for easy theme customization
- Intersection Observer API for performance optimization
- Web Audio API (via WaveSurfer) for audio visualization

## 📋 Current Portfolio Projects

1. **Melissa (Singer) – I Told You Things (Cover)**
   - Role: Recording (Vocals) / Editing / Mixing / Mastering
   - Type: Audio with waveform player

2. **Corporate 6 – Library Music**
   - Role: Recording / Editing / Mixing
   - Type: Audio with waveform player

3. **Rock Band – Silent Waters**
   - Role: Mixing
   - Type: Audio with waveform player

4. **Jazz Band – Too Close for Comfort (Cover)**
   - Role: Recording (Drums, Double Bass, Saxophone, Guitar, Vocals) / Editing / Video Production
   - Type: Video with audio

5. **Melissa (Singer) – Wildflower (Cover)**
   - Role: Recording (Vocals) / Editing / Mixing / Mastering / Video Production
   - Type: Video with audio

6. **Rock Band – No More Excuses**
   - Role: Mixing / Mastering
   - Type: Audio with waveform player

## ✏️ How to Customize

### Change Colors
Edit the CSS variables in `styles.css` (lines 12-22):
```css
:root {
    --primary-color: #2d3748;      /* Main text color */
    --accent-color: #667eea;       /* Buttons and highlights */
    --background: #ffffff;         /* Background color */
    /* ... more variables ... */
}
```

### Change Waveform Colors
Edit in `script.js` (around line 89):
```javascript
const wavesurfer = WaveSurfer.create({
    waveColor: '#4a5568',       // Unplayed waveform color
    progressColor: '#9f7aea',   // Played portion color
    cursorColor: '#b794f4',     // Playback cursor color
    // ... more options ...
});
```

### Customize Volume Control

The volume control includes:
- Dynamic volume icons (🔇 🔈 🔉 🔊) based on level
- Interactive slider (0-100%)
- Real-time percentage display
- Default volume: 70%

**To change default volume:**
1. Edit `value="70"` in HTML (index.html, search for "volume-slider")
2. Update `wavesurfer.setVolume(0.7)` in script.js (line ~154)

**Volume icon thresholds:**
- 0: 🔇 Muted
- 1-32: 🔈 Low
- 33-65: 🔉 Medium
- 66-100: 🔊 High

### Add a New Audio Project

1. **Add the audio file** to the `music/audio/` folder

2. **Add project to JavaScript** in `script.js` (around line 40):
```javascript
const audioProjects = {
    // ... existing projects ...
    7: {
        file: 'music/audio/your-new-file.wav',
        title: 'Your Project Title'
    }
};
```

3. **Add HTML card** in `index.html` (copy an existing audio project card):
```html
<div class="project-card" data-type="audio">
    <div class="project-header">
        <h3 class="project-title">Your Project Title</h3>
        <span class="project-type">Audio</span>
    </div>
    <p class="project-role">
        <strong>Role:</strong> Your role description
    </p>
    <div class="audio-player">
        <div id="waveform-7" class="waveform"></div>
        <div class="audio-controls">
            <button class="play-btn" data-player="7">
                <span class="play-icon">▶</span>
            </button>
            <div class="time-display">
                <span id="current-time-7">0:00</span> / <span id="duration-7">0:00</span>
            </div>
        </div>
    </div>
</div>
```

### Add a New Video Project

1. **Add the video file** to the `music/video/` folder

2. **Add HTML card** in `index.html` (copy an existing video project card):
```html
<div class="project-card" data-type="video">
    <div class="project-header">
        <h3 class="project-title">Your Project Title</h3>
        <span class="project-type">Video & Audio</span>
    </div>
    <p class="project-role">
        <strong>Role:</strong> Your role description
    </p>
    <div class="video-player">
        <video controls preload="metadata">
            <source src="music/video/your-video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</div>
```

### Update Bio Information

1. Edit `Text/Bio.txt` with new bio text
2. Replace `images/Bio Photo.jpeg` with a new photo (keep the same filename)
3. Refresh the page - changes appear automatically!

### Change Typography

Edit font sizes in `styles.css` (lines 24-30):
```css
:root {
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    /* ... more sizes ... */
}
```

## 🎨 Design Features

### Animations
- **Fade-in on landing page**: Bio section smoothly appears
- **Pulse effect**: "View My Work" button gently pulses
- **Staggered project cards**: Each portfolio item animates in sequence
- **Hover effects**: Cards lift on hover for interactivity
- **Scroll indicator**: Animated mouse icon guides users

### Responsive Breakpoints
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 1199px (adjusted spacing)
- **Mobile**: < 768px (stacked layout)

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast colors
- Readable font sizes

## 🔧 Advanced Customization

### Enable Optional Features

In `script.js`, uncomment these functions at line 284:

```javascript
// Enable keyboard shortcuts (Space to play/pause)
enableKeyboardShortcuts();

// Auto-pause audio when scrolled out of view
enableAutoPauseOnScroll();
```

### Performance Optimization Tips

1. **Compress Large Files**:
   - Use MP3 instead of WAV for smaller file sizes
   - Compress videos to H.264, 720p-1080p resolution

2. **Lazy Loading**:
   - Add `loading="lazy"` attribute to video tags

3. **CDN Alternative**:
   - For production, consider hosting WaveSurfer.js locally

## 📱 Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

*Note*: Older browsers may not support all modern CSS features.

## 🐛 Troubleshooting

### Audio Not Playing (Shows 0:00 / 0:00)

**⚠️ MOST COMMON ISSUE: Not using a local server!**

Audio files (.wav) **MUST** be served via a local server. Simply opening `index.html` directly will NOT work.

**Solution:**
1. Run `./start-server.sh` (Mac/Linux) or `start-server.bat` (Windows)
2. OR manually start a server: `python -m http.server 8000`
3. Open `http://localhost:8000` in your browser

**Other potential issues:**
- Check file path in `audioProjects` object in `script.js`
- Ensure file exists in `music/audio/` folder
- Check browser console (F12) for errors
- Verify audio file isn't corrupted

### Video Not Showing
- Verify video format is MP4 (H.264 codec)
- Check file path in HTML
- Ensure video file isn't corrupted
- Check if video file size is reasonable (< 500MB recommended)

### Waveform Not Loading
- **First, make sure you're using a local server (see above)**
- Verify WaveSurfer.js CDN is loading (check console)
- Ensure audio file format is supported (.wav, .mp3, .ogg)
- Try a different browser
- Clear browser cache

### Styling Issues
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check if `styles.css` is linked correctly in HTML
- Verify CSS file is in the same directory as index.html

## 📄 Code Quality

### Clean Code Principles
- ✅ Well-commented and organized
- ✅ Consistent naming conventions
- ✅ Modular and reusable functions
- ✅ DRY (Don't Repeat Yourself) approach
- ✅ Semantic HTML for clarity
- ✅ CSS organized by sections

### Comments Guide
- HTML: Comments mark major sections
- CSS: Comments organize style groups
- JavaScript: JSDoc-style comments explain functions

## 🚢 Deployment Options

### GitHub Pages (Free)
1. Create a GitHub repository
2. Push all files to the repository
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `username.github.io/repo-name`

### Netlify (Free)
1. Drag and drop the entire folder to netlify.com/drop
2. Get instant deployment with custom URL
3. Automatic HTTPS included

### Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts for deployment

## 📞 Support & Questions

For issues or questions about this portfolio:
- Check the troubleshooting section above
- Review code comments in each file
- Inspect browser console for error messages
- Verify file paths and folder structure

## 📝 License

This is a custom portfolio website created for George Orphanides. Feel free to use as a template for your own portfolio with appropriate modifications.

---

**Built with** ❤️ **using modern web technologies**

*Last updated: January 2026*
