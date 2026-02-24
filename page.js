export default function Home() {
  return (
    <html lang="zh-CN">
      <head>
        <title>光体AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{
        fontFamily: "'Noto Serif SC', serif",
        background: 'linear-gradient(180deg, #0a0618 0%, #1a0f2e 50%, #0f0818 100%)',
        color: '#f8f8f8',
        minHeight: '100vh',
        margin: 0,
        padding: '30px'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <header style={{
            textAlign: 'center',
            padding: '60px 40px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '24px',
            marginBottom: '40px'
          }}>
            <h1 style={{
              fontSize: '3.5em',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #F4E4BC 0%, #D4AF37 50%, #B8941F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              ✦ 光体AI ✦
            </h1>
            <p style={{color: 'rgba(248,248,248,0.7)', marginTop: '15px', fontSize: '1.1em'}}>
              Kimi 2.5 驱动的高级内容生成系统
            </p>
          </header>

          <div style={{textAlign: 'center', margin: '40px 0'}}>
            <button 
              onClick={generateContent}
              style={{
                padding: '16px 40px',
                background: 'linear-gradient(135deg, #D4AF37, #B8941F)',
                color: '#0a0618',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1em',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ✨ 生成核心论文
            </button>
          </div>

          <div id="output" style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '16px',
            padding: '30px',
            minHeight: '300px',
            whiteSpace: 'pre-wrap',
            lineHeight: 2,
            fontSize: '1.1em'
          }}
003e
            点击上方按钮生成内容...
          </div>
        </div>

        <script dangerouslySetInnerHTML={{__html: `
          async function generateContent() {
            const output = document.getElementById('output');
            output.textContent = '⏳ Kimi 2.5 正在生成深度内容，请稍候...';
            
            try {
              const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({type: 'essay'})
              });
              
              const data = await response.json();
              
              if (data.success) {
                output.textContent = data.content;
              } else {
                output.textContent = '生成失败: ' + (data.message || '未知错误');
              }
            } catch (error) {
              output.textContent = '请求失败: ' + error.message;
            }
          }
        `}} />
      </body>
    </html>
  );
}