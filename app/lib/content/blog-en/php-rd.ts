import type { PageContent } from "../types";

export const blogPhpRdEn: PageContent = {
  eyebrow: "Article · Dominican Republic",
  h1: "How PHP2Shell affected the Dominican Republic",
  lead: [
    "While government sites were being switched off in France and the Netherlands because of the PHP2Shell vulnerability, in the Dominican Republic the news arrived through the press and through hosting providers' notices. This article brings together what is known about the impact in the country, what isn't known, and why the Dominican market has concrete reasons to take it seriously.",
    "A warning up front: at the time of writing we found no public reports of intrusions into Dominican sites attributed to PHP2Shell. That doesn't mean there weren't any. It means that, if there were, they haven't been made public.",
  ],
  sections: [
    {
      h2: "How the news reached the country",
      body: [
        "Dominican media covered the case from day one. Ensegundos published AFP's report on the sites taken offline in Europe on October 21. Almomento, datelined Santo Domingo, described the international alert and the malicious traffic detected by Cloudflare. Diario Libre published a piece on October 22 with the flaws' identifiers, the attack figures and recommendations for users and administrators.",
        "None of those reports mentions affected Dominican institutions or companies. Nor did we find, at the time of writing, a specific public alert about PHP2Shell from the National Cybersecurity Center (CNCS), although the CNCS has published alerts about PHP in the past — about PHP 7 flaws between 2019 and 2021 and about phpMyAdmin in 2022 — and it's the source to check for any official notice.",
      ],
    },
    {
      h2: "The context: a record year for attack attempts",
      body: [
        "PHP2Shell arrived in a country that was already receiving more attacks than ever. On October 16, a week before the crisis, CDN reported that the CNCS had blocked 510 million attack attempts against state systems so far in 2026, compared with 481 million in all of 2025. The CNCS itself clarifies that this figure only covers the state's protection systems, not the country as a whole.",
        "Its executive director, Carlos Leonardo, attributed the increase to digital transformation and the automation of attacks, and warned that combining data from different leaks lets criminal groups build profiles of citizens. In the same interview, reported leaks linked to a phone company, the National Police and the Central Electoral Board were mentioned, with investigations under way.",
        "A flaw that lets someone take over a server without a password, in the language that runs most websites, is exactly the kind of tool those automated attacks add as soon as it's available.",
      ],
    },
    {
      h2: "Why the Dominican market is especially exposed",
      body: [
        "We don't have an official figure for how many Dominican sites use PHP. What we can describe is what we see working in this market, and anyone who has gotten a quote for a website in Santo Domingo will recognize it.",
      ],
      bullets: [
        {
          title: "WordPress on shared hosting is the norm",
          text: "The vast majority of the small business, clinic, restaurant and professional sites we see are built on WordPress, on shared hosting with cPanel. That's PHP.",
        },
        {
          title: "Sites delivered and abandoned",
          text: "It's very common for a site to be delivered, paid for and never touched again. The client doesn't know it needs updating and the provider doesn't offer it. Those sites usually stay on the PHP version they were built with.",
        },
        {
          title: "Old versions out of fear of breaking things",
          text: "Many local providers keep sites on PHP 7.4 because an old plugin or theme doesn't work on PHP 8. There was no official PHP2Shell fix for PHP 7.4.",
        },
        {
          title: "Stores connected to payment gateways",
          text: "WooCommerce stores that take payments through local or international gateways store the connection keys to those gateways on the server. One of the PHP2Shell flaws allows reading the server's memory.",
        },
        {
          title: "Nobody to call",
          text: "The technician who set up the site no longer answers, the nephew who built it went abroad to study, the agency closed. It's the most common situation and the most dangerous one.",
        },
      ],
    },
    {
      h2: "What worked in its favor",
      body: [
        "Most small Dominican sites aren't hosted on their own servers inside the country, but with large international hosting providers. Those providers updated PHP on their shared servers in the days following the patch, in many cases without the client doing anything.",
        "That protects anyone on a supported version. It doesn't protect anyone whose site is pinned to PHP 7.4 or 8.1, because the provider can't update what the client chose to keep old. Nor does it protect anyone with their own server or a VPS that nobody manages.",
      ],
    },
    {
      h2: "What a Dominican business should do this week",
      bullets: [
        {
          title: "Ask your provider",
          text: "Does my site use PHP? Which exact version? Does it already include the fixes for CVE-2026-109618 and CVE-2026-109619? If they don't answer within two days, that's also information.",
        },
        {
          title: "If you're on PHP 7.4, 8.0 or 8.1, plan the migration",
          text: "There's no official fix for those versions. We explain the options in a separate article.",
        },
        {
          title: "Check your site's administrators",
          text: "Log in to the WordPress dashboard and check that there are no administrator users you don't recognize.",
        },
        {
          title: "Change your gateway keys if in doubt",
          text: "If you run a store and can't confirm that your server was updated in time, ask your payment gateway to generate new keys for you.",
        },
        {
          title: "Report it if you see something odd",
          text: "The CNCS receives incident reports. If your site was altered or you suspect an intrusion, reporting it helps detect patterns that affect others.",
        },
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "Diario Libre, October 22, 2026",
          text: "“Vulnerabilidad PHP2Shell provoca ataques informáticos masivos” (PHP2Shell vulnerability triggers massive cyberattacks).",
        },
        {
          title: "Ensegundos, October 21, 2026",
          text: "AFP report on sites taken offline around the world.",
        },
        {
          title: "Almomento",
          text: "International alert over the PHP flaws and malicious traffic detected by Cloudflare.",
        },
        {
          title: "CDN, October 16, 2026",
          text: "CNCS figures on blocked attack attempts and statements from its director.",
        },
        {
          title: "National Cybersecurity Center (cncs.gob.do)",
          text: "Past alerts about PHP, WordPress and phpMyAdmin.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Were any Dominican government sites affected?",
      a: "We found no public reports of it. Nor of precautionary shutdowns like those in Europe. For official information, the source is the CNCS.",
    },
    {
      q: "My site was built by someone who no longer answers. What do I do?",
      a: "If you have access to the hosting panel, you can see and change the PHP version yourself, or ask the hosting support team. If you have no access to anything, the first step is to recover the credentials for the domain and the hosting, because without them you can't protect the site.",
    },
    {
      q: "Should I report it to the CNCS if my site was attacked?",
      a: "Public institutions are required to report incidents, and the financial sector has its own regulation. For other private companies we found no equivalent general obligation, but reporting it is advisable. We explain it in detail in the article on Dominican law.",
    },
  ],
  related: [
    {
      to: "blogPhpRevisar",
      label: "How to tell if your PHP site is vulnerable and what to do today",
    },
    {
      to: "blogLeyRd",
      label: "What Dominican law says if your website gets hacked",
    },
    {
      to: "blogPrecios",
      label: "How much a website costs in the Dominican Republic",
    },
  ],
  cta: {
    heading: "Is your site left with nobody looking after it?",
    text: "We're a studio in Santo Domingo. We'll review your site and tell you what state it's in and what it needs, even if we didn't build it.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the article about PHP2Shell in the Dominican Republic and I want to check my site:",
  },
};
