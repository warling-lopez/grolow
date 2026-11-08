import type { PageContent } from "../types";

export const blogMensualidadEn: PageContent = {
  eyebrow: "About Grolow",
  h1: "What Grolow's monthly fee covers, point by point",
  lead: [
    "Every Grolow project ends in a monthly fee. It's not a hidden charge: it's half the service. Grolow builds the software and then keeps it running, and the monthly fee is what pays for that second half.",
    "This article explains what's included, what isn't, what it costs and why it's worth paying even when it seems that “nothing is happening”. It's the same information Grolow hands over in writing before you sign.",
  ],
  sections: [
    {
      h2: "The short answer",
      body: [
        "The monthly fee covers everything technical so the system stays online, secure and up to date: servers, database, domain, security certificates, backups, monitoring, updates and a fixed number of content changes per month. It starts at US$45 a month, and for business websites it can also be paid in pesos, RD$2,500 a month.",
        "What it doesn't cover is new features, redesigns, content, social media or advertising. Those are quoted separately, and you're told beforehand, not after you've asked for them.",
      ],
    },
    {
      h2: "What's included",
      bullets: [
        {
          title: "Infrastructure",
          text: "The hosting where the system lives and the database where your products, customers or orders are stored. Grolow contracts them, pays for them and manages them.",
        },
        {
          title: "Domain renewal",
          text: "Your domain, registered in your name, is renewed every year without you having to remember. It's one of the most common reasons sites “disappear” in the country.",
        },
        {
          title: "Daily backups",
          text: "Automatic, every day, with periodic restore tests. A backup that was never tested is useless on the day you need it.",
        },
        {
          title: "Downtime monitoring",
          text: "If the system stops responding, Grolow finds out, instead of hearing about it from one of your customers.",
        },
        {
          title: "Security and certificates",
          text: "Security updates, the HTTPS certificate that puts the padlock in the browser and the fixes needed when a vulnerability appears.",
        },
        {
          title: "Provider changes",
          text: "The platforms your system depends on change versions and rules. Adapting to those changes so the system keeps working is part of the monthly fee.",
        },
        {
          title: "Content changes",
          text: "Text, images, opening hours or contact details you can't change yourself from your dashboard: one a month on the Digital Catalogue and three on Ecommerce. Products and prices you manage yourself from the dashboard, whenever you like.",
        },
        {
          title: "Bug fixes",
          text: "If something fails because of a mistake of Grolow's, it's fixed at no cost while the monthly fee is active.",
        },
      ],
    },
    {
      h2: "What's not included",
      body: [
        "New features, redesigns, copywriting or photography, social media management, ad campaigns, support for third-party software Grolow didn't install, and recovering data lost because of something the client did.",
        "All of that is quoted separately, by the hour or by project. What matters is that the list exists and you have it before signing: you don't find out something “wasn't included” after you've asked for it.",
      ],
    },
    {
      h2: "What it costs",
      bullets: [
        {
          title: "Business website",
          text: "US$45 a month, or RD$2,500 a month in local currency. Includes hosting, domain and maintenance.",
        },
        {
          title: "Digital Catalogue",
          text: "US$45 a month.",
        },
        {
          title: "Full Ecommerce",
          text: "From US$80 a month, depending on volume and integrations. It also includes a monthly report.",
        },
        {
          title: "Custom systems",
          text: "Calculated from the infrastructure the system uses and written into the proposal.",
        },
      ],
    },
    {
      h2: "How it's billed and how to cancel",
      body: [
        "It's charged on the 1st of each month, in advance, from the moment the project is delivered, by local bank transfer, PayPal or Stripe.",
        "There's no lock-in contract. You can cancel whenever you like with 30 days' written notice, with no penalty. When you cancel, Grolow hands over everything that's yours — database, code, credentials and the domain — at no cost.",
        "If the monthly fee is more than 30 days late, Grolow gives written notice. At 45 days it hands over all the assets and stops covering the infrastructure. But it never deletes your data without first handing you the full export.",
      ],
    },
    {
      h2: "Why you pay even when nothing happens",
      body: [
        "It's the most reasonable objection, and it deserves an honest answer. The first two or three months after launch concentrate almost all the problems; those adjustments are already included in the project price. After that the system stabilises and the work becomes preventive.",
        "Nothing happening is the result of that work. In October 2026, for example, a critical vulnerability in PHP forced thousands of sites around the world into emergency updates, and a certificate authority had to withdraw certificates that servers everywhere depended on. The sites with someone looking after that didn't even notice. The ones without did.",
        "Paying the monthly fee is paying not to have to notice.",
      ],
    },
    {
      h2: "How to compare it with other maintenance offers",
      body: [
        "In the Dominican Republic there's maintenance of every kind: from “first year free” to monthly plans that only update WordPress plugins. To compare properly, ask these four questions to anyone, Grolow included:",
      ],
      bullets: [
        {
          title: "What exactly does it include, in writing?",
          text: "If the answer is “everything you need”, it includes nothing specific.",
        },
        {
          title: "Is the domain in my name?",
          text: "If it's in the provider's name, the maintenance is also a way of keeping you locked in.",
        },
        {
          title: "What happens if I stop paying?",
          text: "Does the site go down and everything is lost, or do they hand you your data?",
        },
        {
          title: "Who answers if something breaks, and how fast?",
          text: "Ask for the response time in writing, not a “we'll get to you quickly”.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Can I hire Grolow for a project without a monthly fee?",
      a: "Grolow's way of working is to build and operate, so projects end in a monthly fee. If you'd rather manage it yourself, it's best to say so at the start to see whether it fits.",
    },
    {
      q: "Does the monthly fee go up over time?",
      a: "Not without notice. If a system's usage goes beyond the normal in traffic or data volume, Grolow warns you first and the fee is adjusted by mutual agreement.",
    },
    {
      q: "Can I pay in Dominican pesos?",
      a: "Yes. Local clients pay in pesos; the business website also has a fixed monthly fee in pesos, RD$2,500.",
    },
  ],
  related: [
    { to: "blogPropiedad", label: "Who owns your domain, your code and your data" },
    { to: "blogSemanaNegra", label: "Web servers' black week of October 2026" },
    { to: "blogQueEsGrolow", label: "What Grolow is and what it does" },
  ],
  cta: {
    heading: "Want to see the full list for your case?",
    text: "Tell Grolow what you need and you'll get in writing what your monthly fee would cover and what it would cost.",
    label: "Message us on WhatsApp",
    message: "Hi, I read what Grolow's monthly fee covers and I'd like to know how it would work in my case:",
  },
};
