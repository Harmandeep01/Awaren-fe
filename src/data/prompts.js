export const promptDirectory = [
// World / Society / Culture
{ text: "How is Gen Z reshaping work culture—and what does it mean for my career?", icon: "groups", category: "WORLD" },
{ text: "Are we actually more lonely than ever, or just more aware of it?", icon: "public", category: "WORLD" },
{ text: "Why does everything feel so expensive right now? Explain like I’m smart but tired.", icon: "trending_up", category: "ECONOMY" },
{ text: "Is hustle culture dying, or just rebranding itself?", icon: "work_off", category: "WORLD" },
{ text: "How has social media subtly changed how humans experience identity?", icon: "face", category: "CULTURE" },
// AI / Tech
{ text: "How will AI actually change my daily life in the next 2 years?", icon: "smart_toy", category: "TECH" },
{ text: "Should I be worried about AI replacing my job—or excited?", icon: "precision_manufacturing", category: "TECH" },
{ text: "Why does the internet feel more chaotic and angry lately?", icon: "wifi_off", category: "TECH" },
{ text: "Explain the rise of AI companions and digital relationships.", icon: "psychology", category: "TECH" },
{ text: "Is algorithm-driven content making me more anxious without me realizing it?", icon: "memory", category: "TECH" },
// Mental Health / Wellness
{ text: "Is modern life overstimulating my nervous system?", icon: "brain", category: "WELLNESS" },
{ text: "Why do so many people feel burnt out even when they’re not working nonstop?", icon: "battery_alert", category: "WELLNESS" },
{ text: "Are dopamine detoxes legit—or just another productivity myth?", icon: "bolt", category: "WELLNESS" },
{ text: "How has constant online comparison affected self-worth?", icon: "compare", category: "INSIGHT" },
{ text: "Is therapy culture helping us heal—or sometimes keeping us stuck?", icon: "healing", category: "DEEP" },
// Economy / Career
{ text: "Why does financial security feel harder to achieve than it used to?", icon: "account_balance", category: "ECONOMY" },
{ text: "Is the idea of a ‘dream job’ outdated?", icon: "badge", category: "CAREER" },
{ text: "Why are so many people quietly quitting—emotionally, not professionally?", icon: "logout", category: "CAREER" },
{ text: "How should I think about success in an unstable economy?", icon: "insights", category: "ECONOMY" },
{ text: "Are side hustles empowering—or just survival tactics?", icon: "construction", category: "CAREER" },
// Internet / Meme / Notorious
{ text: "Why does everything online feel ironic, unserious, and exhausted?", icon: "sentiment_dissatisfied", category: "MEME" },
{ text: "Explain modern nihilism using TikTok trends.", icon: "movie_filter", category: "MEME" },
{ text: "Why do we crave ‘soft life’ content but still overwork ourselves?", icon: "spa", category: "NOTORIOUS" },
{ text: "Roast modern self-optimization culture.", icon: "whatshot", category: "NOTORIOUS" },
{ text: "Is the ‘Main Character Era’ healthy or just aesthetic escapism?", icon: "theater_comedy", category: "MEME" },
// Climate / Future
{ text: "Why does climate anxiety feel so paralyzing?", icon: "eco", category: "WORLD" },
{ text: "How do people stay hopeful while facing global uncertainty?", icon: "wb_sunny", category: "DEEP" },
{ text: "Are we living through a major historical transition right now?", icon: "timeline", category: "WORLD" },
{ text: "Why does the future feel both exciting and terrifying?", icon: "travel_explore", category: "DEEP" },
{ text: "How should an individual think about meaning in unstable times?", icon: "self_reflection", category: "PHILOSOPHY" },
// Philosopy
{ text: "What does it actually mean to live a good life in modern times?", icon: "psychology_alt", category: "PHILOSOPHY" },
{ text: "Am I chasing happiness or just avoiding discomfort?", icon: "self_reflection", category: "PHILOSOPHY" },
{ text: "How do I find meaning when nothing feels permanent?", icon: "all_inclusive", category: "PHILOSOPHY" },
{ text: "Is freedom about having more choices—or fewer attachments?", icon: "open_in_new", category: "PHILOSOPHY" },
{ text: "Are my values truly mine, or inherited from culture?", icon: "account_tree", category: "PHILOSOPHY" },
// Star Wars Philosophy — THE FORCE
{ text: "Am I acting from fear or from alignment with my values?", icon: "flare", category: "THE FORCE" },
{ text: "What would balance look like in my life right now?", icon: "balance", category: "THE FORCE" },
{ text: "What attachments are pulling me toward the dark side?", icon: "link_off", category: "THE FORCE" },
{ text: "How do I trust my intuition without letting ego take over?", icon: "visibility", category: "THE FORCE" },
{ text: "What lesson is this current struggle trying to teach me?", icon: "auto_stories", category: "THE FORCE" },
{ text: "Am I resisting change because it threatens my identity?", icon: "sync_problem", category: "THE FORCE" },
{ text: "What would it mean to choose the harder—but wiser—path?", icon: "north", category: "THE FORCE" },

];

export const getRandomPrompts = (count = 2) => {
  const shuffled = [...promptDirectory].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};