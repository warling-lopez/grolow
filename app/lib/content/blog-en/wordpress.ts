import type { PageContent } from "../types";

export const blogWordpressEn: PageContent = {
  eyebrow: "Article",
  h1: "WordPress or custom code: which one suits your business",
  lead: [
    "First, the disclosure: we write custom code and don't build on WordPress. Read this knowing that.",
    "That said, this article isn't going to end by saying WordPress is bad, because it isn't. It's going to end by saying what each one is for, including the cases where what suits you is exactly what we don't sell.",
  ],
  sections: [
    {
      h2: "What each one is, without the marketing",
      subsections: [
        {
          h3: "WordPress",
          body: [
            "It's a content management system: a ready-made program installed on a server that gives you a dashboard to publish. On top of it you add a “theme”, which decides how it looks, and “plugins”, which add features the base program doesn't have.",
            "It powers a huge share of the web, has twenty years of history and a gigantic community. None of that is an accident: it solves the problem it was built for very well.",
          ],
        },
        {
          h3: "Custom code",
          body: [
            "It means writing the program from scratch for your case. There's no theme and no plugins: every screen and every behavior is programmed. Today it's done with tools like React or Next.js, which handle the repetitive part without forcing a structure on you.",
            "It isn't more “handcrafted” or nobler. It's an engineering decision with concrete advantages and costs.",
          ],
        },
      ],
    },
    {
      h2: "When WordPress is the right decision",
      body: [
        "This is the section almost no studio that sells custom development writes, and it's the most useful part of the article.",
      ],
      bullets: [
        {
          title: "You publish content often, with several people",
          text: "If you run an active blog, a magazine or a publication with two or three writers, with drafts, reviews and permissions, WordPress does that very well out of the box. Rebuilding it from scratch is spending money to reinvent something already solved.",
        },
        {
          title: "You need to be able to switch providers without drama",
          text: "A great many people know how to work with WordPress. If your relationship with whoever built it breaks down, you'll find a replacement the following week. With custom code, the pool of people who can pick up the work is smaller, and that's a real risk that needs to be said.",
        },
        {
          title: "Your budget is under 500 dollars",
          text: "At that number, honest custom development doesn't add up. A well-built WordPress site is better than custom development trimmed down until it stops making sense.",
        },
        {
          title: "You need something live this week",
          text: "With a decent theme you get there sooner. If you have an immovable deadline and the site is simple, speed to launch matters more than technical elegance.",
        },
      ],
    },
    {
      h2: "When WordPress falls short",
      body: [
        "The pattern is almost always the same: the site stops being a brochure and becomes part of the operation.",
        "As long as you're publishing pages and articles, everything works. The problem shows up when you need the site to do something your business does in a particular way: a booking flow with its own rules, a dashboard where your team sees the status of each order, an integration with the system you already use.",
        "At that point the usual answer is to install a plugin that does 80% of what you need, and then another one that patches the remaining 20%. Each one adds code you don't control, and they all have to stay compatible with each other on every update. The complexity stops living in your site and moves into the seams between third-party pieces.",
        "The second sign is performance. A purchased theme ships features for all of its buyers, not just for you, and the visitor downloads all of them.",
      ],
    },
    {
      h2: "The speed myth, with nuance",
      body: [
        "People say WordPress is slow and custom code is fast. It's an oversimplification.",
        "A well-built WordPress site — a lightweight theme, few plugins, caching and optimized images — can be perfectly fast, and there are sites that prove it. Careless custom development can be slow, loading unnecessary libraries and blocking the first paint.",
        "The real difference is the starting point and the ceiling. With your own code you start at zero and add only what's needed; with a theme you start with whatever the theme brings and work to remove it. You can get to a fast site either way, but one of them has the current in its favor.",
        "And the important part: demand that it's measured. Ask to see PageSpeed Insights for a real site they've delivered, not a promise in the proposal.",
      ],
    },
    {
      h2: "Security: two different risks",
      body: [
        "WordPress gets attacked a lot because it's popular: automating an attack against a platform used by millions of sites pays off handsomely. Most intrusions don't exploit WordPress itself but an outdated plugin.",
        "That makes the risk predictable and manageable: updating on time, using few plugins and choosing them carefully solves almost everything. The catch is that “updating on time” requires someone to do it, and in many businesses that someone doesn't exist.",
        "With custom code there are no plugins to update, so that attack surface disappears. In exchange, whatever bugs exist are yours, and only whoever wrote the code can find them: there's no community publishing patches for your system.",
        "Neither one is secure on its own. Both depend on someone taking care of it.",
      ],
    },
    {
      h2: "What you give up with custom code",
      body: [
        "For the comparison to be useful, this part has to be said too.",
        "You give up the ecosystem: there's no plugin that solves in ten minutes whatever occurs to you on a Tuesday; if you want it, it gets programmed and paid for. You give up a low entry price: the first project costs more. And you take on a continuity risk, because fewer people are able to pick up your system.",
        "That last risk is reduced by two concrete things, and you should demand both: that the code lives in a repository in your name and that the system is documented. If a custom development provider resists either one, that's the problem, not the technology.",
      ],
    },
    {
      h2: "How to decide in five minutes",
      bullets: [
        {
          title: "Does your site publish content or run your business?",
          text: "If it publishes, WordPress is a good candidate. If your operation runs through it — orders, bookings, customer data — custom development is justified.",
        },
        {
          title: "How many people will edit it, and how often?",
          text: "Several people publishing every week favors WordPress. One person changing prices now and then doesn't need all that machinery.",
        },
        {
          title: "What happens if the site goes down on a Saturday?",
          text: "If the answer is “I lose sales”, invest in something you control and in someone who answers. If it's “we'll look at it on Monday”, don't overpay.",
        },
        {
          title: "Do you have a budget for the whole first year?",
          text: "Not just for development: also the domain, hosting and maintenance. If the number only covers building it and not sustaining it, start simpler.",
        },
      ],
    },
    {
      h2: "The honest answer",
      body: [
        "For most small businesses that are just starting out, WordPress or even a site builder is enough, and whoever sells them a two-thousand-dollar custom build is selling them something they don't need yet.",
        "For a business with operations, a team and paying customers, where the site has to do something specific and performance turns into money, custom development pays for itself.",
        "The expensive mistake isn't picking the wrong technology. It's picking one before defining what the site has to do.",
      ],
    },
  ],
  faq: [
    {
      q: "Can I move from WordPress to custom code without losing my search rankings?",
      a: "Yes, if the migration redirects every old URL to the new one and keeps the content that already ranks. Rankings are lost when you migrate without redirects, not because you changed technology.",
    },
    {
      q: "What about Shopify, Wix or Squarespace?",
      a: "It's the same conversation under a different name: you trade control for speed to launch. Shopify in particular is a good decision if you sell many products with online payment and don't need anything beyond what it offers.",
    },
    {
      q: "My WordPress site is slow. Do I fix it or rebuild it?",
      a: "It's almost always worth trying to fix it first: removing unused plugins, switching to a lightweight theme and optimizing images usually brings a big improvement for little money. Rebuilding is justified when you also need features the theme doesn't allow.",
    },
    {
      q: "Does custom code need maintenance?",
      a: "Yes, although a different kind. There are no plugins to update, but the project's dependencies and the platform it runs on do get new versions. It's less frequent and more predictable, not nonexistent.",
    },
  ],
  related: [
    {
      to: "desarrolloWeb",
      label: "How we approach custom web development",
    },
    {
      to: "blogPrecios",
      label: "How much a website costs in the Dominican Republic",
    },
    { to: "empresas", label: "Websites for mid-sized companies" },
  ],
  cta: {
    heading: "Not sure which one is for you?",
    text: "Tell us what your site needs to do and we'll tell you which of the two paths suits you. If it's WordPress, we'll say so even though it's not what we sell.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the article about WordPress and custom code. My case is this:",
  },
};
