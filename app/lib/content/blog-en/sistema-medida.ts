import type { PageContent } from "../types";

export const blogSistemaMedidaEn: PageContent = {
  eyebrow: "Guide",
  h1: "Spreadsheet, off-the-shelf software or a custom system: how to decide",
  lead: [
    "Every growing business reaches the same point: the spreadsheet that worked with 50 products or 20 customers starts failing. The numbers don't add up, two people edit the same file and nobody knows which version is the right one.",
    "At that point there are three paths: fix the spreadsheet, subscribe to ready-made software or build a custom system. Grolow builds custom systems, and even so this article starts by explaining when you don't need one.",
  ],
  sections: [
    {
      h2: "When the spreadsheet still works",
      body: [
        "If only one person uses it, the data changes little and a mistake doesn't cost you money, Excel or Google Sheets are still a good tool. They're free or nearly free, everyone knows how to use them and they adapt to anything.",
        "Before switching tools, sometimes it's enough to tidy it up: one tab per type of data, validation so nobody types text where a number goes, and a single shared copy instead of files travelling around WhatsApp.",
      ],
    },
    {
      h2: "The signs it's no longer enough",
      bullets: [
        {
          title: "Several people need the same data at the same time",
          text: "And each ends up with their own version.",
        },
        {
          title: "Mistakes already cost money",
          text: "You sell something you don't have, charge an old price or lose a customer's appointment.",
        },
        {
          title: "You repeat the same work every day",
          text: "Copying orders from WhatsApp to the sheet, from the sheet to the invoice and from the invoice to the report.",
        },
        {
          title: "Only one person understands the file",
          text: "And if that person is away, the business grinds to a halt.",
        },
      ],
    },
    {
      h2: "When off-the-shelf software is the right choice",
      body: [
        "If your need is the same as many businesses' — invoicing, stock control, accounting — there are already programs that handle it for a monthly subscription. In the Dominican Republic there are local and international options, such as Alegra, and several include integration with the DGII for electronic invoicing.",
        "For invoicing in particular, that integration is a strong reason to use something ready-made: keeping it up to date with the tax rules is ongoing work the provider already does for you.",
        "The advantages: you're up and running in days, the cost is predictable and the provider handles the updates. The downside: you adapt to the program. If your business works like most, that's not a problem.",
      ],
    },
    {
      h2: "When a custom system is the right choice",
      body: [
        "When what sets you apart is precisely how you work, and off-the-shelf software forces you to stop working that way. Some typical examples:",
      ],
      bullets: [
        {
          title: "Your process doesn't exist in common programs",
          text: "A network of distributors split by area, quotes based on measurements, bookings with their own rules, a league or an academy with its own way of enrolling and charging.",
        },
        {
          title: "You need to bring several tools into one",
          text: "You pay for three subscriptions that don't talk to each other and someone copies data from one to the other by hand.",
        },
        {
          title: "Your customers have to use it",
          text: "A portal where the customer places their order, sees their history or books, with your brand and your domain.",
        },
        {
          title: "You want the system to be yours",
          text: "The code and the data in your name, without depending on a software vendor raising its price or shutting down.",
        },
      ],
    },
    {
      h2: "What a custom system costs",
      body: [
        "It's one of the questions people ask Google most, and the honest answer is that it depends on the scope. What can be explained is how it's calculated, so you can compare quotes.",
        "Grolow estimates the hours of work the system will take, adds the cost of the first months of infrastructure and of the collaborators involved, and never goes below a minimum rate. The result is a fixed price, in writing, with what's included and what isn't. After that, a monthly fee covers servers, database, backups, security and changes.",
        "When comparing with off-the-shelf software, compare over two or three years, not the first month: the subscription is paid forever, while the custom system has a higher upfront cost and a maintenance fee.",
      ],
    },
    {
      h2: "The questions that save you from a bad project",
      bullets: [
        {
          title: "What does the system have to do, as a list?",
          text: "If you can't write it in ten lines, you're not ready to get a quote yet. Grolow helps you get to that list by message.",
        },
        {
          title: "Have you tried off-the-shelf software?",
          text: "If you haven't, try it first. Whatever doesn't work for you in it is the best specification for a custom system.",
        },
        {
          title: "Who's going to maintain it?",
          text: "A custom system with nobody maintaining it ages badly. With Grolow, maintenance is included in the monthly fee.",
        },
        {
          title: "Who will own the code and the data?",
          text: "Get it in writing. With Grolow they're yours from the final payment.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Can Grolow integrate my system with the invoicing software I already use?",
      a: "It depends on whether that software allows outside connections. It's reviewed case by case and stated in writing in the proposal.",
    },
    {
      q: "How long does a custom system take?",
      a: "It depends on the scope. Grolow gives the timeline in writing in the proposal, together with the fixed price.",
    },
    {
      q: "What if I need to change something in the system later?",
      a: "Adjustments in the first 90 days are included. After that, fixing Grolow's own bugs and the included content changes are part of the monthly fee, and new features are quoted separately, always before they're built.",
    },
  ],
  related: [
    { to: "blogMensualidad", label: "What Grolow's monthly fee covers" },
    { to: "blogCatalogoTienda", label: "Digital catalogue or online store" },
    { to: "casoHellens", label: "Hellen's Cute Kids case: distributors by area" },
  ],
  cta: {
    heading: "Has your spreadsheet had enough?",
    text: "Tell Grolow what you do by hand today. It'll tell you whether off-the-shelf software or a custom system makes sense, and why.",
    label: "Message us on WhatsApp",
    message: "Hi, I read about spreadsheets, off-the-shelf and custom software. Today I run my business like this:",
  },
};
