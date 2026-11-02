import type { PageContent } from "../types";

export const blogLeyRdEn: PageContent = {
  eyebrow: "Article · Dominican Republic",
  h1: "What Dominican law says if your website gets hacked",
  lead: [
    "Crises like PHP2Shell leave a question almost no Dominican business has asked itself before needing it: if someone gets into my site and takes my customers' data, what does the law require me to do, whom do I notify and what can I claim?",
    "This article summarizes the legal framework in force in the Dominican Republic as of October 2026, gaps included. It isn't legal advice: if you have an incident involving customer data, talk to a lawyer. But it will help you know what to ask them.",
  ],
  sections: [
    {
      h2: "The rules that matter, at a glance",
      bullets: [
        {
          title: "Law 53-07 on high-technology crimes and offenses",
          text: "It makes unauthorized access to systems, sabotage and data theft, among others, criminal offenses. It's the law that protects you as a victim. According to the CNCS, its update is about to be sent to Congress.",
        },
        {
          title: "Law 172-13 on personal data protection",
          text: "It places a duty of security and a duty of confidentiality on whoever handles personal data. It's the law that binds you as the party responsible for your customers' data.",
        },
        {
          title: "Decree 313-22: National Cybersecurity Strategy 2030",
          text: "It defines the state's cybersecurity policy and the framework in which the CNCS operates.",
        },
        {
          title: "Decree 685-22",
          text: "It establishes mandatory notification of cybersecurity events and incidents for the public administration.",
        },
        {
          title: "Cyber and Information Security Regulation (Monetary Board, 2018)",
          text: "Specific rules for banks and financial system entities, which have their own, stricter obligations.",
        },
      ],
    },
    {
      h2: "If you're a public institution",
      body: [
        "You're required to notify. Decree 685-22 made notification of cybersecurity events and incidents mandatory in the public administration, and the CNCS published a guide for identifying and reporting incidents. If a .gob.do site was compromised by PHP2Shell or any other route, reporting it to the CNCS isn't optional.",
      ],
    },
    {
      h2: "If you're a bank or a financial entity",
      body: [
        "You're governed by the Cyber and Information Security Regulation approved by the Monetary Board in November 2018, supervised by the Superintendency of Banks. It carries its own risk and incident management obligations. If you're in this sector, your compliance department already knows it; if you're a technology provider to a financial entity, ask them what it requires of you.",
      ],
    },
    {
      h2: "If you're a private company in any other sector",
      body: [
        "This is where the gap is. Law 172-13 requires you to protect the personal data you handle, but, unlike laws such as the European regulation, it doesn't establish a general obligation to notify an authority of breaches within a set deadline. Among other reasons, because the country has no independent data protection authority: the Superintendency of Banks acts as the oversight body only for credit information companies.",
        "Having no notification deadline doesn't mean having no responsibility. Law 172-13's duty of security is still there: if your customers' data leaks because your site was running an unpatched PHP version for weeks after a worldwide alert, it will be hard to argue that you took reasonable security measures.",
        "There was a cybersecurity bill in the Senate, and the CNCS director has said publicly that the country needs a law that formalizes obligations and protections. At the time of writing we found no record of it having been passed. It's reasonable to expect that, when it comes, it will include notification obligations for the private sector as well.",
      ],
    },
    {
      h2: "What to do if your site gets hacked",
      subsections: [
        {
          h3: "The first hours",
          body: [
            "Contain the damage: change the passwords for the hosting, the panel, the database and the payment gateways, and take the site offline if needed. But before deleting or restoring anything, save a copy of the server logs and the modified files. It's the evidence of what happened, and you'll need it if you file a complaint or a customer makes a claim.",
          ],
        },
        {
          h3: "Reporting",
          body: [
            "You can report the incident to the CNCS through its CSIRT, which receives reports and helps detect patterns affecting others. If a crime occurred — data theft, fraud, extortion —, the criminal complaint is filed with the National Police's High-Technology Crimes Investigation Department (DICAT) or with the Public Prosecutor's specialized office for high-technology crimes (PEDATEC).",
          ],
        },
        {
          h3: "Your customers",
          body: [
            "Even if the law doesn't give you a deadline, if customer data was exposed, telling them is the right thing to do and usually the smartest. A customer who hears it from you can change their passwords and watch out for fraud attempts. A customer who hears it from the press or through a fraud stops being a customer.",
          ],
        },
        {
          h3: "Your provider",
          body: [
            "Check what your contract says with whoever developed or maintains the site. If you had a maintenance contract that included security updates and they weren't applied, that's a conversation with your provider and, if needed, with your lawyer. If you had no maintenance contract, it's a conversation you still need to have with yourself.",
          ],
        },
      ],
    },
    {
      h2: "What to do before it happens",
      bullets: [
        {
          title: "Know what personal data you handle and where it is",
          text: "Contact forms, orders, appointments, histories. If you don't know what you store, you can't protect it or know what leaked.",
        },
        {
          title: "Keep only what you need",
          text: "Data you don't have can't leak. If your form stores ID numbers or dates of birth that nobody uses, stop asking for them.",
        },
        {
          title: "Put security updates in the contract",
          text: "Get it in writing who applies the updates, within what timeframe and what happens if they aren't applied.",
        },
        {
          title: "Have a real privacy policy",
          text: "One that says what data you collect, what for and whom you share it with. Law 172-13 recognizes people's right to be informed about how their data is used, and a clear policy is the practical way to comply. It's also the first thing someone will read if there's a problem.",
        },
        {
          title: "Keep the contacts at hand",
          text: "Your technical provider's, your lawyer's and the CNCS reporting channel. The middle of an incident isn't the time to go looking for them.",
        },
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "Law 53-07 and Law 172-13",
          text: "Legal texts in force on high-technology crimes and personal data protection.",
        },
        {
          title: "National Cybersecurity Center",
          text: "Incident identification and reporting guide, National Cybersecurity Strategy 2030 and the status of the Law 53-07 update.",
        },
        {
          title: "Superintendency of Banks",
          text: "The Monetary Board's Cyber and Information Security Regulation (2018).",
        },
        {
          title: "Acento and El Caribe",
          text: "Statements by the CNCS director on the need for a cybersecurity law.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Can I be fined if my site gets hacked?",
      a: "Law 172-13 provides for penalties for breaching its obligations, including the security one. Whether they apply to you depends on the specific circumstances, and that's a question for a lawyer.",
    },
    {
      q: "Do I have to tell my customers if their data leaked?",
      a: "For companies outside the public and financial sectors, we found no general legal obligation with a fixed deadline. Even so, telling them is advisable so they can protect themselves.",
    },
    {
      q: "Does the CNCS help private companies?",
      a: "The CNCS receives incident reports and publishes alerts for the whole country. Its main role is protecting the state, but reporting a private incident helps detect attacks that may be affecting others.",
    },
  ],
  related: [
    {
      to: "blogPhpRd",
      label: "How PHP2Shell affected the Dominican Republic",
    },
    {
      to: "blogCertificadosRd",
      label: "Digital certificates in the Dominican Republic after eMudhra",
    },
    {
      to: "blogSemanaNegra",
      label: "Web servers' black week: what to learn",
    },
  ],
  cta: {
    heading: "Does your site store customer data?",
    text: "We'll help you review what data your site stores, where, and how it's protected. We leave the legal side to your lawyer; the technical side, to us.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the article about Dominican law and web security, and I want to check my site:",
  },
};
