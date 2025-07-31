# ShkheharVerse - Lecture Website

A beautiful, responsive frontend-only lecture website built with vanilla HTML, CSS, and JavaScript. Perfectly optimized for Vercel deployment with a soft pastel theme and mobile-first design.

## ✨ Features

- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🎨 Soft Pastel Theme**: Beautiful gradient backgrounds and card designs
- **📹 YouTube Integration**: Automatic YouTube video embedding
- **📝 Dynamic Content**: Lectures loaded from JSON with rich note formatting
- **⚡ Fast Loading**: Lightweight vanilla JavaScript with smooth animations
- **🔄 Error Handling**: Graceful loading states and retry functionality
- **🚀 Vercel Ready**: Zero-config deployment with optimal caching

## 🗂️ Project Structure

```
├── index.html          # Main HTML file with semantic structure
├── styles.css          # Comprehensive CSS with responsive design
├── script.js           # JavaScript for dynamic content loading
├── lectures.json       # Lecture data with videos and notes
├── vercel.json         # Vercel deployment configuration
└── README.md           # This file
```

## 🚀 Quick Start

### Local Development

1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. Or serve locally using any HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

### Vercel Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Option 1: Vercel CLI**
```bash
npm i -g vercel
vercel --prod
```

**Option 2: GitHub Integration**
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically on push

**Option 3: Drag & Drop**
1. Visit [vercel.com](https://vercel.com)
2. Drag project folder to deploy

## 📋 Lecture Data Format

Add lectures to `lectures.json`:

```json
{
  "lectures": [
    {
      "title": "Your Lecture Title",
      "description": "Detailed description of the lecture content...",
      "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
      "notes": [
        "Bullet point note 1",
        "Bullet point note 2"
      ]
    }
  ]
}
```

### Supported Video Formats

- **YouTube URLs**: Automatically converted to embeds
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
- **Other URLs**: Display as clickable "Watch Video" links
- **Empty URLs**: Show "No video available" placeholder

### Notes Formatting

- **Array**: Automatically converted to bullet points
- **String with line breaks**: Converted to bullet list
- **Plain string**: Displayed as paragraph

## 🎨 Customization

### Colors & Theme

Edit `styles.css` to customize the pastel color scheme:

```css
/* Primary colors */
--primary-purple: #6b46c1;
--primary-pink: #fce4ec;
--primary-green: #e8f5e8;
--primary-blue: #f0f8ff;

/* Background gradients */
body {
  background: linear-gradient(135deg, #fef7e0 0%, #f0f8ff 100%);
}
```

### Adding New Lectures

Simply edit `lectures.json` and add new lecture objects. The website will automatically display them with staggered animations.

## 🔧 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+

## 📱 Mobile Features

- Touch-friendly interface
- Optimized card layouts
- Responsive video embeds
- Fast loading on mobile networks

## 🛠️ Development

### File Overview

- **`index.html`**: Clean semantic HTML structure
- **`styles.css`**: Mobile-first CSS with CSS Grid and Flexbox
- **`script.js`**: Vanilla JavaScript with async/await
- **`lectures.json`**: Structured data for easy content management
- **`vercel.json`**: Deployment configuration with security headers

### Performance Features

- Lazy loading animations
- Optimized image handling
- Efficient CSS Grid layout
- Minimal JavaScript bundle
- CDN-optimized fonts

## 🔒 Security

The website includes security headers configured in `vercel.json`:

- Content Security Policy headers
- XSS Protection
- Frame Options
- Content Type validation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Create an issue in the repository
- Check the browser console for error messages
- Ensure `lectures.json` is properly formatted

---

**ShkheharVerse** - Explore. Learn. Grow. 🌟