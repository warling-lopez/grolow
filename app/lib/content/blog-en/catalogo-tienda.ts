import type { PageContent } from "../types";

export const blogCatalogoTiendaEn: PageContent = {
  eyebrow: "Guide",
  h1: "Digital catalogue or online store: what your business in the DR needs",
  lead: [
    "If you sell products in the Dominican Republic, chances are you sell through WhatsApp and Instagram today, sending photos and prices by hand. Sooner or later the question comes up: do I build an online store? A catalogue? Or do I carry on as I am?",
    "This article helps you answer it. It includes the case where the right answer is a free tool and not hiring anyone, which for many businesses is the best option.",
  ],
  sections: [
    {
      h2: "The difference in one line",
      body: [
        "A digital catalogue shows your products and lets the customer put together an order, which reaches you on WhatsApp so you can confirm it and charge the way you already do. An online store does the same and also takes payment: the customer pays by card on the site and the money lands in your account.",
        "Everything else — search, categories, a dashboard to manage products — both can have. The underlying question is whether you need to take payment online or not.",
      ],
    },
    {
      h2: "When a free tool is enough",
      body: [
        "If you search Google for “digital catalogue for WhatsApp”, almost everything that comes up is free tools: the WhatsApp Business catalogue, and apps that let you upload products with a photo and a price and receive orders ready-made on your WhatsApp. Several are free for up to 10 or 50 products.",
        "If you have few products, change them rarely and don't mind setting it up yourself, start there. You don't need Grolow or anyone else. Paying for a custom-built system to sell 15 products is spending money your business can put to better use.",
      ],
    },
    {
      h2: "When you need your own digital catalogue",
      body: [
        "The free tool falls short when the business grows in one particular direction: the size of the catalogue.",
      ],
      bullets: [
        {
          title: "You have hundreds of products",
          text: "They no longer fit in a PDF, a chat or the owner's memory, and the customer needs search and categories that work.",
        },
        {
          title: "Prices and availability change often",
          text: "And you need to change them yourself from a dashboard, in minutes, without asking anyone.",
        },
        {
          title: "You want your own domain",
          text: "So the link you share is your business's, not an app's, and doesn't depend on the rules of a free platform that might change tomorrow.",
        },
        {
          title: "You don't want to deal with the technical side",
          text: "Not servers, not domains, not something breaking on a Saturday.",
        },
      ],
    },
    {
      h2: "When you need a full online store",
      body: [
        "When charging through WhatsApp becomes a bottleneck. If you lose sales because the customer wants to pay right away and you take a while to reply, or if you sell outside your area to people who won't send a transfer without knowing you, you need online payment.",
        "That involves more than a website: an account with a payment gateway in your business's name, with an RNC tax ID and a bank account, and a store that connects to it. It's explained step by step in the article on how to accept card payments on your website in the Dominican Republic.",
      ],
    },
    {
      h2: "What Grolow builds in each case",
      subsections: [
        {
          h3: "Digital Catalogue",
          body: [
            "A dashboard to manage products, search, categories and orders that reach WhatsApp ready-made. No payment gateway. The project costs US$450 and the monthly fee is US$45, covering servers, database, domain, backups, security and one content change a month.",
            "It's what La Perfurm RD uses, a perfumery with hundreds of products: the catalogue lives at a single link and orders arrive on WhatsApp ready to dispatch.",
          ],
        },
        {
          h3: "Full Ecommerce",
          body: [
            "Everything in the catalogue, plus a payment gateway to take card payments, order approval and real sales analytics. The project costs US$850 and the monthly fee starts at US$80, with three content changes a month and a monthly report.",
          ],
        },
      ],
    },
    {
      h2: "What not to do",
      bullets: [
        {
          title: "Build a store with online payment without knowing whether you'll use it",
          text: "If your customers will always prefer to pay by transfer after messaging you, the gateway is a cost with no return. Start with the catalogue; you can move to a store later.",
        },
        {
          title: "Choose based on the first month's price",
          text: "Ask what the full first year costs: project, monthly fees, domain and whatever isn't included.",
        },
        {
          title: "Lose access to your products",
          text: "With any provider, make sure you can export your products and orders whenever you want to leave.",
        },
      ],
    },
    {
      h2: "How to decide in two questions",
      bullets: [
        {
          title: "How many products do you have and how often do they change?",
          text: "Few and stable: free tool. Hundreds, or changing every week: your own catalogue.",
        },
        {
          title: "Do you lose sales because you can't take payment on the spot?",
          text: "No: catalogue. Yes: a store with online payment.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Can I start with a catalogue and move to a store later?",
      a: "Yes, and it's the most sensible path if you don't yet know whether your customers will pay online. Your domain and your products are yours either way; what carries over and what changes when moving to a store is set out in writing when you get the quote.",
    },
    {
      q: "Isn't the WhatsApp Business catalogue enough?",
      a: "For a few products, yes. It falls short when you need search, lots of categories, your own domain or to manage hundreds of products quickly.",
    },
    {
      q: "Do the store's payments go through Grolow?",
      a: "No. The payment gateway account is in your business's name and the money goes straight to your bank.",
    },
  ],
  related: [
    { to: "blogPagosRd", label: "How to accept card payments on your website in the DR" },
    { to: "casoLaperfum", label: "La Perfurm RD case: a catalogue with WhatsApp ordering" },
    { to: "blogMensualidad", label: "What Grolow's monthly fee covers" },
  ],
  cta: {
    heading: "Not sure which one you need?",
    text: "Tell Grolow how many products you have and how you sell today. It'll tell you which one makes sense, including the free tool if that's your case.",
    label: "Message us on WhatsApp",
    message: "Hi, I read about digital catalogues and online stores. This is my business:",
  },
};
