import React from 'react';
import type { VideoClip } from '../types';

interface VideoClipsProps {
  clips: VideoClip[];
}

const VideoClips: React.FC<VideoClipsProps> = ({ clips }) => {
  if (!clips || clips.length === 0) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      // Extract video ID from various YouTube URL formats
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      
      if (match && match[2]) {
        const videoId = match[2].split('&')[0]; // Remove any additional parameters
        if (videoId.length === 11) {
          return `https://www.youtube.com/embed/${videoId}?rel=0`;
        }
      }
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
    }
    return null;
  };

  const getYouTubeWatchUrl = (url: string) => {
    // If it's already a valid YouTube URL, return it
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return url;
    }
    // Otherwise, return null and we'll use search
    return null;
  };

  const getYouTubeSearchUrl = (title: string, description: string) => {
    const searchQuery = `${title} ${description}`.trim();
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '1.5rem',
        padding: '2rem',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        marginTop: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>🎥</span>
        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1e293b',
            margin: 0,
          }}
        >
          Related Videos
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {clips.map((clip, index) => {
          const embedUrl = getYouTubeEmbedUrl(clip.video_url);
          
          return (
            <div
              key={index}
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '1rem',
                overflow: 'hidden',
                transition: 'all 0.3s',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.2)';
                e.currentTarget.style.borderColor = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              {/* Embedded YouTube Video */}
              {embedUrl ? (
                <div
                  style={{
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                    height: 0,
                    overflow: 'hidden',
                  }}
                >
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    src={embedUrl}
                    title={clip.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                // Fallback with clickable search link if URL is invalid
                <a
                  href={getYouTubeSearchUrl(clip.title, clip.description)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      backgroundColor: '#dc2626',
                      background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                      padding: '3rem 2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div style={{ fontSize: '4rem', color: 'white', opacity: 0.9 }}>▶</div>
                    <p style={{ 
                      color: 'white', 
                      marginTop: '1rem',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      Click to Search on YouTube
                    </p>
                  </div>
                </a>
              )}

              {/* Video Info */}
              <div style={{ padding: '1.25rem' }}>
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                    lineHeight: '1.4',
                  }}
                >
                  {clip.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    lineHeight: '1.5',
                    marginBottom: '1rem',
                  }}
                >
                  {clip.description}
                </p>
                <a
                  href={getYouTubeWatchUrl(clip.video_url) || getYouTubeSearchUrl(clip.title, clip.description)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: '#dc2626',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#991b1b';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#dc2626';
                  }}
                >
                  <span>{embedUrl ? 'Watch on YouTube' : 'Search on YouTube'}</span>
                  <span style={{ fontSize: '0.75rem' }}>↗</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f1f5f9',
          borderRadius: '0.75rem',
          fontSize: '0.85rem',
          color: '#64748b',
          textAlign: 'center',
        }}
      >
        💡 Tip: Videos play directly here, or click "Watch on YouTube" to open in a new tab
      </div>
    </div>
  );
};

export default VideoClips;
