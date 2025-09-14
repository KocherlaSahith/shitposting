import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const App = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=400",
      title: "Troll Face",
      likes: 69,
      description: "U MAD BRO? 😏",
      comments: [
        { id: 1, text: "So troll! 😂", user: "TrollMaster" },
        { id: 2, text: "This made my day! 🤣", user: "LaughingOutLoud" }
      ]
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1611329855225-2f2013643a5e?w=400",
      title: "Doge Wow",
      likes: 420,
      description: "SUCH ANIMATE. VERY REACT. WOW. 🐶",
      comments: [
        { id: 1, text: "Much wow! 🚀", user: "CryptoDoge" },
        { id: 2, text: "To the moon! 🌕", user: "ShibaInu" }
      ]
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1623684225795-a78c0b6d6c540?w=400",
      title: "Dancing Banana",
      likes: 1337,
      description: "PEEL THE ANIMATION! 🍌",
      comments: [
        { id: 1, text: "This is apeeling! 🦍", user: "MonkeyMan" },
        { id: 2, text: "I'm going bananas! 🐒", user: "BananaLover" }
      ]
    }
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  // AGGRESSIVE DOG PARTICLE animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const particles = [];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Dog emojis array - ONLY DOGS
    const dogEmojis = ['🐶', '🐕', '🦮', '🐩', '🐕‍🦺', '🌭'];
    
    // AGGRESSIVE Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 15; // Larger size for more aggressive presence
        this.speedX = Math.random() * 8 - 4; // Faster movement
        this.speedY = Math.random() * 8 - 4; // Faster movement
        this.color = `hsl(${Math.random() * 60 + 30}, 100%, 60%)`; // Warm dog colors
        this.emoji = dogEmojis[Math.floor(Math.random() * dogEmojis.length)];
        this.rotation = Math.random() * 360;
        this.rotateSpeed = Math.random() * 5 - 2.5; // Faster rotation
        this.wobble = Math.random() * 2;
        this.wobbleSpeed = Math.random() * 0.1 + 0.05;
        this.wobbleOffset = Math.random() * Math.PI * 2;
      }
      
      update() {
        // Aggressive movement
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotateSpeed;
        
        // Bounce off edges aggressively
        if (this.x > canvas.width) {
          this.x = canvas.width;
          this.speedX = -this.speedX * 1.1; // Bounce with energy increase
        }
        if (this.x < 0) {
          this.x = 0;
          this.speedX = -this.speedX * 1.1;
        }
        if (this.y > canvas.height) {
          this.y = canvas.height;
          this.speedY = -this.speedY * 1.1;
        }
        if (this.y < 0) {
          this.y = 0;
          this.speedY = -this.speedY * 1.1;
        }
        
        // Wobble effect for extra aggression
        this.wobbleOffset += this.wobbleSpeed;
        this.size = 15 + Math.sin(this.wobbleOffset) * 5;
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = this.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, 0, 0);
        
        // Add aggressive energy lines
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(20, 20);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-20, -20);
        ctx.stroke();
        
        ctx.restore();
      }
    }
    
    // Create LOTS of aggressive dog particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
    
    // Aggressive animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add aggressive background effect
      ctx.fillStyle = 'rgba(255, 240, 200, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Connect dogs with aggressive lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${30 + Math.random() * 30}, 100%, 60%, ${0.7 - distance/200})`;
            ctx.lineWidth = 2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      
      // Play dog bark sound effect
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      
      // Simulate upload process with crazy animation
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage = {
            id: Date.now(),
            src: event.target.result,
            title: `Doggo ${images.length + 1}`,
            likes: 0,
            description: "BORK BORK BORK! 🐶",
            comments: []
          };
          
          setImages([newImage, ...images]);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 2000);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const likeImage = (id, e) => {
    e.stopPropagation();
    setImages(images.map(img => 
      img.id === id ? { ...img, likes: img.likes + 1 } : img
    ));
  };

  const addComment = (imageId, e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setImages(images.map(img => 
      img.id === imageId 
        ? { 
            ...img, 
            comments: [
              ...img.comments, 
              { 
                id: Date.now(), 
                text: newComment, 
                user: "DogLover" 
              }
            ] 
          } 
        : img
    ));
    
    setNewComment("");
  };

  return (
    <div className="app">
      <canvas 
        ref={canvasRef} 
        className="particle-canvas"
      />
      
      {/* Hidden audio element for dog sound effects */}
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-dog-barking-twice-2.mp3" />
      
      <motion.header 
        className="app-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        <motion.h1 
          className="app-title"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0, 5, 0],
            color: ["#ff8c00", "#ffd700", "#8b4513", "#ff8c00"]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut"
          }}
        >
          🐶 AGGRESSIVE DOG ZONE 🦴
        </motion.h1>
        
        <motion.button
          className="upload-btn"
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -10, 0, 10, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.9 }}
          onClick={triggerFileInput}
        >
          🚀 UPLOAD DOG
        </motion.button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </motion.header>

      <main className="app-main">
        <AnimatePresence>
          {isUploading && (
            <motion.div
              className="uploading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="uploading-spinner"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.8, 1],
                }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: 0.8, ease: "linear" },
                  scale: { repeat: Infinity, duration: 0.4, ease: "easeInOut" }
                }}
              >
                🐕
              </motion.div>
              <motion.p
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                DOG UPLOAD IN PROGRESS! BORK BORK!
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="image-grid"
          layout
        >
          <AnimatePresence>
            {images.map((image) => (
              <motion.div
                key={image.id}
                className="image-card"
                layout
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                whileHover={{ 
                  scale: 1.08, 
                  rotate: Math.random() * 15 - 7.5,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.3)"
                }}
                onClick={() => setSelectedImage(image)}
              >
                <motion.img 
                  src={image.src} 
                  alt={image.title}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <div className="image-info">
                  <h3>{image.title}</h3>
                  <motion.button 
                    className="like-btn"
                    onClick={(e) => likeImage(image.id, e)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    ❤️ {image.likes}
                  </motion.button>
                </div>
                <motion.div 
                  className="image-description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {image.description}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="image-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.5, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: -45 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
              <div className="modal-info">
                <h2>{selectedImage.title}</h2>
                <p>{selectedImage.description}</p>
                <div className="comments-section">
                  <h3>Comments:</h3>
                  {selectedImage.comments.map(comment => (
                    <motion.div 
                      key={comment.id}
                      className="comment"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <strong>{comment.user}:</strong> {comment.text}
                    </motion.div>
                  ))}
                  <form onSubmit={(e) => addComment(selectedImage.id, e)}>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Bork about this doggo..."
                    />
                    <button type="submit">BORK!</button>
                  </form>
                </div>
              </div>
              <motion.button
                className="close-btn"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.3, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.footer 
        className="app-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.p
          animate={{ 
            x: [0, 15, 0, -15, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut"
          }}
        >
          🐶🐶🐶 SIVA CHINTU - BOW BOW BOW BORK BORK BORK! 🐶🐶🐶
        </motion.p>
      </motion.footer>
    </div>
  );
};

export default App;