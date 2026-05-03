import { ChannelDNA, First20Phase, ContentFormat, VideoCategory } from '@/types';

export function generateFirst20(dna: ChannelDNA): First20Phase[] {
  return [phase1(dna), phase2(dna), phase3(dna), phase4(dna)];
}

function ns(dna: ChannelDNA) {
  const m: Record<string, string> = {
    'Tech Reviews & PC Building': 'PC Building',
    Gaming: 'Gaming',
    Cooking: 'Cooking',
  };
  return m[dna.niche] || dna.niche?.split('&')[0]?.trim() || 'Your Niche';
}

function phase1(dna: ChannelDNA): First20Phase {
  return {
    name: 'Foundation',
    description: 'Establish your channel identity and capture early search traffic',
    videoRange: '1–5',
    color: '#E53935',
    videos: [
      {
        number: 1,
        idea: `Complete Beginner's Guide to ${ns(dna)}`,
        purpose: "Capture the broadest search query in your niche. This becomes your channel's front door.",
        category: VideoCategory.EVERGREEN,
        format: ContentFormat.LONG_FORM,
        packagingAngle: 'Use "Complete" and current year in title. Thumbnail should show transformation or end result.',
        orderReason: 'First video should be your most searchable topic. It tells YouTube what your channel is about and starts building your algorithmic identity.',
      },
      {
        number: 2,
        idea: `Top 5 Mistakes New ${dna.targetAudience?.includes('budget') ? 'Budget Builders' : 'Beginners'} Make`,
        purpose: "List format that's easy to produce and ranks well. Positions you as knowledgeable.",
        category: VideoCategory.EVERGREEN,
        format: ContentFormat.LONG_FORM,
        packagingAngle: 'Number in title + "mistakes" creates urgency. Thumbnail with X marks or warning signs.',
        orderReason: 'Second video reinforces your niche while being a different format. Mistake videos have natural curiosity hooks.',
      },
      {
        number: 3,
        idea: `${ns(dna)} on a Budget — What You Actually Need`,
        purpose: 'Budget angle captures a massive audience segment and differentiates from bigger channels.',
        category: VideoCategory.EVERGREEN,
        format: ContentFormat.LONG_FORM,
        packagingAngle: 'Specific dollar amount in title if possible. "Actually" adds authenticity.',
        orderReason: 'Third video establishes your unique angle (budget-focused, honest, practical). This is your differentiator.',
      },
      {
        number: 4,
        idea: `Quick Tip: Speed Up Your PC in 60 Seconds`,
        purpose: 'First Short to test short-form discovery. Repurpose knowledge from video 1 or 2.',
        category: VideoCategory.EVERGREEN,
        format: ContentFormat.SHORT,
        packagingAngle: 'Hook in first 1 second. Deliver value in under 45 seconds. End with "follow for more."',
        orderReason: 'Shorts expand your discovery surface. Placing one early tests whether your niche works in short-form.',
      },
      {
        number: 5,
        idea: `$500 vs $1000 Gaming PC — Is Double the Price Worth It?`,
        purpose: 'Comparison format creates natural viewer engagement and longer watch time.',
        category: VideoCategory.AUTHORITY,
        format: ContentFormat.LONG_FORM,
        packagingAngle: 'VS format in title and thumbnail. Split thumbnail with both options. Clear verdict promised.',
        orderReason: 'By video 5, you have a small library. A comparison video shows range and keeps viewers watching for the verdict.',
      },
    ],
  };
}

function phase2(dna: ChannelDNA): First20Phase {
  return {
    name: 'Authority Building',
    description: 'Deepen expertise and start building repeat viewership',
    videoRange: '6–10',
    color: '#00B894',
    videos: [
      {
        number: 6,
        idea: 'The Truth About Pre-Built Gaming PCs',
        purpose: 'Opinion content that positions you as an honest voice. Drives comments and engagement.',
        category: VideoCategory.AUTHORITY,
        format: ContentFormat.LONG_FORM,
        packagingAngle: '"The Truth About" is a proven curiosity hook. Thumbnail with your face showing skepticism.',
        orderReason: "After 5 foundational videos, it's time to show personality and take a stance. This builds audience connection.",
      },
      {
        number: 7,
        idea: "I Tested the Cheapest Parts on Amazon for a Full Build — Here's What Happened",
        purpose: 'Experiment format with built-in narrative arc. High breakout potential.',
        category: VideoCategory.BREAKOUT,
        format: ContentFormat.LONG_FORM,
        packagingAngle: 'Personal experiment framing. "Here\'s What Happened" creates suspense.',
        orderReason: "Your first breakout swing. Experiment videos have the highest ceiling for small channels because they're inherently interesting.",
      },
      {
        number: 8,
        idea: 'How to Build Your First Gaming PC — Step by Step',
        purpose: 'Detailed tutorial that captures long-tail search traffic and builds authority.',
        category: VideoCategory.EVERGREEN,
        format: ContentFormat.LONG_FORM,
        packagingAngle: '"Step by Step" signals completeness. Thumbnail showing the process or end result.',
        orderReason: 'Balances the experimental video 7 with reliable evergreen content. Tutorials have the longest shelf life.',
      },
      {
        number: 9,
        idea: '3 Things I Wish I Knew Before Building My First PC',
        purpose: 'Personal experience content that builds trust. "Wish I knew" format is highly relatable.',
        category: VideoCategory.AUTHORITY,
        format: ContentFormat.LONG_FORM,
        packagingAngle: 'Relatable framing. Number + personal angle. Thumbnail with thoughtful expression.',
        orderReason: 'By video 9, viewers are starting to recognize you. Personal experience content deepens that connection.',
      },
      {
        number: 10,
        idea: 'Tech Fact of the Day #1 — Did You Know This About Your CPU?',
        purpose: 'Short-form series that drives consistent discovery and subscriber conversion.',
        category: VideoCategory.CONVERSION,
        format: ContentFormat.SHORT,
        packagingAngle: 'Series format ("Part 1") encourages follows. Quick, punchy delivery.',
        orderReason: 'Milestone video 10. A Short series creates a reason to subscribe and builds anticipation.',
      },
    ],
  };
}

function phase3(dna: ChannelDNA): First20Phase {
  return {
    name: 'Breakout Swings',
    description: 'Take calculated risks with high-potential content',
    videoRange: '11–15',
    color: '#FDCB6E',
    videos: [
      {
        number: 11,
        idea: 'This $30 Mouse Destroyed My Expensive One',
        purpose: "Maximum curiosity gap. David vs Goliath narrative that viewers can't resist clicking.",
        category: VideoCategory.BREAKOUT,
        format: ContentFormat.LONG_FORM,
        packagingAngle: '"Destroyed" is a power word. Show both items in thumbnail with shocked expression.',
        orderReason: "First major breakout attempt. You now have enough channel identity for YouTube to know who to show this to.",
      },
      {
        number: 12,
        idea: 'Ranking Every GPU Tier — Best to Worst for Gaming in 2026',
        purpose: 'Ranking/tier list format drives massive engagement and comments.',
        category: VideoCategory.AUTHORITY,
        format: ContentFormat.LONG_FORM,
        packagingAngle: 'Tier list visual in thumbnail. Controversial placement drives comments.',
        orderReason: 'Ranking videos generate the most comments of any format. Comments signal engagement to the algorithm.',
      },
      {
        number: 13,
        idea: 'Why Everyone Is Wrong About RAM Speed',
        purpose: 'Contrarian take that challenges conventional wisdom. Drives debate and shares.',
        category: VideoCategory.BREAKOUT,
        format: ContentFormat.LONG_FORM,
        packagingAngle: '"Everyone Is Wrong" is a strong hook. Back it up with evidence to maintain credibility.',
        orderReason: 'Second breakout swing with a different angle. Contrarian content gets shared because people want others to see the take.',
      },
      {
        number: 14,
        idea: '5 Underrated PC Components Nobody Talks About',
        purpose: 'Underrated/hidden gem content positions you as someone who finds value others miss.',
        category: VideoCategory.EVERGREEN,
        format: ContentFormat.LONG_FORM,
        packagingAngle: '"Underrated" framing. Viewers feel like they\'re getting insider knowledge.',
        orderReason: 'After two breakout swings, return to reliable evergreen content that builds search traffic.',
      },
      {
        number: 15,
        idea: 'The Moment This Budget Part Outperformed the Expensive One',
        purpose: 'Short that highlights your best moment from videos 11-14. Drives traffic to long-form.',
        category: VideoCategory.CONVERSION,
        format: ContentFormat.SHORT,
        packagingAngle: 'Most surprising 30 seconds from recent content. Hook immediately.',
        orderReason: 'Strategic Short placement to convert new viewers from your breakout attempts into subscribers.',
      },
    ],
  };
}

function phase4(dna: ChannelDNA): First20Phase {
  return {
    name: 'Subscriber Conversion',
    description: 'Convert viewers into loyal subscribers with series and community content',
    videoRange: '16–20',
    color: '#FD79A8',
    videos: [
      {
        number: 16,
        idea: `The Ultimate ${ns(dna)} Guide — Everything in One Video`,
        purpose: "Comprehensive pillar content that becomes your channel's flagship video.",
        category: VideoCategory.EVERGREEN,
        format: ContentFormat.LONG_FORM,
        packagingAngle: '"Ultimate Guide" with current year. Longer format (15-20 min) signals depth.',
        orderReason: 'At video 16, you have enough expertise and production quality to create a definitive resource.',
      },
      {
        number: 17,
        idea: 'I Asked My Subscribers What to Build Next — The Results',
        purpose: 'Community engagement content. Makes subscribers feel valued and invested.',
        category: VideoCategory.CONVERSION,
        format: ContentFormat.LONG_FORM,
        packagingAngle: 'Community-driven framing. Show poll results or comments in thumbnail.',
        orderReason: 'Community content at this stage strengthens the subscriber relationship and generates content ideas from your audience.',
      },
      {
        number: 18,
        idea: 'Building the Perfect Budget Setup From Scratch — Part 1',
        purpose: 'Start a series that gives viewers a reason to subscribe and come back.',
        category: VideoCategory.CONVERSION,
        format: ContentFormat.LONG_FORM,
        packagingAngle: 'Series branding with consistent thumbnail style. "Part 1" signals more to come.',
        orderReason: 'Series content is the strongest subscriber conversion tool. Viewers subscribe to not miss the next episode.',
      },
      {
        number: 19,
        idea: 'Building the Perfect Budget Setup From Scratch — Part 2',
        purpose: 'Continue the series. Returning viewers signal strong audience retention to YouTube.',
        category: VideoCategory.CONVERSION,
        format: ContentFormat.LONG_FORM,
        packagingAngle: "Maintain series branding. Tease what's different or escalated from Part 1.",
        orderReason: 'Back-to-back series uploads build momentum and train your audience to expect consistent content.',
      },
      {
        number: 20,
        idea: `What I Learned Making 20 Videos — Honest ${ns(dna)} Creator Review`,
        purpose: 'Reflective milestone content. Authentic, relatable, and positions you for the next phase.',
        category: VideoCategory.AUTHORITY,
        format: ContentFormat.LONG_FORM,
        packagingAngle: 'Honest, reflective tone. Show growth/analytics if comfortable. Builds trust.',
        orderReason: 'Video 20 is a natural milestone. Reflecting on the journey builds audience connection and sets up your next 20 videos.',
      },
    ],
  };
}
