import type { CSSProperties } from 'react';

// Light Theme - Apple-inspired Design System
export const styles: { [key: string]: CSSProperties } = {
  // Main Container
  container: {
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
    background: '#ffffff',
    color: '#1d1d1f',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    position: 'relative' as const,
  },

  // Header/Navigation
  header: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    padding: '1.25rem 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerLogo: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1d1d1f',
    letterSpacing: '-0.02em',
  },

  // Navigation Overlay
  navOverlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    zIndex: 999,
    display: 'none',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    padding: '8rem 3rem 3rem',
  },

  navOverlayActive: {
    display: 'flex' as const,
  },

  navMenu: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  navMenuItem: {
    fontSize: '2.5rem',
    fontWeight: '600',
    marginBottom: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
    color: '#1d1d1f',
    letterSpacing: '-0.02em',
  },

  navToggle: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },

  navToggleLine: {
    width: '24px',
    height: '2px',
    background: '#1d1d1f',
    transition: 'all 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
  },

  // Main Content with Top Padding
  mainContent: {
    paddingTop: '80px',
    minHeight: '100vh',
  },

  // Hero Section - Apple-like with video background
  heroSection: {
    position: 'relative' as const,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    padding: '120px 20px 40px',
    overflow: 'hidden',
  },

  // (video background handled by component)

  heroContent: {
    zIndex: 10,
    maxWidth: '980px',
    padding: '0 2rem',
  },

  heroTitle: {
    fontSize: 'clamp(48px, 7vw, 80px)',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#1d1d1f',
    lineHeight: 1.05,
    letterSpacing: '-0.015em',
  },

  heroSubtitle: {
    fontSize: 'clamp(21px, 2.5vw, 28px)',
    color: '#6e6e73',
    marginBottom: '48px',
    fontWeight: '400',
    lineHeight: 1.38,
    letterSpacing: '-0.01em',
  },

  heroGradientBg: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    pointerEvents: 'none' as const,
  },

  // Sport Grid - Clean & Spacious
  sportGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '20px',
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    height: 'fit-content',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
      gap: '16px',
      padding: '20px',
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
      gap: '12px',
      padding: '16px',
    },
  },

  sportCard: {
    position: 'relative' as const,
    overflow: 'hidden',
    borderRadius: '24px',
    cursor: 'pointer',
    transition: 'all 0.45s cubic-bezier(0.28, 0.11, 0.32, 1)',
    background: '#ffffff',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.06)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    aspectRatio: '1 / 1',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2.5rem',
  },

  // (deprecated background/expanding styles removed)

  sportCardHover: {
    transform: 'translateY(-8px) scale(1.02)',
    borderColor: 'rgba(0, 0, 0, 0.12)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12)',
  },

  sportIcon: {
    fontSize: '5rem',
    marginBottom: '24px',
    display: 'block',
    filter: 'grayscale(0.2)',
  },

  sportName: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1d1d1f',
    marginBottom: '8px',
    letterSpacing: '-0.015em',
  },

  sportSubtext: {
    fontSize: '17px',
    color: '#86868b',
    fontWeight: '400',
    lineHeight: 1.47,
  },

  // Search Container - Light & Clean
  searchContainer: {
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    borderRadius: '24px',
    padding: '40px',
    marginBottom: '32px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  },

  searchBar: {
    width: '100%',
    padding: '18px 24px',
    fontSize: '19px',
    borderRadius: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    background: '#f5f5f7',
    color: '#1d1d1f',
    boxSizing: 'border-box' as const,
    marginBottom: '16px',
    transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
    fontWeight: '400',
  },

  searchBarFocus: {
    borderColor: '#0071e3',
    background: '#ffffff',
    outline: 'none',
  },

  searchButton: {
    padding: '18px 48px',
    fontSize: '17px',
    background: '#0071e3',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
    width: '100%',
  },

  searchButtonHover: {
    background: '#0077ed',
    transform: 'scale(1.01)',
  },

  // Suggestions Chips
  suggestionsContainer: {
    marginTop: '24px',
  },

  suggestionsTitle: {
    fontSize: '15px',
    color: '#6e6e73',
    marginBottom: '12px',
    fontWeight: '500',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
  },

  suggestionChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },

  suggestionChip: {
    padding: '10px 20px',
    background: '#f5f5f7',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: '9999px',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
    color: '#1d1d1f',
    fontWeight: '500',
  },

  suggestionChipHover: {
    background: '#e8e8ed',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-1px)',
  },

  // History Section
  historyContainer: {
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },

  historyTitle: {
    fontSize: '0.9rem',
    color: '#888888',
    marginBottom: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },

  historyItem: {
    padding: '0.75rem 1rem',
    background: 'rgba(102, 126, 234, 0.05)',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#aaaaaa',
  },

  historyItemHover: {
    background: 'rgba(102, 126, 234, 0.15)',
  },

  // Results Container
  resultsContainer: {
    marginTop: '32px',
    padding: '48px',
    background: '#ffffff',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    borderRadius: '24px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    animation: 'slideUp 0.5s cubic-bezier(0.28, 0.11, 0.32, 1)',
  },

  summary: {
    fontSize: '21px',
    fontWeight: '400',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    color: '#1d1d1f',
    lineHeight: '1.52',
    letterSpacing: '-0.01em',
  },

  interestingFact: {
    padding: '24px',
    background: '#f5f5f7',
    borderLeft: '4px solid #0071e3',
    borderRadius: '12px',
    marginBottom: '32px',
    color: '#1d1d1f',
    fontSize: '17px',
    lineHeight: '1.47',
  },

  // View Toggle
  viewToggleContainer: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
  },

  viewToggleButton: {
    padding: '12px 24px',
    borderRadius: '10px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: '#f5f5f7',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
    color: '#1d1d1f',
  },

  viewToggleButtonActive: {
    border: '1px solid #0071e3',
    background: '#0071e3',
    color: '#ffffff',
  },

  // Table
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },

  th: {
    padding: '16px 20px',
    background: '#f5f5f7',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    fontWeight: '600',
    color: '#1d1d1f',
    textTransform: 'uppercase' as const,
    fontSize: '13px',
    letterSpacing: '0.06em',
  },

  td: {
    padding: '16px 20px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    color: '#1d1d1f',
    fontSize: '17px',
  },

  // Chart Container
  chartContainer: {
    marginBottom: '32px',
    padding: '32px',
    background: '#f5f5f7',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    borderRadius: '16px',
  },

  chartTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1d1d1f',
    marginBottom: '24px',
    letterSpacing: '-0.015em',
  },

  // Video Container
  videoContainer: {
    marginBottom: '2rem',
    borderRadius: '1rem',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    aspectRatio: '16 / 9',
    background: '#000000',
  },

  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },

  // States
  loadingContainer: {
    textAlign: 'center',
    padding: '64px',
    background: '#ffffff',
    borderRadius: '24px',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  },

  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(0, 113, 227, 0.2)',
    borderTop: '3px solid #0071e3',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px',
  },

  errorMessage: {
    padding: '24px',
    fontSize: '17px',
    fontWeight: '500',
    color: '#bf0d0d',
    background: '#fff1f0',
    borderRadius: '12px',
    border: '1px solid rgba(191, 13, 13, 0.2)',
  },

  // Footer
  footer: {
    marginTop: '4rem',
    paddingTop: '4rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '3rem 2rem',
    textAlign: 'center',
    color: '#888888',
  },

  // Sport Page Header
  sportPageHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
    gap: '16px',
  },

  backButton: {
    padding: '12px 24px',
    background: '#f5f5f7',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    color: '#1d1d1f',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
    fontSize: '15px',
  },

  backButtonHover: {
    background: '#e8e8ed',
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },

  sportPageTitle: {
    fontSize: '40px',
    fontWeight: '600',
    color: '#1d1d1f',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    letterSpacing: '-0.015em',
  },

  sportPageIcon: {
    fontSize: '48px',
  },

  // Container Helper
  pageContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '48px',
  },

  // Audio Control
  audioControl: {
    position: 'fixed' as const,
    bottom: '32px',
    right: '32px',
    zIndex: 100,
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    padding: '12px 20px',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    borderRadius: '9999px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
  },

  audioButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '4px',
    transition: 'all 0.2s ease',
    color: '#1d1d1f',
  },

  // Transitions
  transitionOverlay: {
    position: 'fixed' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    pointerEvents: 'none' as const,
  },

  transitionText: {
    fontSize: '3rem',
    fontWeight: '700',
    textAlign: 'center',
  },
};
