import type { PageContent } from "../types";

export const blogEn: PageContent = {
  eyebrow: "Blog",
  h1: "Articles on web development in the Dominican Republic",
  lead: [
    "We write about the decisions you need to make before hiring anyone — what a site really costs, which technology fits and how to read a quote — and about what comes after: how to keep it secure when something breaks on the internet.",
    "Few, long articles instead of many short ones. If something adds nothing you can't find elsewhere, we don't publish it.",
  ],
  sections: [
    {
      h2: "About Grolow",
      body: [
        "Who Grolow is, how it works and the terms it puts in writing before you pay anything.",
      ],
      bullets: [
        {
          title: "What Grolow is: the software company that builds and maintains",
          to: "blogQueEsGrolow",
          text: "What it does, what it doesn't, how it works, who is behind it and how to reach it.",
        },
        {
          title: "Who is behind Grolow and how the work is split",
          to: "blogQuienEsGrolow",
          text: "The founder, who writes the code and who answers when something breaks.",
        },
        {
          title: "What Grolow's monthly fee covers, point by point",
          to: "blogMensualidad",
          text: "What's included, what isn't, what it costs and how to cancel.",
        },
        {
          title: "Who owns your domain, your code and your data",
          to: "blogPropiedad",
          text: "Asset by asset, and what you take with you at no cost if you leave.",
        },
        {
          title: "What Grolow doesn't do, and who to look for",
          to: "blogLoQueNoHace",
          text: "Branding, marketing and WooCommerce or Shopify stores: who to look for in each case.",
        },
      ],
    },
    {
      h2: "Guides to help you decide",
      bullets: [
        {
          title: "Digital catalogue or online store: what your business in the DR needs",
          to: "blogCatalogoTienda",
          text: "Including the case where a free tool is enough.",
        },
        {
          title: "How to accept card payments on your website in the Dominican Republic",
          to: "blogPagosRd",
          text: "Azul, CardNet, payment links and PayPal, and how to choose.",
        },
        {
          title: "Spreadsheet, off-the-shelf software or a custom system: how to decide",
          to: "blogSistemaMedida",
          text: "The signs the spreadsheet is no longer enough, and what custom costs.",
        },
        {
          title: "What to ask before hiring someone for a website or a system",
          to: "blogAntesDeContratar",
          text: "The questions that separate a good provider from a problematic one.",
        },
        {
          title: "Why your business doesn't show up on Google and how to check",
          to: "blogNoApareceGoogle",
          text: "The map and the results, the common causes and how to check them in an afternoon.",
        },
      ],
    },
    {
      h2: "Special: the October 2026 security crisis",
      body: [
        "In ten days, five Nginx flaws, the PHP2Shell vulnerability and the eMudhra certificate authority case all landed at once. We dug into them in seven articles, from the general picture to the practical steps.",
      ],
      bullets: [
        {
          title: "PHP2Shell: what happened to PHP in October 2026",
          to: "blogPhp2shell",
          text: "The flaws explained without jargon, the timeline of the discovery and what is still unclear.",
        },
        {
          title: "How to tell if your PHP site is vulnerable and what to do today",
          to: "blogPhpRevisar",
          text: "The practical guide: check the version, update, mitigate if you can't, and check whether anyone got in.",
        },
        {
          title: "Your site is still on PHP 7.4, 8.0 or 8.1: what to do now",
          to: "blogPhpObsoleto",
          text: "The options for unsupported versions, from best to worst, and how to migrate without breaking the site.",
        },
        {
          title: "The five Nginx flaws of October 2026",
          to: "blogNginx",
          text: "Which configuration triggers each one, how to audit yours and why the severity scores don't match.",
        },
        {
          title: "eMudhra: the certificate authority whose keys fit in a number",
          to: "blogEmudhra",
          text: "How certificate authorities work, what went wrong and how browsers responded.",
        },
        {
          title: "What to check on your servers after the eMudhra case",
          to: "blogCertificados",
          text: "The certificate stores you need to update outside the browser and how to verify them.",
        },
        {
          title: "Web servers' black week: what to learn from it",
          to: "blogSemanaNegra",
          text: "What the three cases have in common, the role of artificial intelligence and five decisions for next time.",
        },
      ],
    },
    {
      h2: "The crisis as seen from the Dominican Republic",
      bullets: [
        {
          title: "How PHP2Shell affected the Dominican Republic",
          to: "blogPhpRd",
          text: "What is and isn't known about the impact in the country, the CNCS context and why the local market is exposed.",
        },
        {
          title: "Digital certificates in the Dominican Republic after eMudhra",
          to: "blogCertificadosRd",
          text: "The difference between your site's certificate and your digital signature, who issues them here and how to protect your e-invoicing one.",
        },
        {
          title: "What Dominican law says if your website gets hacked",
          to: "blogLeyRd",
          text: "The rules in force, what each type of company must do, whom to report to and what to do in the first hours.",
        },
      ],
    },
    {
      h2: "Before you hire a website",
      bullets: [
        {
          title: "How much does a website cost in the Dominican Republic in 2026?",
          to: "blogPrecios",
          text: "The real ranges in the local market, what each one buys, the costs that don't show up in the quote and the warning signs when comparing proposals.",
        },
        {
          title: "WordPress or custom code: which one suits your business",
          to: "blogWordpress",
          text: "A comparison with our conflict of interest disclosed, which acknowledges the cases where WordPress is the right decision and custom development would be overspending.",
        },
      ],
    },
    {
      h2: "Why we publish this",
      body: [
        "Most of the information about prices and technology in this market is written by someone who wants to sell you something, and it shows. We want to sell you something too, so the only way these articles are useful is if they also say what doesn't suit us.",
        "That's why the articles include the cases where the right answer is to hire someone else, or not to hire anyone yet. And in the security series we separate what is confirmed from what isn't, with the sources at the end of each article.",
      ],
    },
  ],
  related: [
    {
      to: "blogPrecios",
      label: "How much a website costs in the Dominican Republic in 2026",
    },
    {
      to: "blogWordpress",
      label: "WordPress or custom code: which one suits your business",
    },
    {
      to: "blogPhp2shell",
      label: "PHP2Shell: what happened to PHP in October 2026",
    },
    { to: "precios", label: "Our prices and what each plan includes" },
  ],
  cta: {
    heading: "Still have a question?",
    text: "If there's something you didn't find in the articles, message us and we'll answer it. If the answer helps more people, it ends up being the next article.",
    label: "Message us on WhatsApp",
    message: "Hi, I read the blog and I have a question:",
  },
};
