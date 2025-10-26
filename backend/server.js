// 1. Import necessary packages
import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Loads .env file variables
import fetch from 'node-fetch'; // To make API calls

// 2. Set up the Express app
const app = express();
const PORT = process.env.PORT || 5001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 3. Use middlewares
app.use(cors());
app.use(express.json());

// 4. Define your API endpoint
app.post('/api/search', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key not found. Please add it to your .env file.' });
  }

  const { query, sport } = req.body;
  console.log(`Received search for: "${query}" in sport: "${sport}"`);

  try {
    // Sport-specific metric guidance
    const sportMetrics = {
      'Cricket': 'batting average, strike rate, centuries, half-centuries, wickets, economy rate, bowling average, ODI/Test/T20 stats',
      'Soccer': 'goals, assists, appearances, clean sheets, pass completion %, tackle success %, trophies won',
      'Tennis': 'Grand Slam titles, ATP/WTA ranking, match wins, tournament titles, win-loss records, head-to-head stats',
      'F1': 'race wins, pole positions, podium finishes, championship titles, fastest laps, constructor standings',
      'Basketball': 'points per game, rebounds, assists, field goal %, 3-point %, championships, All-Star selections',
      'Baseball': 'batting average (AVG), home runs (HR), RBIs, on-base percentage (OBP), slugging (SLG), OPS, ERA, WHIP for pitchers, season splits',
      'Swimming': 'world records (WR), Olympic records (OR), event times, stroke category (freestyle/backstroke/butterfly/breaststroke/medley), splits, heat/semi-final/final results',
      'Chess': 'Elo rating, FIDE rating, tournament wins, opening repertoire, notable games, world championship results, head-to-head records'
    };

    const metricsHint = sportMetrics[sport] || 'relevant performance metrics and statistics';

    // Enhanced prompt for Gemini AI with better instructions
    const systemPrompt = `
      You are an elite sports statistics analyst with deep knowledge of ${sport}. Your expertise includes:
      - Historical records and career statistics
      - Tournament and championship data
      - Team standings and performance metrics
      - Head-to-head comparisons
      - Recent and historical trends
      
      SPORT-SPECIFIC METRICS FOR ${sport.toUpperCase()}:
      When providing statistics for ${sport}, prioritize these metrics: ${metricsHint}

      CRITICAL INSTRUCTIONS:
      1. You MUST respond with ONLY a valid JSON object - no other text, explanations, or markdown
      2. Do NOT use markdown code blocks (\`\`\`json) - output raw JSON only
      3. Provide accurate, well-researched statistics when available
      4. If exact data isn't available, provide approximate or contextual information with a disclaimer
      5. For current season queries (2024-2025), provide the most recent available data

      JSON STRUCTURE:
      {
        "summary": "A clear, informative 1-2 sentence summary with context and key insights",
        "interesting_fact": "A fascinating, lesser-known fact or achievement related to the query that adds context and makes the data more engaging",
        "video_clips": [
          {
            "title": "Descriptive title for the video clip",
            "description": "Brief description of what the video shows",
            "video_url": "https://www.youtube.com/watch?v=VIDEO_ID or full YouTube URL"
          }
        ],
        "table": {
          "headers": ["Column1", "Column2", ...],
          "rows": [
            ["value1", "value2", ...],
            ["value1", "value2", ...]
          ]
        }
      }
      
      VIDEO CLIP INSTRUCTIONS:
      - IMPORTANT: Use the Google Search grounding tool to find REAL, EXISTING YouTube videos
      - Search for actual video URLs using queries like "youtube ${sport} [player name] [event/achievement]"
      - Always provide 2-3 relevant video_clips with ACTUAL YouTube URLs from your search results
      - For ${sport}, include relevant keywords: ${sport.toLowerCase()} highlights, ${sport.toLowerCase()} best moments
      - If you find a video in search results, extract the full YouTube URL
      - Prioritize official channels, highlight compilations, and popular sports content creators
      - If no specific video is found, use highly descriptive titles that will work for YouTube search

      RESPONSE GUIDELINES:
      - For player statistics: Include key metrics relevant to the sport (runs, goals, assists, etc.)
      - For team queries: Provide standings, win-loss records, recent form
      - For tournament queries: Include winners, top performers, notable records
      - For comparison queries: Create side-by-side comparison tables
      - For "not found" scenarios: Return helpful message in summary with empty table: { "headers": [], "rows": [] }

      EXAMPLE RESPONSES:

      Query: "Lionel Messi career goals"
      {
        "summary": "Lionel Messi has scored over 800 career goals across club and international football, making him one of the highest scorers in history.",
        "interesting_fact": "Messi scored 91 goals in the calendar year 2012, breaking Gerd Müller's 40-year-old record of 85 goals - a feat many consider unbreakable.",
        "video_clips": [
          {
            "title": "Messi All 91 Goals in 2012",
            "description": "Watch all 91 goals Messi scored in the record-breaking 2012 calendar year",
            "video_url": "https://www.youtube.com/watch?v=5vmm-xCq4To"
          },
          {
            "title": "Messi Top 30 Goals",
            "description": "A compilation of Messi's most spectacular career goals",
            "video_url": "https://www.youtube.com/watch?v=nFg0N_JesWs"
          },
          {
            "title": "Messi World Cup 2022 Highlights",
            "description": "Messi's journey to winning the 2022 World Cup with Argentina",
            "video_url": "https://www.youtube.com/watch?v=WchwNV7TN-4"
          }
        ],
        "table": {
          "headers": ["Competition", "Goals", "Matches", "Goals per Match"],
          "rows": [
            ["Barcelona", "672", "778", "0.86"],
            ["PSG", "32", "75", "0.43"],
            ["Inter Miami", "20", "23", "0.87"],
            ["Argentina", "106", "180", "0.59"],
            ["Total", "830+", "1056+", "0.79"]
          ]
        }
      }

      Query: "NBA Finals 2024"
      {
        "summary": "The Boston Celtics won the 2024 NBA Finals, defeating the Dallas Mavericks 4-1 in the series.",
        "interesting_fact": "This was the Celtics' 18th championship, breaking their tie with the Lakers for the most NBA titles in history. Jaylen Brown became Finals MVP, averaging 20.8 points per game.",
        "video_clips": [
          {
            "title": "Celtics Win 2024 NBA Finals",
            "description": "Game 5 highlights as the Celtics clinch championship",
            "video_url": "https://www.youtube.com/watch?v=K_cHR3xXPFg"
          },
          {
            "title": "Jaylen Brown Finals MVP",
            "description": "Jaylen Brown's best moments from the Finals series",
            "video_url": "https://www.youtube.com/watch?v=pL9wH2pGXGQ"
          }
        ],
        "table": {
          "headers": ["Game", "Result", "Date", "MVP"],
          "rows": [
            ["Game 1", "Celtics 107-89", "June 6", "Jaylen Brown"],
            ["Game 2", "Celtics 105-98", "June 9", "Jaylen Brown"],
            ["Game 3", "Mavericks 99-106", "June 12", "Kyrie Irving"],
            ["Game 4", "Celtics 122-84", "June 14", "Jaylen Brown"],
            ["Game 5", "Celtics 106-88", "June 17", "Jaylen Brown"],
            ["Series MVP", "Jaylen Brown", "-", "-"]
          ]
        }
      }
    `;

    const userQuery = `Analyze the following query for the sport: "${sport}". The user's query is: "${query}"`;
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [{
        parts: [{ text: userQuery }]
      }],
      // Enable Google Search grounding for real-time, accurate sports data
      tools: [{ "google_search": {} }],
    };

    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error("API Error:", errorText);
        throw new Error(`API request failed with status ${apiResponse.status}`);
    }

    const responseData = await apiResponse.json();
    
    // Log grounding metadata if available (shows what sources were used)
    const groundingMetadata = responseData.candidates[0]?.groundingMetadata;
    if (groundingMetadata) {
      console.log('\n🔍 Google Search Grounding Used:');
      console.log('Search Queries:', groundingMetadata.webSearchQueries);
      console.log('Sources Found:', groundingMetadata.groundingChunks?.length || 0);
      if (groundingMetadata.groundingChunks) {
        console.log('Source URLs:', groundingMetadata.groundingChunks.map(chunk => chunk.web?.uri).slice(0, 5));
      }
      console.log('---\n');
    } else {
      console.log('\n💭 Response generated from model knowledge (no search performed)\n');
    }
    
    // Extract the text content from Gemini's response
    const geminiTextResponse = responseData.candidates[0].content.parts[0].text;
    
    // Because we instructed Gemini to return JSON, we can parse it directly
    const parsedData = JSON.parse(geminiTextResponse);
    
    // Send the structured data back to the React app
    res.json(parsedData);

  } catch (error) {
    console.error('Error processing search:', error);
    res.status(500).json({ error: 'Failed to fetch data from the API. Please check the server logs.' });
  }
});

// 5. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
