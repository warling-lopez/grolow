import type { PageContent } from "../types";

export const blogQuienEsGrolowEn: PageContent = {
  eyebrow: "About Grolow",
  h1: "Who is behind Grolow and how the work is split",
  lead: [
    "Before handing a company the system your business depends on, it's reasonable to ask who's behind it. Grolow is a small company, and this article says so plainly: who runs it, who writes the code, who answers when something breaks and what happens to your project if one of those people changes.",
    "What you won't find here are inflated client counts, years of experience that don't exist or a ten-person team in a stock photo.",
  ],
  sections: [
    {
      h2: "The founder: Warling López",
      body: [
        "Grolow was founded in 2025 by Warling López, a Dominican full-stack developer. Before Grolow he worked from 2023 as an independent web developer for local businesses, with his own site, warling.top, where he still publishes his personal work.",
        "Today he runs Grolow: he decides what gets built and how, sells, reviews everything that's delivered and handles support. He mostly builds with Next.js, React and TypeScript, and operates clients' infrastructure on Vercel and Supabase.",
        "His professional profile is on LinkedIn and his public code is on GitHub, as warling-lopez. If you want to know who you're dealing with, those two links say more than any “about us” paragraph.",
      ],
    },
    {
      h2: "Who writes the code",
      body: [
        "Grolow works with development collaborators on a per-project basis. Since November 2026 there's a regular collaborator who builds catalogues, systems and changes alongside the founder.",
        "It's not a minor detail and it's worth saying clearly, because many people assume the person they talk to writes all the code. At Grolow that isn't always the case, and that's more of an advantage than a risk, as long as it's done with rules.",
      ],
      bullets: [
        {
          title: "A contract before touching code",
          text: "Every collaborator signs a full assignment of rights, a confidentiality agreement and a non-compete before working on a client's project. Without that assignment, Grolow couldn't hand the client ownership of the code.",
        },
        {
          title: "Grolow's accounts, access that gets revoked",
          text: "Collaborators work in Grolow's repositories and accounts, never personal ones, and their access is removed when the work ends.",
        },
        {
          title: "They don't deal with clients",
          text: "The client deals with Grolow. Communication, decisions and support are handled by the founder.",
        },
      ],
    },
    {
      h2: "Who answers when something breaks",
      body: [
        "Support is handled directly by the founder, over WhatsApp. There's no call centre and no ticket system nobody reads.",
        "La Perfurm RD, Grolow's longest-standing client, had two incidents in its early days: an outage at an external provider and a mistake of Grolow's. Both were fixed the same day, and for its own mistake Grolow gave the client a free month without being asked. It's a short track record, and Grolow doesn't pretend it's longer. But it's real, and the client gave written permission to tell it.",
      ],
    },
    {
      h2: "Why the brand is Grolow and not the founder's name",
      body: [
        "It could have been sold as “the developer who looks after you personally”. Grolow decided not to, for a practical reason: that promise expires the day the business grows.",
        "Grolow's promise is a different one: someone answers fast and takes charge, and if the mistake is Grolow's, Grolow owns it. That promise survives even if tomorrow there are more people on support, because it never depended on who answers, but on how the work is done.",
      ],
    },
    {
      h2: "What happens to your project if a person changes",
      body: [
        "It's the question almost nobody asks and the most important one with a small company. Grolow's answer lies in how it delivers every project.",
      ],
      bullets: [
        {
          title: "The code is documented",
          text: "Every project is delivered with the full repository and its history, a document explaining how to deploy it and the list of configuration variables. Any competent developer can pick it up.",
        },
        {
          title: "Nothing proprietary or locked",
          text: "Grolow doesn't use closed systems or obfuscated code that ties you to it.",
        },
        {
          title: "If Grolow stopped providing the service",
          text: "It gives 60 days' notice and hands everything over at no cost: database, code, credentials and the domain.",
        },
        {
          title: "If you're the one who leaves",
          text: "You take everything within 10 business days at most, also at no cost.",
          to: "blogPropiedad",
        },
      ],
    },
    {
      h2: "What Grolow doesn't have yet",
      body: [
        "Few Google reviews and a short portfolio. Every company that's starting out is there, and the alternative to saying so would be making up numbers, which is exactly what Grolow's main rule forbids: never mislead the client.",
        "What it does have can be checked: sites online that you can open, a case with the client's permission to tell it, a founder with a first and last name, and terms in writing before you pay anything.",
      ],
    },
  ],
  faq: [
    {
      q: "Is Grolow one person?",
      a: "No. It's run by its founder and works with development collaborators per project. Support and the client relationship are handled by the founder.",
    },
    {
      q: "Can I know who will build my project?",
      a: "Yes. If you ask, Grolow will tell you. Responsibility towards you always lies with Grolow, whoever writes the code.",
    },
    {
      q: "Where can I see the founder's work?",
      a: "In the case studies published on grolow.com, on his LinkedIn profile and on his GitHub, warling-lopez.",
    },
  ],
  related: [
    { to: "blogQueEsGrolow", label: "What Grolow is and what it does" },
    { to: "blogPropiedad", label: "Who owns your domain, your code and your data" },
    { to: "casos", label: "Grolow case studies" },
  ],
  cta: {
    heading: "Want to ask something before describing your project?",
    text: "Message the founder on WhatsApp. He'll answer you himself, in writing.",
    label: "Message us on WhatsApp",
    message: "Hi Warling, I read who is behind Grolow and I have a question:",
  },
};
