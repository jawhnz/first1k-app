import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { niche, pillars } = await req.json();

    if (!niche) {
      return NextResponse.json({ error: 'Niche is required' }, { status: 400 });
    }

    // Build search queries based on the creator's niche and pillars
    const queries = [
      `${niche} YouTube trends 2026`,
      `${niche} content creator news latest`,
      ...(pillars?.slice(0, 2).map((p: string) => `${p} trends news 2026`) || []),
    ];

    // Fetch from multiple search queries in parallel
    const results = await Promise.allSettled(
      queries.map((q) => searchWeb(q))
    );

    const allArticles: WebResult[] = [];
    results.forEach((r) => {
      if (r.status === 'fulfilled' && r.value) {
        allArticles.push(...r.value);
      }
    });

    // Deduplicate by URL
    const seen = new Set<string>();
    const unique = allArticles.filter((a) => {
      if (seen.has(a.url)) return false;
      seen.add(a.url);
      return true;
    });

    // Convert to trend insights
    const trends = unique.slice(0, 6).map((article) => ({
      trend: article.title,
      impact: generateImpact(article, niche),
      recommendation: generateRecommendation(article, niche),
      source: article.url,
      date: article.date,
    }));

    return NextResponse.json({ trends });
  } catch (error) {
    console.error('Trend search error:', error);
    return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 });
  }
}

// ===== WEB SEARCH =====

interface WebResult {
  title: string;
  url: string;
  snippet: string;
  date?: string;
}

async function searchWeb(query: string): Promise<WebResult[]> {
  // Use DuckDuckGo's HTML search (no API key needed)
  try {
    const encoded = encodeURIComponent(query);
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encoded}`, {
      headers: {
        'User-Agent': 'First1K/1.0 (YouTube Strategy Engine)',
      },
    });

    if (!res.ok) return [];

    const html = await res.text();
    return parseDDGResults(html);
  } catch {
    return [];
  }
}

function parseDDGResults(html: string): WebResult[] {
  const results: WebResult[] = [];

  // Extract result blocks — DuckDuckGo HTML uses class="result__a" for links
  const linkRegex = /<a[^>]*class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  const snippetRegex = /<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/gi;

  const links: { url: string; title: string }[] = [];
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const url = decodeURIComponent(match[1].replace(/.*uddg=/, '').replace(/&.*/, ''));
    const title = match[2].replace(/<[^>]*>/g, '').trim();
    if (url.startsWith('http') && title) {
      links.push({ url, title });
    }
  }

  const snippets: string[] = [];
  while ((match = snippetRegex.exec(html)) !== null) {
    snippets.push(match[1].replace(/<[^>]*>/g, '').trim());
  }

  for (let i = 0; i < Math.min(links.length, 5); i++) {
    results.push({
      title: links[i].title,
      url: links[i].url,
      snippet: snippets[i] || '',
    });
  }

  return results;
}

// ===== INSIGHT GENERATION =====

function generateImpact(article: WebResult, niche: string): string {
  const snippet = (article.snippet || article.title).toLowerCase();

  if (/new|launch|release|update|announce/i.test(snippet)) {
    return `New developments in ${niche} create timely content opportunities. Early coverage captures search spikes.`;
  }
  if (/trend|growing|popular|viral|surge/i.test(snippet)) {
    return `Rising interest signals an opportunity to create content while competition is still low.`;
  }
  if (/change|shift|different|evolv/i.test(snippet)) {
    return `Shifts in the ${niche} space mean your audience needs updated guidance — position yourself as the go-to source.`;
  }
  if (/controversy|debate|opinion|disagree/i.test(snippet)) {
    return `Controversial topics drive high engagement. Taking a clear stance can differentiate your channel.`;
  }
  return `Relevant to your ${niche} audience. Covering this topic while it's current can boost discovery.`;
}

function generateRecommendation(article: WebResult, niche: string): string {
  const snippet = (article.snippet || article.title).toLowerCase();

  if (/new|launch|release|update/i.test(snippet)) {
    return `Create a "What This Means for ${niche}" reaction or analysis video within the next week to capture early search demand.`;
  }
  if (/trend|growing|popular/i.test(snippet)) {
    return `Make a video connecting this trend to your niche. Use the trend keyword in your title for search discovery.`;
  }
  if (/tip|trick|guide|how/i.test(snippet)) {
    return `Create your own take on this topic with a unique angle. Add "in 2026" to the title for freshness.`;
  }
  if (/best|top|rank|review/i.test(snippet)) {
    return `Create a response or alternative ranking video. Disagreeing with popular lists drives comments and engagement.`;
  }
  return `Consider creating a video that gives your unique ${niche} perspective on this topic. Frame it as "What ${niche} Creators Need to Know."`;
}
