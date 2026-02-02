export const runtime = 'nodejs';

export default async function handler(req, res) {
  try {
    const keywords = [
      'mold',
      'mildew',
      'fungus',
      'fungal',
      'bud rot',
      'pm',
      'powdery mildew'
    ];

    const query = encodeURIComponent(keywords.join(' OR '));

    const url =
      `https://www.reddit.com/r/FLMedicalTrees/search.json` +
      `?q=${query}&restrict_sr=1&sort=new&limit=100`;

    const response = await fetch(url, {
      headers: { 'User-Agent': 'MoldWatch/1.0' }
    });

    const json = await response.json();
    const posts = json.data.children.map((p) => ({
      title: p.data.title,
      url: `https://reddit.com${p.data.permalink}`,
      author: p.data.author,
      created: p.data.created_utc * 1000
    }));

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'failed' });
  }
}
