import type { DetailedHTMLProps, HTMLAttributes } from "react";

/* <model-viewer> es un web component: React lo pasa tal cual, pero TypeScript
   necesita saber que existe y que acepta atributos en kebab-case. */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        [attr: `${string}-${string}`]: string | undefined;
        src?: string;
        alt?: string;
        exposure?: string;
      };
    }
  }
}
