"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { Lang } from "@/app/lib/i18n";

const noopSubscribe = () => () => {};

/**
 * Botones del artículo: escuchar (voz del navegador, sin servicios externos)
 * y compartir en X, LinkedIn y WhatsApp.
 *
 * «Escuchar» lee el texto de `[data-article-body]`. Si el navegador no tiene
 * síntesis de voz, el botón no se pinta.
 */
export default function ArticleActions({
  url,
  title,
  lang = "es",
}: {
  url: string;
  title: string;
  lang?: Lang;
}) {
  const canSpeak = useSyncExternalStore(
    noopSubscribe,
    () => "speechSynthesis" in window,
    () => false,
  );
  const [speaking, setSpeaking] = useState(false);

  // Si se sale de la página, que deje de hablar.
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const toggleSpeech = () => {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const body = document.querySelector<HTMLElement>("[data-article-body]");
    const text = `${title}. ${body?.innerText ?? ""}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "en" ? "en-US" : "es-ES";
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(utterance);
    setSpeaking(true);
  };

  const enc = encodeURIComponent;
  const shares = [
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
      icon: "M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.1-9.3L1 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.7L6.4 3.9H4.6L17.7 20Z",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      icon: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5c0-1.2-.02-2.73-1.66-2.73-1.66 0-1.92 1.3-1.92 2.64V21h-4V9.75Z",
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
      icon: "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.6-.7-2.6-1.9-.6-.8-.8-1.3-.9-1.5-.1-.2 0-.4.1-.5l.4-.5.3-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z",
    },
  ];

  const btn =
    "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-300 text-neutral-800 hover:border-grolow-cream hover:text-grolow-cream transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {canSpeak && (
        <button
          type="button"
          onClick={toggleSpeech}
          aria-pressed={speaking}
          className={`${btn} px-4 text-sm font-semibold`}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {speaking ? (
              <path d="M8 5v14M16 5v14" />
            ) : (
              <path d="M11 5 6 9H2v6h4l5 4V5Zm4.5 3.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
            )}
          </svg>
          {lang === "en" ? (speaking ? "Stop" : "Listen") : speaking ? "Detener" : "Escuchar"}
        </button>
      )}
      {shares.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === "en" ? `Share on ${s.name}` : `Compartir en ${s.name}`}
          className={`${btn} w-11`}>
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
            <path d={s.icon} />
          </svg>
        </a>
      ))}
    </div>
  );
}
