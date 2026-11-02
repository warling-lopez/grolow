import type { PageContent } from "../types";

export const blogCertificadosRdEn: PageContent = {
  eyebrow: "Article · Dominican Republic",
  h1: "Digital certificates in the Dominican Republic after eMudhra",
  lead: [
    "The case of the Indian certificate authority eMudhra, which had eight certificates with private keys that could be guessed, didn't involve any Dominican entity. But in the Dominican Republic digital certificates are no longer just a technical topic: with electronic invoicing, thousands of companies now have one and depend on it to invoice.",
    "This article explains the two types of certificate a Dominican business uses, who issues and oversees them here, and what the eMudhra case teaches about how to look after them.",
  ],
  sections: [
    {
      h2: "Two different certificates with the same name",
      body: [
        "In everyday conversation they get mixed up, but they're different things with different rules.",
      ],
      subsections: [
        {
          h3: "Your website's certificate (SSL/TLS)",
          body: [
            "It's the one that puts the padlock in the browser and proves your site is your site. It's issued by international certificate authorities that are on Chrome's, Safari's, Firefox's and Edge's trust lists — Let's Encrypt, Sectigo, DigiCert, among others —, and the rules are set by the browsers, not by a government.",
            "This is the type of certificate that was at stake in the eMudhra case. As far as we know, no Dominican entity is on those trust lists, so .do sites use international certificate authorities, just like the rest of the world.",
          ],
        },
        {
          h3: "Your digital signature certificate",
          body: [
            "It's the one that identifies you or your company to sign electronic documents with legal validity: contracts, official procedures and, above all, electronic tax receipts. In the Dominican Republic it's governed by Law 126-02 on electronic commerce, documents and digital signatures, and it's issued by certification entities authorized and supervised by INDOTEL, the telecommunications regulator.",
            "Among the entities usually mentioned are Avansi, which operates with Viafirma technology, and the Santo Domingo Chamber of Commerce and Production with its Digifirma service. Before signing up, confirm the current list on INDOTEL's website, because it can change.",
          ],
        },
      ],
    },
    {
      h2: "Why digital signatures are no longer optional",
      body: [
        "Law 32-23 on electronic invoicing and its regulation, Decree 587-24, require issuing digitally signed electronic tax receipts (e-CF), and the obligation has been extended in phases to more taxpayers. Each e-CF carries the issuer's signature, and that signature is made with a digital certificate issued by an authorized entity.",
        "That turns the certificate into an operational piece: if it expires, is revoked or is lost, your invoicing system can no longer issue valid receipts. And if someone copies it, they can issue receipts in your name.",
      ],
    },
    {
      h2: "What eMudhra teaches the Dominican ecosystem",
      bullets: [
        {
          title: "Trust depends on the key ceremony",
          text: "eMudhra wasn't hacked. A faulty script generated weak keys and staff picked the wrong ones during a key generation ceremony. Every digital signature is only as trustworthy as the controls of whoever generates and safeguards its keys. That's why it matters that entities are audited and supervised, which is the role the law assigns to INDOTEL.",
        },
        {
          title: "Errors can go unnoticed for a long time",
          text: "eMudhra's weak keys were in circulation for 17 months until an independent researcher spotted them by reviewing public data. Transparency — certificates and their data being reviewable from the outside — is what made the discovery possible.",
        },
        {
          title: "Validation and revocation are the safety net",
          text: "What protected users was that browsers could block the certificates within hours. In the digital signature world, the equivalent is checking the certificate's status: the government launched Validafirma, a platform to verify whether a certificate or electronic seal is valid, expired or revoked.",
        },
        {
          title: "Switching providers has to be possible",
          text: "About 30,000 eMudhra customers have to replace their certificates because the company left the business. If your certification entity disappeared tomorrow, would you know how long it takes to get a new certificate and load it into your invoicing system?",
        },
      ],
    },
    {
      h2: "How to look after your digital signature certificate",
      body: [
        "Most problems with signature certificates in small businesses don't come from sophisticated flaws, but from how they're handled day to day.",
      ],
      bullets: [
        {
          title: "Don't send it over WhatsApp or email",
          text: "The certificate file (usually .p12 or .pfx) together with its password is your signature. Sending it by chat to your accountant or your invoicing system provider is like handing them a book of blank signed checks.",
        },
        {
          title: "Know where it's installed",
          text: "Write down which devices and systems it's loaded on: the invoicing software, the accounting computer, the provider's server. If an employee leaves or a provider changes, you'll know what to revoke.",
        },
        {
          title: "Note the expiry date",
          text: "Set a reminder a month before. An expired certificate stops electronic invoicing the same day.",
        },
        {
          title: "If you suspect it was copied, revoke it",
          text: "Ask your certification entity for a revocation and a new certificate. It's cheaper than explaining to the DGII, the tax authority, receipts you didn't issue.",
        },
        {
          title: "Demand the same of your invoicing provider",
          text: "If your invoicing system stores your certificate on its servers, ask how it protects it, who has access and what technology it uses. If that system runs on PHP, also ask whether it has already applied the PHP2Shell fixes.",
        },
      ],
    },
    {
      h2: "And your website's certificate",
      body: [
        "For your site's padlock, the advice is the same as in any country: have it renew itself. Most hosts do it with Let's Encrypt at no cost. Click the padlock and check who issued it and when it expires; if someone installs it by hand once a year, that's the process worth changing.",
        "If your site connects to the DGII, a payment gateway or any other service from the server, the eMudhra case also affects you: the server needs to keep its list of trusted authorities up to date. We explain it in the guide on what to check after eMudhra.",
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "Law 126-02 on electronic commerce, documents and digital signatures",
          text: "Legal framework for certification entities in the Dominican Republic.",
        },
        {
          title: "Law 32-23 and Decree 587-24",
          text: "Electronic invoicing obligation with digitally signed receipts.",
        },
        {
          title: "El Caribe and DPL News",
          text: "Launch of the Validafirma platform.",
        },
        {
          title: "Help Net Security and Google Security Blog",
          text: "Details of the eMudhra case, its causes and the number of affected customers.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Did eMudhra issue certificates in the Dominican Republic?",
      a: "We found no relationship between eMudhra and Dominican entities. The case affected website certificates issued by that company in any country and the software that trusted them.",
    },
    {
      q: "Does my e-invoicing certificate work for my site's padlock?",
      a: "No. They're different certificates, issued for different uses. The signature one identifies you to sign documents; the site one identifies your server to browsers.",
    },
    {
      q: "Who authorizes certification entities in the country?",
      a: "INDOTEL, under Law 126-02. Confirm the current list of authorized entities on its website before getting a certificate.",
    },
  ],
  related: [
    { to: "blogEmudhra", label: "What happened with the eMudhra certificate authority" },
    {
      to: "blogCertificados",
      label: "What to check on your servers after the eMudhra case",
    },
    {
      to: "blogLeyRd",
      label: "What Dominican law says if your website gets hacked",
    },
  ],
  cta: {
    heading: "Is your invoicing system a mystery?",
    text: "If you don't know where your certificate is or who has access to it, we'll help you sort it out and ask your provider the right questions.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the article about digital certificates in the DR and I have a question:",
  },
};
