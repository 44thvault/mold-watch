import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/mold-watch');
        const data = await res.json();
        setPosts(data);
      } catch {
        setError(true);
      }
    }
    load();
  }, []);

  return (
    <>
      <Head>
        <title>MOLD WATCH</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={{ margin: 0, fontFamily: "'Courier Prime', monospace" }}>
        <div style={{ textAlign: 'center', padding: '30px', borderBottom: '4px solid #000' }}>
          <h1 style={{ fontSize: '48px', letterSpacing: '4px', margin: 0 }}>
            MOLD WATCH
          </h1>
        </div>

        <div style={{ maxWidth: '900px', margin: 'auto', padding: '30px 20px' }}>
          {error && <div style={{ color: 'red' }}>Failed to load posts</div>}
          {!error && posts.length === 0 && <div>Loading…</div>}
          {posts.map((p, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid #ccc',
                paddingBottom: '20px',
                marginBottom: '20px'
              }}
            >
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontWeight: 700,
                  color: '#000',
                  textDecoration: 'none'
                }}
              >
                {p.title}
              </a>
              <div style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                u/{p.author} • {new Date(p.created).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
