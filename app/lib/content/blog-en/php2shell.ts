import type { PageContent } from "../types";

export const blogPhp2shellEn: PageContent = {
  eyebrow: "Article · Security",
  h1: "PHP2Shell: what happened to PHP in October 2026",
  lead: [
    "Between October 20 and 23, 2026, PHP — the language that runs around 70% of the websites whose server-side language can be identified — published emergency fixes for two critical flaws that allow code to be run on the server without logging in. The pair is known as PHP2Shell.",
    "This article explains exactly what it is, how it was discovered, why some governments took their sites offline and what is still unclear. Disclosure: we don't program in PHP. That doesn't make it a bad language, and at the end we explain why.",
  ],
  sections: [
    {
      h2: "The summary in one paragraph",
      body: [
        "The flaws carry the identifiers CVE-2026-109618 and CVE-2026-109619, and both received a score of 9.2 out of 10 on the CVSS v4 scale. They live in the PHP engine itself, not in WordPress or any plugin, and the vulnerable code has existed since PHP 5.4, released in 2012. The fixed versions are 8.5.12, 8.4.27, 8.3.36 and 8.2.35. PHP 8.1 and earlier no longer receive regular updates.",
        "What makes them serious is when they happen: the attack fires while PHP is processing the request, before a single line of your site's code runs. That's why it doesn't matter how well written your WordPress, Laravel or Magento store is. If the PHP underneath is vulnerable, so is the site.",
      ],
    },
    {
      h2: "What each flaw does, without jargon",
      subsections: [
        {
          h3: "CVE-2026-109618: the one that exploits running out of memory",
          body: [
            "PHP limits how much memory each request can use. When a request goes over the limit, PHP cuts it off abruptly. The problem is that the cut can happen halfway through reading a form, when some internal data is only half prepared. While cleaning up, PHP treats that half-built data as if it were valid and frees memory that may contain data planted by the attacker.",
            "Abstract Security's research team calls it “rawkey” and describes the attack as a huge form, over 1 MB, with an oversized field name. PHP confirmed remote code execution with Apache's mod_php in its default configuration.",
          ],
        },
        {
          h3: "CVE-2026-109619: the one that reuses leftovers from a previous request",
          body: [
            "A single PHP process handles many requests in a row. This flaw lets information from one request survive after its memory has been freed, for example after a fatal error. The next request that process handles can use those leftovers before they're reset.",
            "The most cited attack path goes through a PHP feature called session.upload_progress, which shows the progress of file uploads and runs on any form that receives data, before the application's code. According to Abstract, the malicious request weighs about 450 bytes, so filters that block large requests don't stop it.",
          ],
        },
        {
          h3: "The third flaw: CVE-2026-115560",
          body: [
            "On October 23, PHP disclosed a third remote execution flaw. It didn't publish technical details: it only said it affects web applications configured in unusual ways, that it considers it an unlikely risk and that it will fix it in the next regular release, without an emergency update. In the meantime it recommends disabling session.upload_progress.",
          ],
        },
      ],
    },
    {
      h2: "The timeline, day by day",
      bullets: [
        {
          title: "August 1, 2026",
          text: "Security firm Calif finds several remote execution paths. According to the AFP news agency, OpenAI independently reported the same finding, and Diario Libre reports that Calif used an OpenAI model to identify one of the flaws.",
        },
        {
          title: "August 11 and 24",
          text: "Calif reports the first flaw to the PHP team. Thirteen days later, Wiz Research reports more ways to exploit them. PHP coordinates the fixes privately.",
        },
        {
          title: "October 17",
          text: "Amazon Web Services identifies an exploitation attempt, according to Diario Libre. It's the earliest sign that someone else knew about the problem.",
        },
        {
          title: "October 20",
          text: "Screenshots, videos and partial details of the flaws leak online, a day before the planned date. PHP announces an emergency release and the race begins.",
        },
        {
          title: "October 21",
          text: "Cloudflare reports attacks from 07:43 UTC. The fixes ship around 14:00 UTC. Governments and companies take sites offline as a precaution.",
        },
        {
          title: "October 22 and 23",
          text: "The firm Sansec tempers expectations of mass exploitation: the public exploits fail against a default installation. PHP discloses the third flaw.",
        },
      ],
    },
    {
      h2: "Why some governments took their sites offline",
      body: [
        "When a flaw like this leaks before a fix exists, those responsible have two options: leave the site exposed and wait, or take it offline. Many chose the second.",
        "According to AFP, in France local government sites became inaccessible, including that of the Paris Police Prefecture, at the request of the national cybersecurity agency. In the Netherlands, DigiD — the country's digital identity service —, the House of Representatives' site and the national cybersecurity center's own site were taken offline as a precaution. There were also outages in Finland and Denmark, and many media outlets suspended their readers' comments.",
        "AFP also reported that the US National Security Agency urged applying the fix immediately or disconnecting vulnerable systems. The PHP foundation was just as direct: if you use PHP, updating is imperative.",
      ],
    },
    {
      h2: "How many attacks there really were",
      body: [
        "Cloudflare described a very steep curve: thousands of attempts in the ten hours before disclosure, tens of thousands in the first 45 minutes after the announcement, hundreds of thousands within two hours and then millions.",
        "An attempt isn't an intrusion. Sansec explained the next day that a successful attack requires knowing the target well and for the server to meet certain conditions, that the circulating exploits fail against PHP with a default configuration, and that most of them also need another flaw in the application: a local file inclusion. At the time of writing there is no verified figure for compromised sites or stolen data.",
        "Mass exploitation being less likely than feared on day one doesn't mean the risk is low. It means attacks will be more selective: stores with card data, admin panels and servers holding valuable information.",
      ],
    },
    {
      h2: "Which platforms are affected",
      body: [
        "All the ones that run on PHP, because the flaw sits beneath them. Calif reported unauthenticated code execution on recent versions of WordPress, Magento, Drupal, Joomla, MediaWiki, Roundcube, phpMyAdmin, Nextcloud, Laravel, Symfony and WHMCS. Sansec adds Shopware and WooCommerce stores.",
        "It affects every common way of running PHP on a web server: PHP-FPM behind Nginx, mod_php on Apache, php-cgi, LiteSpeed and FrankenPHP. PHP considers mod_php the highest-risk setup.",
      ],
    },
    {
      h2: "What is still unclear",
      body: [
        "There are three things worth reading with caution. First: the sources don't fully agree on which of the two flaws allows reading the server's memory, although they all agree that one of them does, which could expose passwords, API keys or session tokens.",
        "Second: Abstract Security claimed on October 22 that it achieved code execution on a server already updated to PHP 8.2.35, using the same upload progress feature. It's a claim from a company, not confirmed by PHP, but it's the reason PHP and several experts recommend disabling session.upload_progress even after updating if you don't use it.",
        "Third: if someone got into your server before you updated, the update doesn't kick them out. It closes the door, but it doesn't check who's already inside.",
      ],
    },
    {
      h2: "So is PHP insecure?",
      body: [
        "No more than any other technology of its size. In December 2025, React — the foundation of what we use — had its own critical remote execution flaw, known as React2Shell. The similar name isn't a coincidence: researchers name the flaws that let someone take over a server this way.",
        "The lesson isn't to switch languages. It's that any site running on a server needs someone to update it when something like this happens, and that most businesses don't know who that person is until they need them.",
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "CERT-EU, security advisory 2026-018 (version 1.2, October 23)",
          text: "Affected versions, description of the three flaws and official mitigations.",
        },
        {
          title: "Sansec, “PHP2Shell: PHP RCE”",
          text: "Timeline of the discovery, affected platforms and assessment of real-world exploitation.",
        },
        {
          title: "Abstract Security, ASTRO team",
          text: "Technical detail of each flaw, detection rules and the claim about already-updated servers.",
        },
        {
          title: "AFP via Ensegundos and Diario Libre (October 21 and 22)",
          text: "Sites taken offline in Europe, the NSA's position and attack figures reported by Cloudflare.",
        },
        {
          title: "W3Techs",
          text: "Percentage of websites that use PHP as their server-side language.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Do I need to change my passwords because of PHP2Shell?",
      a: "As a user of websites, not because of this case in particular. It is worth using a different password for each service and turning on two-step verification, especially for banking and email. If a service tells you about a breach, change that password.",
    },
    {
      q: "My site runs on WordPress. Is updating WordPress enough?",
      a: "No. The flaw is in PHP, which is what runs WordPress. You need to update the server's PHP version, which is usually changed from the hosting panel or managed by your provider.",
    },
    {
      q: "Which PHP versions are fixed?",
      a: "PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35 or later. The 8.1 branch and earlier are out of support and don't have a regular official fix.",
    },
    {
      q: "Does a web application firewall protect me?",
      a: "It helps, but it doesn't replace updating. Several of these attacks happen inside PHP before your application sees the request, and some application-level protections don't cover them.",
    },
  ],
  related: [
    {
      to: "blogPhpRevisar",
      label: "How to tell if your PHP site is vulnerable and what to do today",
    },
    {
      to: "blogPhpRd",
      label: "How PHP2Shell affected the Dominican Republic",
    },
    {
      to: "blogSemanaNegra",
      label: "Web servers' black week: what to learn",
    },
  ],
  cta: {
    heading: "Don't know which PHP version your site runs?",
    text: "Send us your site's address and we'll tell you what we can see from the outside and what you need to ask your hosting provider. Free, no strings attached.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the article about PHP2Shell and I want to know if my site is exposed. My site is:",
  },
};
