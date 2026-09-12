import Script from "next/script";

/**
 * Compartido por los dos root layouts (sitio principal y landings standalone).
 *
 * `lazyOnload` y no `afterInteractive`: gtag son 171 KB —el recurso más pesado
 * de la página, más que todo el JS de la app junta— y con `afterInteractive`
 * entra a competir por ancho de banda y CPU justo en la ventana donde el
 * navegador está pintando el hero. Con `lazyOnload` se carga cuando la página
 * ya está ociosa. Se sigue midiendo todo: la única diferencia es que una visita
 * que se va antes de que el navegador quede libre no se registra, y esa visita
 * tampoco aporta nada al informe.
 */
export default function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Q8RNVKKBJZ"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
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
