class MusicStore {
    constructor() {
        this.musicData = window.musicData;
        this.currentFilter = 'all';
        this.currentAudio = null;
        this.currentPlaylistIndex = 0;
        this.isPlaylistMode = false;
        
        // Load data from localStorage
        this.favorites = JSON.parse(localStorage.getItem('musicFavorites')) || [];
        this.cart = JSON.parse(localStorage.getItem('musicCart')) || [];
        this.playlist = JSON.parse(localStorage.getItem('musicPlaylist')) || [];
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.updateBadges();
        this.displayMusic();
        this.showPage('home');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.currentTarget.getAttribute('data-page');
                this.showPage(page);
                this.updateActiveNavLink(e.currentTarget);
            });
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchMusic(e.target.value);
        });

        // Category filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentFilter = e.target.getAttribute('data-category');
                this.updateActiveFilter(e.target);
                this.displayMusic();
            });
        });

        // Category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.getAttribute('data-category');
                this.currentFilter = category;
                this.showPage('home');
                this.updateActiveNavLink(document.querySelector('[data-page="home"]'));
                this.updateActiveFilter(document.querySelector(`[data-category="${category}"]`));
                this.displayMusic();
            });
        });

        // Clear buttons
        document.getElementById('clearFavorites').addEventListener('click', () => {
            this.clearFavorites();
        });

        document.getElementById('clearCart').addEventListener('click', () => {
            this.clearCart();
        });

        document.getElementById('clearPlaylist').addEventListener('click', () => {
            this.clearPlaylist();
        });

        // Checkout
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.checkout();
        });

        // Playlist controls
        document.getElementById('playAllBtn').addEventListener('click', () => {
            this.playAllPlaylist();
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            this.playPrevious();
        });

        document.getElementById('playPauseBtn').addEventListener('click', () => {
            this.togglePlayPause();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            this.playNext();
        });

        // Modal
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('audioModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });
    }

    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        document.getElementById(`${pageName}Page`).classList.add('active');

        // Load page content based on page name
        switch(pageName) {
            case 'favorites':
                this.displayFavorites();
                break;
            case 'cart':
                this.displayCart();
                break;
            case 'playlist':
                this.displayPlaylist();
                break;
        }
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    searchMusic(query) {
        const musicGrid = document.getElementById('musicGrid');
        
        if (!query.trim()) {
            this.displayMusic();
            return;
        }

        const filteredMusic = this.musicData.filter(song => {
            return song.title.toLowerCase().includes(query.toLowerCase()) ||
                   song.artist.toLowerCase().includes(query.toLowerCase()) ||
                   song.genre.toLowerCase().includes(query.toLowerCase());
        });

        this.displayMusicCards(filteredMusic);
    }

    displayMusic() {
        let filteredMusic = this.musicData;

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filteredMusic = filteredMusic.filter(song => song.genre === this.currentFilter);
        }


        this.displayMusicCards(filteredMusic);
    }

    displayMusicCards(music) {
        const musicGrid = document.getElementById('musicGrid');
        
        musicGrid.innerHTML = music.map(song => `
            <div class="music-card" data-id="${song.id}">
                <img src="${song.albumArt}" alt="${song.title}" loading="lazy">
                <h3>${song.title}</h3>
                <p class="artist">${song.artist}</p>
                <span class="genre">${song.genre.charAt(0).toUpperCase() + song.genre.slice(1)}</span>
                <div class="price">$${song.price}</div>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="musicStore.previewTrack(${song.id})">
                        <i class="fas fa-play"></i> Preview
                    </button>
                    <button class="btn btn-secondary ${this.isInFavorites(song.id) ? 'btn-danger' : ''}" onclick="musicStore.toggleFavorite(${song.id})">
                        <i class="fas fa-heart"></i> ${this.isInFavorites(song.id) ? 'Remove' : 'Favorite'}
                    </button>
                    <button class="btn btn-warning" onclick="musicStore.addToCart(${song.id})">
                        <i class="fas fa-cart-plus"></i> Cart
                    </button>
                    <button class="btn btn-primary" onclick="musicStore.addToPlaylist(${song.id})">
                        <i class="fas fa-plus"></i> Playlist
                    </button>
                </div>
            </div>
        `).join('');
    }

    previewTrack(songId) {
        const song = this.musicData.find(s => s.id === songId);
        if (!song) return;

        // Show modal
        const modal = document.getElementById('audioModal');
        document.getElementById('modalTrackTitle').textContent = song.title;
        document.getElementById('modalArtist').textContent = song.artist;
        document.getElementById('modalGenre').textContent = song.genre.charAt(0).toUpperCase() + song.genre.slice(1);
        document.getElementById('modalAlbumArt').src = song.albumArt;
        
        const audio = document.getElementById('previewAudio');
        audio.src = song.previewUrl;
        
        modal.classList.add('active');
    }

    closeModal() {
        const modal = document.getElementById('audioModal');
        const audio = document.getElementById('previewAudio');
        
        audio.pause();
        audio.src = '';
        modal.classList.remove('active');
    }

    toggleFavorite(songId) {
        const song = this.musicData.find(s => s.id === songId);
        if (!song) return;

        const existingIndex = this.favorites.findIndex(f => f.id === songId);
        
        if (existingIndex > -1) {
            this.favorites.splice(existingIndex, 1);
            this.showToast('Removed from favorites', 'info');
        } else {
            this.favorites.push(song);
            this.showToast('Added to favorites!', 'success');
        }

        this.saveFavorites();
        this.updateBadges();
        this.displayMusic(); // Refresh to update button text
        
        // Update favorites page if currently viewing
        if (document.getElementById('favoritesPage').classList.contains('active')) {
            this.displayFavorites();
        }
    }

    addToCart(songId) {
        const song = this.musicData.find(s => s.id === songId);
        if (!song) return;

        // Check if already in cart
        const existingItem = this.cart.find(item => item.id === songId);
        if (existingItem) {
            this.showToast('Item already in cart!', 'warning');
            return;
        }

        this.cart.push(song);
        this.saveCart();
        this.updateBadges();
        this.showToast('Added to cart!', 'success');
    }

    addToPlaylist(songId) {
        const song = this.musicData.find(s => s.id === songId);
        if (!song) return;

        // Check if already in playlist
        const existingItem = this.playlist.find(item => item.id === songId);
        if (existingItem) {
            this.showToast('Already in playlist!', 'warning');
            return;
        }

        this.playlist.push(song);
        this.savePlaylist();
        this.updateBadges();
        this.showToast('Added to playlist!', 'success');
    }

    displayFavorites() {
        const favoritesList = document.getElementById('favoritesList');
        
        if (this.favorites.length === 0) {
            favoritesList.innerHTML = `
                <div class="empty-state">
                    <h3>No favorites yet!</h3>
                    <p>Start adding songs to your favorites collection.</p>
                </div>
            `;
            return;
        }

        favoritesList.innerHTML = this.favorites.map(song => `
            <div class="list-item">
                <img src="${song.albumArt}" alt="${song.title}">
                <div class="item-info">
                    <h4>${song.title}</h4>
                    <p class="artist">${song.artist}</p>
                    <span class="genre">${song.genre.charAt(0).toUpperCase() + song.genre.slice(1)}</span>
                </div>
                <div class="item-actions">
                    <span class="item-price">$${song.price}</span>
                    <button class="btn btn-primary" onclick="musicStore.previewTrack(${song.id})">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn btn-warning" onclick="musicStore.addToCart(${song.id})">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                    <button class="btn btn-danger" onclick="musicStore.removeFavorite(${song.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    displayCart() {
        const cartItems = document.getElementById('cartItems');
        const totalPrice = document.getElementById('totalPrice');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-state">
                    <h3>Your cart is empty!</h3>
                    <p>Add some tracks to get started.</p>
                </div>
            `;
            totalPrice.textContent = '0.00';
            return;
        }

        cartItems.innerHTML = this.cart.map(song => `
            <div class="list-item">
                <img src="${song.albumArt}" alt="${song.title}">
                <div class="item-info">
                    <h4>${song.title}</h4>
                    <p class="artist">${song.artist}</p>
                    <span class="genre">${song.genre.charAt(0).toUpperCase() + song.genre.slice(1)}</span>
                </div>
                <div class="item-actions">
                    <span class="item-price">$${song.price}</span>
                    <button class="btn btn-primary" onclick="musicStore.previewTrack(${song.id})">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn btn-danger" onclick="musicStore.removeFromCart(${song.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, song) => sum + song.price, 0);
        totalPrice.textContent = total.toFixed(2);
    }

    displayPlaylist() {
        const playlistItems = document.getElementById('playlistItems');
        
        if (this.playlist.length === 0) {
            playlistItems.innerHTML = `
                <div class="empty-state">
                    <h3>Your playlist is empty!</h3>
                    <p>Add some tracks to create your playlist.</p>
                </div>
            `;
            return;
        }

        playlistItems.innerHTML = this.playlist.map((song, index) => `
            <div class="list-item">
                <img src="${song.albumArt}" alt="${song.title}">
                <div class="item-info">
                    <h4>${song.title}</h4>
                    <p class="artist">${song.artist}</p>
                    <span class="genre">${song.genre.charAt(0).toUpperCase() + song.genre.slice(1)}</span>
                </div>
                <div class="item-actions">
                    <button class="btn btn-secondary" onclick="musicStore.movePlaylistItem(${index}, 'up')" ${index === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="musicStore.movePlaylistItem(${index}, 'down')" ${index === this.playlist.length - 1 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-down"></i>
                    </button>
                    <button class="btn btn-primary" onclick="musicStore.playFromPlaylist(${index})">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn btn-danger" onclick="musicStore.removeFromPlaylist(${song.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }


    movePlaylistItem(index, direction) {
        if (direction === 'up' && index > 0) {
            [this.playlist[index], this.playlist[index - 1]] = [this.playlist[index - 1], this.playlist[index]];
        } else if (direction === 'down' && index < this.playlist.length - 1) {
            [this.playlist[index], this.playlist[index + 1]] = [this.playlist[index + 1], this.playlist[index]];
        }
        
        this.savePlaylist();
        this.displayPlaylist();
    }

    playAllPlaylist() {
        if (this.playlist.length === 0) {
            this.showToast('Playlist is empty!', 'warning');
            return;
        }

        this.currentPlaylistIndex = 0;
        this.isPlaylistMode = true;
        this.playFromPlaylist(0);
        this.showToast('Playing all tracks!', 'success');
    }

    playFromPlaylist(index) {
        if (index >= this.playlist.length) return;

        const song = this.playlist[index];
        const currentPlaying = document.getElementById('currentPlaying');
        const currentTrack = document.getElementById('currentTrack');
        const playlistAudio = document.getElementById('playlistAudio');
        const playPauseBtn = document.getElementById('playPauseBtn');

        this.currentPlaylistIndex = index;
        this.isPlaylistMode = true;

        currentTrack.textContent = `${song.title} - ${song.artist}`;
        playlistAudio.src = song.previewUrl;
        currentPlaying.style.display = 'block';

        // Play the track
        playlistAudio.play().catch(e => {
            console.log('Autoplay prevented:', e);
            this.showToast('Click play to start', 'info');
        });

        // Update play/pause button
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';

        // Auto-play next track when current ends
        playlistAudio.onended = () => {
            if (this.isPlaylistMode && this.currentPlaylistIndex < this.playlist.length - 1) {
                this.playNext();
            } else {
                this.isPlaylistMode = false;
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        };
    }

    playNext() {
        if (this.currentPlaylistIndex < this.playlist.length - 1) {
            this.playFromPlaylist(this.currentPlaylistIndex + 1);
        } else {
            this.showToast('End of playlist', 'info');
            this.isPlaylistMode = false;
            document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    playPrevious() {
        if (this.currentPlaylistIndex > 0) {
            this.playFromPlaylist(this.currentPlaylistIndex - 1);
        } else {
            this.showToast('Beginning of playlist', 'info');
        }
    }

    togglePlayPause() {
        const playlistAudio = document.getElementById('playlistAudio');
        const playPauseBtn = document.getElementById('playPauseBtn');

        if (playlistAudio.paused) {
            playlistAudio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            playlistAudio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }


    removeFavorite(songId) {
        this.favorites = this.favorites.filter(f => f.id !== songId);
        this.saveFavorites();
        this.updateBadges();
        this.displayFavorites();
        this.displayMusic(); // Refresh to update button text
        this.showToast('Removed from favorites', 'info');
    }

    removeFromCart(songId) {
        this.cart = this.cart.filter(c => c.id !== songId);
        this.saveCart();
        this.updateBadges();
        this.displayCart();
        this.showToast('Removed from cart', 'info');
    }

    removeFromPlaylist(songId) {
        this.playlist = this.playlist.filter(p => p.id !== songId);
        this.savePlaylist();
        this.updateBadges();
        this.displayPlaylist();
        this.showToast('Removed from playlist', 'info');
    }

    clearFavorites() {
        if (this.favorites.length === 0) return;
        
        this.favorites = [];
        this.saveFavorites();
        this.updateBadges();
        this.displayFavorites();
        this.displayMusic(); // Refresh to update button text
        this.showToast('Cleared all favorites', 'info');
    }

    clearCart() {
        if (this.cart.length === 0) return;
        
        this.cart = [];
        this.saveCart();
        this.updateBadges();
        this.displayCart();
        this.showToast('Cleared cart', 'info');
    }

    clearPlaylist() {
        if (this.playlist.length === 0) return;
        
        this.playlist = [];
        this.savePlaylist();
        this.updateBadges();
        this.displayPlaylist();
        
        // Stop current playback
        const currentPlaying = document.getElementById('currentPlaying');
        const playlistAudio = document.getElementById('playlistAudio');
        playlistAudio.pause();
        playlistAudio.src = '';
        currentPlaying.style.display = 'none';
        this.isPlaylistMode = false;
        
        this.showToast('Cleared playlist', 'info');
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showToast('Your cart is empty!', 'warning');
            return;
        }

        const total = this.cart.reduce((sum, song) => sum + song.price, 0);
        
        // Simulate checkout process
        setTimeout(() => {
            this.showToast(`Purchase successful! Total: $${total.toFixed(2)}`, 'success');
            this.cart = [];
            this.saveCart();
            this.updateBadges();
            this.displayCart();
        }, 1000);

        this.showToast('Processing payment...', 'info');
    }

    isInFavorites(songId) {
        return this.favorites.some(f => f.id === songId);
    }

    updateBadges() {
        document.getElementById('favoritesBadge').textContent = this.favorites.length;
        document.getElementById('cartBadge').textContent = this.cart.length;
        document.getElementById('playlistBadge').textContent = this.playlist.length;
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    saveFavorites() {
        localStorage.setItem('musicFavorites', JSON.stringify(this.favorites));
    }

    saveCart() {
        localStorage.setItem('musicCart', JSON.stringify(this.cart));
    }

    savePlaylist() {
        localStorage.setItem('musicPlaylist', JSON.stringify(this.playlist));
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicStore = new MusicStore();
});