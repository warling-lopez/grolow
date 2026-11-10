import type { PageContent } from "../types";

export const blogPropiedadEn: PageContent = {
  eyebrow: "About Grolow",
  h1: "Who owns your domain, your code and your data when you work with Grolow",
  lead: [
    "There's a story that keeps repeating in the Dominican Republic: a business wants to switch web providers and discovers the domain is in the agency's name, it has no access to the code and its data sits in an account it doesn't control. Leaving costs money, or simply isn't possible.",
    "Grolow works the other way round: the client owns everything, and Grolow operates it. This article explains what that means in practice, asset by asset, and what happens on the day you decide to leave.",
  ],
  sections: [
    {
      h2: "Owning is not the same as operating",
      body: [
        "The confusion comes from mixing two things. Owning an asset means it's in your name and you can take it with you. Operating it means making sure it works: renewing it, updating it, keeping an eye on it.",
        "Many providers operate and also keep the ownership. Others give you the ownership and leave you alone with the operation. Grolow separates the two: ownership is yours from the start, and Grolow does the operating for as long as the relationship lasts, so you don't have to deal with technical accounts.",
      ],
    },
    {
      h2: "Asset by asset",
      bullets: [
        {
          title: "The domain",
          text: "It's always registered with your name and details as the legal registrant. Never in the name of Grolow or its founder. Grolow manages the registrar account and renews it every year.",
        },
        {
          title: "The code",
          text: "Once the final payment is received, you own 100% of the code developed for your project, including the full repository with all its history.",
        },
        {
          title: "The database",
          text: "Your products, customers, orders or appointments are yours. Grolow stores and backs them up, but doesn't use them for anything else.",
        },
        {
          title: "The payment gateway account",
          text: "If your system takes card payments, the gateway account is in your name and you control it. The money goes straight to your bank, not through Grolow.",
        },
        {
          title: "Google Analytics, your Google Business Profile and Meta",
          text: "They're yours. If you ask, Grolow joins as a collaborator to help, never as the owner.",
        },
        {
          title: "The design",
          text: "Your project's graphic design is yours.",
        },
        {
          title: "Hosting",
          text: "It's a service, not an asset. Grolow contracts and operates it as part of the monthly fee.",
        },
      ],
    },
    {
      h2: "The one exception, explained",
      body: [
        "Grolow uses internal components and libraries that it reuses across projects: pieces of code that solve common problems, like access to a dashboard or sending a form. Those pieces remain Grolow's, because it uses them in other projects.",
        "But it licenses them to you perpetually, irrevocably and at no extra cost for your project. In practice, that means you can modify them and hire any other developer to keep working on them. Nothing switches off the day you leave.",
      ],
    },
    {
      h2: "What happens if you decide to leave",
      body: [
        "You can cancel the monthly fee whenever you like, with 30 days' notice and no penalty. Within 10 business days at most, Grolow hands over, at no cost:",
      ],
      bullets: [
        {
          title: "The full database",
          text: "Every table, not just a spreadsheet with your products.",
        },
        {
          title: "The repository with its history",
          text: "The complete code, with every change made since the beginning.",
        },
        {
          title: "All the credentials",
          text: "Access to every service your system uses.",
        },
        {
          title: "The domain transfer code",
          text: "And help until the domain sits in the account you choose.",
        },
        {
          title: "The technical documentation",
          text: "How the system is deployed and what each configuration variable is for, so your next provider doesn't start blind.",
        },
      ],
    },
    {
      h2: "While you move, the system keeps running",
      body: [
        "Grolow keeps the system online until the transfer is complete, up to a maximum of 30 days from the notice. It then deletes its copies 30 days after the handover, unless you ask it to keep them.",
        "The cost of leaving Grolow is zero. No penalties, no assets held back.",
      ],
    },
    {
      h2: "Why Grolow does it this way",
      body: [
        "Because keeping a client hostage with their own domain is a way of misleading them, and Grolow's main rule is never to mislead the client.",
        "And for a practical reason: a client who knows they can leave whenever they want stays because the service works for them, not because there's no way out. That's the only kind of client Grolow wants to have.",
      ],
    },
    {
      h2: "How to check who owns your domain today",
      body: [
        "If you already have a site with another provider, you can check in five minutes. For .com domains, look up your domain in a WHOIS or RDAP lookup tool: the registrant field shows whose name it's in, though sometimes it's hidden for privacy. For .do domains, check with NIC.DO, which manages that extension in the country.",
        "If it shows neither your name nor your company's, ask your provider in writing whose name it's in and what it takes to move it to yours. The answer tells you a lot about the relationship.",
      ],
    },
  ],
  faq: [
    {
      q: "Can I have access to the technical accounts even though Grolow operates them?",
      a: "Ownership of the domain, the code and the data is yours from the start. If you ask for the credentials or an export of your data, Grolow gives them to you.",
    },
    {
      q: "What if Grolow closes?",
      a: "Grolow commits to giving 60 days' notice and handing everything over at no cost, just as if you were the one leaving.",
    },
    {
      q: "Can I hire another developer to work on what Grolow built?",
      a: "Yes. The code is yours, it's documented and it doesn't use closed systems. Any competent developer can pick it up.",
    },
  ],
  related: [
    { to: "blogMensualidad", label: "What Grolow's monthly fee covers" },
    { to: "blogAntesDeContratar", label: "What to ask before hiring a website or a system" },
    { to: "blogQuienEsGrolow", label: "Who is behind Grolow" },
  ],
  cta: {
    heading: "Is your domain in someone else's name?",
    text: "Message Grolow. It'll help you understand what you have, where it is and what it takes to get it into your name, whether you hire Grolow or not.",
    label: "Message us on WhatsApp",
    message: "Hi, I read about owning the domain and the code, and I'd like to check my case:",
  },
};
