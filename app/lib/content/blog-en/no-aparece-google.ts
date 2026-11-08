import type { PageContent } from "../types";

export const blogNoApareceGoogleEn: PageContent = {
  eyebrow: "Guide",
  h1: "Why your business doesn't show up on Google and how to check",
  lead: [
    "You search for your business's name on Google and it doesn't come up. Or something else does. It's more common than it seems, and it's almost never bad luck: there are a handful of specific causes, and nearly all of them can be checked in an afternoon.",
    "Grolow knows this first-hand. If you search for “grolow” on Google today, the first thing you see is a shrub called Gro-Low. This article explains why that happens, what can be done and what depends on nothing but time.",
  ],
  sections: [
    {
      h2: "Two different things: the map and the results",
      body: [
        "When someone searches for “a company that does something in Santo Domingo”, Google usually shows two blocks. At the top, a map with three businesses: that comes from the Google Business Profile, the listing that appears on Google Maps. Below it, the regular results: those come from your website.",
        "They're two different systems, with different rules. You can show up in one and not the other. So the first step is knowing which one you're missing.",
      ],
    },
    {
      h2: "If you don't show up on the map",
      bullets: [
        {
          title: "You don't have a Business Profile, or it isn't verified",
          text: "You create one for free from Google Business Profile. Until Google verifies the business exists, the profile isn't shown, or barely shown.",
        },
        {
          title: "The main category isn't the right one",
          text: "Google uses the category to decide which searches to show you in. Choose the one that describes what you do, not the broadest one.",
        },
        {
          title: "You have few reviews",
          text: "In searches for services in the country, the businesses on the map usually have dozens of reviews. Ask real customers for them after each job; don't buy them, Google detects and removes them.",
        },
        {
          title: "The profile name has extra words",
          text: "Google's guidelines call for the business's real name, without adding services or cities. Stuffing “web design Santo Domingo” into the name can get your profile suspended.",
        },
        {
          title: "You work without premises open to the public",
          text: "If you serve customers at their location or remotely, set the profile up as a service-area business, listing the areas you cover, instead of making up an address.",
        },
      ],
    },
    {
      h2: "If you don't show up in the results",
      bullets: [
        {
          title: "Your site is new",
          text: "Google can take days or weeks to discover and index a new site. Telling it through Search Console speeds things up.",
        },
        {
          title: "The site tells Google not to index it",
          text: "A forgotten “noindex” tag or a misconfigured robots.txt file, very common on sites that were published from a test environment.",
        },
        {
          title: "Google can't read the content",
          text: "If the page's text only appears after code runs in the browser, some search engines see an empty page.",
        },
        {
          title: "The site is very slow or doesn't work well on mobile",
          text: "Most searches in the country are made from a phone, and Google takes that into account.",
        },
        {
          title: "Your name looks like something else",
          text: "If your brand matches a common word or something better known, Google takes time to understand you're looking for your business and not the other thing. That's Grolow's case with the shrub.",
        },
      ],
    },
    {
      h2: "How to check in an afternoon",
      bullets: [
        {
          title: "Search site:yourdomain.com on Google",
          text: "It shows you the pages of your site that Google has indexed. If none come up, the problem is indexing, not ranking.",
        },
        {
          title: "Add your site to Google Search Console",
          text: "It's free. It tells you which pages are indexed, which aren't and why. Submit your sitemap there.",
        },
        {
          title: "Use URL inspection",
          text: "Inside Search Console, it tells you whether a specific page is on Google and, if not, the reason.",
        },
        {
          title: "Search for your business on Google Maps",
          text: "If it doesn't appear, create or claim your Business Profile and verify it.",
        },
      ],
    },
    {
      h2: "Why Google doesn't recognise your brand name",
      body: [
        "This is the hardest case, and Grolow's. Google doesn't look for words: it tries to understand entities, that is, specific things in the world. To Google, “Grolow” is still mostly a shrub, because far more has been written about the plant than about the company.",
        "What helps is many sources saying the same thing about you: your website, your Business Profile, your social media and other sites that mention you, all with the same name, the same city and the same description of what you do. And structured data on your website that tells Google, in its own language, what your business is and which are its official profiles.",
        "There's no shortcut. It's built over time, with consistency and with articles like this one, which explain who you are using your full name.",
      ],
    },
    {
      h2: "What Grolow does in this part, and what it doesn't",
      body: [
        "Everything Grolow builds ships with the technical groundwork Google needs: the content in the HTML from the very first load, a sitemap that updates itself, unique titles and descriptions per page, structured business data and a site that's fast on mobile.",
        "What Grolow doesn't do is ranking campaigns or content marketing for your business. Reviews, the Business Profile and publishing consistently depend on you, or on a marketing agency if you'd rather delegate it. Anyone who promises you the top spot on Google by a specific date is promising something they don't control.",
      ],
    },
  ],
  faq: [
    {
      q: "How long does Google take to show a new site?",
      a: "From a few days to a few weeks for it to appear indexed. Ranking high for competitive searches is another matter and usually takes months.",
    },
    {
      q: "Does paying for Google ads improve my position in the regular results?",
      a: "No. Ads and regular results are separate systems. Paying for ads doesn't move you up in the results that aren't ads.",
    },
    {
      q: "Do I need a website if I already have a Business Profile?",
      a: "To appear on the map, it isn't essential. To appear in the regular results and explain what you do in detail, yes.",
    },
  ],
  related: [
    { to: "blogQueEsGrolow", label: "What Grolow is and what it does" },
    { to: "blogAntesDeContratar", label: "What to ask before hiring someone for a website" },
    { to: "blogLoQueNoHace", label: "What Grolow doesn't do, and who to look for" },
  ],
  cta: {
    heading: "Your site doesn't show up and you don't know why?",
    text: "Send Grolow your domain on WhatsApp. It'll tell you what can be seen from outside and what to check first.",
    label: "Message us on WhatsApp",
    message: "Hi, I read why a business doesn't show up on Google. My site is:",
  },
};
