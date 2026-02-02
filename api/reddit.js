import Parser from 'rss-parser';

const parser = new Parser();

export default async function handler(req, res) {
  try {
    const feed = await parser.parseURL(
      'https://www.reddit.com/r/FLMedicalTrees/.rss'
    );

    res.status(200).json({
      items: feed.items || []
    });

  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch RSS'
    });
  }
}
