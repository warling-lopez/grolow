import type { PageContent } from "../types";

export const blogPagosRdEn: PageContent = {
  eyebrow: "Guide · Dominican Republic",
  h1: "How to accept card payments on your website in the Dominican Republic",
  lead: [
    "Taking card payments on your website in the Dominican Republic is possible, but it isn't as instant as in other countries. You have to open an account with a payment gateway, meet its requirements and wait for approval, and not every business needs one.",
    "This guide goes through the real options — local gateways, payment links and PayPal —, what you'll be asked for and how to choose. Fees and timelines change, so where there's no confirmed figure, the article says so and tells you who to ask.",
  ],
  sections: [
    {
      h2: "First: do you really need to take payment online?",
      body: [
        "Many businesses in the country sell very well with orders over WhatsApp and payment by bank transfer. If your customers already know you, buy regularly or prefer to talk before paying, a gateway can be a cost you never recover.",
        "You need online payment when you lose sales because you can't charge on the spot: customers who buy at night, people from another province who won't send a transfer without knowing you, or enough volume that confirming payments by hand becomes a job. If you're unsure, start with a catalogue and WhatsApp orders, and add payment later.",
      ],
    },
    {
      h2: "Option 1: an integrated payment gateway",
      body: [
        "This is what lets the customer enter their card on your site and have the payment approved right there. In the country, the two big ones are Azul, run by Servicios Digitales Popular, a subsidiary of Banco Popular, and CardNet, which works with several affiliated banks. There are newer options too, such as PixelPay.",
        "The guides published by companies in the sector agree on what they usually ask for:",
      ],
      bullets: [
        {
          title: "An active RNC",
          text: "Your business has to be registered with the DGII, the tax authority. It's the requirement that most often holds back small businesses selling informally.",
        },
        {
          title: "A bank account in the business's name",
          text: "It's where sales are settled. Azul tends to prefer an account at Banco Popular; CardNet works with its affiliated banks.",
        },
        {
          title: "Business documents",
          text: "For companies, a current commercial registration and the company's documents. For individuals, their ID card and proof of commercial activity.",
        },
        {
          title: "A working website",
          text: "With your products, your contact details and published privacy, returns and shipping policies.",
        },
      ],
    },
    {
      h2: "What they won't tell you on the first page",
      bullets: [
        {
          title: "Approval isn't immediate",
          text: "Sector guides mention timelines ranging from a few business days to several weeks. Plan for it before announcing you take payments online.",
        },
        {
          title: "Fees vary",
          text: "Different sources publish different per-transaction percentages. Ask the gateway for the rate in writing, with every charge: per transaction, monthly and setup fees if there are any.",
        },
        {
          title: "The account is yours, not your developer's",
          text: "The gateway account must be in your business's name. The money goes straight to your bank. If someone suggests collecting through their own account, don't accept it.",
        },
      ],
    },
    {
      h2: "Option 2: payment links",
      body: [
        "If you don't need a full store, you can charge with a link: you generate a link for the amount, send it over WhatsApp and the customer pays with their card. Several Dominican banks and the gateways themselves offer payment links, and Visa promotes Clink in the country, a link-based payment service for domestic and international cards.",
        "It's the simplest way to start taking card payments without changing your website. The downside is that it's still manual: someone has to generate the link for each order.",
      ],
    },
    {
      h2: "Option 3: PayPal",
      body: [
        "PayPal works well for charging customers abroad, who already have it and trust it. Since 2022, according to Diario Libre, Dominican users can withdraw their balance to banks in the country.",
        "For local customers it's less common: many people don't have an account and prefer to pay directly with their card. Check the current fees on PayPal's page for the Dominican Republic, as they change with the type of payment and the currency.",
      ],
    },
    {
      h2: "How to choose",
      bullets: [
        {
          title: "You sell occasionally or to order",
          text: "Payment links over WhatsApp. You don't need an integrated gateway.",
        },
        {
          title: "You sell often within the country",
          text: "A local gateway integrated into an online store.",
        },
        {
          title: "You sell to customers abroad",
          text: "PayPal, on its own or alongside the local gateway.",
        },
        {
          title: "You don't have an RNC",
          text: "Formalise first. Without an RNC, local gateways aren't an option, and it's better to sort that out than to build a store that can't take payments.",
        },
      ],
    },
    {
      h2: "What Grolow does in this part",
      body: [
        "In Full Ecommerce, Grolow connects the store to the payment gateway and makes sure it keeps working when the gateway changes something. You open the gateway account yourself, in your business's name, and Grolow tells you what you'll be asked for so you don't waste time.",
        "If you don't need online payment yet, the Digital Catalogue lets you receive ready-made orders on WhatsApp and charge the way you already do. It's cheaper and can be extended later.",
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "Takum and Vendabo",
          text: "Guides published in 2026 on the requirements, timelines and comparisons of Azul, CardNet and PixelPay.",
        },
        {
          title: "Diario Libre, 20 October 2022",
          text: "PayPal withdrawals to Dominican banks.",
        },
        {
          title: "Visa Dominican Republic",
          text: "The Clink link-payment service for small and medium-sized businesses.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Can I take card payments without an RNC?",
      a: "With local gateways, no: an active RNC is one of their requirements. Some payment-link services have different requirements; check with them directly.",
    },
    {
      q: "How much do Azul or CardNet charge per transaction?",
      a: "Published figures vary by source and type of business. Ask the gateway for the full rate in writing before deciding.",
    },
    {
      q: "Can Grolow open the gateway account for me?",
      a: "No, and it shouldn't: the account has to be in your business's name. Grolow guides you through the requirements and connects your store once the account is approved.",
    },
  ],
  related: [
    { to: "blogCatalogoTienda", label: "Digital catalogue or online store: what your business needs" },
    { to: "blogPropiedad", label: "Who owns your domain, your code and your data" },
    { to: "blogCertificadosRd", label: "Digital certificates in the Dominican Republic" },
  ],
  cta: {
    heading: "Want to know whether online payment makes sense for you?",
    text: "Tell Grolow how you sell today and how much. It'll tell you whether you need a gateway, a payment link or to carry on as you are.",
    label: "Message us on WhatsApp",
    message: "Hi, I read the guide to card payments in the DR and I'd like to know what suits me:",
  },
};
