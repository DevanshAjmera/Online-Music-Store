const musicData = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        genre: "pop",
        price: 1.29,
        albumArt: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 2,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        genre: "rock",
        price: 1.99,
        albumArt: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 3,
        title: "Take Five",
        artist: "Dave Brubeck",
        genre: "jazz",
        price: 0.99,
        albumArt: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 4,
        title: "Symphony No. 9",
        artist: "Ludwig van Beethoven",
        genre: "classical",
        price: 2.49,
        albumArt: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 5,
        title: "Levels",
        artist: "Avicii",
        genre: "electronic",
        price: 1.49,
        albumArt: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 6,
        title: "HUMBLE.",
        artist: "Kendrick Lamar",
        genre: "hip-hop",
        price: 1.29,
        albumArt: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 7,
        title: "Shape of You",
        artist: "Ed Sheeran",
        genre: "pop",
        price: 1.29,
        albumArt: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 8,
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        genre: "rock",
        price: 1.99,
        albumArt: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 9,
        title: "Kind of Blue",
        artist: "Miles Davis",
        genre: "jazz",
        price: 1.79,
        albumArt: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 10,
        title: "Für Elise",
        artist: "Ludwig van Beethoven",
        genre: "classical",
        price: 0.99,
        albumArt: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 11,
        title: "One More Time",
        artist: "Daft Punk",
        genre: "electronic",
        price: 1.49,
        albumArt: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 12,
        title: "Lose Yourself",
        artist: "Eminem",
        genre: "hip-hop",
        price: 1.29,
        albumArt: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 13,
        title: "Bad Guy",
        artist: "Billie Eilish",
        genre: "pop",
        price: 1.29,
        albumArt: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 14,
        title: "Hotel California",
        artist: "Eagles",
        genre: "rock",
        price: 1.99,
        albumArt: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 15,
        title: "Blue Train",
        artist: "John Coltrane",
        genre: "jazz",
        price: 1.79,
         albumArt: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "songs\Admirin_You.mp3"
    },
    {
        id: 16,
        title: "Claire de Lune",
        artist: "Claude Debussy",
        genre: "classical",
        price: 1.49,
        albumArt: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 17,
        title: "Strobe",
        artist: "Deadmau5",
        genre: "electronic",
        price: 1.49,
        albumArt: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 18,
        title: "DNA.",
        artist: "Kendrick Lamar",
        genre: "hip-hop",
        price: 1.29,
        albumArt: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 19,
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        genre: "pop",
        price: 1.29,
        albumArt: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
        id: 20,
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        genre: "rock",
        price: 1.99,
        albumArt: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400",
        previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
];

// Export for use in other scripts
window.musicData = musicData;