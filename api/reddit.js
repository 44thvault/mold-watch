export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://www.reddit.com/r/FLMedicalTrees/new.json?limit=100',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/121.0 Safari/537.36'
        }
      }
    );

    if (!response.ok) {
      res.status(500).json({ error: 'Reddit response not OK' });
      return;
    }

    const json = await response.json();

    const posts = json.data.children
      .map(c => c.data)
      .filter(Boolean);

    // NEVER return empty — frontend can decide what to show
    res.status(200).json({ posts });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Reddit' });
  }
}
