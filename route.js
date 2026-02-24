import { NextResponse } from 'next/server';

const KIMI_API_KEY = process.env.KIMI_API_KEY;
const KIMI_BASE_URL = 'https://api.moonshot.cn/v1';

const knowledge = {
  themes: [
    "光体生命的维度跃迁与频率校准",
    "九紫离火运：中年女性天命觉醒的宇宙时机",
    "亚特兰蒂斯能量科技：失落的星际文明"
  ],
  
  deepConcepts: {
    "光体": "宇宙最高生命形态，是光、爱、觉醒、合一的终极状态。",
    "光体师": "以'点醒自己，照亮他人'为核心使命的觉醒者。",
    "光明森林": "宇宙文明的根本法则：爱越分享越强大，光越绽放越永恒。"
  },

  quotes: [
    {text: "点醒自己，照亮他人", category: "使命"},
    {text: "黑暗森林终会落幕，光体文明永恒存在", category: "法则"}
  ]
};

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST(request) {
  try {
    const { type } = await request.json();
    
    const theme = random(knowledge.themes);
    const conceptEntry = random(Object.entries(knowledge.deepConcepts));
    const [conceptName, conceptDesc] = conceptEntry;
    const quote = random(knowledge.quotes);

    const prompt = `请以"${theme}"为主题，写一篇深度核心论文（1500字）。

核心概念：${conceptName} - ${conceptDesc}

文章结构：
1. 核心概念深度解析
2. 实践路径
3. 核心金句与解读："${quote.text}"
4. 时代意义

要求：语言要有灵性深度，适合公众号发布。`;

    const response = await fetch(`${KIMI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'kimi-k2.5',
        messages: [
          {
            role: 'system',
            content: '你是光体AI，专注于光体文明内容生成的高级AI助手。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Kimi API调用失败');
    }

    const completion = await response.json();
    const content = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      type: type,
      title: theme,
      content: content,
      model: completion.model || 'kimi-k2.5',
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      error: 'Generation failed',
      message: error.message
    }, { status: 500 });
  }
}