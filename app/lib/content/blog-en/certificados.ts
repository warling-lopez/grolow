import type { PageContent } from "../types";

export const blogCertificadosEn: PageContent = {
  eyebrow: "Article · Security",
  h1: "What to check on your servers after the eMudhra case",
  lead: [
    "When it was discovered that eight intermediate certificates from the eMudhra certificate authority had weak keys, Chrome, Firefox, Safari and Edge blocked them within three days. What remains is everything else: your store's server that connects to the payment gateway, the script that syncs your inventory, the Docker image you built in August.",
    "All of that software decides whom to trust based on a list of certificate authorities it carries with it. This guide explains where those lists are, which ones already have a fix and how to check that yours are up to date.",
  ],
  sections: [
    {
      h2: "The key concept: the trust store",
      body: [
        "A trust store is a file with the root certificates a program trusts. The browser has its own and updates it automatically. Your operating system has another, which is updated with the ca-certificates package. And many languages and libraries carry their own copy: Python with certifi, Node.js with its internal list, Java with cacerts, PHP with composer/ca-bundle.",
        "The eMudhra risk isn't in your website as seen from the browser. It's in the outbound connections your server makes using an old store, because that store still accepts certificates that anyone can manufacture.",
      ],
    },
    {
      h2: "What already has a fix",
      body: [
        "Endor Labs maintains a list of fixed components. These are the minimum versions of the most common ones:",
      ],
      bullets: [
        {
          title: "Operating systems",
          text: "ca-certificates on Ubuntu (versions 20260816ubuntu0.x for 22.04, 24.04, 26.04 and 26.10), Debian (20250419~deb12u2 on bookworm, 20250419+deb13u1 on trixie), Alpine 20261020-r0, Fedora 2026.2.92_v9.0.319 and Arch ca-certificates-mozilla 3.131.1-1.",
        },
        {
          title: "Node.js",
          text: "22.23.4, 24.22.1 and 26.12.1. Node ships its own list of authorities compiled in, so updating the operating system isn't enough.",
        },
        {
          title: "Python",
          text: "certifi 2026.10.19, pip 26.2.2 and uv 0.13.4. certifi usually arrives as an indirect dependency of requests or httpx, so check the whole dependency tree and not just your requirements.txt.",
        },
        {
          title: "PHP",
          text: "composer/ca-bundle 1.4.16 or 1.6.0. Many PHP libraries that connect to external APIs use it.",
        },
        {
          title: "Go, Rust, Electron and others",
          text: "Go 1.27.3 and 1.26.10; Electron 44.9.1, 43.8.1 and 42.11.16; rustls-webpki 0.103.16 and webpki-roots 1.0.10; NSS 3.131.1; curl's CA bundle of October 20, 2026.",
        },
      ],
    },
    {
      h2: "The three cases people forget",
      subsections: [
        {
          h3: "Java",
          body: [
            "The JDK carries its own store, cacerts, and it didn't yet appear as fixed on Endor Labs' list. Treat any Java service as unconfirmed until your JDK provider publishes the update.",
          ],
        },
        {
          h3: "Containers",
          body: [
            "Updating the server doesn't update the Docker images you've already built. Each image carries its own copy of ca-certificates frozen at the moment it was created. You have to rebuild them from updated base images and redeploy them.",
          ],
        },
        {
          h3: "Hidden stores",
          body: [
            "Some libraries carry a .pem file with certificates inside their own code. They don't show up in any package manager. The only way to find them is to search for them on disk and compare them with the fingerprints of the affected roots.",
          ],
        },
      ],
    },
    {
      h2: "How to check that you're fixed",
      bullets: [
        {
          title: "Update the system package",
          text: "On Ubuntu or Debian: sudo apt-get update && sudo apt-get install --only-upgrade ca-certificates. On Alpine: apk update && apk upgrade ca-certificates ca-certificates-bundle.",
        },
        {
          title: "Look for traces of emSign",
          text: "grep -c \"emSign\" /etc/ssl/certs/ca-certificates.crt should return 0 after updating.",
        },
        {
          title: "Test against the test servers",
          text: "The case's disclosure page offers two sites signed with the compromised chains. If your application connects to them without errors, it still trusts eMudhra. If it throws a certificate error, you're protected.",
        },
        {
          title: "Test along the real path",
          text: "Cloudflare insists on this: the browser or curl rejecting the certificate doesn't prove your background service rejects it, because it may use a different store. Test from the application itself.",
        },
      ],
    },
    {
      h2: "The mistake not to make",
      body: [
        "After updating, some integration may start failing with certificate errors. The temptation is to turn off certificate verification so it works again: verify=False in Python, rejectUnauthorized: false in Node, CURLOPT_SSL_VERIFYPEER in PHP.",
        "Don't. Cloudflare said it in no uncertain terms in its analysis of the case: these errors aren't solved by disabling verification. If a connection fails after updating, it's because the other side has a certificate that's no longer trusted, and that certificate is what needs to change. Disabling verification leaves the connection open to exactly the attack you were protecting yourself from.",
      ],
    },
    {
      h2: "If your own site has an eMudhra certificate",
      body: [
        "Click the padlock in your browser and see who issued the certificate. If eMudhra or emSign appears, get one from another authority before October 27, 2026, which is when Chrome removes the emSign ECC Root CA - G3 root. eMudhra committed to offering free replacements through its partners.",
        "If you use Cloudflare in Full (strict) mode, also check the origin server's certificate, not just the one the visitor sees. Cloudflare announced alerts for sites still using withdrawn certificates.",
      ],
    },
    {
      h2: "The underlying lesson: automate renewal",
      body: [
        "The certificate industry has spent years shortening a certificate's maximum lifetime, and the trend is that they'll soon be renewed every few weeks. Cases like this explain why: if you have to switch authorities tomorrow, whoever renews automatically does it in minutes and whoever does it by hand loses a weekend.",
        "If your certificate renews itself with Let's Encrypt or with your hosting provider, you've already done half the work. If someone installs it by hand once a year, that's the next problem worth solving.",
      ],
    },
    {
      h2: "Sources consulted",
      bullets: [
        {
          title: "Endor Labs, “eMudhra CA Compromise: The Trust Stores You Didn't Patch”",
          text: "List of fixed components, special cases and verification steps.",
        },
        {
          title: "Cloudflare Blog",
          text: "Recommendations for origin servers, mTLS and containers.",
        },
        {
          title: "Google Security Blog",
          text: "Date when Chrome removes the emSign ECC Root CA - G3 root.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "My site is on shared hosting. Do I need to do anything?",
      a: "The server's store is updated by your provider. What is on you is checking who issued your certificate and, if your site connects to external services with custom code, asking whoever wrote it whether the libraries are up to date.",
    },
    {
      q: "Does this affect my phone?",
      a: "Android got the block through Google Play Services and iOS through Apple. Restarting the phone speeds up the update on Android. Very old phones that no longer receive updates may keep trusting the affected certificates.",
    },
    {
      q: "Should I remove the eMudhra certificates by hand?",
      a: "Better not. Removing roots by hand can break legitimate connections. The recommended approach is to update the package or library to the fixed version.",
    },
  ],
  related: [
    { to: "blogEmudhra", label: "What happened with the eMudhra certificate authority" },
    {
      to: "blogNginx",
      label: "The Nginx TLS ticket flaw and four others",
    },
    {
      to: "blogCertificadosRd",
      label: "Digital certificates in the Dominican Republic after eMudhra",
    },
  ],
  cta: {
    heading: "Does your system connect to gateways or APIs?",
    text: "If your site takes payments, issues invoices or syncs data with other services, it's worth checking which libraries it uses for those connections. We'll help you do it.",
    label: "Message us on WhatsApp",
    message:
      "Hi, I read the guide on certificates after eMudhra and I want to check my integrations:",
  },
};
