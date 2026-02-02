export default async function handler(req, res) {
  try {
    const url =
      'https://www.reddit.com/r/FLMedicalTrees/new.json?limit=100';

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MoldWatch/1.0'
      }
    });

    if (!response.ok) {
      res.status(500).json({ error: 'Reddit blocked request' });
      return;
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
