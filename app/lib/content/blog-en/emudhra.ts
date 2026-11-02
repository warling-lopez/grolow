import type { PageContent } from "../types";

export const blogEmudhraEn: PageContent = {
  eyebrow: "Article · Security",
  h1: "eMudhra: the certificate authority whose keys fit in a number",
  lead: [
    "The browser padlock works because we trust a small group of companies, the certificate authorities, that guarantee a site is who it says it is. In October 2026 one of them, India's eMudhra, turned out to have eight intermediate certificates with private keys so weak that anyone could calculate them in under a second.",
    "One of those keys was, literally, the number 4. This article explains what a certificate authority is, what went wrong at eMudhra, how Google, Mozilla, Apple and Microsoft responded, and why this matters even if your site has never had a certificate from that company.",
  ],
  sections: [
    {
      h2: "What a certificate authority is",
      body: [
        "When you visit your bank, the browser receives a certificate that says “this server belongs to your bank”. That certificate is signed by a certificate authority. The browser trusts the signature because that authority is on its trust list, the so-called root store.",
        "In practice there's a chain: a heavily protected root certificate signs intermediate certificates, and the intermediates sign the sites' certificates. Whoever holds the private key of a trusted intermediate can manufacture a valid certificate for any domain in the world: your bank, your email or your store.",
        "That's why an intermediate's private key has to be a huge random number, more than a hundred digits long, impossible to guess.",
      ],
    },
    {
      h2: "What went wrong",
      body: [
        "According to Help Net Security, the eight affected keys were numbers smaller than 256. To find any of them you only had to try at most 256 values, something a computer does in a fraction of a second. Researcher Scott Helme recovered keys such as 4, 56 and 115. Qualys estimates that the effective entropy of those P-384 keys was between 3 and 8 bits, when it should be in the hundreds.",
        "The cause lies in a key generation ceremony on April 30, 2025, in which eMudhra created 24 intermediate certificates. A faulty script generated a second set of weak keys with labels similar to the good ones, and staff picked the wrong ones. Of the eight affected, six were for websites (TLS) and two for code signing.",
        "eMudhra admits human error at several steps. It says only one of the eight intermediates reached production, that none issued certificates to customers and that its infrastructure wasn't breached. What nobody can say for sure is whether someone found and used those keys in the 17 months between the ceremony and the discovery.",
      ],
    },
    {
      h2: "How it was discovered and how each party responded",
      bullets: [
        {
          title: "October 17, 2026",
          text: "A researcher known as Wayne reviews the common certificate authority database (CCADB), spots the weak keys, signs a test message with each one and reports it to Apple, Google, Microsoft, Mozilla and eMudhra. Google receives the report at 18:05 UTC and by 19:45 UTC it has already blocked the intermediates in Chrome, without the browser needing an update. Firefox blocks them the same day.",
        },
        {
          title: "October 18",
          text: "eMudhra revokes the certificates. Its president, V. Srinivasan, says they did it in under 14 hours.",
        },
        {
          title: "October 19",
          text: "Apple blocks the certificates. Android gets the block through Google Play Services. Cloudflare learns of the problem that afternoon.",
        },
        {
          title: "October 20",
          text: "Microsoft blocks them. Mozilla's Dennis Jackson makes the case public, and Mozilla withdraws trust in the root certificate that signed the intermediates.",
        },
        {
          title: "October 22",
          text: "eMudhra announces it is leaving the global SSL/TLS certificate business. It estimates that some 30,000 customer certificates will have to be replaced.",
        },
        {
          title: "October 27 (scheduled)",
          text: "Chrome removes the emSign ECC Root CA - G3 root from its trust store. Legitimate certificates that depend on it will stop working in Chrome.",
        },
      ],
    },
    {
      h2: "What saved the day: Certificate Transparency",
      body: [
        "For years, Chrome has required every website certificate to be published in public logs called Certificate Transparency before accepting it. Google verified that there was no certificate chained to the affected intermediates in those logs before the block.",
        "That means that, even if someone had manufactured a fake certificate, Chrome and recent Android apps would have rejected it for not being logged. It's a rare example of a protection designed a decade ago working exactly as intended.",
      ],
    },
    {
      h2: "Why it matters to you even if you don't use eMudhra",
      body: [
        "Browsers updated within hours. The rest of the software didn't. Server applications, scripts that connect to an API, Docker containers, unupdated phones and many embedded devices carry their own list of trusted authorities, and that list doesn't update itself.",
        "Until it's updated, that software keeps trusting the compromised intermediates. An attacker in a position to intercept traffic — a public Wi-Fi network, a compromised router — could impersonate any service to it. Scott Helme summed it up by warning that this could expose user data to anyone able to intercept the traffic.",
        "What needs updating, and how to check it, is in our article on what to check on your servers after the eMudhra case.",
      ],
    },
    {
      h2: "What this case says about the certificate system",
      body: [
        "There are two readings. The pessimistic one: a single company among dozens, through a human error in a script, put the trust of the whole internet at risk for 17 months without anyone noticing. The optimistic one: once it was discovered, the four big browsers acted within three days, Certificate Transparency prevented the worst-case scenario and the company responsible left the market.",
        "Both are true. And they explain why the industry has spent years pushing toward shorter-lived certificates with automatic renewal: the shorter a certificate lives, the less damage one that goes wrong can do.",
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "Google Security Blog",
          text: "Timeline of the Chrome and Android response, the CRLSet block and the withdrawal of the emSign ECC Root CA - G3 root.",
        },
        {
          title: "Help Net Security, October 21",
          text: "Origin of the weak keys, the April 2025 ceremony, eMudhra's exit from the business and the number of affected customers.",
        },
        {
          title: "Qualys and Kudelski Security",
          text: "Analysis of the keys' entropy and list of affected certificates.",
        },
        {
          title: "Cloudflare Blog",
          text: "Impact on its products and a warning not to disable certificate verification.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Could my site have an eMudhra certificate without my knowing?",
      a: "It's possible if your hosting provider or certificate reseller worked with them, although it's uncommon outside India. Click the padlock in your browser and check who issued the certificate. If eMudhra or emSign appears, request a new one before October 27.",
    },
    {
      q: "Did anyone use the keys to attack?",
      a: "There's no public evidence of it. Mozilla said it found no signs of attacks using these certificates in Firefox, Chrome, Edge or Safari. What can't be ruled out is their use against software that doesn't require Certificate Transparency.",
    },
    {
      q: "Why does Chrome remove the whole root if only eight intermediates failed?",
      a: "Because certificate authorities have to demonstrate rigor continuously to stay on the trust list. An error like this in a key ceremony calls into question the company's controls, not just those eight certificates.",
    },
  ],
  related: [
    {
      to: "blogCertificados",
      label: "What to check on your servers after the eMudhra case",
    },
    {
      to: "blogCertificadosRd",
      label: "Digital certificates in the Dominican Republic after eMudhra",
    },
    {
      to: "blogNginx",
      label: "The five Nginx flaws of October 2026",
    },
  ],
  cta: {
    heading: "Don't know who issued your certificate?",
    text: "Send us your domain and we'll tell you who issued it, when it expires and whether it renews automatically. It takes five minutes.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the article about eMudhra and I'd like to check my site's certificate:",
  },
};
