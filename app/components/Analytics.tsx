import Script from "next/script";

/** Compartido por los dos root layouts (sitio principal y landings standalone). */
export default function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Q8RNVKKBJZ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Q8RNVKKBJZ');
        `}
      </Script>
    </>
  );
}
