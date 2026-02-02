export default async function handler(req, res) {
  const url =
    'https://www.reddit.com/r/FLMedicalTrees/new.json?limit=100';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MoldWatch/1.0'
      }
    });

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Reddit' });
  }
}
