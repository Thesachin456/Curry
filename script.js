// DOM Elements
const lecturesGrid = document.getElementById('lectures-grid');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');

// Utility function to extract YouTube video ID from various URL formats
function getYouTubeVideoId(url) {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Function to create video embed or placeholder
function createVideoElement(videoUrl, title) {
    const container = document.createElement('div');
    container.className = 'video-container';
    
    if (!videoUrl) {
        container.innerHTML = `
            <div class="video-placeholder">
                <div class="video-icon">📹</div>
                <span>No video available</span>
            </div>
        `;
        return container;
    }
    
    const youtubeId = getYouTubeVideoId(videoUrl);
    
    if (youtubeId) {
        // Create YouTube embed
        const iframe = document.createElement('iframe');
        iframe.className = 'video-embed';
        iframe.src = `https://www.youtube.com/embed/${youtubeId}`;
        iframe.title = title;
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        container.appendChild(iframe);
    } else {
        // Create clickable link for other video URLs
        const link = document.createElement('a');
        link.href = videoUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'video-placeholder';
        link.innerHTML = `
            <div class="video-icon">🎥</div>
            <span>Watch Video</span>
        `;
        
        container.appendChild(link);
    }
    
    return container;
}

// Function to format notes content
function formatNotes(notes) {
    if (!notes) return '';
    
    // If notes is an array, convert to bullet points
    if (Array.isArray(notes)) {
        const ul = document.createElement('ul');
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note;
            ul.appendChild(li);
        });
        return ul.outerHTML;
    }
    
    // If notes is a string, check if it contains line breaks and convert to list
    if (typeof notes === 'string') {
        const lines = notes.split('\n').filter(line => line.trim());
        if (lines.length > 1) {
            const ul = document.createElement('ul');
            lines.forEach(line => {
                const li = document.createElement('li');
                li.textContent = line.trim();
                ul.appendChild(li);
            });
            return ul.outerHTML;
        } else {
            return `<p>${notes}</p>`;
        }
    }
    
    return '';
}

// Function to create a lecture card
function createLectureCard(lecture, index) {
    const card = document.createElement('div');
    card.className = 'lecture-card';
    
    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    
    const videoElement = createVideoElement(lecture.videoUrl, lecture.title);
    const notesContent = formatNotes(lecture.notes);
    
    card.innerHTML = `
        <h3 class="lecture-title">${lecture.title || 'Untitled Lecture'}</h3>
        <p class="lecture-description">${lecture.description || 'No description available.'}</p>
        ${videoElement.outerHTML}
        ${notesContent ? `
            <div class="lecture-notes">
                <div class="notes-title">
                    📝 Notes
                </div>
                <div class="notes-content">
                    ${notesContent}
                </div>
            </div>
        ` : ''}
    `;
    
    return card;
}

// Function to render lectures
function renderLectures(lectures) {
    lecturesGrid.innerHTML = '';
    
    if (!lectures || lectures.length === 0) {
        lecturesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 0; color: #718096;">
                <h3>No lectures available</h3>
                <p>Check back later for new content!</p>
            </div>
        `;
        return;
    }
    
    lectures.forEach((lecture, index) => {
        const card = createLectureCard(lecture, index);
        lecturesGrid.appendChild(card);
    });
}

// Function to show error state
function showError(message = 'Failed to load lectures. Please try again later.') {
    loadingElement.classList.add('hidden');
    errorElement.classList.remove('hidden');
    errorElement.querySelector('p').textContent = message;
    console.error('Lecture loading error:', message);
}

// Function to hide loading state
function hideLoading() {
    loadingElement.classList.add('hidden');
}

// Function to load lectures from JSON file
async function loadLectures() {
    try {
        console.log('Loading lectures...');
        
        const response = await fetch('./lectures.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate data structure
        if (!data || (!Array.isArray(data) && !data.lectures)) {
            throw new Error('Invalid data format: Expected array or object with lectures property');
        }
        
        // Extract lectures array
        const lectures = Array.isArray(data) ? data : data.lectures;
        
        console.log(`Successfully loaded ${lectures.length} lectures`);
        
        hideLoading();
        renderLectures(lectures);
        
    } catch (error) {
        console.error('Error loading lectures:', error);
        
        let errorMessage = 'Failed to load lectures. Please try again later.';
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            errorMessage = 'Unable to connect to the server. Please check your internet connection.';
        } else if (error.message.includes('404')) {
            errorMessage = 'Lectures file not found. Please contact the administrator.';
        } else if (error.message.includes('JSON')) {
            errorMessage = 'Data format error. Please contact the administrator.';
        }
        
        showError(errorMessage);
    }
}

// Function to retry loading lectures
function retryLoading() {
    errorElement.classList.add('hidden');
    loadingElement.classList.remove('hidden');
    setTimeout(loadLectures, 500); // Small delay for better UX
}

// Add retry functionality to error message
function setupRetryButton() {
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.style.cssText = `
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: #6b46c1;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.2s ease;
    `;
    retryButton.addEventListener('click', retryLoading);
    retryButton.addEventListener('mouseenter', () => {
        retryButton.style.backgroundColor = '#553c9a';
    });
    retryButton.addEventListener('mouseleave', () => {
        retryButton.style.backgroundColor = '#6b46c1';
    });
    
    errorElement.appendChild(retryButton);
}

// Initialize the application
function init() {
    console.log('Initializing ShkheharVerse Lectures...');
    
    // Setup retry button
    setupRetryButton();
    
    // Load lectures when page loads
    loadLectures();
    
    // Add global error handler for unhandled promise rejections
    window.addEventListener('unhandledrejection', event => {
        console.error('Unhandled promise rejection:', event.reason);
        showError('An unexpected error occurred. Please refresh the page.');
    });
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add some helpful global functions for debugging (can be removed in production)
window.ShkheharVerse = {
    retryLoading,
    loadLectures,
    version: '1.0.0'
};