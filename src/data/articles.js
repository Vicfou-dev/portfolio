export const articles = [
  {
    slug: 'voice-ai-production-lessons',
    title: 'Voice AI in Production: What 7 Years Building talkr.ai Taught Me',
    description: 'Real lessons from 7 years building and scaling a voice AI platform in production — context windows, latency, edge cases, and why most voice demos fail in the real world.',
    date: '2026-06-15',
    readTime: '8 min',
    tags: ['Voice AI', 'LLM', 'Production', 'talkr.ai'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>The Demo Problem</h2>
      <p>Voice AI demos are easy. You record a clean sentence, the LLM generates a perfect response, the TTS reads it back in 600ms. Impressive. The product demo kills it. Then you ship it.</p>
      <p>And then users start talking. They pause mid-sentence. They cough. They have accents. They ask three things at once. They say "uh" fourteen times. They stay silent for four seconds waiting for a response. They interrupt the agent mid-answer. The demo breaks within minutes.</p>
      <p>I've been building <a href="https://talkr.ai" target="_blank" rel="noopener">talkr.ai</a> for 7 years — a platform that lets developers ship voice agents that handle real conversations. Here's what I actually learned.</p>

      <h2>Latency is a Product Decision</h2>
      <p>The first time someone told me "your bot feels slow", I went looking for a faster STT model. Wrong instinct.</p>
      <p>Latency in voice AI isn't just about speed — it's about <em>perceived</em> speed. A 1.2s response that starts speaking confidently feels faster than an 800ms response with a hesitation filler. The gap between words says more than the gap before the first word.</p>
      <p>What actually moves the needle:</p>
      <ul>
        <li><strong>Streaming TTS</strong>: start generating audio while the LLM is still outputting tokens. First word latency drops from 1.2s to under 400ms.</li>
        <li><strong>Interrupt detection</strong>: if the user speaks while the agent is talking, stop immediately. Don't finish the sentence. Humans don't.</li>
        <li><strong>Filler acknowledgments</strong>: a low-latency "Got it" or "Sure" while the full response generates makes the system feel alive.</li>
      </ul>
      <p>We built all three into talkr.ai's core. They are not optional features. They are what separates a working voice agent from an annoying one.</p>

      <h2>Context Management at Scale</h2>
      <p>The conversation context is your biggest enemy at scale. A 30-minute customer service call generates ~20k tokens of history. You can't keep feeding the full transcript to the LLM — latency compounds, cost explodes, and you hit context limits mid-call.</p>
      <p>What we do: dynamic summarization. Every N turns, compress older turns into a dense summary and drop the raw transcripts. The agent doesn't "forget" — it works from structured memory, not raw conversation log. Combined with a tool-calling layer (to look up real-time data on demand), this handles arbitrarily long sessions without degradation.</p>

      <h2>The Edge Cases Are the Product</h2>
      <p>A voice agent that handles 90% of conversations gracefully isn't a product — it's a liability. The 10% that break it are the cases your most important users will hit.</p>
      <p>Edge cases I've shipped solutions for: background noise triggering false starts; bilingual users switching languages mid-conversation; dates, phone numbers and amounts with regional formats; customers angry enough to be irrational; silence-as-response (confused, not absent). Each one required deliberate design.</p>
      <p>Build a test suite of adversarial conversations before you ship. Play them in front of a real team. The failures you catch there are the ones that cost you users in production.</p>

      <h2>Why Agents Are Different From Chatbots</h2>
      <p>A chatbot answers questions. An agent does things. The difference matters architecturally: an agent needs tools, memory, and state. It needs to know when to escalate to a human. It needs to be interruptible at any point without corrupting state.</p>
      <p>With LLMs getting better at instruction following, the bottleneck has shifted from "can the model understand intent" to "can the infrastructure handle the side effects reliably." The model is mostly solved. The plumbing is where you earn your edge.</p>

      <h2>What's Coming</h2>
      <p>The next shift isn't better models — it's persistent agents. Voice agents that remember your last 10 calls, that track open items across sessions, that proactively call you back when something changes. We're building toward that at talkr.ai. The infrastructure primitives (streaming, tool use, memory) are all there. The product design is the hard part now.</p>
    `,
  },

  {
    slug: 'vibe-coding-what-actually-works',
    title: 'Vibe Coding Is Real — Here\'s What Actually Works (and What Doesn\'t)',
    description: 'I\'ve been building production products with AI coding tools for over a year. Here\'s the honest breakdown of what vibe coding changes, what it doesn\'t, and how I actually use it.',
    date: '2026-05-28',
    readTime: '7 min',
    tags: ['Vibe Coding', 'AI Tools', 'Product Engineering', 'Productivity'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>What Vibe Coding Actually Is</h2>
      <p>The term is polarizing but the phenomenon is real: using an LLM as your primary coding interface — describing what you want, reviewing what comes out, iterating — rather than writing every line yourself.</p>
      <p>I've been doing this seriously since early 2025 across multiple products: <a href="https://manju.pro" target="_blank" rel="noopener">manju</a> (AI image translation), <a href="https://talkr.ai" target="_blank" rel="noopener">talkr.ai</a> features, this portfolio, and internal tooling. The results are uneven — but the productivity ceiling is genuinely different from what I've seen before.</p>

      <h2>What It's Actually Good At</h2>
      <p><strong>Scaffolding and boilerplate</strong>: generating auth flows, CRUD APIs, component structures. Things where the pattern is known and the main cost was typing. This is where vibe coding pays back immediately.</p>
      <p><strong>Exploring unfamiliar territory</strong>: I needed to build a custom OCR pipeline for manju. I've never done computer vision at this level. With Claude walking me through the options, evaluating libraries, and generating initial implementations to test — I shipped a working prototype in two days instead of two weeks of reading docs.</p>
      <p><strong>Refactoring and documentation</strong>: "here's this 400-line function, extract the business logic, add types, explain what it does." Tasks that are important but painful to do manually. The LLM is tireless here.</p>

      <h2>What It's Bad At</h2>
      <p><strong>Knowing when to stop</strong>: LLMs over-engineer. They'll add abstractions, error handlers, and configuration options you don't need. You have to actively prune. The output of vibe coding is always too complex by default — your job is to simplify it.</p>
      <p><strong>System-level reasoning</strong>: "is this architecture right for my scale?" is a question where LLMs give you plausible-sounding answers that might be completely wrong for your context. I've had Claude confidently suggest a Redis strategy that would have been a disaster at yomimanga's traffic levels. You need to think critically about architecture yourself.</p>
      <p><strong>Novel bugs</strong>: when something is wrong in a way the LLM hasn't seen before, it starts hallucinating fixes. You can waste hours on a loop of suggested changes that don't address the actual root cause. Learn to recognize when to step out of AI-assisted mode and debug manually.</p>

      <h2>My Actual Workflow</h2>
      <p>I don't "vibe code" in the sense of hands-off generation. I treat the LLM as a very fast junior engineer: it writes first drafts, I review and direct, it revises. The feedback loop is tight.</p>
      <p>The shift in how I allocate my time is real though. I spend far less time writing code and far more time:</p>
      <ul>
        <li>Designing system behavior (what should happen, under what conditions)</li>
        <li>Reviewing and testing output (does it actually do what I said)</li>
        <li>Making architecture decisions (which the LLM can't make for me)</li>
        <li>Talking to users (the thing that actually determines what to build)</li>
      </ul>
      <p>This is the real shift. Vibe coding doesn't remove engineering judgment — it amplifies it. You need to be a better engineer to use it well, not a worse one.</p>

      <h2>The Compounding Effect</h2>
      <p>The part that's hard to communicate until you've experienced it: the speed at which you can test ideas. A new feature that used to take a week to prototype takes a day. That extra time goes back into talking to users and shipping more iterations. The feedback loop that was already compressed gets compressed again.</p>
      <p>For solo founders, this is the biggest unlock. I'm building at a pace that used to require a team. Not because the AI writes perfect code — it doesn't — but because the total cycle time from idea to testable implementation is radically shorter.</p>
    `,
  },

  {
    slug: 'scaling-solo-5m-daily-requests',
    title: 'How I Handle 5M+ Daily Requests on a Solo-Built Platform',
    description: 'The actual architecture behind yomimanga — how a solo founder built and scaled a manga platform to 5M+ daily requests without a devops team, and the decisions that made it possible.',
    date: '2026-04-10',
    readTime: '9 min',
    tags: ['Architecture', 'PHP', 'Redis', 'Scaling', 'Solo Founder'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>The Context</h2>
      <p><a href="https://yomimanga.com" target="_blank" rel="noopener">yomimanga</a> is a manga reading platform I built and run solo. At peak, it handles over 5 million requests per day. It doesn't have a devops team. It doesn't have a team at all.</p>
      <p>This is not a flex — it's a constraint that forced every architectural decision toward simplicity and reliability. Here's what I actually built and why.</p>

      <h2>Why PHP (and Why I Don't Apologize for It)</h2>
      <p>The internet runs on PHP. 77% of websites with a known server-side language use it. The ecosystem is mature, battle-tested, and optimized for exactly the kind of request-response workload that a content platform runs.</p>
      <p>For yomimanga's use case — reading manga chapters, user authentication, reading history, search — PHP with opcache is genuinely fast. A request that hits cache serves in under 5ms. The "PHP is slow" take comes from people who've never profiled it properly.</p>
      <p>The real reasons I stayed with PHP: I know it deeply, the deployment story is simple, and there are no mysteries. When something breaks at 3am with 5M daily users, you want a technology you understand completely, not one that's interesting.</p>

      <h2>The Cache Layer Is the Product</h2>
      <p>At this scale, your database is not your performance story. Redis is.</p>
      <p>Every chapter list, every metadata response, every user reading position gets a cache key. TTLs are tuned per data type — frequently-updated content gets 60 seconds, static chapter data gets 24 hours. On a normal day, cache hit rate is above 94%. The database sees a fraction of the actual traffic.</p>
      <p>The implementation detail that matters: cache warming. When a new chapter is uploaded, I proactively warm the cache rather than waiting for the first user to hit a cold request. At 5M requests/day, "the first user takes a cold hit" means thousands of users hit cold requests simultaneously after a popular update. Warm the cache at upload time.</p>

      <h2>CDN as the First Defense</h2>
      <p>Images are the majority of bytes served by any manga platform. I do not serve images from my origin. Every image goes through CDN — cached globally, served from the edge nearest to the user.</p>
      <p>This alone eliminates 80%+ of the data transfer load on origin servers. The bandwidth costs are predictable, the latency for users in Asia/Europe is consistent, and origin never sees an image request twice for the same file.</p>

      <h2>Database Design for Read-Heavy Workloads</h2>
      <p>Manga is fundamentally read-heavy. 95%+ of requests are reads. This shapes every schema and indexing decision.</p>
      <p>My rules: every query that runs more than once a minute has a covering index. Read replicas for anything that doesn't need fresh data. Denormalize aggressively — a chapter list view stores pre-computed metadata rather than joining at query time. Storage is cheap; query time is not.</p>
      <p>The query that most surprises people: reading history. You'd think "insert a row when a user reads a chapter" is trivial. At 5M daily requests, that's thousands of writes per minute. I batch reading history writes with a queue — a background worker flushes to MySQL in bulk every few seconds rather than synchronously on each request.</p>

      <h2>Monitoring Without a Team</h2>
      <p>I have no team to wake up when something breaks, so the monitoring has to wake me up directly — and only when it matters. My alerting philosophy:</p>
      <ul>
        <li>Alert on user-visible errors, not internal metrics</li>
        <li>Error rate above 1% for more than 2 minutes: wake me up</li>
        <li>Response time p99 above 500ms for more than 5 minutes: wake me up</li>
        <li>Everything else: log it, I'll look at it in the morning</li>
      </ul>
      <p>Most monitoring setups alert on too many things. Alert fatigue means you start ignoring alerts. Two alerts that matter are worth more than twenty that might.</p>

      <h2>What I'd Do Differently</h2>
      <p>The biggest mistake was not investing in observability earlier. For the first year, I was flying blind — I knew <em>that</em> something was slow but not <em>where</em>. Adding proper query-level timing and request tracing early would have saved dozens of hours of debugging.</p>
      <p>The thing I'm glad I didn't do: Kubernetes. I see founders reach for container orchestration at 100k requests/day. At 5M requests/day with a disciplined cache strategy and a good CDN, you don't need it. Simple deployments, well-understood infrastructure, and cache-first design will take you further than complex orchestration with less operational overhead.</p>
    `,
  },

  {
    slug: 'mcp-ai-agents-revolution',
    title: 'MCP: Why the Model Context Protocol Is the Biggest Shift in AI Development',
    description: 'MCP (Model Context Protocol) quietly changed how AI agents are built. Here\'s what it is, why it matters more than most people realize, and how it changes the way I build AI products.',
    date: '2026-03-20',
    readTime: '6 min',
    tags: ['MCP', 'AI Agents', 'LLM', 'Developer Tools'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>The Problem MCP Solves</h2>
      <p>Before MCP, integrating an LLM with external tools was bespoke glue code. You'd write a custom integration for your database, another for your API, another for your search index. Every time you switched models — from GPT-4 to Claude, or from Claude 3 to Claude 4 — you might have to rewrite the integration layer.</p>
      <p>The Model Context Protocol is Anthropic's answer to this fragmentation: a standardized protocol that defines how AI models connect to external systems. An MCP server exposes tools, resources, and prompts over a standard interface. Any MCP-compatible client (Claude Desktop, an API integration, a custom agent) can use those capabilities without custom integration code.</p>

      <h2>Why This Matters More Than the Hype Suggests</h2>
      <p>The mainstream coverage of MCP focuses on "Claude can now browse the web" or "Claude can read your files." That's the surface level. The deeper implication is architectural.</p>
      <p>MCP makes AI capabilities composable. You build a tool once as an MCP server; any AI system that speaks MCP can use it. Instead of building AI integrations for each product you ship, you build a library of MCP servers that snap together. The investment in one integration pays dividends across every future product.</p>
      <p>For a solo founder building multiple AI products — which is my situation — this is transformative. The voice capabilities I built for <a href="https://talkr.ai" target="_blank" rel="noopener">talkr.ai</a>'s agent system, the image processing tools I built for <a href="https://manju.pro" target="_blank" rel="noopener">manju</a>: these can be exposed as MCP servers and reused across future products. The knowledge doesn't stay siloed in one codebase.</p>

      <h2>What Good MCP Design Looks Like</h2>
      <p>The protocol doesn't constrain bad design — you can build terrible MCP servers. The things that make an MCP server good:</p>
      <ul>
        <li><strong>Tool granularity</strong>: one tool, one responsibility. "get_user_reading_history" beats "manage_user_data" every time. LLMs choose tools better when the names and descriptions are precise.</li>
        <li><strong>Rich descriptions</strong>: the tool description <em>is</em> the documentation. Write it for the model, not for humans. Include when to use it, what it returns, and what failure modes look like.</li>
        <li><strong>Deterministic outputs</strong>: tools should be pure functions where possible. Side-effectful tools (send an email, write to database) should be clearly labeled and idempotent where feasible.</li>
        <li><strong>Graceful errors</strong>: when a tool fails, return structured error information the model can reason about, not just an exception trace.</li>
      </ul>

      <h2>The Ecosystem Is Moving Fast</h2>
      <p>The MCP ecosystem has exploded in 2025-2026. There are now MCP servers for every major SaaS product, every major database, every major API. The investment case for building with MCP is getting stronger: you're building on an increasingly standard foundation, not a proprietary one.</p>
      <p>What I'm watching: MCP for streaming / real-time data. The current protocol handles request-response well. The next evolution is persistent connections and streaming events — which becomes critical for voice AI, real-time monitoring agents, and long-running workflows. This is where the interesting engineering is happening right now.</p>

      <h2>Where to Start</h2>
      <p>If you're building AI products and haven't explored MCP yet, start by reading the spec (it's short) and building one server for something you already have: your product's database, your CRM, your internal tools. The lightbulb moment comes when you realize the agent you built for one use case can use a completely different tool set tomorrow — without you changing a line of agent code.</p>
      <p>That's the compounding effect of standardization. And it's why MCP is less of a feature and more of a platform shift.</p>
    `,
  },

  {
    slug: 'product-engineering-2026',
    title: 'Product Engineering in 2026: The Case for Building Alone (and Building More)',
    description: 'The solo founder / product engineer model has fundamentally changed. AI tools, global infrastructure, and distribution channels mean one person can do what a team of ten did in 2020. Here\'s what that looks like in practice.',
    date: '2026-02-14',
    readTime: '7 min',
    tags: ['Product Engineering', 'Solo Founder', 'AI Tools', 'Indie Hacking'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>The Shift That Happened Quietly</h2>
      <p>In 2020, a solo founder could realistically own a small SaaS with a few thousand users. In 2026, a solo founder can own a platform serving millions. Not because the work got easier — it didn't — but because the leverage available to a single skilled person changed dramatically.</p>
      <p>I run five live products: <a href="https://talkr.ai" target="_blank" rel="noopener">talkr.ai</a>, <a href="https://yomimanga.com" target="_blank" rel="noopener">yomimanga</a>, <a href="https://manju.pro" target="_blank" rel="noopener">manju</a>, <a href="https://syopus.com" target="_blank" rel="noopener">opus</a>, and <a href="https://www.powerx.one" target="_blank" rel="noopener">powerx</a>. None of them have teams. All of them are in production and growing. Here's how that's possible.</p>

      <h2>The Product Engineer Mindset</h2>
      <p>"Product engineer" has become a job title. I've been doing it as a way of working. The distinction: a product engineer doesn't separate "what to build" from "how to build it." They own the problem end-to-end — from user insight to shipped code to measured outcome.</p>
      <p>This isn't a new concept, but the tools to execute on it have finally caught up. The gap between a vision and a working implementation has collapsed. Which means the thing that used to block solo founders — "I can design it but I can't build it fast enough" or "I can build it but I can't design it" — matters less. You move fast across the full stack.</p>

      <h2>What AI Gives You (and What It Doesn't)</h2>
      <p>AI coding tools gave me back ~30% of my engineering time. That time goes back into product thinking and user conversations — the parts that require a human. The net effect isn't "I work less," it's "I ship more before running out of steam."</p>
      <p>What AI doesn't give you: taste, judgment, and user empathy. The reason most vibe-coded products feel hollow is that the builder didn't have a point of view on what they were building. AI can execute your vision with unprecedented speed. It cannot generate the vision.</p>
      <p>The formula that works: strong point of view on what to build (earned through user conversations and domain depth) × AI-accelerated execution = products that are both right and fast. Either without the other is insufficient.</p>

      <h2>Global Infrastructure as a Force Multiplier</h2>
      <p>Deploying globally used to mean: devops team, multi-region setup, complex routing configuration, five-digit infrastructure bills. In 2026, Cloudflare Workers lets me deploy to 300+ locations worldwide with a single command. CDN, edge compute, and global caching are commoditized.</p>
      <p>This matters for products like yomimanga where 60% of users are in Asia. Serving them from a US data center would mean 200ms+ latency on every request. Serving from edge locations means 30-50ms. The product just feels faster — which is a competitive advantage a solo founder now has access to at near-zero marginal cost.</p>

      <h2>The Discipline of Scope</h2>
      <p>The bottleneck for a solo founder isn't hours or capability — it's focus. Five products sounds like scattered energy. It's the opposite when you structure it right: each product has a clear owner (me), a clear user, and a clear success metric. Context switching is real, but scope discipline prevents it from being fatal.</p>
      <p>My rule: a product gets attention proportional to its growth. Products that aren't growing don't get feature work — they get maintenance. This sounds cold but it's what keeps everything moving. Resource allocation based on momentum, not attachment.</p>

      <h2>What This Means for Hiring</h2>
      <p>I get asked regularly "when will you hire?" My honest answer: when I find something I can't do better solo. Distribution is the current bottleneck — not engineering, not product, not design. The first hire, when it happens, will be a growth-focused person who multiplies reach, not an engineer who duplicates capability.</p>
      <p>The talent bar for that first hire is consequently very high. They need to understand product deeply enough to prioritize intelligently, and they need to own distribution end-to-end. That person is rare. Until I find them, I'll keep building.</p>
    `,
  },

  {
    slug: 'react-native-performance-optimization',
    title: 'React Native Performance at Scale: How I Got opus to 60fps on Low-End Devices',
    description: 'The concrete optimizations that took opus from janky to silky-smooth on sub-$200 Android devices — FlatList tuning, JS thread management, Hermes, and the things that actually move the needle.',
    date: '2026-07-08',
    readTime: '9 min',
    tags: ['React Native', 'Mobile', 'Performance', 'Android'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>The Problem With "Good Enough on Flagship"</h2>
      <p>When you test a React Native app on a recent iPhone or a Pixel flagship, it feels fast. Frames drop below 60fps occasionally, but it's acceptable. You ship. Then the reviews come in from users on Android devices with 3GB of RAM and a MediaTek chip — and they describe a completely different product: slow scrolling, input lag, animations that stutter or skip entirely.</p>
      <p>This is the React Native performance trap. Building <a href="https://syopus.com" target="_blank" rel="noopener">opus</a> — a swipe-based job discovery app — I needed buttery 60fps card animations on the widest possible device range. Here's the systematic approach that got us there.</p>

      <h2>Understand the Thread Model First</h2>
      <p>Most React Native performance issues trace back to one misunderstanding: the JavaScript thread and the UI thread are separate, and anything that blocks JS will stall your UI even if the UI thread itself is idle.</p>
      <p>The JS thread runs your React logic, state updates, and event handlers. The UI thread renders. They communicate via a bridge (or, with the New Architecture, via JSI — more on that later). When the JS thread is busy — parsing JSON, running reducers, computing derived state — it can't respond to gesture events. The UI freezes.</p>
      <p>Rule one: profile with the JS thread load visible. <code>react-native-performance</code> and Flipper's performance plugin both surface JS thread CPU time. If JS is above 50% during a scroll, that's your bottleneck — not the list, not the renderer.</p>

      <h2>FlatList: The Default Settings Are Wrong</h2>
      <p>React Native's <code>FlatList</code> renders a windowed subset of your list. The default window size (<code>windowSize=21</code>) renders 10 viewports above and below the current position. On a device with 3GB of RAM serving a card list with images, that's too many mounted components.</p>
      <p>The settings that worked for opus's job card feed:</p>
      <ul>
        <li><code>windowSize={5}</code> — render 2 viewports up/down. Fewer mounted nodes, less memory pressure.</li>
        <li><code>maxToRenderPerBatch={3}</code> — render fewer items per batch on initial load. Smoother first paint.</li>
        <li><code>updateCellsBatchingPeriod={50}</code> — batch updates to every 50ms instead of default 50ms (tune for your content).</li>
        <li><code>removeClippedSubviews={true}</code> — detach off-screen components from the native view hierarchy on Android.</li>
        <li><code>getItemLayout</code> — if your items have fixed height, always provide this. Skips measurement entirely.</li>
      </ul>
      <p>The cumulative effect: JS memory usage dropped by ~35%, and scroll frame time on a Redmi 9 (our worst-case test device) went from 28ms average to 17ms.</p>

      <h2>Animations: Move Everything Off JS Thread</h2>
      <p>The swipe gesture on job cards is opus's core interaction. It had to feel like Tinder — native-grade responsiveness. Implementing it with standard Animated + gesture handler on the JS thread gave us 45fps on low-end Android during rapid swiping. Not acceptable.</p>
      <p>The fix: <code>react-native-reanimated</code> with worklets. Reanimated v3 runs animation logic directly on the UI thread via JSI, with zero bridge communication. The gesture response is indistinguishable from a native app because it literally runs natively.</p>
      <p>The migration requires rewriting animation logic as worklets (functions marked <code>'worklet'</code> that run on the UI thread). It's more verbose than Animated, but the performance difference on low-end devices is night and day. For any animation that responds to gesture input — swipes, drags, pan — Reanimated worklets are non-negotiable.</p>

      <h2>Images: The Silent Frame Killer</h2>
      <p>Company logos and profile images in a job card. Simple enough. Except on Android, RN's default image component decodes images on the JS thread for images above a size threshold. Scroll fast enough and you'll see frames drop exactly when new images enter the viewport.</p>
      <p>Solution: <code>react-native-fast-image</code> (or the built-in <code>Image</code> with <code>cache="force-cache"</code> on newer RN versions). Fast-image uses Glide on Android and SDWebImage on iOS — both of which handle decode off the main thread, progressive loading, and disk caching correctly. The image-related frame drops disappeared entirely after the switch.</p>

      <h2>Hermes + the New Architecture</h2>
      <p>Hermes is the JavaScript engine optimized for React Native — pre-compiling JS to bytecode at build time. On a Redmi 9, enabling Hermes reduced our time-to-interactive from 4.2s to 2.6s. It's been the default since RN 0.70 but older projects may have it disabled. Check your gradle config.</p>
      <p>The New Architecture (Fabric renderer + JSI) eliminates the async bridge entirely. We're in the process of migrating opus to the New Architecture. The gains on low-end Android are significant — gesture handling especially. If you're starting a new RN project in 2026, start with the New Architecture enabled from day one. Retrofitting is painful.</p>

      <h2>Measuring Correctly</h2>
      <p>Don't trust emulators for performance measurement. Don't trust flagship devices for real-world benchmarks. Build a test matrix: one device per tier (entry-level Android, mid-range Android, budget iOS, flagship). Run your user flows. Record screen capture + systrace simultaneously. Fix the worst offender first.</p>
      <p>The optimization that feels biggest in a profiler is rarely the one users notice. The one users notice is usually: initial load time, scroll smoothness at mid-scroll speed, and input responsiveness on form fields. Prioritize in that order.</p>
    `,
  },

  {
    slug: 'computer-vision-ocr-pipeline-production',
    title: 'Building a Real-Time OCR Pipeline in Production: Inside manju\'s Architecture',
    description: 'How I built manju\'s real-time image text extraction and translation system — the technical decisions behind the OCR pipeline, model selection, latency optimization, and handling text in complex image layouts.',
    date: '2026-06-30',
    readTime: '10 min',
    tags: ['Computer Vision', 'OCR', 'Python', 'AI', 'manju'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>The Problem Space</h2>
      <p>Translating text inside images sounds simple. It isn't. A screenshot of a Japanese manga panel has: speech bubbles with varying shapes, sound effects rendered as part of the artwork, vertical text, handwritten-style fonts, and text overlapping visual elements. A European street photo has: multiple fonts, arbitrary rotations, partial occlusion, varying lighting, and text at multiple scales in a single frame.</p>
      <p>Most OCR pipelines handle clean, horizontal, well-lit text on uniform backgrounds. <a href="https://manju.pro" target="_blank" rel="noopener">manju</a> handles everything else. Here's how I built the pipeline that makes it work.</p>

      <h2>Detection Before Recognition</h2>
      <p>The first mistake in DIY OCR: treating detection and recognition as one step. They're not. Detection finds <em>where</em> text is in the image. Recognition reads <em>what</em> it says. These require different models and different optimization strategies.</p>
      <p>For detection, I use a fine-tuned CRAFT (Character Region Awareness for Text Detection) model. CRAFT outputs character-level and word-level heatmaps, which makes it significantly more robust to curved, dense, or stylized text than bounding-box-only approaches. The output is a set of polygonal text regions — not rectangles, which matters for rotated or curved text.</p>
      <p>Detection runs first. Only detected regions go to the recognition model. This keeps inference cost predictable even on complex images.</p>

      <h2>Recognition: The Model Choice That Matters Most</h2>
      <p>I tested six OCR models before settling on the current stack. The evaluation criteria: accuracy on degraded/stylized text, multilingual support (manju handles 40+ languages), inference latency, and model size for edge deployment.</p>
      <p>The winner for production: PaddleOCR's recognition model, with custom post-processing. PaddleOCR's accuracy on CJK languages (Chinese, Japanese, Korean) is substantially better than Tesseract for complex layouts. It's also faster — 40-60ms per text region on CPU, under 10ms on GPU.</p>
      <p>For languages with low training data representation, I fall back to a cloud vision API with a 200ms SLA. The routing logic is simple: if the detected script is in the high-confidence local model's coverage, run locally. Otherwise, call the API. This keeps costs manageable while maintaining coverage.</p>

      <h2>The Layout Reconstruction Problem</h2>
      <p>Here's the part that took the longest: after OCR, you have a list of text regions with their coordinates and recognized text. You need to reconstruct the <em>reading order</em> and spatial layout to pass meaningful context to the translation model.</p>
      <p>For horizontal left-to-right text (most Latin scripts): cluster regions by Y position, sort clusters by X within each row. Straightforward. For vertical Japanese/Chinese: cluster by X position, sort by Y within each column, right-to-left across columns. For mixed layouts (manga panels with both vertical and horizontal elements): detect the dominant text direction per region using the aspect ratio and spacing of character bounding boxes.</p>
      <p>This spatial context changes translation quality dramatically. "Go!" and "I'll kill you!" read very differently if the translation model knows they're in adjacent speech bubbles vs. scattered across a panel.</p>

      <h2>Translation: Why Vanilla LLM Calls Aren't Enough</h2>
      <p>Once I have ordered, contextual text blocks, they go to a translation LLM. The naive approach — "translate this text: [text]" — produces technically correct but contextually flat output. Manga characters have distinct speech patterns. Signs have brevity constraints. UI elements need functional accuracy over literary quality.</p>
      <p>The prompt I settled on includes: detected text with spatial context, image type classification (manga / UI / photo / document), source language confidence, and character count constraints for text that needs to fit back in the original region. The LLM output is structured JSON with translation, reading order index, and confidence score.</p>
      <p>The structured output matters for the next step: rendering the translation back into the image.</p>

      <h2>Inpainting and Overlay Rendering</h2>
      <p>The final — and most visually impactful — step: remove the original text from the image and render the translation in its place. This requires inpainting: filling the removed text regions with the underlying image background.</p>
      <p>For clean backgrounds (solid colors, simple patterns), flood-fill inpainting is fast and looks perfect. For complex backgrounds (detailed artwork, photos), I use a lightweight diffusion inpainting model. It's slower (~300ms per region) but produces results that are visually indistinguishable from the original for most inputs.</p>
      <p>Total pipeline latency for a typical manga panel: detection (80ms) + recognition (120ms) + translation (400ms) + inpainting (200ms) = ~800ms. Under a second, end-to-end, from image to translated image. That's fast enough to feel real-time in the UI.</p>

      <h2>What I'd Build Differently</h2>
      <p>The biggest architectural mistake: not designing for batching from day one. Processing regions sequentially made the math work in development. In production, parallel region processing reduced total latency by 45%. If you're building a multi-step CV pipeline, design the parallelism into the architecture from the start — retrofitting it is painful.</p>
    `,
  },

  {
    slug: 'prompt-engineering-production-llm',
    title: 'Prompt Engineering in Production: What Actually Works (From Someone Who\'s Been Doing It Since GPT-3)',
    description: 'Real techniques that move the needle in production LLM systems — structured outputs, chain-of-thought routing, few-shot selection, and why most prompt engineering advice is optimized for demos, not production.',
    date: '2026-06-02',
    readTime: '8 min',
    tags: ['LLM', 'Prompt Engineering', 'AI', 'Production'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>The Demo vs. Production Gap</h2>
      <p>Prompt engineering tutorials show you prompts that work on the example. Production prompts need to work on the distribution — the full range of real user inputs, edge cases, adversarial inputs, and off-topic requests you'll encounter after you ship.</p>
      <p>I've been building LLM-powered systems since GPT-3 — through talkr.ai's voice agents, manju's translation pipeline, and UAE Lead's conversational lead capture. What I've learned is that the techniques that matter most in production are almost never the ones that get the most attention online.</p>

      <h2>Structured Output Is Not Optional</h2>
      <p>The single highest-leverage change in any LLM integration: enforce structured output. If your system prompt asks for JSON and hopes the model delivers it, you will get malformed JSON in production. Guaranteed. It might be 0.1% of calls. It might be 5%. Either way, your pipeline breaks.</p>
      <p>Use the model's native structured output mode (available in all major APIs now) or a library like Instructor/Outlines to constrain generation to a validated schema. The performance cost is negligible. The reliability gain is categorical — you go from "usually works" to "always returns a parseable object."</p>
      <p>Design your schemas to be forgiving: use <code>Optional</code> fields for information the model might not have. Use enums for categorical outputs. Include a <code>confidence</code> field so downstream logic can handle uncertainty without guessing.</p>

      <h2>Chain-of-Thought: Use It Where It Matters, Skip It Where It Doesn't</h2>
      <p>Chain-of-thought prompting (asking the model to reason step by step before answering) genuinely improves accuracy on complex reasoning tasks. It also adds tokens — which means latency and cost.</p>
      <p>My routing rule: CoT for decisions with more than 3 conditions, factual synthesis across multiple sources, and any output where an incorrect answer has high cost. Skip CoT for classification with clear categories, simple extraction, and latency-critical paths where accuracy is already above threshold.</p>
      <p>In talkr.ai's agent system, we route to CoT dynamically: if the intent classifier confidence is below 0.85, we trigger a CoT reasoning pass before selecting the response strategy. Above 0.85, we respond directly. This cuts average token use by ~30% on the high-volume, simple-intent majority while preserving quality on the complex cases that need it.</p>

      <h2>Few-Shot Selection Over Static Examples</h2>
      <p>Static few-shot examples in your system prompt are better than no examples. Dynamic few-shot selection — choosing examples at runtime based on similarity to the current input — is substantially better.</p>
      <p>The implementation: embed your example set. At inference time, embed the current input. Retrieve the K nearest examples. Inject them into the prompt. This is sometimes called "example-based prompting" or a lightweight form of RAG.</p>
      <p>The gain is largest on tasks with diverse input types. manju's translation prompts use dynamic few-shot: a manga panel with sound effects gets examples of SFX translation; a UI screenshot gets examples of functional/concise translation. Same base prompt, different examples, dramatically better output distribution.</p>

      <h2>System Prompt Architecture</h2>
      <p>Long system prompts degrade. There's a well-documented phenomenon where instructions in the middle of a long context receive less weight than instructions at the beginning and end. If your system prompt is 2000 tokens of instructions, the instructions at token 800-1400 are underweighted.</p>
      <p>My system prompt structure: persona + core constraints at the top (most important), task-specific instructions in the middle, output format specification at the bottom (second most important). Critical constraints appear both at the top and are repeated in brief at the bottom.</p>
      <p>Keep system prompts under 800 tokens where possible. If you need more, restructure: move examples to dynamic few-shot, move reference material to RAG, move complex logic to tool calls. The system prompt should define <em>who the model is and what it must never do</em>. Everything else is retrieval.</p>

      <h2>Evaluation Before Optimization</h2>
      <p>The mistake I made most in early LLM work: optimizing prompts based on vibes. "This version feels better" is not a measurement. Build an evaluation set — 100-200 representative inputs with ground truth outputs — before you start optimizing. Run every prompt change against it. Track the number.</p>
      <p>For talkr.ai, the eval set is 500 voice agent conversations with human-rated response quality. Every prompt change is measured against it before shipping. We've caught regressions that felt like improvements, and improvements that felt like regressions, in roughly equal measure. The eval set is the ground truth. Your intuition is a hypothesis.</p>

      <h2>Model Selection Is Also Prompt Design</h2>
      <p>Different models have different strengths that affect how you should prompt them. Claude excels at instruction following and structured output; its default verbosity needs to be explicitly constrained for concise outputs. GPT-4o is faster on structured tasks; it benefits from more explicit step decomposition. Gemini Flash is cost-effective for high-volume classification; its instruction following is strong but benefits from very explicit output constraints.</p>
      <p>Don't port prompts between models without testing. A prompt optimized for one model will often produce degraded output on another. Treat model selection and prompt design as co-dependent decisions.</p>
    `,
  },

  {
    slug: 'pwa-vs-native-2026',
    title: 'PWA vs. Native in 2026: When to Build Each (and When You\'re Making a Costly Mistake)',
    description: 'After building both PWAs and native apps in production, here\'s the honest framework for choosing between them — capabilities, distribution, performance, and the cases where the conventional wisdom is wrong.',
    date: '2026-05-15',
    readTime: '7 min',
    tags: ['PWA', 'React Native', 'Mobile', 'Architecture'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>Why This Decision Matters More Than People Think</h2>
      <p>The choice between PWA and native app isn't just technical — it determines your distribution model, your development velocity, and what your users can do with your product. Getting it wrong costs you 6-12 months of rebuild time.</p>
      <p>I run both: this portfolio is a PWA (installable, offline-capable, push notifications), while <a href="https://syopus.com" target="_blank" rel="noopener">opus</a> and <a href="https://www.powerx.one" target="_blank" rel="noopener">powerx</a> are native React Native apps. The choice was deliberate in each case. Here's the framework I use.</p>

      <h2>The Capability Gap in 2026</h2>
      <p>The capability gap between PWA and native has closed dramatically since 2020 but hasn't disappeared. What PWAs can do in 2026 that surprised even me when I tested it: background sync, push notifications (including on iOS 16.4+), camera access, biometric authentication, file system access, Web Bluetooth, Web NFC, contacts API, screen wake lock, and offline storage with IndexedDB at scale.</p>
      <p>What PWAs still can't do well: background location tracking, deep system integrations (HealthKit, ARKit, CoreML), in-app purchases via App Store billing, inter-app communication, and complex audio processing in the background. If your core value proposition requires any of these, native is not optional.</p>
      <p>For opus — a job search app where the core loop is browse, swipe, apply — none of those native-only capabilities were required. But push notifications for application status updates and the card swipe animation at 60fps were. For the swipe animation, a PWA with CSS animations and the Web Animations API actually delivers comparable performance to React Native on mid-range devices. The push notifications work on iOS 16.4+ via the standard Web Push API.</p>

      <h2>The Distribution Argument (and Why It Cuts Both Ways)</h2>
      <p>The conventional wisdom: "app stores give you distribution." This was truer in 2015 than in 2026. App store discovery is increasingly pay-to-play. Organic app store reach for a new app without significant reviews and ratings is minimal.</p>
      <p>PWA distribution is SEO and direct link. If your product is something people search for, and your SEO is solid, a PWA can outperform an app store listing for user acquisition. No install friction — the user can start using your product on the first visit and add to home screen on their second.</p>
      <p>The argument for native distribution: if your users are in a context where they browse app stores (productivity apps, gaming, tools that complement existing workflows), native has real advantages. Also: in-app purchases. If you need App Store or Play Store billing, you need a native app.</p>
      <p>For powerx — a crypto wallet where users specifically search "crypto wallet app" in app stores, and where trust signals from the store listing matter for a financial product — native was the right call regardless of technical capability.</p>

      <h2>Performance: The Honest Comparison</h2>
      <p>PWA performance on modern hardware is excellent. On older low-end Android (the 30th percentile of real-world devices), it's not. JavaScript on the main thread, layout and paint in the browser rendering engine, and the overhead of running inside a browser process all add up on constrained hardware.</p>
      <p>React Native with the New Architecture and Reanimated worklets achieves near-native UI thread performance regardless of device tier. If your core interaction is animation-heavy and your users are on a wide range of Android devices, this matters.</p>
      <p>My practical threshold: if your product needs to work well on Android devices below ~$150 USD in current pricing, and has complex gesture-driven interactions, lean native. If your target demographic is predominantly on flagship or mid-range devices and your interactions are content-first, a well-optimized PWA is indistinguishable.</p>

      <h2>Development Velocity: PWA Wins, Usually</h2>
      <p>One codebase, web deployment, no app store review cycles. For a solo founder or small team, the development velocity advantage of PWA is real and significant. You deploy in seconds, not days. You iterate on user feedback same-day. You don't manage certificates, provisioning profiles, or reviewer guidelines.</p>
      <p>The app store review process alone has killed momentum on React Native projects for me. A feature that would be live in 4 hours via web deployment takes 2-4 days through App Store review. For fast iteration cycles — which is how I build — this is painful.</p>
      <p>My current default: start with a PWA. Validate the product. If native capabilities or distribution become a clear blocker, invest in native. Build the PWA well enough that it could become a companion web app when the native version ships. You get the best of both.</p>

      <h2>The Hybrid Approach Worth Considering</h2>
      <p>Capacitor (from the Ionic team) lets you wrap a web app in a native shell with access to native APIs. It's not the right tool for performance-critical native interactions, but for adding one or two native capabilities (camera, push notifications, haptics) to an otherwise solid web app, it's excellent.</p>
      <p>I used this exact pattern for an early version of a project before the native rebuild: 90% web code, 10% native via Capacitor for camera access and local notifications. Time to production: 3 weeks. Time to a comparable full-native implementation: 3 months. The hybrid bought us enough time to validate the product before the native investment.</p>
    `,
  },

  {
    slug: 'core-web-vitals-high-traffic',
    title: 'Core Web Vitals on a 5M-Request/Day Site: What Actually Moves the Score',
    description: 'The specific optimizations that took yomimanga from a failing Core Web Vitals score to green across LCP, CLS, and INP — and why most performance guides miss the techniques that matter most at real scale.',
    date: '2026-04-25',
    readTime: '8 min',
    tags: ['Web Performance', 'Core Web Vitals', 'SEO', 'Architecture'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>Why Core Web Vitals Matter at Scale</h2>
      <p>Google's Core Web Vitals (LCP, CLS, INP) are a direct ranking signal for search. On a platform like <a href="https://yomimanga.com" target="_blank" rel="noopener">yomimanga</a>, where organic search is the primary acquisition channel, a poor CWV score directly costs users and revenue. This is not abstract SEO theory — when we fixed LCP from 4.2s to 1.4s, organic traffic increased 23% over the following 6 weeks.</p>
      <p>Here's what actually moved the scores on a real high-traffic platform.</p>

      <h2>LCP: It's Almost Always an Image</h2>
      <p>Largest Contentful Paint measures the time until the largest visible element renders. On a content platform, the LCP element is almost always the hero image or the first content image. The optimizations that matter:</p>
      <p><strong>LCP image preloading</strong>: Add a <code>&lt;link rel="preload" as="image"&gt;</code> for the LCP image in the document head. This tells the browser to fetch it before the HTML parser reaches the <code>&lt;img&gt;</code> tag. On yomimanga, this alone dropped LCP by 800ms — the image was being discovered too late in the parse order.</p>
      <p><strong>Format and compression</strong>: WebP with quality 80 is typically 30-50% smaller than JPEG at equivalent visual quality. AVIF is 20-30% smaller than WebP but has slightly worse browser support. On yomimanga, we serve AVIF to supporting browsers and WebP as fallback. Every byte removed from the LCP image is a direct LCP improvement.</p>
      <p><strong>CDN cache everything</strong>: If your LCP image originates from your server on every request, you're fighting physics. Serve from CDN edge nodes nearest to the user. A user in Tokyo fetching from a US origin adds 150-200ms of irreducible network latency. CDN eliminates this.</p>
      <p><strong>Priority hints</strong>: Add <code>fetchpriority="high"</code> to the LCP image element. This tells the browser's preload scanner to prioritize this resource over others discovered at the same time.</p>

      <h2>CLS: The Layout Shifts You Don't Notice Until You Measure</h2>
      <p>Cumulative Layout Shift measures unexpected layout movement. The shifts that cause poor CLS scores are usually invisible during development (because assets are cached locally) and infuriating for real users (content jumps as they're reading).</p>
      <p>The most common CLS sources on yomimanga:</p>
      <ul>
        <li><strong>Images without dimensions</strong>: every <code>&lt;img&gt;</code> needs explicit <code>width</code> and <code>height</code> attributes (or a CSS <code>aspect-ratio</code>). Without them, the browser doesn't reserve space until the image loads. The content below shifts down.</li>
        <li><strong>Web fonts causing FOUT/FOIT</strong>: Font swap causes layout shift if the fallback font has different metrics. Use <code>font-display: optional</code> for non-critical fonts, and match fallback font metrics using <code>size-adjust</code>, <code>ascent-override</code>, and <code>descent-override</code> in the <code>@font-face</code> declaration.</li>
        <li><strong>Dynamically injected content above existing content</strong>: banners, cookie notices, interstitials. If you must show these, reserve space for them before they load, or show them below the fold.</li>
      </ul>

      <h2>INP: The New Metric Everyone Is Underestimating</h2>
      <p>Interaction to Next Paint replaced FID in March 2024 and is significantly harder to optimize. INP measures the full interaction latency — from user input to the next frame paint — for all interactions on the page, not just the first.</p>
      <p>The root cause of poor INP is almost always long tasks on the main thread. If your JavaScript is running a task that takes 200ms, any interaction during that task will be delayed by up to 200ms before the browser can respond.</p>
      <p>What we found on yomimanga: our reading history save (a synchronous operation on every chapter page scroll event) was blocking the main thread for 40-80ms. Moving it off the main thread via a debounced callback + Web Worker dropped INP from 380ms (poor) to 120ms (good).</p>
      <p>Tools to find INP issues: Chrome DevTools Performance panel with "Interactions" track enabled, and the <code>PerformanceObserver</code> API with <code>{ type: 'event', buffered: true }</code> to log long-duration interactions in the field.</p>

      <h2>The Server Side That Performance Guides Ignore</h2>
      <p>Every Core Web Vitals guide focuses on client-side optimization. On a platform with 5M daily requests, server response time is a significant variable that client-side optimization cannot compensate for.</p>
      <p>TTFB (Time to First Byte) is not a Core Web Vitals metric, but it directly affects LCP. An LCP of 1.5s is only achievable if TTFB is under 600ms. If your server takes 1.2s to respond, no amount of client-side optimization gets you a good LCP.</p>
      <p>The server-side changes that moved our TTFB from 800ms to 180ms: Redis caching for all page-level data, query result caching at the PHP layer, and moving static content delivery entirely to CDN. The database no longer touches hot paths.</p>

      <h2>Field Data vs. Lab Data</h2>
      <p>Lighthouse scores (lab data) and real CWV scores (field data from the Chrome User Experience Report) frequently diverge. Lighthouse tests one device, one network, one session. Field data aggregates millions of real sessions across real devices, networks, and geographies.</p>
      <p>Your optimization target is the field data. Build a real user monitoring setup: the Web Vitals JavaScript library + your analytics of choice. Measure LCP, CLS, and INP in the field, segmented by device type and geography. The issues you'll find are very different from what Lighthouse surfaces.</p>
    `,
  },

  {
    slug: 'web3-ux-self-custodial-wallets',
    title: 'Self-Custodial Wallets in 2026: The UX Challenges Nobody in Web3 Talks About',
    description: 'Building powerx revealed every unsolved UX problem in self-custodial crypto wallets. Here\'s the honest breakdown of what makes Web3 wallet UX hard, what we built to fix it, and what the industry still gets wrong.',
    date: '2026-03-05',
    readTime: '8 min',
    tags: ['Web3', 'UX', 'Crypto', 'Mobile'],
    ogImage: 'https://victor-morel.com/og-image.jpg',
    content: `
      <h2>The Problem With "Not Your Keys, Not Your Coins"</h2>
      <p>Self-custody is the foundational promise of crypto: you control your assets, no intermediary can freeze them or lose them. This is genuinely valuable. It's also, for most users, genuinely terrifying — because with full control comes full responsibility.</p>
      <p>The seed phrase problem is well-known: 12 or 24 random words that, if lost, mean permanent loss of all assets. No recovery. No customer support. Every self-custodial wallet in existence expects the user to write these words on paper and store them safely. In practice, users screenshot them (insecure), email them to themselves (insecure), or lose the paper (catastrophic).</p>
      <p>Building <a href="https://www.powerx.one" target="_blank" rel="noopener">powerx</a> — a self-custodial super wallet — required confronting every one of these UX problems with real product solutions, not explanations of why they're hard.</p>

      <h2>Seed Phrase UX: What We Built</h2>
      <p>The standard seed phrase backup flow is: show words, tell user to write them down, ask user to verify by reordering. This flow has a catastrophic completion rate problem — users tap through without actually backing up, then are surprised when they lose access.</p>
      <p>Our approach: social recovery sharding. The seed is split into 3 shares using Shamir's Secret Sharing. Any 2 of 3 shares recover the wallet. Users distribute shares across: a trusted contact (friend/family), encrypted cloud backup with their own encryption key, and physical backup. Losing one share is not catastrophic. Losing two is.</p>
      <p>The UX for setting this up is a guided flow that takes 8 minutes and feels like setting up two-factor authentication — familiar, purposeful, achievable. Completion rate went from 23% (seed phrase) to 71% (social recovery). The underlying cryptographic security is equivalent; the user experience is radically different.</p>

      <h2>Transaction Confirmation UX</h2>
      <p>The transaction confirmation screen in most wallets shows: recipient address (42 hex characters), gas fee in ETH (not in USD), and network name (often abbreviated). Users have no reliable way to verify what they're actually approving.</p>
      <p>Phishing and address substitution attacks exploit exactly this: the user thinks they're sending to one address; malware has replaced it with another. The confirmation screen doesn't help them catch it.</p>
      <p>What we built instead: human-readable transaction summaries (reverse-resolving addresses to ENS/labels where possible, showing USD amounts alongside crypto amounts, flagging first-time recipients), domain verification for DApp interactions (showing the actual domain the DApp is hosted on), and simulation — previewing the exact state change that the transaction will cause before it's signed.</p>
      <p>Transaction simulation is technically complex (you're running the transaction against a fork of the current chain state) but it's the single most impactful security UX feature we've built. Users can see "this will send 0.5 ETH and receive 1420 USDC from Uniswap v3" before signing, not after.</p>

      <h2>The Multi-Chain UX Problem</h2>
      <p>In 2026, users hold assets across Ethereum, Solana, Base, Arbitrum, Polygon, and a handful of others. The wallet that only supports one chain is no longer viable. But the multi-chain UX in existing wallets is terrible: you need to manually switch networks, and users regularly send assets to the wrong chain and lose them.</p>
      <p>Our solution: unified account view. powerx shows your total portfolio value and activity across all supported chains in a single feed, without asking the user to manage which network they're "on." When a transaction is initiated, the wallet detects the required network automatically and switches (or notifies if switching isn't possible). The network selector — which exists in every other wallet — doesn't exist in powerx's main flow.</p>

      <h2>Social Features and Finance: The Convergence Problem</h2>
      <p>powerx combines social features (feed, follows, messaging) with financial features (wallet, exchange, staking). This creates unusual UX challenges. A social feed and a financial account have very different trust and privacy expectations.</p>
      <p>The design principle we landed on: separate spatial zones, unified identity. Your social profile is public by default. Your financial activity is private by default. They share the same identity (your wallet address or ENS name) but are presented in different parts of the app with different permission defaults. Crossing the boundary (sharing a transaction publicly) is an explicit action, not a default.</p>
      <p>This required rebuilding the feed ranking algorithm to never surface financial activity without explicit user consent — a constraint that sounds obvious but requires careful implementation to enforce consistently across edge cases.</p>

      <h2>What the Industry Keeps Getting Wrong</h2>
      <p>Most Web3 UX improvement effort goes into making the technology more visible — better gas estimations, more readable addresses, clearer network indicators. This is necessary but insufficient. The foundational problems are not about making crypto mechanics more visible; they're about making crypto mechanics less relevant.</p>
      <p>The users who will drive mainstream adoption are not interested in understanding what a gas fee is. They want to send money and receive money. They want to buy something and own it. The UX challenge is making those outcomes achievable without the user needing to understand the underlying mechanism — the same way you don't need to understand TCP/IP to send an email.</p>
      <p>This is the hardest product challenge in Web3: building an abstraction layer over complexity that doesn't compromise the trustlessness that makes the technology valuable. We're working on it. So is everyone else. The wallets that solve it will define the next decade of finance.</p>
    `,
  },
]

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug) ?? null
}
