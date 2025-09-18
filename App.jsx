import React, { useState, useEffect, useRef, useLayoutEffect, Component } from 'react';

// Error Boundary Component
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('React Error Boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                    <div className="text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">A Glitch in the System</h1>
                        <p className="text-gray-400 mb-4">An unexpected error occurred. Please reload the interface.</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="bg-[#0C54D3] hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors glow-effect"
                        >
                            Reload Interface
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// --- Global Styles ---
// We inject the CSS directly into the document head for a single-file setup.
const GlobalStyles = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <style>{`
    :root {
        --brand-primary: #0C54D3;
        --brand-secondary: #1e66f5;
        --background-deep: #0A0A0A;
        --text-primary: #E0E0E0;
        --text-secondary: #8A8899;
        --border-color: rgba(12, 84, 211, 0.2);
    }
    html {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    body {
        font-family: 'Inter', sans-serif;
        background-color: var(--background-deep);
        color: var(--text-primary);
        overflow-x: hidden;
        margin: 0;
        padding: 0;
        min-height: 100vh;
    }
    #root {
        position: relative;
        min-height: 100vh;
    }
    #background-canvas {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        z-index: -10 !important;
        opacity: 0.4 !important;
        pointer-events: none !important;
        background: transparent !important;
    }
    .hero-gradient {
        background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(12, 84, 211, 0.3), transparent);
    }
    .section-gradient {
        background: radial-gradient(circle 500px at 50% 100%, rgba(12, 84, 211, 0.15), transparent);
    }
    .feature-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }
    .feature-card:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(12, 84, 211, 0.5);
        transform: translateY(-5px);
    }
    .nav-link {
        position: relative;
        transition: color 0.3s ease;
        cursor: pointer;
    }
    .nav-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #0C54D3;
        transition: width 0.3s ease;
    }
    .nav-link:hover::after, .nav-link.active::after {
        width: 100%;
    }
    .glow-effect {
        box-shadow: 0 0 15px rgba(12, 84, 211, 0.5), 0 0 30px rgba(12, 84, 211, 0.3);
    }
    .glow-button {
        background: var(--brand-primary);
        color: white;
        font-weight: 700;
        border-radius: 9999px;
        padding: 14px 28px;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 0 20px 0 rgba(12, 84, 211, 0.5), 0 0 30px 0 rgba(12, 84, 211, 0.3);
        border: 1px solid rgba(255,255,255,0.2);
        cursor: pointer;
    }
    .glow-button:hover {
        transform: scale(1.05) translateY(-2px);
        box-shadow: 0 0 30px 0 rgba(12, 84, 211, 0.8), 0 0 40px 0 rgba(12, 84, 211, 0.5);
    }
    .glass-header {
        background-color: rgba(10, 10, 10, 0.7);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-bottom: 1px solid var(--border-color);
    }
    .section-title {
        font-size: clamp(3rem, 6vw, 5.5rem);
        font-weight: 900;
        letter-spacing: -0.03em;
        line-height: 1.05;
    }
    .section-subtitle {
        font-size: clamp(1.1rem, 2vw, 1.3rem);
        color: var(--text-secondary);
        max-width: 650px;
        margin: 1.5rem auto 0;
    }
    .page {
      animation: fadeIn 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);
    }
    .page.loaded {
      opacity: 1;
      transform: translateY(0);
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .smooth-transition {
        transition: all 0.3s ease-in-out;
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #1a1a1a; }
    ::-webkit-scrollbar-thumb { background: #0C54D3; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #1e66f5; }
    .glass-card {
        background: rgba(16, 16, 16, 0.5);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .prose-invert h2 { color: #fff; }
    .prose-invert a { color: #60a5fa; }
    .prose-invert a:hover { color: #93c5fd; }
    @keyframes move-stars {
        from { transform: translateY(0px); }
        to { transform: translateY(-2000px); }
    }
    .stars {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .stars .star {
        position: absolute;
        background: white;
        border-radius: 50%;
        animation: move-stars 200s linear infinite;
    }
  `}</style>
  </>
);


// --- Icon Components (Replacing Lucide UMD script) ---
const Icon = ({ name, className = "w-6 h-6" }) => {
    const icons = {
        menu: <path d="M4 6h16M4 12h16M4 18h16" />,
        'play-circle': <><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/></>,
        'arrow-right': <path d="M5 12h14m-7-7 7 7-7 7"/>,
        server: <><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
        'dollar-sign': <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
        users: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6m3-3h-6"/></>,
        shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
        zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>,
        'layout-template': <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>,
        'check-circle': <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></>,
        x: <path d="M18 6 6 18M6 6l12 12"/>,
        'phone-call': <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            {icons[name]}
        </svg>
    );
};


// --- Background Canvas Component ---
const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particlesArray;

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setupCanvas();

    const mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (event) => {
      mouse.x = event.x || (event.touches && event.touches[0] ? event.touches[0].clientX : null);
      mouse.y = event.y || (event.touches && event.touches[0] ? event.touches[0].clientY : null);
    };
    const handleTouchMove = (event) => {
      if (event.touches && event.touches[0]) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    class Particle {
      constructor(x, y, directionX, directionY, size) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(12, 84, 211, 0.5)';
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        
        let dx = mouse.x - this.x; let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
          if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 1;
          if (mouse.x > this.x && this.x > this.size * 10) this.x -= 1;
          if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 1;
          if (mouse.y > this.y && this.y > this.size * 10) this.y -= 1;
        }
        this.x += this.directionX; this.y += this.directionY;
        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    };

    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                         ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            let opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = 'rgba(12, 84, 211,' + opacityValue + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    let animationFrameId;
    const animate = () => {
      try {
        animationFrameId = requestAnimationFrame(animate);
        
        // Use hardware-accelerated clearing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (particlesArray && particlesArray.length > 0) {
          // Batch operations for better performance
          ctx.save();
          for (let i = 0; i < particlesArray.length; i++) {
            if (particlesArray[i]) particlesArray[i].update();
          }
          connect();
          ctx.restore();
        }
      } catch (error) {
        console.warn('Canvas animation error:', error);
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleResize = () => {
      setupCanvas();
      init();
    };
    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => { // Cleanup function
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas 
    ref={canvasRef} 
    id="background-canvas" 
    style={{ 
      position: 'fixed !important', 
      top: '0 !important', 
      left: '0 !important', 
      width: '100% !important', 
      height: '100% !important', 
      zIndex: '-10 !important', 
      opacity: '0.4 !important', 
      pointerEvents: 'none !important',
      background: 'transparent !important',
      willChange: 'transform',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden'
    }} 
  />;
};

// --- Animated Starry Background Component (Alternative) ---
const StarryBackground = () => {
    useEffect(() => {
        const starsContainer = document.querySelector('.stars');
        if (!starsContainer || starsContainer.children.length > 0) return;

        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const size = Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 200}%`;
            star.style.left = `${Math.random() * 100}%`;
            starsContainer.appendChild(star);
        }
    }, []);

    return <div className="stars"></div>;
};

// --- Layout Components ---
const Header = ({ activePage, setActivePage, showModal }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = ['home', 'features', 'platform', 'security', 'pricing'];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-sm shadow-lg' : ''}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-20">
                    <a onClick={() => setActivePage('home')} className="flex items-center space-x-2 nav-link">
                        <span className="text-2xl font-bold text-white">Primus</span>
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map(page => (
                            <a key={page} onClick={() => setActivePage(page)} className={`nav-link text-gray-300 hover:text-white capitalize ${activePage === page ? 'active' : ''}`}>{page}</a>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4">
                        <a onClick={showModal} className="cursor-pointer bg-[#0C54D3] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 glow-effect">Request a Demo</a>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                            <Icon name="menu" />
                        </button>
                    </div>
                </nav>
            </div>
            {isMobileMenuOpen && (
                 <div className="md:hidden bg-[#111111]/80 backdrop-blur-sm">
                    {navItems.map(page => (
                        <a key={page} onClick={() => { setActivePage(page); setIsMobileMenuOpen(false); }} className="block py-3 px-6 text-white nav-link capitalize">{page}</a>
                    ))}
                </div>
            )}
        </header>
    );
};

const Footer = ({ setActivePage, showModal }) => (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                     <a onClick={() => setActivePage('home')} className="flex items-center space-x-2 cursor-pointer">
                        <span className="text-2xl font-bold text-white">Primus</span>
                    </a>
                    <p className="mt-4 text-gray-400 max-w-xs">The ultimate operating system for modern gaming centers.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-white">Product</h4>
                    <ul className="mt-4 space-y-3">
                        <li><a onClick={() => setActivePage('features')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Features</a></li>
                        <li><a onClick={() => setActivePage('platform')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Platform</a></li>
                        <li><a onClick={() => setActivePage('security')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Security</a></li>
                        <li><a onClick={() => setActivePage('pricing')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Pricing</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-white">Company</h4>
                    <ul className="mt-4 space-y-3">
                        <li><a onClick={showModal} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-white">Legal</h4>
                    <ul className="mt-4 space-y-3">
                        <li><a onClick={() => setActivePage('privacy-policy')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</a></li>
                        <li><a onClick={() => setActivePage('terms-of-service')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto">
                <p className="text-gray-500">&copy; 2025 Primus Systems. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// --- Page Components ---
const HomePage = ({ setActivePage, showModal }) => (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="gsap-hero-el">
                <span className="inline-block bg-gray-800 border border-gray-700 text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full">The All-in-One Gaming Center OS</span>
            </div>
            <h1 className="gsap-hero-el mt-6 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                The Operating System <br className="hidden md:block" /> for Your <span className="text-[#0C54D3]">Gaming Empire</span>
            </h1>
            <p className="gsap-hero-el mt-8 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
                Primus is the central nervous system for modern gaming venues. Automate operations, maximize revenue, and build a loyal community with one powerful, unified platform.
            </p>
            <div className="gsap-hero-el mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a onClick={showModal} className="cursor-pointer w-full sm:w-auto bg-[#0C54D3] text-white px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 glow-effect flex items-center justify-center gap-2">
                    <Icon name="play-circle" />
                    <span>Request a Demo</span>
                </a>
                <a onClick={() => setActivePage('features')} className="cursor-pointer w-full sm:w-auto bg-gray-800/50 border border-gray-700 text-white px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2">
                    <span>Explore Features</span>
                    <Icon name="arrow-right" />
                </a>
            </div>
        </div>
    </section>
);

const FeaturesPage = () => {
    const features = [
        { icon: 'server', title: 'Gaming Operations', description: 'Real-time PC monitoring, remote control, and a secure Kiosk Mode. Manage your entire fleet from a single command deck.' },
        { icon: 'dollar-sign', title: 'Revenue Management', description: 'Flexible session billing, integrated digital wallets, and detailed financial analytics to maximize your profitability.' },
        { icon: 'users', title: 'Customer Engagement', description: 'Build a loyal community with our addictive loyalty program, leaderboards, memberships, and prize redemptions.' },
        { icon: 'shield', title: 'Enterprise Security', description: 'Protect your business and users with Multi-Factor Authentication, device binding, and comprehensive audit logs.' },
        { icon: 'zap', title: 'Real-Time Control', description: 'Powered by WebSockets, every status change is reflected instantly across the system. No delays, no refreshes.' },
        { icon: 'layout-template', title: 'Multi-Platform Suite', description: 'Manage from anywhere with our web-based Admin Dashboard and empower staff with a dedicated Windows desktop app.' },
    ];
    return (
        <section className="py-20 lg:py-32 section-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                     <span className="inline-block bg-gray-800 border border-gray-700 text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full">Core Capabilities</span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">A Feature for Every Facet of Your Business</h2>
                    <p className="mt-6 text-lg text-gray-400">
                        Primus is engineered with a comprehensive suite of tools to manage, grow, and secure your gaming center.
                    </p>
                </div>
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card rounded-2xl p-8 gsap-feature-card">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900/50 text-[#0C54D3] rounded-lg">
                                <Icon name={feature.icon} />
                            </div>
                            <h3 className="mt-6 text-2xl font-bold text-white">{feature.title}</h3>
                            <p className="mt-4 text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PlatformPage = () => {
    const techStack = [
        { logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", name: 'React 19', role: 'Frontend' },
        { logo: "https://cdn.worldvectorlogo.com/logos/fastapi-1.svg", name: 'FastAPI', role: 'Backend' },
        { logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Microsoft_.NET_logo.svg", name: 'WPF/C#', role: 'Desktop App' },
        { logo: null, name: 'WebSocket', role: 'Real-Time' }, // WebSocket will use the custom SVG icon
        { logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", name: 'Tailwind CSS', role: 'Styling' },
    ];
    return (
        <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="inline-block bg-gray-800 border border-gray-700 text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full">Technology Stack</span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">Built on a Modern, Scalable Foundation</h2>
                    <p className="mt-6 text-lg text-gray-400">
                        We leverage cutting-edge technologies to deliver a fast, reliable, and secure platform that grows with your business.
                    </p>
                </div>
                <div className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                    {techStack.map((tech, index) => (
                        <div key={index} className="flex flex-col items-center gsap-tech-icon">
                            <div className="h-20 w-20 rounded-full bg-gray-800 p-3 flex items-center justify-center">
                               {tech.logo ? <img src={tech.logo} alt={`${tech.name} Logo`} className="h-full w-full" /> : <svg className="h-full w-full text-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 2.002a10.002 10.002 0 1 0 0 20.004A10.002 10.002 0 0 0 12.001 2.002zm5.289 6.268-5.34 5.34-1.42-1.41 2.82-2.83-6.17-2.31 1.25-1.25 7.86 2.46zm-10.58 7.46 5.34-5.34 1.42 1.41-2.83 2.83 6.17 2.31-1.25 1.25-7.85-2.46z" fill="currentColor"/></svg>}
                            </div>
                            <p className="mt-4 font-semibold text-white">{tech.name}</p>
                            <p className="text-sm text-gray-400">{tech.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const SecurityPage = () => {
    const securityPoints = [
        { title: 'Encryption in Transit', details: ['TLS 1.3 only with Perfect Forward Secrecy', 'Strong ciphers: AES-256-GCM / ChaCha20-Poly1305', 'Hybrid Post-Quantum (Kyber + X25519)', 'Mutual TLS (mTLS) for all internal traffic'] },
        { title: 'Encryption at Rest', details: ['AES-256-GCM/XTS for all data storage', 'Envelope encryption with per-object keys', 'Keys stored in FIPS 140-3 certified HSM/KMS', 'Automated key rotation policies'] },
        { title: 'Identity & Access', details: ['Argon2id for password hashing', 'WebAuthn/FIDO2 for passwordless MFA', 'Zero Trust Architecture (ZTA)', 'Continuous authentication and verification'] },
        { title: 'Key Management', details: ['Centralized Hardware Security Modules (HSM)', 'Split-key governance with quorum approval', 'Automated key lifecycle management', 'Resilient and geographically distributed KMS'] },
        { title: 'Advanced Protections', details: ['Confidential Computing with SGX/SEV enclaves', 'Signed software supply chain (SLSA)', 'Global threat intelligence monitoring', 'Regular, aggressive red-team testing'] },
        { title: 'Compliance & Standards', details: ['SOC 2 Type II, ISO/IEC 27001, GDPR/CCPA', 'HIPAA compliant for relevant data', 'FedRAMP High for government contracts', 'Built on NIST SP 800-53 High Impact controls'] }
    ];
    return (
        <section className="py-20 lg:py-32 section-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="inline-block bg-gray-800 border border-gray-700 text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full">Enterprise Security</span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">Military-Grade Security Architecture</h2>
                    <p className="mt-6 text-lg text-gray-400">
                        Our security architecture is not an afterthought; it is the foundation. We employ a multi-layered, defense-in-depth strategy built for the threats of tomorrow.
                    </p>
                </div>
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {securityPoints.map((point) => (
                        <div key={point.title} className="feature-card rounded-2xl p-8 gsap-security-card">
                            <h3 className="text-2xl font-bold mb-4 text-[#0C54D3]">{point.title}</h3>
                            <ul className="space-y-2">
                                {point.details.map(detail => <li key={detail} className="text-gray-400">{detail}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-16 max-w-4xl mx-auto text-center p-8 feature-card rounded-2xl">
                    <h3 className="text-3xl font-bold mb-4 text-white">Security Summary</h3>
                    <p className="text-lg text-gray-400">TLS 1.3 + PQC hybrid for transit, AES-256-GCM/XTS with HSM envelope encryption for rest, Argon2id + WebAuthn for identity, Zero Trust + mTLS for access, and global compliance frameworks (SOC2, ISO, FedRAMP).</p>
                </div>
            </div>
        </section>
    );
};

const PricingPage = ({ showModal }) => (
    <section className="py-20 lg:py-32 section-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block bg-gray-800 border border-gray-700 text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full">Pricing</span>
                <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">Choose the Plan That's Right for You</h2>
                <p className="mt-6 text-lg text-gray-400">
                   All our plans include the full feature set. Pricing is based on the number of PCs at your location. Simple, transparent, and scalable.
                </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {/* Pricing Tier 1 */}
                <div className="feature-card rounded-2xl p-8 flex flex-col gsap-pricing-card">
                    <h3 className="text-xl font-semibold text-blue-400">Starter</h3>
                     <p className="mt-2 text-gray-400">For small cafes</p>
                    <div className="mt-6">
                        <span className="text-5xl font-extrabold text-white">₹11,000</span>
                        <span className="text-gray-400">/ month</span>
                    </div>
                    <p className="mt-2 text-gray-300">Up to 15 PCs</p>
                    <ul className="mt-8 space-y-4 text-gray-300 flex-grow">
                        <li className="flex items-center gap-3"><Icon name="check-circle" className="text-green-500" />All Core Features</li>
                        <li className="flex items-center gap-3"><Icon name="check-circle" className="text-green-500" />Email & Chat Support</li>
                        <li className="flex items-center gap-3"><Icon name="check-circle" className="text-green-500" />Unlimited Users</li>
                    </ul>
                    <a onClick={showModal} className="mt-8 cursor-pointer w-full block text-center bg-[#0C54D3] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Contact Sales</a>
                </div>
                {/* Pricing Tier 2 */}
                <div className="feature-card rounded-2xl p-8 flex flex-col border-2 border-[#0C54D3] relative overflow-hidden gsap-pricing-card">
                     <h3 className="text-xl font-semibold text-blue-300">Professional</h3>
                     <p className="mt-2 text-gray-400">For growing businesses</p>
                    <div className="mt-6">
                        <span className="text-5xl font-extrabold text-white">₹24,000</span>
                        <span className="text-gray-400">/ month</span>
                    </div>
                    <p className="mt-2 text-gray-300">Up to 40 PCs</p>
                    <ul className="mt-8 space-y-4 text-gray-300 flex-grow">
                        <li className="flex items-center gap-3"><Icon name="check-circle" className="text-green-500" />All Core Features</li>
                        <li className="flex items-center gap-3"><Icon name="check-circle" className="text-green-500" />Priority Support</li>
                        <li className="flex items-center gap-3"><Icon name="check-circle" className="text-green-500" />Onboarding Assistance</li>
                    </ul>
                    <a onClick={showModal} className="mt-8 cursor-pointer w-full block text-center bg-[#0C54D3] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors glow-effect">Contact Sales</a>
                </div>
                 {/* Pricing Tier 3 */}
                <div className="feature-card rounded-2xl p-8 flex flex-col gsap-pricing-card">
                     <h3 className="text-xl font-semibold text-blue-400">Enterprise</h3>
                     <p className="mt-2 text-gray-400">For large venues</p>
                    <div className="mt-6">
                        <span className="text-5xl font-extrabold text-white">Custom</span>
                        <span className="text-gray-400">/ per PC</span>
                    </div>
                    <p className="mt-2 text-gray-300">40+ PCs</p>
                    <ul className="mt-8 space-y-4 text-gray-300 flex-grow">
                        <li className="flex items-center gap-3"><Icon name="check-circle" className="text-green-500" />All Core Features</li>
                        <li className="flex items-center gap-3"><Icon name="check-circle" className="text-green-500" />Dedicated Account Manager</li>
                        <li className="flex items-center gap-3"><Icon name="check-circle" className="text-green-500" />Custom Integrations</li>
                    </ul>
                    <a onClick={showModal} className="mt-8 cursor-pointer w-full block text-center bg-[#0C54D3] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Contact Sales</a>
                </div>
            </div>
        </div>
    </section>
);

const PrivacyPolicyPage = () => (
    <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="prose prose-invert lg:prose-xl mx-auto text-gray-300">
                <h1 className="text-white">Privacy Policy</h1>
                <p className="lead">Last updated: September 03, 2025</p>
                <p>Primus Systems ("us", "we", or "our") operates the Primus website and the Primus gaming center management software (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.</p>
                
                <h2>Information Collection and Use</h2>
                <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                <h3>Types of Data Collected</h3>
                <h4>Personal Data</h4>
                <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, First name and last name, Phone number, and Usage Data.</p>
                <h4>Usage Data</h4>
                <p>We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>

                <h2>Use of Data</h2>
                <p>Primus Systems uses the collected data for various purposes:</p>
                <ul>
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information so that we can improve our Service</li>
                    <li>To monitor the usage of our Service</li>
                    <li>To detect, prevent and address technical issues</li>
                </ul>
                
                <h2>Data Retention</h2>
                <p>Primus Systems will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
                
                <h2>Security of Data</h2>
                <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

                <h2>Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.</p>
            </div>
        </div>
    </section>
);

const TermsOfServicePage = () => (
    <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
             <div className="prose prose-invert lg:prose-xl mx-auto text-gray-300">
                <h1 className="text-white">Terms of Service</h1>
                <p className="lead">Last updated: September 03, 2025</p>
                <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Primus website and software (the "Service") operated by Primus Systems ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>
                
                <h2>Accounts</h2>
                <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>

                <h2>Intellectual Property</h2>
                <p>The Service and its original content, features and functionality are and will remain the exclusive property of Primus Systems and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Primus Systems.</p>

                <h2>Links To Other Web Sites</h2>
                <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Primus Systems. Primus Systems has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Primus Systems shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
                
                <h2>Termination</h2>
                <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>

                <h2>Limitation Of Liability</h2>
                <p>In no event shall Primus Systems, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
                
                <h2>Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
            </div>
        </div>
    </section>
);


// --- Modal Component ---
const DemoModal = ({ isVisible, hideModal }) => {
    const modalRef = useRef(null);
    
    useEffect(() => {
        const modalElement = modalRef.current;
        if (!modalElement) return; // Safety check
        
        if(isVisible) {
            modalElement.classList.remove('scale-95', 'opacity-0');
        } else {
            modalElement.classList.add('scale-95', 'opacity-0');
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={hideModal}>
            <div ref={modalRef} className="glass-card rounded-2xl p-8 w-full max-w-md m-4 text-center relative transform transition-all duration-300 scale-95 opacity-0" onClick={e => e.stopPropagation()}>
                <button onClick={hideModal} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <Icon name="x" />
                </button>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/50 text-[#0C54D3] rounded-full mb-4">
                    <Icon name="phone-call" className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Get a Live Demo</h2>
                <p className="text-gray-300 mb-6">Please contact our team to get a personalized demo of Primus.</p>
                <div className="space-y-4 text-left">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
                        <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center text-blue-400 font-bold text-xl shrink-0">V</div>
                        <div>
                            <p className="font-semibold text-white text-lg">Vaishwik</p>
                            <span className="text-gray-300">+91 77995 57530</span>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
                         <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center text-blue-400 font-bold text-xl shrink-0">S</div>
                        <div>
                            <p className="font-semibold text-white text-lg">Shyam</p>
                            <span className="text-gray-300">+91 95026 80100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main App Component ---
export default function App() {
    const [activePage, setActivePage] = useState('home');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load GSAP and ScrollTrigger from CDN (production-ready)
    useEffect(() => {
        // Check if scripts already exist
        if (document.querySelector('script[src*="gsap"]')) {
            setIsLoading(false); // Already loaded, just set loading to false
            return;
        }

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        // Add a fallback timeout to prevent infinite loading
        const fallbackTimeout = setTimeout(() => {
            console.warn('GSAP loading timeout, showing content anyway');
            setIsLoading(false);
        }, 5000);

        // Load GSAP first, then ScrollTrigger
        loadScript('https://unpkg.com/gsap@3.12.2/dist/gsap.min.js')
            .then(() => loadScript('https://unpkg.com/gsap@3.12.2/dist/ScrollTrigger.min.js'))
            .then(() => {
                clearTimeout(fallbackTimeout);
                setTimeout(() => setIsLoading(false), 100);
            })
            .catch(error => {
                clearTimeout(fallbackTimeout);
                console.warn('GSAP loading failed:', error);
                setIsLoading(false); // Still show content even if GSAP fails
            });

        return () => clearTimeout(fallbackTimeout);
    }, []);

    // Page change logic with smooth transitions
    const handleSetPage = (page) => {
        if (page === activePage) return;
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Add loading class for transition
        const pageEl = document.querySelector('.page');
        if (pageEl) {
            pageEl.style.opacity = '0';
            pageEl.style.transform = 'translateY(20px)';
        }
        
        // Change page after brief delay
        setTimeout(() => {
            setActivePage(page);
        }, 150);
    };
    
    // GSAP Animations Trigger (fluid and robust)
    useEffect(() => {
        if (isLoading) return; // Don't run animations until GSAP is loaded
        
        const runAnimations = () => {
            try {
                const gsap = window.gsap;
                const ScrollTrigger = window.ScrollTrigger;
                
                if (!gsap) return;

                // Register ScrollTrigger if available
                if (ScrollTrigger) {
                    gsap.registerPlugin(ScrollTrigger);
                    ScrollTrigger.refresh();
                }

                // Kill all previous animations
                gsap.killTweensOf("*");
                if (ScrollTrigger) ScrollTrigger.getAll().forEach(t => t.kill());

                // Set initial states
                gsap.set(".gsap-hero-el, .gsap-feature-card, .gsap-security-card, .gsap-tech-icon, .gsap-pricing-card", { 
                    opacity: 0, 
                    y: 30, 
                    scale: 1 
                });

                switch (activePage) {
                    case 'home':
                        const heroElements = document.querySelectorAll(".gsap-hero-el");
                        if (heroElements.length > 0) {
                            gsap.to(heroElements, { 
                                duration: 1.2, 
                                y: 0, 
                                opacity: 1, 
                                stagger: 0.15, 
                                ease: "power2.out",
                                delay: 0.1
                            });
                        }
                        break;
                    case 'features':
                        const featureCards = document.querySelectorAll(".gsap-feature-card");
                        if (featureCards.length > 0) {
                            gsap.to(featureCards, { 
                                duration: 0.8, 
                                y: 0, 
                                opacity: 1, 
                                stagger: 0.1, 
                                ease: "power2.out",
                                delay: 0.2
                            });
                        }
                        break;
                    case 'security':
                        const securityCards = document.querySelectorAll(".gsap-security-card");
                        if (securityCards.length > 0) {
                            gsap.to(securityCards, { 
                                duration: 0.8, 
                                y: 0, 
                                opacity: 1, 
                                stagger: 0.1, 
                                ease: "power2.out",
                                delay: 0.2
                            });
                        }
                        break;
                    case 'platform':
                        const techIcons = document.querySelectorAll(".gsap-tech-icon");
                        if (techIcons.length > 0) {
                            gsap.set(techIcons, { scale: 0.8, opacity: 0 });
                            gsap.to(techIcons, { 
                                duration: 0.6, 
                                scale: 1, 
                                opacity: 1, 
                                stagger: 0.08, 
                                ease: "back.out(1.4)",
                                delay: 0.2
                            });
                        }
                        break;
                    case 'pricing':
                        const pricingCards = document.querySelectorAll(".gsap-pricing-card");
                        if (pricingCards.length > 0) {
                            gsap.to(pricingCards, { 
                                duration: 0.8, 
                                y: 0, 
                                opacity: 1, 
                                stagger: 0.1, 
                                ease: "power2.out",
                                delay: 0.2
                            });
                        }
                        break;
                    default:
                        // Default fade in for other pages
                        const defaultElements = document.querySelectorAll(".page > *");
                        if (defaultElements.length > 0) {
                            gsap.to(defaultElements, { 
                                duration: 0.6, 
                                opacity: 1, 
                                y: 0, 
                                ease: "power2.out",
                                delay: 0.1
                            });
                        }
                        break;
                }
            } catch (error) {
                console.warn('Animation error:', error);
            }
        };

        // Run animations after a short delay to ensure DOM is ready
        const timeoutId = setTimeout(runAnimations, 100);
        return () => clearTimeout(timeoutId);
    }, [activePage, isLoading]);


    // Ensure page is visible after animations
    useEffect(() => {
        if (!isLoading) {
            const pageEl = document.querySelector('.page');
            if (pageEl) {
                setTimeout(() => {
                    pageEl.style.opacity = '1';
                    pageEl.style.transform = 'translateY(0)';
                    pageEl.classList.add('loaded');
                }, 200);
            }
        }
    }, [activePage, isLoading]);

    const renderPage = () => {
        switch (activePage) {
            case 'home': return <HomePage setActivePage={handleSetPage} showModal={() => setIsModalOpen(true)} />;
            case 'features': return <FeaturesPage />;
            case 'security': return <SecurityPage />;
            case 'platform': return <PlatformPage />;
            case 'pricing': return <PricingPage showModal={() => setIsModalOpen(true)} />;
            case 'privacy-policy': return <PrivacyPolicyPage />;
            case 'terms-of-service': return <TermsOfServicePage />;
            default: return <HomePage setActivePage={handleSetPage} showModal={() => setIsModalOpen(true)} />;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading Primus...</p>
                </div>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <GlobalStyles />
            <BackgroundCanvas />
            <div className="relative z-10 min-h-screen flex flex-col">
                <Header activePage={activePage} setActivePage={handleSetPage} showModal={() => setIsModalOpen(true)} />
                <main className="flex-1 relative z-10">
                    <div className="page">
                        {renderPage()}
                    </div>
                </main>
                <Footer setActivePage={handleSetPage} showModal={() => setIsModalOpen(true)} />
            </div>
            <DemoModal isVisible={isModalOpen} hideModal={() => setIsModalOpen(false)} />
        </ErrorBoundary>
    );
}

