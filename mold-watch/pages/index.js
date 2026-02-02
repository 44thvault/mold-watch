export default function Home() {
  return (
    <>
      <head>
        <title>MOLD WATCH</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body style={{ margin: 0, fontFamily: "'Courier Prime', monospace" }}>
        <div style={{ textAlign: 'center', padding: '30px', borderBottom: '4px solid #000' }}>
          <h1 style={{ fontSize: '48px', letterSpacing: '4px', margin: 0 }}>
            MOLD WATCH
          </h1>
        </div>

        <div id="content" style={{ maxWidth: '900px', margin: 'auto', padding: '30px 20px' }}>
          <div>Loading…</div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              async function loadPosts() {
                try {
                  const res = await fetch('/api/mold-watch');
                  const posts = await res.json();

                  document.getElementById('content').innerHTML =
                    posts.map(p => \`
                      <div style="border-bottom:1px solid #ccc;padding-bottom:20px;margin-bottom:20px;">
                        <a href="\${p.url}" target="_blank"
                          style="font-weight:700;color:#000;text-decoration:none;">
                          \${p.title}
                        </a>
                        <div style="font-size:12px;color:#666;font-style:italic;">
                          u/\${p.author} •
                          \${new Date(p.created).toLocaleDateString()}
                        </div>
                      </div>
                    \`).join('');
                } catch {
                  document.getElementById('content').innerHTML =
                    '<div>Error loading posts</div>';
                }
              }
              loadPosts();
            `
          }}
        />
      </body>
    </>
  );
}
