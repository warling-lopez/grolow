import type { PageContent } from "../types";

export const blogPhpObsoletoEn: PageContent = {
  eyebrow: "Article · Security",
  h1: "Your site is still on PHP 7.4, 8.0 or 8.1: what to do now",
  lead: [
    "When PHP published the PHP2Shell fixes on October 21, 2026, it did so for versions 8.2, 8.3, 8.4 and 8.5. The rest were left out because they're no longer supported. The problem is that the vulnerable code has existed since PHP 5.4, from 2012, and a huge number of sites on the internet are still on old versions.",
    "If yours is one of them, this article explains your options, from the most advisable to the least, and what each one costs in time and in risk.",
  ],
  sections: [
    {
      h2: "What it means for a version to be “out of support”",
      body: [
        "Each PHP version gets two years of improvements and fixes and then two more years of security fixes only. When that period ends, the PHP team stops publishing fixes. The version keeps working exactly as it did the day before, but nobody repairs it anymore when a flaw appears.",
        "The end-of-security-support dates are: PHP 7.4 in November 2022, PHP 8.0 in November 2023 and PHP 8.1 on December 31, 2025. And one few people have in mind: PHP 8.2 stops receiving fixes on December 31, 2026, two months from now.",
      ],
    },
    {
      h2: "What happened with old versions in this crisis",
      body: [
        "This time there was some help. According to CERT-EU and Abstract Security, the PHP team published minimal source-code patches for 7.4, 8.0 and 8.1, without an official packaged release. Some Linux distributions and extended-support companies also published fixes for their customers.",
        "But that help is an exception because of how serious the case was, not a policy. With the next flaw there may not be any. And for PHP 7.3 or earlier, or any 5.x, there's nothing.",
      ],
    },
    {
      h2: "Your options, from best to worst",
      subsections: [
        {
          h3: "1. Migrate to PHP 8.3 or 8.4",
          body: [
            "It's the only solution that also covers you against the next problem. PHP 8.3 gets security fixes until the end of 2027 and PHP 8.4 until the end of 2028. Jumping to 8.2 today doesn't make much sense: in January you're out of support again.",
            "The cost depends on your site. A WordPress site with popular, up-to-date plugins usually migrates in an afternoon. A custom system written for PHP 7 seven years ago may need days of adjustments, because PHP 8 changed how it handles some errors and removed old functions.",
          ],
        },
        {
          h3: "2. Extended support from your distribution or a third party",
          body: [
            "If your server runs a long-term-support distribution — Ubuntu with ESM, Red Hat, AlmaLinux, CloudLinux — your old PHP version may get security patches from them. There are also companies that sell extended support for out-of-support PHP versions.",
            "It's a legitimate option to buy time while you plan the migration. It isn't a way to never migrate: you're paying to keep alive something you'll have to change anyway.",
          ],
        },
        {
          h3: "3. Apply the minimal patch yourself",
          body: [
            "It's only viable if you compile PHP from source and have someone who knows how to do it and test it. For most businesses it isn't realistic, and if nobody maintains that hand-compiled PHP, in six months you're worse off than today.",
          ],
        },
        {
          h3: "4. Mitigate and wait",
          body: [
            "Turning off session.upload_progress, limiting request size and putting a firewall in front reduces the PHP2Shell risk, but it doesn't eliminate it and doesn't cover you against the earlier known flaws in those versions, of which there are many. It's what you do on day one, not a strategy.",
          ],
        },
      ],
    },
    {
      h2: "How to migrate without breaking the site",
      bullets: [
        {
          title: "Make a full backup",
          text: "Files and database. Check that the backup can be restored before touching anything.",
        },
        {
          title: "Test in a staging environment",
          text: "Many hosts let you create a copy of the site on a subdomain. Change the PHP version on the copy and go through all of it: forms, cart, payments, admin panel.",
        },
        {
          title: "Update plugins and themes first",
          text: "In WordPress, most migration problems come from abandoned plugins. If a plugin hasn't been updated in years, find a replacement before migrating.",
        },
        {
          title: "Turn on error logging",
          text: "Deprecation notices tell you which parts of the code are going to stop working. Read them on the copy, not on the live site.",
        },
        {
          title: "Switch at a quiet time and keep watch",
          text: "Make the change when you have the fewest visitors and check the site over the following hours. If something fails, going back to the previous version in cPanel takes a minute.",
        },
      ],
    },
    {
      h2: "When migrating isn't worth it",
      body: [
        "Sometimes the old system is so old that adapting it costs almost as much as building it again, and nobody understands how it works inside anymore. It's the typical case of an internal system custom-built ten years ago by someone who no longer works with the company.",
        "There the conversation changes: it isn't “how do I update it” but “what does this system do that I still need, and what's the simplest way to keep doing it”. Sometimes the answer is rewriting it. Sometimes it's replacing it with a service that already exists. And sometimes it's switching it off, because nobody was using it.",
        "What isn't advisable is what most people do: leaving it as it is until the next flaw decides for you.",
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "CERT-EU, advisory 2026-018",
          text: "Affected versions, the lack of an official fix for 8.1 and earlier, and minimal patches for 7.4, 8.0 and 8.1.",
        },
        {
          title: "Sansec",
          text: "Extended support options through distributions and commercial providers.",
        },
        {
          title: "php.net, supported versions",
          text: "End-of-support calendar for each PHP branch.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "How do I know which PHP version I have?",
      a: "In cPanel, under MultiPHP Manager. In WordPress, under Tools → Site Health → Info → Server. If you don't have access, ask your hosting provider.",
    },
    {
      q: "My host charges extra to keep PHP 7.4. Is that normal?",
      a: "Yes, more and more providers charge to keep out-of-support versions, because patching them costs them money. If you're being charged, ask whether that fee includes the PHP2Shell fixes.",
    },
    {
      q: "How much does it cost to migrate a WordPress site to PHP 8.3?",
      a: "If the plugins and theme are up to date, it's often just a matter of changing the version and testing. If there are abandoned plugins or old custom code, the work lies in replacing or adapting them, and that varies a lot from site to site.",
    },
  ],
  related: [
    {
      to: "blogPhpRevisar",
      label: "How to tell if your PHP site is vulnerable and what to do today",
    },
    { to: "blogPhp2shell", label: "What PHP2Shell is and how it was discovered" },
    {
      to: "blogWordpress",
      label: "WordPress or custom code: which one suits your business",
    },
  ],
  cta: {
    heading: "Got an old system nobody wants to touch?",
    text: "Tell us what it does and what it's built with. We'll tell you whether it's worth migrating, replacing or rebuilding, even if the answer isn't hiring us.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the article about old PHP versions. My system runs on:",
  },
};
