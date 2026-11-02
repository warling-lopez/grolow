import type { PageContent } from "../types";

export const blogSemanaNegraEn: PageContent = {
  eyebrow: "Article · Security",
  h1: "Web servers' black week: what to learn from it",
  lead: [
    "In ten days of October 2026, three problems hit the three layers that hold up almost any website: five flaws in Nginx, the server that receives visitors; PHP2Shell, in the language that runs most sites; and the eMudhra case, in the certificate system that makes the browser padlock work.",
    "We've already written about each one separately. This article is about what they have in common, the role artificial intelligence played and the decisions a business can make today so that the next week like this finds it prepared.",
  ],
  sections: [
    {
      h2: "Ten days, three layers",
      bullets: [
        {
          title: "October 14: Nginx",
          text: "Versions 1.30.6 and 1.31.7 fix five flaws that, with certain configurations, can bring the server down, execute code or bypass client certificate verification.",
          to: "blogNginx",
        },
        {
          title: "October 17 to 22: eMudhra",
          text: "It's discovered that eight intermediate certificates from this certificate authority had private keys that could be guessed. Browsers block them within three days and the company leaves the web certificate business.",
          to: "blogEmudhra",
        },
        {
          title: "October 20 to 23: PHP2Shell",
          text: "Two critical PHP flaws leak before a fix exists. European governments take sites offline, Cloudflare records millions of attack attempts and PHP publishes emergency patches.",
          to: "blogPhp2shell",
        },
      ],
    },
    {
      h2: "What they have in common",
      body: [
        "None of the three is the site owner's fault. Nobody who hired a WordPress site chose the PHP flaw, and nobody with an HTTPS certificate chose eMudhra as a trusted authority in their browser. They're problems in the shared infrastructure we all build on.",
        "But all three have the same practical solution: someone has to find out in time, understand whether it affects them and update. The sites that came out of that week unscathed weren't the ones with the best technology. They were the ones with a responsible person who answered the same day.",
      ],
    },
    {
      h2: "The role of artificial intelligence",
      body: [
        "According to AFP, the PHP flaws were reported in August, independently, by the firm Calif and by OpenAI. Diario Libre reports that Calif used an OpenAI model to identify one of them. The same AFP report places the case within a wave of discoveries driven by increasingly capable AI models, with projections that 2026 could double the previous year's record number of vulnerabilities.",
        "This cuts both ways. The good side: flaws that had been hidden in PHP for fourteen years get found and fixed. The uncomfortable side: if the tools for finding flaws are more accessible, they're also more accessible to those who want to exploit them, and the time between a fix being published and attacks appearing gets shorter. With PHP2Shell, the attacks started before the fix.",
        "For a business, the conclusion is simple: the pace of security updates isn't going to slow down. It's going to speed up.",
      ],
    },
    {
      h2: "What worked",
      body: [
        "It's also worth saying what went well, because that's what to copy.",
      ],
      bullets: [
        {
          title: "Coordination between browsers",
          text: "Google blocked the eMudhra certificates in Chrome less than two hours after the report, without anyone having to update their browser. Apple, Mozilla and Microsoft did it within three days.",
        },
        {
          title: "Certificate Transparency",
          text: "Because Chrome requires every certificate to be in public logs, it was possible to verify that nobody had issued fake certificates with the weak keys before the block.",
        },
        {
          title: "Automatic updates",
          text: "Sites on managed platforms, where the provider updates PHP for you, were protected without their owners doing anything.",
        },
        {
          title: "Taking sites offline in time",
          text: "Switching a site off for a few hours is inconvenient. The governments that did it chose a small, safe problem over a big, uncertain one.",
        },
      ],
    },
    {
      h2: "What failed",
      bullets: [
        {
          title: "The leak before the patch",
          text: "PHP2Shell's details circulated a day before a fix existed. Nobody could update before the attacks started.",
        },
        {
          title: "Unsupported versions",
          text: "Thousands of sites run on PHP 7.4, 8.0 or 8.1, for which there was no official fixed release.",
        },
        {
          title: "Software that isn't a browser",
          text: "Browsers protected themselves from eMudhra. Servers, containers and applications that carry their own certificate list didn't, and many are still not updated.",
        },
        {
          title: "Servers without an owner",
          text: "The server set up by a technician who no longer works with the company, the internal system that “works, so nobody touches it”. That week, nobody knew whom to call.",
        },
      ],
    },
    {
      h2: "Five decisions for next time",
      bullets: [
        {
          title: "Have a named person in charge",
          text: "A person or company that receives the security advisories for what you use and whom you can call on a Tuesday night. If you don't know who that is today, that's the first task.",
        },
        {
          title: "Make a one-page inventory",
          text: "Which sites and systems you have, where they're hosted, which technology and version, and who maintains them. With that, when the next advisory comes, you know within five minutes whether it affects you.",
        },
        {
          title: "Prefer what updates itself",
          text: "Managed hosting, automatic certificate renewal, platforms where the provider applies the patches. You pay a bit more and sleep better.",
        },
        {
          title: "Get off unsupported versions",
          text: "Don't wait for the next flaw. Migrating calmly costs less than migrating in a rush.",
        },
        {
          title: "Keep backups you've tested",
          text: "A backup you've never tried to restore isn't a backup. If you have to start over tomorrow, it's the only thing that saves you.",
        },
      ],
    },
    {
      h2: "A note about us",
      body: [
        "We build with Next.js and Node.js, not PHP, so PHP2Shell didn't affect the sites we've delivered. But Node.js did need updating because of the eMudhra case, and React, the foundation of what we use, had its own critical flaw in December 2025. No technology spares you from this. What spares you is having someone paying attention.",
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "AFP via Ensegundos, October 21",
          text: "Discovery of the PHP flaws, the role of AI and sites taken offline in Europe.",
        },
        {
          title: "Diario Libre, October 22",
          text: "Attack figures reported by Cloudflare and Calif's use of an OpenAI model.",
        },
        {
          title: "Google Security Blog and Help Net Security",
          text: "The browsers' response to the eMudhra case.",
        },
        {
          title: "The Hacker News and Sevydevy",
          text: "Details of the five Nginx flaws.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Was it a coordinated attack?",
      a: "No. They're three independent problems that happened at the same time. What links them is that they affect the internet's shared infrastructure, not a specific site or company.",
    },
    {
      q: "Does my business need a security team?",
      a: "A small business doesn't need its own team. It needs to know who maintains each thing and for that person or company to respond in time. For many, that's a maintenance contract or managed hosting.",
    },
    {
      q: "How often should I review my systems?",
      a: "Security updates should be applied within days, not months. A general review of versions and backups every quarter is a good minimum for a small business.",
    },
  ],
  related: [
    {
      to: "blogPhpRd",
      label: "How PHP2Shell affected the Dominican Republic",
    },
    {
      to: "blogLeyRd",
      label: "What Dominican law says if your website gets hacked",
    },
    { to: "desarrolloWeb", label: "How we approach custom web development" },
  ],
  cta: {
    heading: "Want the one-page inventory done?",
    text: "We'll help you list which systems you have, what they're built with and who maintains them. It's the first step and the one most people skip.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the article about web servers' black week and I want to get my systems in order:",
  },
};
