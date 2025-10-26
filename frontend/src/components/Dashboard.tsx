import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { styles } from '../styles/appStyles';
import { sportConfig, sports } from '../config/sportConfig';
import { videoAssets } from '../config/assetConfig';
import FeatureBox from './FeatureBox';
import VideoBackground from './VideoBackground';
import { SportAnimation } from './animations/SportAnimations';

interface DashboardProps {
  onSelectSport: (sport: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectSport }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [expandingCard, setExpandingCard] = useState<string | null>(null);
  const [cardPosition, setCardPosition] = useState<DOMRect | null>(null);

  const handleCardClick = (sport: string, event: React.MouseEvent<HTMLDivElement>) => {
    const cardElement = event.currentTarget;
    const rect = cardElement.getBoundingClientRect();
    setCardPosition(rect);
    setExpandingCard(sport);
  };


  return (
    <div style={styles.container}>
      {/* Card Expand Overlay with Framer Motion Animations */}
      <AnimatePresence>
        {expandingCard && cardPosition && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: cardPosition.top,
                left: cardPosition.left,
                width: cardPosition.width,
                height: cardPosition.height,
                background: sportConfig[expandingCard].gradient,
                borderRadius: '24px',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'visible',
              }}
              initial={false}
              animate={{ top: 0, left: 0, width: '100vw', height: '100vh', borderRadius: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Dynamic Framer Motion Animation per sport */}
              <SportAnimation 
                sport={expandingCard} 
                icon={sportConfig[expandingCard].icon}
                onComplete={() => {
                  const s = expandingCard; // capture before reset
                  setExpandingCard(null);
                  setCardPosition(null);
                  if (s) onSelectSport(s);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Header */}
      <header style={styles.header}>
        <div style={styles.headerLogo}>⚡ Sports Stats Hub</div>
        <button
          style={styles.navToggle}
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation"
        >
          <div
            style={{
              ...styles.navToggleLine,
              transform: navOpen ? 'rotate(45deg) translateY(10px)' : 'none',
            }}
          />
          <div
            style={{
              ...styles.navToggleLine,
              opacity: navOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              ...styles.navToggleLine,
              transform: navOpen ? 'rotate(-45deg) translateY(-10px)' : 'none',
            }}
          />
        </button>
      </header>

      {/* Navigation Overlay */}
      {navOpen && (
        <div
          style={{
            ...styles.navOverlay,
            display: 'flex',
          }}
          onClick={() => setNavOpen(false)}
        >
          <nav style={styles.navMenu}>
            <div
              style={{
                ...styles.navMenuItem,
                animation: 'slideIn 0.4s ease 0.1s both',
              }}
              onClick={() => {
                setNavOpen(false);
                document.getElementById('sports-section')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              Sports
            </div>
            <div
              style={{
                ...styles.navMenuItem,
                animation: 'slideIn 0.4s ease 0.2s both',
              }}
              onClick={() => {
                setNavOpen(false);
                document.getElementById('features-section')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              Features
            </div>
            <div
              style={{
                ...styles.navMenuItem,
                animation: 'slideIn 0.4s ease 0.3s both',
              }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                GitHub
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Hero Section with Video Background + Sport Cards */}
        <section style={{
          ...styles.heroSection,
          minHeight: '100vh',
          paddingTop: '10px',
        }}>
          {/* VIDEO BACKGROUND - LOCAL ASSET */}
          <VideoBackground videoSrc={videoAssets.hero} opacity={0.5} />
        
          
          {/* Sports Grid - NOW ON FRONT PAGE */}
          <div style={{ 
            position: 'relative', 
            zIndex: 10,
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
          }}>
            {/* Text Container with Semi-Transparent Background */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '-1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  animation: 'fadeInScale 0.8s ease',
                  color: '#1d1d1f',
                  textShadow: '0 2px 20px rgba(0,0,0,0.1)',
                  marginBottom: '0.5rem',
                }}
              >
                Choose Your Sport
              </h2>
              
              <p
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '400',
                  textAlign: 'center',
                  animation: 'fadeInScale 0.8s ease 0.2s both',
                  color: '#6e6e73',
                  margin: 0,
                }}
              >
                Get real-time statistics, insights, and highlights
              </p>
            </div>

            <div style={styles.sportGrid}>
              {sports.map((sport, index) => {
                const config = sportConfig[sport];
                const isHovered = hoveredCard === sport;

                return (
                  <div
                    key={sport}
                    style={{
                      ...styles.sportCard,
                      ...(isHovered && styles.sportCardHover),
                      animation: `fadeIn 0.6s ease ${index * 0.1}s both`,
                    }}
                    onMouseEnter={() => setHoveredCard(sport)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={(e) => handleCardClick(sport, e)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCardClick(sport, (e as unknown) as React.MouseEvent<HTMLDivElement>);
                      }
                    }}
                  >
                    {/* Gradient overlay - REMOVED 3D backgrounds from cards to fix flickering */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: config.gradient,
                      opacity: 0.15,
                      zIndex: 1,
                      transition: 'opacity 0.45s cubic-bezier(0.28, 0.11, 0.32, 1)',
                      ...(isHovered && { opacity: 0.25 }),
                    }} />

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <div style={styles.sportIcon}>{config.icon}</div>
                      <div style={styles.sportName}>{sport}</div>
                      <div style={styles.sportSubtext}>
                        {sport === 'Cricket' ? 'Cricket Stats' :
                         sport === 'Soccer' ? 'Soccer Stats' :
                         sport === 'Tennis' ? 'Tennis Stats' :
                         sport === 'F1' ? 'Formula 1 Stats' :
                         sport === 'Basketball' ? 'Basketball Stats' :
                         sport === 'Baseball' ? 'Baseball Stats' :
                         sport === 'Swimming' ? 'Swimming Stats' :
                         'Chess Stats'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features-section" style={{ padding: '4rem 2rem' }}>
          <div style={styles.pageContainer}>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '3rem',
                textAlign: 'center',
              }}
            >
              Powerful Features
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
              }}
            >
              <FeatureBox
                icon="🤖"
                title="AI-Powered Analysis"
                description="Powered by Google Gemini with real-time web grounding for accurate data"
              />
              <FeatureBox
                icon="📊"
                title="Interactive Charts"
                description="Beautiful visualizations with automatic chart selection (Bar, Line, Radar)"
              />
              <FeatureBox
                icon="🎥"
                title="Video Integration"
                description="Embedded YouTube highlights and curated video clips"
              />
              <FeatureBox
                icon="💡"
                title="Interesting Facts"
                description="AI-generated fascinating insights about sports topics"
              />
              <FeatureBox
                icon="🔍"
                title="Smart Search"
                description="Search suggestions, history, and real-time feedback"
              />
              <FeatureBox
                icon="⚡"
                title="Real-Time Data"
                description="Up-to-date statistics from verified web sources"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>
            Built with ❤️ for sports enthusiasts • Version 2.1 • MIT License
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            © 2025 Sports Stats Hub. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;

