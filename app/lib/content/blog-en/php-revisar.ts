import type { PageContent } from "../types";

export const blogPhpRevisarEn: PageContent = {
  eyebrow: "Article · Security",
  h1: "How to tell if your PHP site is vulnerable and what to do today",
  lead: [
    "If your website, your store or your internal system runs on PHP, the October 2026 PHP2Shell vulnerability affects you until proven otherwise. This is the practical guide: how to find out which version you have, what to do on shared hosting or on your own server, and what to check afterwards to know whether anyone got in.",
    "It's written on two levels. The first half is for the business owner, who has no reason to know what PHP-FPM is. The second is for whoever runs the server.",
  ],
  sections: [
    {
      h2: "Step 1: find out whether your site uses PHP",
      body: [
        "If your site is built with WordPress, WooCommerce, Joomla, Drupal, Magento, PrestaShop, Moodle or Laravel, it uses PHP. If you have hosting with cPanel or Plesk and never wondered what your site is built with, it very likely does too.",
        "If you don't know, ask whoever built your site or your hosting provider in these exact words: “Does my site run on PHP? Which version? Has it been updated to the one that fixes CVE-2026-109618 and CVE-2026-109619?”. A serious provider answers all three the same day.",
      ],
    },
    {
      h2: "Step 2: check the version",
      body: [
        "The versions that are safe from the two main flaws are PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35, or any later version on the same branch. Anything below is vulnerable. PHP 8.1, 8.0, 7.4 and earlier have no regular official fix, and we explain what to do with them in a separate article.",
      ],
      subsections: [
        {
          h3: "On shared hosting with cPanel",
          body: [
            "Log in to cPanel and look for “MultiPHP Manager” or “Select PHP Version”. There you can see which version each domain uses. Careful: the number it shows is usually the branch (8.2, 8.3), not the exact version. The exact version is installed by the provider, and that's what you need to confirm with their support.",
            "In WordPress you can also see it under Tools → Site Health → Info → Server.",
          ],
        },
        {
          h3: "On your own server or VPS",
          body: [
            "From the terminal, php -v gives you the command-line version, but what matters is the one serving the web, which may be different. For PHP-FPM run php-fpm -v (or php-fpm8.3 -v depending on your distribution).",
            "If you use your Linux distribution's packages, the version number may not match the official one because distributions apply the patch on top of their own version. In that case, look for the identifiers CVE-2026-109618 and CVE-2026-109619 in the package changelog. If they're there, you're fixed.",
          ],
        },
      ],
    },
    {
      h2: "Step 3: update and restart",
      body: [
        "Updating is the only complete fix. Everything else reduces exposure, but doesn't make you safe.",
        "A detail that's often forgotten: after installing the new version you have to restart every PHP process. Processes that were already running keep executing the vulnerable code until they restart. On a VPS that means restarting the PHP-FPM or Apache service; on shared hosting the provider does it.",
        "If you run a store, after updating do a complete test purchase. It's the part of the site that most depends on everything working, and the one that costs you the most money if it breaks.",
      ],
    },
    {
      h2: "If you can't update today",
      body: [
        "Sometimes you can't: an old system that doesn't work with newer PHP, a slow provider or a weekend with nobody available. These measures, taken from the CERT-EU advisory and from Sansec's and Abstract Security's guides, reduce the risk in the meantime. None of them replaces updating.",
      ],
      bullets: [
        {
          title: "Disable session upload progress",
          text: "In php.ini or in the PHP-FPM pool configuration: session.upload_progress.enabled = 0, and restart every process. Doing it with ini_set() or a .user.ini file doesn't work. Almost no site uses this feature, and PHP recommends leaving it off even after updating.",
        },
        {
          title: "On PHP 8.5, turn off fatal error backtraces",
          text: "fatal_error_backtraces = 0 in the server configuration, with a process restart.",
        },
        {
          title: "Limit request size on the web server",
          text: "post_max_size to 8M if the site doesn't receive files, or 32M if it does, with upload_max_filesize below it. In Nginx or Apache, also limit form size before it reaches PHP, including requests that don't declare their size.",
        },
        {
          title: "Block giant field names",
          text: "Abstract Security recommends blocking, in the application firewall, any form field whose name exceeds 1,000 bytes. No legitimate form uses them.",
        },
        {
          title: "As a last resort, take it offline",
          text: "It's what several European governments did. If the server holds sensitive data and you can't update, taking it off the internet for a few hours is cheaper than an intrusion.",
        },
      ],
    },
    {
      h2: "Step 4: check whether anyone got in",
      body: [
        "The update prevents new attacks, but it doesn't remove anyone who's already in. Check from October 20, 2026 onwards, not from the day you updated. These are the signs the researchers suggest:",
      ],
      bullets: [
        {
          title: "Unusual fatal errors in the logs",
          text: "PHP messages with “tried to allocate” and “in Unknown on line 0”. They indicate something requested memory outside a script's normal execution.",
        },
        {
          title: "Bursts of huge forms",
          text: "Requests over 1 MB against PHP pages, especially ten or more from the same address within ten minutes. Abstract describes one phase of the attack as about 590 requests in about 15 minutes.",
        },
        {
          title: "The web server running commands",
          text: "nginx, apache, php-fpm or php-cgi processes launching sh or bash with commands like curl, wget, id or base64.",
        },
        {
          title: "Files and access nobody created",
          text: "New files in /tmp or /dev/shm, unknown PHP files in the site folder, new scheduled tasks for the web user, added SSH keys, new database users or new WordPress administrators.",
        },
      ],
    },
    {
      h2: "If you find something",
      body: [
        "Don't delete anything yet. Save a copy of the logs and of the server's state, because that's the evidence of what happened. Then change the passwords for the database, the panel and the admin accounts, and any API keys that were on the server, because one of the flaws allows reading memory and they may have leaked.",
        "If the site handles customer data or payments, get professional help before restoring. Restoring a backup without knowing how they got in usually ends with the same intrusion a week later.",
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "CERT-EU, advisory 2026-018",
          text: "Fixed versions, official mitigations for each flaw and the recommendation to isolate unpatched systems.",
        },
        {
          title: "Abstract Security, ASTRO team",
          text: "Indicators of exploitation, firewall rules and intrusion-hunting recommendations.",
        },
        {
          title: "Sansec",
          text: "Temporary mitigations on the web server and warnings about their side effects.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "My host says it has already updated. Do I need to do anything else?",
      a: "Ask them to confirm the exact version or that the package includes both CVE identifiers. Then check in your WordPress or system dashboard that there are no administrator users you don't recognize.",
    },
    {
      q: "Can moving from PHP 8.1 to 8.3 break my site?",
      a: "It can, especially if it uses old plugins or themes. That's why it's worth testing it first on a copy of the site. Even so, staying on 8.1 is riskier than the work of migrating.",
    },
    {
      q: "Does Cloudflare protect me from PHP2Shell?",
      a: "Cloudflare published rules to block known attempts and that cuts a lot of the noise, but an unpatched server is still vulnerable to variants those rules don't recognize. Update anyway.",
    },
  ],
  related: [
    { to: "blogPhp2shell", label: "What PHP2Shell is and how it was discovered" },
    {
      to: "blogPhpObsoleto",
      label: "What to do if your site is still on PHP 7.4, 8.0 or 8.1",
    },
    {
      to: "blogNginx",
      label: "The five Nginx flaws of October 2026",
    },
  ],
  cta: {
    heading: "Would you rather we check it with you?",
    text: "If your provider doesn't answer or you don't know where to start, message us. We'll tell you what to check and, if needed, we'll do it.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the guide to checking for PHP2Shell and I need help with my site:",
  },
};
