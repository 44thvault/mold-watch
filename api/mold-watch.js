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
      headers: {
        'User-Agent': 'MoldWatch/1.0'
      }
    });

    const json = await response.json();

    const posts = json.data.children
      .map(p => p.data)
      .filter(p =>
        keywords.some(k =>
          (p.title + ' ' + p.selftext).toLowerCase().includes(k)
        )
      )
      .map(p => ({
        title: p.title,
        url: `https://reddit.com${p.permalink}`,
        author: p.author,
        created: p.created_utc * 1000
      }));

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json([]);
  }
}
