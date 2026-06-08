// Types
export type Competition = {
  slug: string;
  title: string;
  date: string; // ISO "YYYY-MM-DD"
  time: string; // "09:00"
  venue: string;
  city: string;
  postcode: string;
  round: 'WA18' | 'Portsmouth' | 'WA70' | 'Club 252';
  bowstyles: Array<'Recurve' | 'Compound' | 'Barebow' | 'Longbow'>;
  /** Display-friendly level label */
  level: 'Beginner' | 'Novice' | 'Club' | 'County' | 'Open';
  indoorOutdoor: 'Indoor' | 'Outdoor';
  entryFee: number;
  spacesRemaining: number;
  totalSpaces: number;
  organiser: string;
  description: string;
  beginnerFriendly: boolean;
};

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  distance: string;
  targetFace: string;
  arrows: string;
  suitableFor: string[];
  content: string;
  beginnerTips: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export type ArcherLevel = {
  id: string;
  label: string;
  description: string;
  recommendations: string[];
};

// Mock competitions (15 events across UK, various rounds and levels)
export const competitions: Competition[] = [
  {
    slug: 'london-indoor-wa18-novice-open-nov-2026',
    title: 'London Indoor WA18 Novice Open',
    date: '2026-11-14',
    time: '09:00',
    venue: 'North London Archery Centre',
    city: 'London',
    postcode: 'N7 0EX',
    round: 'WA18',
    bowstyles: ['Recurve', 'Barebow', 'Compound'],
    level: 'Novice',
    indoorOutdoor: 'Indoor',
    entryFee: 18,
    spacesRemaining: 12,
    totalSpaces: 40,
    organiser: 'North London Archers',
    description:
      'A welcoming indoor 18m competition for archers taking their first steps into competitive shooting. Experienced volunteers on hand throughout the day to help with scoring and etiquette questions.',
    beginnerFriendly: true,
  },
  {
    slug: 'bristol-portsmouth-open-dec-2026',
    title: 'Bristol Portsmouth Open',
    date: '2026-12-05',
    time: '10:00',
    venue: 'Bristol Archery Club',
    city: 'Bristol',
    postcode: 'BS3 4RN',
    round: 'Portsmouth',
    bowstyles: ['Recurve', 'Compound', 'Barebow', 'Longbow'],
    level: 'Club',
    indoorOutdoor: 'Indoor',
    entryFee: 15,
    spacesRemaining: 24,
    totalSpaces: 60,
    organiser: 'Bristol Archers',
    description:
      'A classic Portsmouth round open to all bowstyles. A great club-level event with a friendly atmosphere. Suitable for archers who have shot a few competitions and want a relaxed day of scoring.',
    beginnerFriendly: false,
  },
  {
    slug: 'manchester-wa18-county-champs-jan-2027',
    title: 'Greater Manchester WA18 County Championship',
    date: '2027-01-16',
    time: '09:30',
    venue: 'Trafford Archery Club',
    city: 'Manchester',
    postcode: 'M16 0RA',
    round: 'WA18',
    bowstyles: ['Recurve', 'Compound'],
    level: 'County',
    indoorOutdoor: 'Indoor',
    entryFee: 22,
    spacesRemaining: 8,
    totalSpaces: 48,
    organiser: 'Greater Manchester Archery Association',
    description:
      'The annual county championship for Greater Manchester archers. Ranking round — scores count towards county and national classifications. Recurve and compound only.',
    beginnerFriendly: false,
  },
  {
    slug: 'edinburgh-beginner-friendly-wa18-dec-2026',
    title: 'Edinburgh Beginners WA18',
    date: '2026-12-12',
    time: '10:30',
    venue: 'Meadowbank Archery Hall',
    city: 'Edinburgh',
    postcode: 'EH7 6AD',
    round: 'WA18',
    bowstyles: ['Recurve', 'Barebow'],
    level: 'Beginner',
    indoorOutdoor: 'Indoor',
    entryFee: 12,
    spacesRemaining: 20,
    totalSpaces: 30,
    organiser: 'Edinburgh City Archers',
    description:
      'Designed specifically for first-time competitors. Briefing at the start covers scoring, safety, and what to expect. Mentors are paired with each group. No classification pressure — just enjoy your first event.',
    beginnerFriendly: true,
  },
  {
    slug: 'birmingham-portsmouth-open-nov-2026',
    title: 'Birmingham Indoor Portsmouth',
    date: '2026-11-28',
    time: '09:00',
    venue: 'Perry Barr Archery Centre',
    city: 'Birmingham',
    postcode: 'B42 1LR',
    round: 'Portsmouth',
    bowstyles: ['Recurve', 'Compound', 'Barebow', 'Longbow'],
    level: 'Open',
    indoorOutdoor: 'Indoor',
    entryFee: 16,
    spacesRemaining: 35,
    totalSpaces: 80,
    organiser: 'Birmingham Archery Club',
    description:
      "A large open Portsmouth shoot welcoming all levels and bowstyles. One of the region's most popular indoor events. Café on site, free parking.",
    beginnerFriendly: true,
  },
  {
    slug: 'cardiff-wa18-club-shoot-jan-2027',
    title: 'Cardiff WA18 Club Shoot',
    date: '2027-01-09',
    time: '10:00',
    venue: 'Cardiff Archers Hall',
    city: 'Cardiff',
    postcode: 'CF10 3AT',
    round: 'WA18',
    bowstyles: ['Recurve', 'Barebow'],
    level: 'Club',
    indoorOutdoor: 'Indoor',
    entryFee: 14,
    spacesRemaining: 18,
    totalSpaces: 36,
    organiser: 'Cardiff Archers',
    description:
      "Monthly club-level WA18 shoot at Cardiff Archers' new hall. Perfect for archers looking to set a score after their first season of training.",
    beginnerFriendly: false,
  },
  {
    slug: 'leeds-portsmouth-novice-feb-2027',
    title: 'Leeds Portsmouth Novice',
    date: '2027-02-06',
    time: '09:30',
    venue: 'Roundhay Archery Centre',
    city: 'Leeds',
    postcode: 'LS8 2HH',
    round: 'Portsmouth',
    bowstyles: ['Recurve', 'Barebow', 'Compound'],
    level: 'Novice',
    indoorOutdoor: 'Indoor',
    entryFee: 15,
    spacesRemaining: 16,
    totalSpaces: 40,
    organiser: 'Leeds Archers',
    description:
      "A well-run novice Portsmouth shoot in north Leeds. Experience-level categories ensure you're competing against archers at a similar stage. Ideal second or third competition.",
    beginnerFriendly: true,
  },
  {
    slug: 'nottingham-wa70-outdoor-open-may-2027',
    title: 'Nottingham WA70 Outdoor Open',
    date: '2027-05-15',
    time: '09:00',
    venue: 'Wollaton Park Archery Ground',
    city: 'Nottingham',
    postcode: 'NG8 2AE',
    round: 'WA70',
    bowstyles: ['Recurve'],
    level: 'Club',
    indoorOutdoor: 'Outdoor',
    entryFee: 20,
    spacesRemaining: 30,
    totalSpaces: 60,
    organiser: 'Nottingham Archery Club',
    description:
      'A beautiful outdoor WA70 at Wollaton Park. Recurve only. A great introduction to outdoor target archery on a stunning heritage site. Distances shot: 70m and 60m.',
    beginnerFriendly: false,
  },
  {
    slug: 'sheffield-club252-nov-2026',
    title: 'Sheffield Club 252',
    date: '2026-11-21',
    time: '11:00',
    venue: 'Sheffield Archery Club',
    city: 'Sheffield',
    postcode: 'S6 3NA',
    round: 'Club 252',
    bowstyles: ['Recurve', 'Barebow', 'Compound', 'Longbow'],
    level: 'Beginner',
    indoorOutdoor: 'Indoor',
    entryFee: 8,
    spacesRemaining: 22,
    totalSpaces: 30,
    organiser: 'Sheffield Archers',
    description:
      'The Club 252 is the most beginner-friendly competition format — shot at 20 yards on a 60cm face. Perfect for archers finishing a beginner course who want a taste of competition without pressure.',
    beginnerFriendly: true,
  },
  {
    slug: 'oxford-wa18-open-dec-2026',
    title: 'Oxford WA18 Open',
    date: '2026-12-19',
    time: '09:00',
    venue: 'Oxfordshire Archery Centre',
    city: 'Oxford',
    postcode: 'OX1 4AR',
    round: 'WA18',
    bowstyles: ['Recurve', 'Compound', 'Barebow'],
    level: 'Open',
    indoorOutdoor: 'Indoor',
    entryFee: 19,
    spacesRemaining: 6,
    totalSpaces: 48,
    organiser: 'Oxford University Archery Club',
    description:
      'A prestigious open WA18 hosted by OUAC. Open to all classifications. Popular with experienced club archers seeking a ranking score before the new year.',
    beginnerFriendly: false,
  },
  {
    slug: 'liverpool-portsmouth-open-jan-2027',
    title: 'Liverpool Portsmouth Open',
    date: '2027-01-23',
    time: '10:00',
    venue: 'Merseyside Archery Club',
    city: 'Liverpool',
    postcode: 'L3 8JA',
    round: 'Portsmouth',
    bowstyles: ['Recurve', 'Compound', 'Barebow', 'Longbow'],
    level: 'Open',
    indoorOutdoor: 'Indoor',
    entryFee: 17,
    spacesRemaining: 42,
    totalSpaces: 70,
    organiser: 'Merseyside Archers',
    description:
      "Liverpool's largest annual indoor competition. All levels and bowstyles welcome. A great day out with 70 spots available. Hot food available from the clubhouse kitchen.",
    beginnerFriendly: true,
  },
  {
    slug: 'brighton-portsmouth-novice-mar-2027',
    title: 'Brighton Portsmouth Novice Open',
    date: '2027-03-06',
    time: '10:00',
    venue: 'Sussex Archery Club',
    city: 'Brighton',
    postcode: 'BN1 5AA',
    round: 'Portsmouth',
    bowstyles: ['Recurve', 'Barebow'],
    level: 'Novice',
    indoorOutdoor: 'Indoor',
    entryFee: 14,
    spacesRemaining: 14,
    totalSpaces: 32,
    organiser: 'Sussex Archers',
    description:
      'A friendly novice Portsmouth on the south coast. Coached debrief at the end of the day helps archers understand their scores and plan their next steps.',
    beginnerFriendly: true,
  },
  {
    slug: 'newcastle-wa18-county-qualifier-feb-2027',
    title: 'Northumberland WA18 County Qualifier',
    date: '2027-02-20',
    time: '09:00',
    venue: 'Newcastle Archery Club',
    city: 'Newcastle',
    postcode: 'NE1 8QB',
    round: 'WA18',
    bowstyles: ['Recurve', 'Compound'],
    level: 'County',
    indoorOutdoor: 'Indoor',
    entryFee: 24,
    spacesRemaining: 4,
    totalSpaces: 40,
    organiser: 'Northumberland Archery Association',
    description:
      'County qualifier for the Northern Indoor Championships. Scores used for county team selection. Recurve and compound only. Archers must hold a current Archery GB record card.',
    beginnerFriendly: false,
  },
  {
    slug: 'cambridge-beginner-wa18-feb-2027',
    title: 'Cambridge Beginner WA18',
    date: '2027-02-13',
    time: '11:00',
    venue: 'Cambridge Archery Club',
    city: 'Cambridge',
    postcode: 'CB1 2JF',
    round: 'WA18',
    bowstyles: ['Recurve', 'Barebow'],
    level: 'Beginner',
    indoorOutdoor: 'Indoor',
    entryFee: 12,
    spacesRemaining: 18,
    totalSpaces: 28,
    organiser: 'Cambridge Archers',
    description:
      'A relaxed and supportive beginner WA18 for archers who have completed a beginner course in the last 12 months. Score sheets explained, scorers provided. No dress code requirements.',
    beginnerFriendly: true,
  },
  {
    slug: 'london-wa70-outdoor-club-open-jun-2027',
    title: 'London WA70 Summer Club Open',
    date: '2027-06-12',
    time: '09:00',
    venue: 'Lee Valley Archers Ground',
    city: 'London',
    postcode: 'E10 7QL',
    round: 'WA70',
    bowstyles: ['Recurve'],
    level: 'Club',
    indoorOutdoor: 'Outdoor',
    entryFee: 22,
    spacesRemaining: 28,
    totalSpaces: 50,
    organiser: 'Lee Valley Archers',
    description:
      "Summer outdoor WA70 at Lee Valley's excellent outdoor ground. Recurve only. Suitable for club archers transitioning from indoor to outdoor season. 70m and 60m distances.",
    beginnerFriendly: false,
  },
];

// Round guides
export const guides: Guide[] = [
  {
    slug: 'wa18',
    title: 'WA18 Indoor Round Guide',
    summary:
      'The WA18 is the most popular indoor archery competition format — shot at 18 metres on a 40cm target face. Suitable for all bowstyles and all levels from novice upwards.',
    distance: '18 metres',
    targetFace: '40cm (10-ring face)',
    arrows: '60 arrows (10 ends of 6)',
    suitableFor: ['Recurve', 'Compound', 'Barebow', 'Longbow'],
    content: `The WA18 (World Archery 18m) is the standard indoor competition round used at club, national and international level.

You shoot 60 arrows at 18 metres on a 40cm target face. The round is divided into 10 ends of 6 arrows each, giving you time to settle, adjust and improve your score throughout the day.

The 40cm face uses the standard 10-zone scoring system: 10 in the yellow centre, down to 1 for the outermost white ring. Most competitions run two rounds back-to-back for a total of 120 arrows.

Because it is shot indoors at a fixed distance, the WA18 is not affected by wind or weather — making scores very consistent and comparable between competitions. This is why it is the primary ranking round used for national classifications.

For beginners, the WA18 is ideal because the 18m distance is achievable with a light bow, the target face is relatively large, and the indoor environment is forgiving. Your first WA18 score becomes your baseline — you will see it improve quickly.`,
    beginnerTips: [
      'Arrive at least 30 minutes early to sign in, collect your scorecard and find your boss (target).',
      'You will shoot in a group of 3–4 archers. Take turns to go to the target and score together — always call your highest arrow first.',
      'A score of 400–500 out of 600 is a solid first result for a beginner. Do not compare yourself to experienced archers.',
      'Bring a pencil (not a pen) for scoring, a spare finger tab or glove, and water.',
      'If you are unsure about a score, call the judge before touching the arrow — arrows can be re-examined but not after they are pulled.',
      'Dress comfortably. There is no dress code at most club-level events.',
    ],
    faqs: [
      {
        question: 'What bow do I need for a WA18?',
        answer:
          'Any bow is welcome at most WA18 events — recurve, compound, barebow and longbow all shoot together but are scored separately. You just need to be able to reach 18m safely.',
      },
      {
        question: 'What is a good score for a first WA18?',
        answer:
          "For a beginner, any score is a great score. Many archers shoot 300–450 in their first competition. The national classification system starts at 'Archer' level (around 252 for recurve), so that is a common early target.",
      },
      {
        question: 'Do I need an Archery GB record card?',
        answer:
          'Most novice and club events do not require a record card. County and open ranking events usually do. Check the event details before entering.',
      },
      {
        question: 'How long does a WA18 take?',
        answer:
          'A single WA18 of 60 arrows takes approximately 2 to 2.5 hours including practice ends. A double (120 arrows) takes around 4 to 4.5 hours with a break.',
      },
    ],
  },
  {
    slug: 'portsmouth',
    title: 'Portsmouth Round Guide',
    summary:
      'The Portsmouth is a classic British indoor round — 60 arrows at 20 yards on a 60cm target face. One of the most popular formats for all levels, particularly known for being longbow and barebow friendly.',
    distance: '20 yards (18.29m)',
    targetFace: '60cm (5-zone or 10-zone face)',
    arrows: '60 arrows (10 ends of 6)',
    suitableFor: ['Recurve', 'Compound', 'Barebow', 'Longbow'],
    content: `The Portsmouth round is one of Britain's oldest and most beloved indoor archery formats. Shot at 20 yards (18.29 metres) on a 60cm target face, it is slightly longer and uses a larger face than the WA18 — making it particularly popular with longbow archers and those who prefer a bigger aiming point.

The 60cm face is available in both 5-zone (scoring 9, 7, 5, 3, 1) and 10-zone (1–10) configurations. Many clubs and competitions use the 10-zone face for more granular scoring, but some traditional events retain the 5-zone.

Because the Portsmouth is a British domestic round (not a World Archery standard), it appears at club nights and local competitions more frequently than anywhere else. It is an excellent second competition for anyone who has already shot a WA18.

Longbow and barebow archers particularly enjoy the Portsmouth because the 60cm face is easier to see clearly, and the slightly shorter distance reduces the gap between bow types. You will often see a wonderfully mixed field at a Portsmouth shoot.`,
    beginnerTips: [
      "The 60cm face is bigger than the WA18's 40cm — this usually means beginners score better on their first Portsmouth than their first WA18.",
      'Check which scoring system is being used (5-zone or 10-zone) before you arrive — it affects your scoring strategy.',
      'Longbow archers: you are very welcome at Portsmouth events, and you will have your own category.',
      'Warm up properly — 20 yards in an indoor hall can feel different to your usual outdoor practice.',
      'Focus on your routine, not your score. Consistency builds scores.',
    ],
    faqs: [
      {
        question: 'Is the Portsmouth harder than the WA18?',
        answer:
          'Not necessarily. The target is larger (60cm vs 40cm) but the distance is slightly longer (20 yards vs 18m). Most archers find them comparable in difficulty, though form archers often prefer the WA18 and traditional archers often prefer the Portsmouth.',
      },
      {
        question: 'Can I shoot the Portsmouth with a longbow?',
        answer:
          'Yes — the Portsmouth is one of the most longbow-friendly indoor rounds. Most events have a longbow category with its own results.',
      },
      {
        question: 'What is a good Portsmouth score?',
        answer:
          'On the 10-zone face, 400 out of 600 is a reasonable club-level score. 500+ is a strong performance. Top compound archers regularly score 580–600.',
      },
    ],
  },
  {
    slug: 'novice-competitions',
    title: "Your First Competition: A Beginner's Guide",
    summary:
      'Everything you need to know before entering your first archery competition — what to expect, what to bring, how scoring works, and how to choose the right event.',
    distance: 'Varies (18m–20 yards typical)',
    targetFace: '40cm or 60cm',
    arrows: '60 arrows typical',
    suitableFor: ['Recurve', 'Barebow', 'Longbow', 'Compound'],
    content: `Entering your first archery competition can feel daunting. The terminology, the etiquette, the scoring — it is a lot to take in. But here is the truth: everyone at a beginner or novice competition was once exactly where you are, and the archery community is remarkably welcoming.

This guide walks you through everything you need to know to make your first competition a positive experience.

**Choosing the right event**

Look for events labelled "beginner", "novice", or "beginner friendly". These events are designed for first-timers. Mentors and helpers are usually present, the atmosphere is relaxed, and nobody expects a high score from you.

Avoid county, ranking, and open events for your first outing — not because you are not welcome, but because the additional pressure makes it harder to enjoy the experience.

**On the day**

Arrive early. Registration desks often close before the advertised start time, and you will need time to settle in, collect your scorecard, and find your assigned target.

You will be placed on a "boss" (target stand) with two or three other archers. You will shoot together, walk to the target together, and score together. The scoring process involves calling each arrow's value aloud, agreeing with your fellow archers, and writing it down.

**The golden rule: never touch an arrow until it has been scored**

This is the most important etiquette rule. If there is any doubt about a score (arrow touching a line, or obscured by another arrow), call a judge. Once you pull an arrow, the score stands.`,
    beginnerTips: [
      "Enter a 'beginner' or 'novice' labelled event — not a county or open event — for your first competition.",
      'Bring: bow, arrows, finger tab/glove, arm guard, water, snacks, pencil, and a positive attitude.',
      'Arrive 30 minutes early so you are not rushing.',
      'Ask your fellow archers if you are unsure about anything — they will help.',
      'Your first score is just a baseline. It will improve. Focus on enjoying the day.',
      'Dress in comfortable layers — sports halls can be cold in winter.',
    ],
    faqs: [
      {
        question: 'Do I need to be a member of Archery GB to compete?',
        answer:
          'For most beginner and club-level events, no — or you may be covered by a day membership. County and open ranking events usually require full Archery GB membership. Check the event description.',
      },
      {
        question: 'What if I miss the target completely?',
        answer:
          'It happens — even to experienced archers. A miss (arrow not on the target face) scores zero (an M). Write M on your scorecard. Do not be embarrassed; move on.',
      },
      {
        question: 'How do I know what my score means?',
        answer:
          'Archery GB has a classification system starting at Archer, then moving up through Bowman, Junior Bowman, 3rd Class, 2nd Class, 1st Class, Élite. Your first competition score will tell you which classification you can claim.',
      },
      {
        question: 'Will I need to wear a uniform?',
        answer:
          'No uniform is required at beginner, novice, or most club events. County and national events may require club colours. Check the event details.',
      },
    ],
  },
  {
    slug: 'wa70',
    title: 'WA70 Outdoor Round Guide',
    summary:
      'The WA70 is the standard outdoor recurve round — 72 arrows at 70 metres on a 122cm target face. The Olympic distance, used at club, national and international level throughout the outdoor season.',
    distance: '70 metres (recurve) / 60 metres (women/juniors)',
    targetFace: '122cm (10-zone face)',
    arrows: '72 arrows (12 ends of 6)',
    suitableFor: ['Recurve'],
    content: `The WA70 (formerly known as the FITA Round) is the premier outdoor recurve competition format and the distance used at the Olympic Games. Shot at 70 metres on a 122cm target face, it is a demanding test of technique and consistency that rewards archers who can maintain their form over 72 arrows outdoors.

Unlike indoor rounds, the WA70 is heavily influenced by weather. Wind direction, gusts, and changing light conditions make outdoor archery a different challenge entirely. Learning to read the wind and adjust your aim accordingly is one of the great skills of outdoor target archery.

The 122cm face uses the standard 10-zone scoring system, with the innermost X ring used for tiebreaking at higher-level events.

The WA70 is typically shot as part of an outdoor season running from April to September in the UK. Most archers who shoot the WA70 will have shot at least one full indoor season first and will have a reasonable indoor classification score.

If you are new to outdoor archery, a Club 18m equivalent or shorter distances (WA50, WA30) are better starting points before attempting the full 70m distance.`,
    beginnerTips: [
      'Build up to 70m gradually — start with 30m or 50m outdoors before attempting the full WA70 distance.',
      'Invest in a good clicker and spend time getting your draw length consistent before shooting long distances.',
      'Check the weather forecast. Rain, strong winds, and bright sun all affect your score significantly.',
      'Bring sunscreen, a hat, and layers — outdoor sessions can last 4+ hours.',
      'A WA70 score of 500–580 out of 720 is a solid club-level result. World-class recurve archers score 680+.',
      'Sight-in at 70m well before your first competition — distances look very different outdoors.',
    ],
    faqs: [
      {
        question: 'Is the WA70 only for recurve?',
        answer:
          'Yes — the WA70 is the standard recurve outdoor round. Compound archers shoot WA1440 or dedicated compound rounds at different distances. Barebow and longbow archers typically shoot shorter distances outdoors.',
      },
      {
        question: 'What equipment do I need for the WA70?',
        answer:
          'A recurve bow capable of reaching 70m with reasonable grouping, long-rod and side-rod stabilisers, a clicker, and a sight. Most archers shooting WA70 will be using intermediate or advanced recurve equipment.',
      },
      {
        question: 'How long does a WA70 take?',
        answer:
          'A full WA70 of 72 arrows takes approximately 3 to 3.5 hours including practice ends. A double WA70 (144 arrows) takes a full day.',
      },
    ],
  },
];

// Archer experience levels (used by the LevelSelector component)
export const archerLevels: ArcherLevel[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'Finished a beginner course or shooting less than 6 months',
    recommendations: [
      'Start with a Club 252 or beginner-friendly WA18',
      "Look for events with 'beginner' or 'novice' in the title",
      'Avoid county and open events until you have 2–3 competitions under your belt',
      'Ask the organiser about mentoring support on the day',
    ],
  },
  {
    id: 'novice',
    label: 'Novice',
    description: 'Shot 1–3 competitions, shooting for 6–18 months',
    recommendations: [
      'Enter novice WA18 or Portsmouth events to build your score history',
      'Aim to claim your first Archery GB classification (Archer or Bowman)',
      'Try a mix of WA18 and Portsmouth to find your preferred format',
      'Consider a club-level event once you have a solid novice score',
    ],
  },
  {
    id: 'club',
    label: 'Club',
    description: 'Regular competitor, shooting for 1–3 years',
    recommendations: [
      'Enter club and open WA18 and Portsmouth events for classification improvement',
      'Start the outdoor season with a WA70 if shooting recurve',
      'Target 2nd or 1st Class classification in your bowstyle',
      'Look for county qualifier events in your region',
    ],
  },
  {
    id: 'county',
    label: 'County',
    description: 'County-level competitor or holding 1st Class+',
    recommendations: [
      'Focus on ranking rounds and county championship qualifiers',
      'Track your scores for national ranking purposes',
      'Consider regional and national-level open events',
      'Outdoor WA70 season should be your primary summer focus',
    ],
  },
];

// Helper functions

// Find a competition by its URL slug.
// Returns undefined if not found (page should call notFound()).
export function getCompetitionBySlug(slug: string): Competition | undefined {
  return competitions.find((c) => c.slug === slug);
}

// Find a guide by its URL slug.
// Returns undefined if not found (page should call notFound()).
export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

// Get competitions related to a given slug's round type,
// excluding the current competition itself.
export function getRelatedCompetitions(
  slug: string,
  round: Competition['round'],
  limit = 3,
): Competition[] {
  return competitions
    .filter((c) => c.slug !== slug && c.round === round)
    .slice(0, limit);
}
