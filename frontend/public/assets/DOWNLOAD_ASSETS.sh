#!/bin/bash

# Asset Download Script for Sports Stats Hub
# This script downloads free assets from various sources

echo "🎬 Downloading Sports Stats Hub Assets..."
echo "=========================================="

# Create directories
mkdir -p videos models textures audio

# ===========================================
# VIDEOS (Background animations)
# ===========================================

echo ""
echo "📹 Downloading Videos..."

# Homepage hero video - Sports montage
curl -L "https://assets.mixkit.co/videos/preview/mixkit-soccer-ball-on-a-field-1082-large.mp4" \
  -o videos/hero-sports.mp4

# Cricket video
curl -L "https://assets.mixkit.co/videos/preview/mixkit-cricket-player-hitting-ball-1189-large.mp4" \
  -o videos/cricket-bg.mp4

# Soccer video
curl -L "https://assets.mixkit.co/videos/preview/mixkit-soccer-player-kicking-ball-1167-large.mp4" \
  -o videos/soccer-bg.mp4

# Tennis video
curl -L "https://assets.mixkit.co/videos/preview/mixkit-tennis-player-serving-1179-large.mp4" \
  -o videos/tennis-bg.mp4

# F1/Racing video
curl -L "https://assets.mixkit.co/videos/preview/mixkit-race-car-on-track-1192-large.mp4" \
  -o videos/f1-bg.mp4

# Basketball video
curl -L "https://assets.mixkit.co/videos/preview/mixkit-basketball-player-shooting-hoop-1168-large.mp4" \
  -o videos/basketball-bg.mp4

# Baseball video
curl -L "https://assets.mixkit.co/videos/preview/mixkit-baseball-player-batting-1190-large.mp4" \
  -o videos/baseball-bg.mp4

# Swimming video
curl -L "https://assets.mixkit.co/videos/preview/mixkit-swimmer-diving-into-pool-1175-large.mp4" \
  -o videos/swimming-bg.mp4

# Chess (use abstract/strategy video)
curl -L "https://assets.mixkit.co/videos/preview/mixkit-person-playing-chess-1194-large.mp4" \
  -o videos/chess-bg.mp4

# ===========================================
# 3D MODELS (GLTF/GLB format)
# ===========================================

echo ""
echo "🎨 Downloading 3D Models..."

# Note: These are placeholder URLs - replace with actual model sources
# Free 3D model sources: Sketchfab, Poly Pizza, Quaternius, Free3D

# F1 Car (simplified race car)
curl -L "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ToyCar/glTF-Binary/ToyCar.glb" \
  -o models/f1-car.glb

# Baseball (ball + bat models would go here)
# You can source from: https://poly.pizza/ or https://sketchfab.com/

# Cricket bat and ball
# Source from free model sites

# Soccer ball
curl -L "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb" \
  -o models/sample-model.glb

# ===========================================
# TEXTURES (For materials)
# ===========================================

echo ""
echo "🖼️  Downloading Textures..."

# Grass texture (for cricket/soccer/baseball fields)
curl -L "https://cdn.polyhaven.com/asset_img/primary/grass_field.png?height=128" \
  -o textures/grass.jpg

# Wood texture (for cricket bat, baseball bat)
curl -L "https://cdn.polyhaven.com/asset_img/primary/wood_planks.png?height=128" \
  -o textures/wood.jpg

# Court texture (for tennis, basketball)
curl -L "https://cdn.polyhaven.com/asset_img/primary/concrete.png?height=128" \
  -o textures/court.jpg

# Water texture (for swimming)
curl -L "https://cdn.polyhaven.com/asset_img/primary/water.png?height=128" \
  -o textures/water.jpg

# ===========================================
# AUDIO (Sport-specific sounds)
# ===========================================

echo ""
echo "🔊 Downloading Audio..."

# Note: Replace these with actual sound effect URLs
# Free audio sources: Freesound.org, Mixkit, Zapsplat

# Engine sound (F1)
# Crowd cheer (Baseball, Cricket)
# Ball bounce (Tennis, Basketball)
# Water splash (Swimming)
# Chess piece move (Chess)

echo ""
echo "✅ Asset download complete!"
echo ""
echo "📊 Summary:"
echo "  Videos: $(ls -1 videos/*.mp4 2>/dev/null | wc -l) files"
echo "  Models: $(ls -1 models/*.glb 2>/dev/null | wc -l) files"
echo "  Textures: $(ls -1 textures/*.{jpg,png} 2>/dev/null | wc -l) files"
echo "  Audio: $(ls -1 audio/*.{mp3,wav} 2>/dev/null | wc -l) files"
echo ""
echo "⚠️  Note: Some URLs are placeholders. Please download from:"
echo "   - 3D Models: https://poly.pizza/ or https://sketchfab.com/"
echo "   - Audio: https://freesound.org/ or https://mixkit.co/free-sound-effects/"
echo ""

