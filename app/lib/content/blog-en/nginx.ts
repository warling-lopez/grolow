import type { PageContent } from "../types";

export const blogNginxEn: PageContent = {
  eyebrow: "Article · Security",
  h1: "The five Nginx flaws of October 2026",
  lead: [
    "A week before PHP2Shell, Nginx — the web server behind about a third of the sites on the internet — released versions 1.30.6 and 1.31.7 to fix five vulnerabilities. They got less attention than PHP's, but three of them could allow code to be executed on the server.",
    "The difference from PHP matters: none of these flaws affects an Nginx installation just by existing. Each one needs a specific configuration. This article explains what they are, how to tell whether your configuration has them and why the severity labels don't agree.",
  ],
  sections: [
    {
      h2: "Why Nginx matters if your site runs on PHP",
      body: [
        "Nginx is the first thing a visitor's request touches. It receives the connection, handles the HTTPS certificate, serves the images and, if the page is built in PHP, hands the work to PHP-FPM. According to W3Techs, Nginx serves about 31% of the sites whose web server can be identified, and among those using Nginx with an identifiable language, about 88% use PHP.",
        "That's why October 2026 was a bad combination: the same kind of server could have a flaw at the front door (Nginx) and another in the application engine (PHP). Fixing one doesn't fix the other.",
      ],
    },
    {
      h2: "The five flaws, one by one",
      subsections: [
        {
          h3: "CVE-2026-15176: overflow with alias and rewrite",
          body: [
            "A memory overflow that happens when a location block uses alias, a rewrite rule changes the requested address and something reads the $request_filename variable, whether set, return or the log format. It affects versions since 0.1.29, meaning almost any Nginx still in service.",
            "Temporary workaround: avoid alias in that block or stop reading $request_filename. Swapping alias for root changes how paths are built, so you need to test old links.",
          ],
        },
        {
          h3: "CVE-2026-93479: overflow in map with regular expressions",
          body: [
            "It shows up when a map block uses a regular expression and its numbered captures ($1, $2…) are read from root or from the log format before the map's own variable. It affects 1.30.0–1.30.5 and 1.31.2–1.31.6. F5 mentions a second path it doesn't detail.",
            "Temporary workaround: use named captures instead of numbered ones, only inside the block doing the match.",
          ],
        },
        {
          h3: "CVE-2026-97205: memory freed too early with AIO and SSI",
          body: [
            "If asynchronous disk reads (aio) and server-side includes (SSI with include virtual) are both enabled, an internal 8-bit counter can wrap around and Nginx frees a request while reads are still pending. It affects versions since 0.8.11.",
            "Temporary workaround: turn off aio or stop serving SSI pages. The first can bring back blocked processes on slow disks.",
          ],
        },
        {
          h3: "CVE-2026-95101: data injection over HTTP/3",
          body: [
            "It affects servers with HTTP/3 enabled (a listen line with quic) and request buffering to the backend enabled, which is the default. It allows injecting data or bypassing the request body size limit. It affects versions since 1.25.0.",
            "If your Nginx wasn't compiled with the HTTP/3 module, this flaw doesn't reach you. Temporary workaround: remove quic from the listen lines; browsers fall back to HTTP/2 without the user noticing.",
          ],
        },
        {
          h3: "CVE-2026-97629: forged TLS session tickets",
          body: [
            "This is the one that connects this article with certificates. If you use a shared ssl_session_cache without defining your own ticket key (ssl_session_ticket_key) and tickets are enabled, which is the norm, an attacker can forge a session ticket. On servers that require a client certificate — internal panels, business-to-business APIs, banking systems — that can bypass certificate verification when the session resumes. It affects versions since 1.23.2.",
            "Temporary workaround: define ssl_session_ticket_key with 80 random bytes (openssl rand 80), in a file readable only by root, and rotate it yourself; or disable tickets.",
          ],
        },
      ],
    },
    {
      h2: "Medium or critical? Why the numbers don't match",
      body: [
        "The Nginx project rated all five as medium severity. F5, the company that owns Nginx, gave them up to 9.2 out of 10 on the CVSS v4 scale and 8.1 on v3.1. HKCERT, Hong Kong's response center, rated them medium risk.",
        "Both readings make sense. If your configuration doesn't have the pattern, the risk is zero. If it does, the risk is high. That's why the advice from those who analyzed these flaws is to set the urgency based on your configuration, not on the label.",
      ],
    },
    {
      h2: "How to check your configuration",
      body: [
        "This is for whoever runs the server. It's five commands and a careful read.",
      ],
      bullets: [
        {
          title: "Version",
          text: "nginx -v. Fixed means 1.30.6 or later on the stable branch, or 1.31.7 or later on mainline.",
        },
        {
          title: "HTTP/3 module",
          text: "nginx -V 2>&1 | grep -o -- --with-http_v3_module. If it returns nothing, the HTTP/3 flaw doesn't affect you.",
        },
        {
          title: "Full configuration",
          text: "sudo nginx -T > full.conf dumps the whole configuration, including included files. Look for alias, rewrite, $request_filename, map with keys starting with ~, aio, ssi on, quic and ssl_session_cache shared, and review each match within its block.",
        },
        {
          title: "Distribution packages",
          text: "On Debian and Ubuntu, look for the five CVE identifiers in /usr/share/doc/nginx/changelog.Debian.gz. According to sevydevy's analysis published on October 19, Ubuntu 24.04 and 26.04 and Debian bookworm and trixie still didn't have the fixes that day.",
        },
        {
          title: "Before reloading",
          text: "nginx -t checks the syntax. Update one server at a time: take it out of the load balancer, update, verify and check the error log before moving on to the next one.",
        },
      ],
    },
    {
      h2: "A warning about the 1.28 branch",
      body: [
        "As of October 19 there was no official fix for the 1.28 branch, and four of the five affected ranges include it. If your server depends on it because it's what your distribution ships, you'll need to apply the temporary workarounds or plan a branch change.",
        "Anyone using Ingress NGINX on Kubernetes can breathe a little easier: HeroDevs says that, with the default configuration, none of the five is exploitable there. But that project is already out of support, and that's a problem in itself.",
      ],
    },
    {
      h2: "If you're on shared hosting",
      body: [
        "You don't have access to the Nginx configuration and it isn't your job to review it: that's the provider's work. What you can do is ask whether they've updated to 1.30.6 or 1.31.7, or applied the workarounds. Many shared hosts use Apache or LiteSpeed instead of Nginx, and in that case this article doesn't apply to you, although the PHP one does.",
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "The Hacker News, “NGINX Fixes 5 Flaws”",
          text: "List of flaws, F5's scores and the TLS ticket flaw.",
        },
        {
          title: "Sevydevy, “NGINX October 2026 vulnerability explained”",
          text: "Risky configuration patterns, version ranges and audit commands.",
        },
        {
          title: "HKCERT, bulletin of October 21",
          text: "Risk assessment and possible impacts.",
        },
        {
          title: "HeroDevs",
          text: "Impact on Ingress NGINX deployments.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Do I need to update Nginx if none of the patterns appear in my configuration?",
      a: "Yes, though with less urgency. It doesn't affect you today, but a configuration change next month is enough for it to affect you without anyone remembering this advisory.",
    },
    {
      q: "Is Nginx Plus affected too?",
      a: "F5 published advisories for its Nginx products. If you use the commercial version, check F5's support portal for the fixed version that applies to you.",
    },
    {
      q: "Are these flaws related to PHP2Shell?",
      a: "No. They're independent and fixed separately. They coincided in time and on many servers, which is what made that week so heavy.",
    },
  ],
  related: [
    { to: "blogPhp2shell", label: "What PHP2Shell is and how it was discovered" },
    {
      to: "blogCertificados",
      label: "What to check on your servers after the eMudhra case",
    },
    {
      to: "blogSemanaNegra",
      label: "Web servers' black week: what to learn",
    },
  ],
  cta: {
    heading: "Was your server set up by someone who's no longer around?",
    text: "It's more common than it seems. We can review the configuration with you and tell you which of these patterns you have, if any.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the article about the Nginx flaws and I want to check my server:",
  },
};
