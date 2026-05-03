import { ChannelDNA, First20Phase, ContentFormat, VideoCategory } from '@/types';

export function generateFirst20(dna: ChannelDNA): First20Phase[] {
  return [phase1(dna), phase2(dna), phase3(dna), phase4(dna)];
}

// Helpers that derive everything from Channel DNA
function n(dna: ChannelDNA) { return dna.niche?.split(/[&,]/)[0]?.trim() || 'Your Niche'; }
function aud(dna: ChannelDNA) { return dna.targetAudience?.split(/[,.]/)[0]?.trim() || 'your audience'; }
function tone(dna: ChannelDNA) { return dna.toneStyle?.toLowerCase().includes('casual') ? 'I' : 'We'; }
function fmt(dna: ChannelDNA) { return dna.formatFocus === 'shorts' ? ContentFormat.SHORT : ContentFormat.LONG_FORM; }

function phase1(dna: ChannelDNA): First20Phase {
  const niche = n(dna);
  const audience = aud(dna);

  return {
    name: 'Foundation',
    description: 'Establish your channel identity and capture early search traffic',
    videoRange: '1–5',
    color: '#E53935',
    videos: [
      {
        number: 1,
        idea: `Complete Beginner's Guide to ${niche}`,
        purpose: `Capture the broadest search query in ${niche}. This becomes your channel's front door for ${audience}.`,
        category: VideoCategory.EVERGREEN,
        format: fmt(dna),
        packagingAngle: `Use "Complete" and the current year in the title. Thumbnail should show the end result or transformation that ${audience} want.`,
        orderReason: `First video should be your most searchable topic. It tells YouTube your channel is about ${niche} and starts building your algorithmic identity.`,
      },
      {
        number: 2,
        idea: `Top 5 Mistakes New ${niche} People Make`,
        purpose: `List format that's easy to produce and ranks well. Positions you as knowledgeable about ${niche}.`,
        category: VideoCategory.EVERGREEN,
        format: fmt(dna),
        packagingAngle: 'Number in title + "mistakes" creates urgency. Thumbnail with X marks or warning signs.',
        orderReason: `Second video reinforces your ${niche} niche while being a different format. Mistake videos have natural curiosity hooks.`,
      },
      {
        number: 3,
        idea: `${niche} on a Budget — What You Actually Need`,
        purpose: `Budget angle captures a massive audience segment and differentiates you from bigger ${niche} channels.`,
        category: VideoCategory.EVERGREEN,
        format: fmt(dna),
        packagingAngle: 'Specific dollar amount in title if possible. "Actually" adds authenticity and honesty.',
        orderReason: 'Third video establishes your unique angle. Budget/practical content differentiates you from established creators.',
      },
      {
        number: 4,
        idea: `Quick ${niche} Tip That Changes Everything`,
        purpose: `First Short to test short-form discovery. Repurpose your best knowledge from videos 1-3.`,
        category: VideoCategory.EVERGREEN,
        format: ContentFormat.SHORT,
        packagingAngle: 'Hook in first 1 second. Deliver value in under 45 seconds. End with "follow for more."',
        orderReason: 'Shorts expand your discovery surface. Placing one early tests whether your niche works in short-form.',
      },
      {
        number: 5,
        idea: `${niche} Comparison — Is the Expensive Option Worth It?`,
        purpose: 'Comparison format creates natural viewer engagement and longer watch time.',
        category: VideoCategory.AUTHORITY,
        format: fmt(dna),
        packagingAngle: 'VS format in title and thumbnail. Split thumbnail with both options. Clear verdict promised.',
        orderReason: 'By video 5, you have a small library. A comparison video shows range and keeps viewers watching for the verdict.',
      },
    ],
  };
}

function phase2(dna: ChannelDNA): First20Phase {
  const niche = n(dna);
  const audience = aud(dna);

  return {
    name: 'Authority Building',
    description: 'Deepen expertise and start building repeat viewership',
    videoRange: '6–10',
    color: '#00B894',
    videos: [
      {
        number: 6,
        idea: `The Truth About ${niche} That Nobody Talks About`,
        purpose: `Opinion content that positions you as an honest voice in ${niche}. Drives comments and engagement.`,
        category: VideoCategory.AUTHORITY,
        format: fmt(dna),
        packagingAngle: '"The Truth About" is a proven curiosity hook. Thumbnail with your face showing skepticism or surprise.',
        orderReason: `After 5 foundational videos, it's time to show personality and take a stance. This builds audience connection.`,
      },
      {
        number: 7,
        idea: `${tone(dna)} Tested the Most Popular ${niche} Advice — Here's What Happened`,
        purpose: `Experiment format with built-in narrative arc. High breakout potential for ${audience}.`,
        category: VideoCategory.BREAKOUT,
        format: fmt(dna),
        packagingAngle: 'Personal experiment framing. "Here\'s What Happened" creates suspense and honest delivery.',
        orderReason: `Your first breakout swing. Experiment videos have the highest ceiling for small channels because they're inherently interesting.`,
      },
      {
        number: 8,
        idea: `How to Get Started with ${niche} — Step by Step`,
        purpose: `Detailed tutorial that captures long-tail search traffic and builds authority in ${niche}.`,
        category: VideoCategory.EVERGREEN,
        format: fmt(dna),
        packagingAngle: '"Step by Step" signals completeness. Thumbnail showing the process or end result.',
        orderReason: 'Balances the experimental video 7 with reliable evergreen content. Tutorials have the longest shelf life.',
      },
      {
        number: 9,
        idea: `3 Things ${tone(dna)} Wish ${tone(dna)} Knew Before Starting ${niche}`,
        purpose: `Personal experience content that builds trust with ${audience}. "Wish I knew" format is highly relatable.`,
        category: VideoCategory.AUTHORITY,
        format: fmt(dna),
        packagingAngle: 'Relatable framing. Number + personal angle. Thumbnail with thoughtful expression.',
        orderReason: 'By video 9, viewers are starting to recognize you. Personal experience content deepens that connection.',
      },
      {
        number: 10,
        idea: `${niche} Fact of the Day #1 — Did You Know This?`,
        purpose: 'Short-form series that drives consistent discovery and subscriber conversion.',
        category: VideoCategory.CONVERSION,
        format: ContentFormat.SHORT,
        packagingAngle: 'Series format (#1) encourages follows. Quick, punchy delivery with a surprising fact.',
        orderReason: 'Milestone video 10. A Short series creates a reason to subscribe and builds anticipation.',
      },
    ],
  };
}

function phase3(dna: ChannelDNA): First20Phase {
  const niche = n(dna);
  const audience = aud(dna);

  return {
    name: 'Breakout Swings',
    description: 'Take calculated risks with high-potential content',
    videoRange: '11–15',
    color: '#FDCB6E',
    videos: [
      {
        number: 11,
        idea: `This Cheap ${niche} Option Destroyed the Expensive One`,
        purpose: `Maximum curiosity gap. David vs Goliath narrative that ${audience} can't resist clicking.`,
        category: VideoCategory.BREAKOUT,
        format: fmt(dna),
        packagingAngle: '"Destroyed" is a power word. Show both options in thumbnail with shocked expression.',
        orderReason: `First major breakout attempt. You now have enough channel identity for YouTube to know who to show this to.`,
      },
      {
        number: 12,
        idea: `Ranking Every ${niche} Option — Best to Worst`,
        purpose: 'Ranking/tier list format drives massive engagement and comments. Viewers love to disagree.',
        category: VideoCategory.AUTHORITY,
        format: fmt(dna),
        packagingAngle: 'Tier list visual in thumbnail. Controversial placement drives comments and shares.',
        orderReason: 'Ranking videos generate the most comments of any format. Comments signal engagement to the algorithm.',
      },
      {
        number: 13,
        idea: `Why Everyone Is Wrong About ${niche}`,
        purpose: `Contrarian take that challenges conventional ${niche} wisdom. Drives debate and shares.`,
        category: VideoCategory.BREAKOUT,
        format: fmt(dna),
        packagingAngle: '"Everyone Is Wrong" is a strong hook. Back it up with evidence to maintain credibility.',
        orderReason: 'Second breakout swing with a different angle. Contrarian content gets shared because people want others to see the take.',
      },
      {
        number: 14,
        idea: `5 Underrated ${niche} Things Nobody Talks About`,
        purpose: `Underrated/hidden gem content positions you as someone who finds value in ${niche} that others miss.`,
        category: VideoCategory.EVERGREEN,
        format: fmt(dna),
        packagingAngle: '"Underrated" framing. Viewers feel like they\'re getting insider knowledge.',
        orderReason: 'After two breakout swings, return to reliable evergreen content that builds search traffic.',
      },
      {
        number: 15,
        idea: `The Most Surprising ${niche} Moment This Month`,
        purpose: 'Short that highlights your best moment from videos 11-14. Drives traffic to long-form.',
        category: VideoCategory.CONVERSION,
        format: ContentFormat.SHORT,
        packagingAngle: 'Most surprising 30 seconds from recent content. Hook immediately with the payoff.',
        orderReason: 'Strategic Short placement to convert new viewers from your breakout attempts into subscribers.',
      },
    ],
  };
}

function phase4(dna: ChannelDNA): First20Phase {
  const niche = n(dna);
  const audience = aud(dna);

  return {
    name: 'Subscriber Conversion',
    description: 'Convert viewers into loyal subscribers with series and community content',
    videoRange: '16–20',
    color: '#FD79A8',
    videos: [
      {
        number: 16,
        idea: `The Ultimate ${niche} Guide — Everything in One Video`,
        purpose: `Comprehensive pillar content that becomes your channel's flagship video for ${audience}.`,
        category: VideoCategory.EVERGREEN,
        format: fmt(dna),
        packagingAngle: '"Ultimate Guide" with current year. Longer format (15-20 min) signals depth and authority.',
        orderReason: 'At video 16, you have enough expertise and production quality to create a definitive resource.',
      },
      {
        number: 17,
        idea: `${tone(dna)} Asked My Subscribers What to Make Next — The Results`,
        purpose: `Community engagement content. Makes ${audience} feel valued and invested in your channel.`,
        category: VideoCategory.CONVERSION,
        format: fmt(dna),
        packagingAngle: 'Community-driven framing. Show poll results or comments in thumbnail.',
        orderReason: 'Community content at this stage strengthens the subscriber relationship and generates content ideas from your audience.',
      },
      {
        number: 18,
        idea: `The ${niche} Challenge — Part 1`,
        purpose: 'Start a series that gives viewers a reason to subscribe and come back for more.',
        category: VideoCategory.CONVERSION,
        format: fmt(dna),
        packagingAngle: 'Series branding with consistent thumbnail style. "Part 1" signals more to come.',
        orderReason: 'Series content is the strongest subscriber conversion tool. Viewers subscribe to not miss the next episode.',
      },
      {
        number: 19,
        idea: `The ${niche} Challenge — Part 2`,
        purpose: 'Continue the series. Returning viewers signal strong audience retention to YouTube.',
        category: VideoCategory.CONVERSION,
        format: fmt(dna),
        packagingAngle: "Maintain series branding. Tease what's different or escalated from Part 1.",
        orderReason: 'Back-to-back series uploads build momentum and train your audience to expect consistent content.',
      },
      {
        number: 20,
        idea: `What ${tone(dna)} Learned Making 20 ${niche} Videos — Honest Review`,
        purpose: `Reflective milestone content. Authentic, relatable, and positions you for the next phase of ${niche} content.`,
        category: VideoCategory.AUTHORITY,
        format: fmt(dna),
        packagingAngle: 'Honest, reflective tone. Show growth/analytics if comfortable. Builds trust with your audience.',
        orderReason: 'Video 20 is a natural milestone. Reflecting on the journey builds audience connection and sets up your next 20 videos.',
      },
    ],
  };
}
