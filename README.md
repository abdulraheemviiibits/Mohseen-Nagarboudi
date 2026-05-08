# 🕌 Muslim Wedding Invitation Website

**Yusuf & Maryam – A Blessed Union**

A premium, fully responsive Islamic wedding invitation website built with HTML5, CSS3, and Vanilla JavaScript. Ready for deployment on GitHub Pages — no backend required.

---

## ✨ Features

- 🌙 Animated Islamic night sky with floating crescent & star particles
- 🏆 Premium gold, emerald, and midnight color palette
- 📱 Fully mobile-responsive design
- 🌙 Dark / Light theme toggle
- 🌍 Multi-language: English, Urdu, Arabic
- ⏱ Live countdown timer to the wedding day
- 📅 Nikah, Walima & Mehendi event cards
- 🗺 Google Maps venue embed
- 📖 Quran & Sunnah section with beautiful cards
- 📜 Interactive story/journey timeline
- 🖼 Masonry gallery with lightbox
- 💌 Animated digital invitation card with 3D tilt
- ✅ RSVP form (localStorage, no backend)
- 🤲 Dua Wall for guest blessings
- 🗓 Day-of event schedule timeline
- 🎊 Confetti on page load
- 📤 WhatsApp & native share buttons
- 🙏 Dua popup on arrival
- PWA ready (installable on mobile)

---

## 🚀 GitHub Pages Deployment (Step-by-Step)

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create an account)
2. Click the **+** icon (top-right) → **New repository**
3. Name it: `muslim-wedding-invitation` (or your custom name)
4. Set visibility to **Public** (required for free GitHub Pages)
5. Leave all other options as default
6. Click **Create repository**

---

### Step 2 — Upload Your Files

#### Option A: Using GitHub Website (Easiest)

1. Open your new repository on GitHub
2. Click **"uploading an existing file"** (or drag-and-drop)
3. Upload ALL files maintaining the folder structure:
   ```
   index.html
   manifest.json
   README.md
   css/
     style.css
   js/
     main.js
   assets/
     images/   ← add your photos here
     icons/    ← add icon-192.png & icon-512.png here
   ```
4. Write a commit message: `Initial wedding website upload`
5. Click **Commit changes**

#### Option B: Using Git CLI

```bash
# 1. Initialize git in your project folder
git init
git add .
git commit -m "Initial commit: Islamic Wedding Invitation"

# 2. Connect to GitHub (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 3. Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu, gear icon)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: **`main`**
   - Folder: **`/ (root)`**
5. Click **Save**
6. Wait 1–3 minutes for deployment

---

### Step 4 — Access Your Live Website

After deployment, your site will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Example:
```
https://ahmadfamily.github.io/muslim-wedding-invitation/
```

✅ **That's it! Your wedding invitation is live.**

---

## 🎨 Customization Guide

### 1. Change Names & Dates

Open `index.html` and find:

```html
<!-- Hero names -->
<span class="groom-name">Yusuf</span>
<span class="bride-name">Maryam</span>

<!-- Wedding date -->
<p class="hero-date">Saturday, 14th Rajab 1446 · January 25, 2026</p>
```

Open `js/main.js` and update:

```javascript
const CONFIG = {
  weddingDate: new Date('2026-01-25T14:00:00'),  // ← Change this!
  coupleName: { groom: 'Yusuf', bride: 'Maryam' },
  websiteUrl: 'https://your-site.github.io/your-repo/',  // ← Update this!
};
```

### 2. Add Real Photos

Replace the placeholder divs in the gallery section:
```html
<!-- Replace gallery placeholder divs with: -->
<img src="assets/images/photo1.jpg" alt="Family Gathering" />
```

And add your `.jpg` / `.webp` images to the `assets/images/` folder.

### 3. Add Profile Photos

In the couple section, replace the SVG placeholders:
```html
<!-- Replace .couple-photo-placeholder div with: -->
<img src="assets/images/groom.jpg" alt="Yusuf" style="width:120px;height:120px;border-radius:50%;object-fit:cover" />
```

### 4. Update Venue & Google Maps

In `index.html`, find the Google Maps iframe and replace the `src` with your venue's embed URL:

1. Go to [maps.google.com](https://maps.google.com)
2. Search your venue
3. Click **Share** → **Embed a map**
4. Copy the `src` URL and paste it in the iframe

### 5. Add Background Nasheed

1. Add your nasheed MP3 to `assets/nasheed.mp3`
2. Add this to `index.html` (before closing `</body>`):
```html
<audio id="bg-audio" loop preload="none">
  <source src="assets/nasheed.mp3" type="audio/mpeg">
</audio>
```
3. In `js/main.js`, uncomment the audio play/pause lines in the audio toggle section.

### 6. Change Colors

In `css/style.css`, update the CSS variables at the top:

```css
:root {
  --gold: #C9A84C;          /* Main gold color */
  --emerald: #1B6B3A;       /* Islamic green */
  --midnight: #0a0a14;      /* Dark background */
}
```

### 7. Connect Real RSVP (Optional)

The RSVP form currently saves to `localStorage`. To collect real responses:

**Option A — Google Forms:**
1. Create a Google Form with matching fields
2. Replace the form action in `js/main.js`:
```javascript
// In submitRSVP(), replace localStorage save with:
window.open('https://forms.google.com/YOUR_FORM_ID?entry.1='+name, '_blank');
```

**Option B — Formspree (Free):**
1. Sign up at [formspree.io](https://formspree.io)
2. Add `action="https://formspree.io/f/YOUR_ID" method="POST"` to the form element

### 8. Add QR Code for Venue

Use [qr-code-generator.com](https://www.qr-code-generator.com) to generate a QR code for your Google Maps link, save as `assets/images/venue-qr.png`, and add anywhere:

```html
<img src="assets/images/venue-qr.png" alt="Venue QR Code" width="150" />
```

---

## 📁 File Structure

```
muslim-wedding-invitation/
├── index.html              ← Main page
├── manifest.json           ← PWA manifest
├── README.md               ← This file
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← All JavaScript
└── assets/
    ├── images/             ← Add your photos here
    │   ├── groom.jpg       (optional)
    │   ├── bride.jpg       (optional)
    │   └── gallery-*.jpg   (optional)
    └── icons/
        ├── icon-192.png    (PWA icon)
        └── icon-512.png    (PWA icon)
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Site not loading | Wait 5 min after enabling Pages; check branch is `main` |
| CSS not applied | Ensure `css/style.css` path is correct, check uppercase/lowercase |
| Maps not showing | Check your internet; maps work only when online |
| Fonts not loading | Requires internet connection for Google Fonts |
| RSVP data lost | Data is in localStorage; use Formspree for permanent storage |

---

## 💡 Tips

- Test on mobile by sharing the GitHub Pages URL with your phone
- Use Chrome DevTools (F12) → Toggle device toolbar to preview mobile
- Optimize images to under 500KB each for fast loading
- Add `.nojekyll` file in root if using underscores in filenames

---

## 📞 Support

To customize or add features, simply edit the HTML, CSS, and JS files. The code is well-commented for easy modification.

---

*Made with ❤️ & Dua — Yusuf & Maryam 2026*

بَارَكَ اللَّهُ لَكُمَا وَجَمَعَكُمَا فِي خَيْرٍ
