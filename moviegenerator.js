export async function generateAIMovieData(title) {
  try {
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Generate creative movie data for a fictional movie titled "${title}".

        interface MovieResponse {
          title: string;
          year: number;
          rating: string;
          duration: string;
          plot: string;
          cast: Array<{
            name: string;
            image: string;
          }>;
          reviews: string[];
        }

        {
          "title": "Cosmic Dreams",
          "year": 2023,
          "rating": "8.7",
          "duration": "2h 15m",
          "plot": "In the distant future, dream architects discover a way to access collective human consciousness, unleashing both wonders and terrors beyond imagination.",
          "cast": [
            {"name": "Emma Spencer", "image": "https://picsum.photos/200?1"},
            {"name": "Michael Chen", "image": "https://picsum.photos/200?2"},
            {"name": "Sarah Rodriguez", "image": "https://picsum.photos/200?3"},
            {"name": "James Wilson", "image": "https://picsum.photos/200?4"}
          ],
          "reviews": [
            "A masterpiece that challenges the boundaries of imagination!",
            "Stunning visuals and powerful performances make this a must-see.",
            "An emotional rollercoaster that leaves you questioning reality.",
            "Brilliant storytelling that keeps you engaged throughout.",
            "A groundbreaking achievement in modern cinema."
          ]
        }
        `,
        data: title
      }),
    });

    const movieData = await response.json();
    
    // Generate poster URL using placeholder service
    movieData.poster = `https://picsum.photos/400/600?random=${Math.random()}`;
    
    return movieData;
  } catch (error) {
    console.error('Error generating movie data:', error);
    throw error;
  }
}
