# Sports Stats Hub

Modern, animated sports statistics explorer. React + Vite frontend with 3D/Video backgrounds and a Node/Express backend that queries Gemini with Google Search grounding to return structured, display-ready JSON.

## Project Structure
- `frontend` – Vite + React + TypeScript UI (charts, tables, video clips, 3D scenes)
- `backend` – Express server proxying to Gemini API (`/api/search`)
- `scripts` – helper scripts (e.g., AWS S3 deployment)

## Features
- Multi-sport dashboard with animated transitions (Cricket, Soccer, Tennis, F1, Basketball, Baseball, Swimming, Chess)
- Smart search: returns JSON with summary, interesting facts, video clips, and a metrics table
- Charts (Chart.js) + tables, view toggles, and search history
- 3D backgrounds via `@react-three/fiber` and local video backgrounds

## Prerequisites
- Node.js 18+ and npm
- A Gemini API key (for backend). Get one at: https://makersuite.google.com/app/apikey

## Quick Start (Local Development)
1) Backend
- Copy env template and set your key:
  - `cp backend/env.template backend/.env`
  - Edit `backend/.env` and set `GEMINI_API_KEY` (and optionally `PORT`)
- Install deps and run:
  - `cd backend && npm install`
  - `node server.js`
- The server starts at `http://localhost:5001` (or your `PORT`). Endpoint: `POST /api/search`

2) Frontend
- Install deps and start dev server:
  - `cd frontend && npm install`
  - `npm run dev`
- Vite serves on `http://localhost:5173`

3) Point the frontend to your backend (optional)
- The current fetch in `frontend/src/components/SportPage.tsx` uses an AWS API Gateway URL.
- For local development, change the fetch URL to: `http://localhost:5001/api/search`
- File to edit: `frontend/src/components/SportPage.tsx`

## Backend API
- Endpoint: `POST /api/search`
- Body:
```
{
  "query": "Lionel Messi career goals",
  "sport": "Soccer"
}
```
- Response: Strict JSON (no markdown) with shape:
```
{
  "summary": "...",
  "interesting_fact": "...",
  "video_clips": [
    { "title": "...", "description": "...", "video_url": "https://..." }
  ],
  "table": { "headers": ["..."], "rows": [["...", 123]] }
}
```

Notes
- The backend sets a detailed system instruction and enables Google Search grounding so returned videos should be real YouTube links.
- If `GEMINI_API_KEY` is missing, the backend returns an error.

## Configuration
- Backend environment: `backend/.env` (see `backend/env.template`)
  - `GEMINI_API_KEY` – required
  - `PORT` – defaults to `5001`
  - `CORS_ORIGIN` – origin allowed by CORS (update for production)

## Scripts
- Frontend
  - `npm run dev` – start Vite dev server
  - `npm run build` – type-check and build production assets
  - `npm run preview` – preview built app
- Backend
  - Run directly: `node server.js`

## Deployment
### Frontend → AWS S3 (static hosting)
- Use helper script: `scripts/deploy-to-aws.sh`
  - Builds the frontend and syncs `frontend/dist` to your S3 bucket
  - Can create/configure bucket for static website hosting
  - Prints the website URL on success

After deploying the frontend
- Update the fetch URL in `frontend/src/components/SportPage.tsx` to point to your live backend (e.g., EC2 or API Gateway).
- Rebuild and redeploy the frontend.

### Backend Options
- Node/Express on EC2 or similar:
  - Copy `backend/`, set up `backend/.env`, run `node server.js` with a process manager (pm2/systemd) and reverse proxy (Nginx)
- API Gateway + Lambda (already referenced by the frontend):
  - If continuing with Lambda, keep the existing API URL in `SportPage.tsx`.

## Development Tips
- 3D scenes live under `frontend/src/components/background/scenes`
- Video assets are imported from `frontend/src/assets` via `frontend/src/config/assetConfig.ts`
- Supported sports and UI styling live in `frontend/src/config/sportConfig.ts`

## Troubleshooting
- “API key not found”
  - Ensure `backend/.env` exists and `GEMINI_API_KEY` is set. Restart backend.
- CORS errors in browser console
  - Set `CORS_ORIGIN` in `backend/.env` to your frontend origin and restart backend.
- Frontend shows no results
  - Check browser DevTools → Network for the search request and response
  - Verify backend logs for request/response and grounding metadata
- Build issues
  - Delete `frontend/node_modules` and reinstall: `rm -rf node_modules && npm install`

## License
ISC (see individual `package.json` files). 

## Acknowledgements
- Gemini API and Google Search grounding
- React, Vite, Chart.js, Three.js/@react-three/fiber, Framer Motion
