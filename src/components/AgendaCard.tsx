"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { format, parseISO } from "date-fns";

interface CalendarEvent {
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

export default function AgendaCard() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(true);
      fetch("/api/calendar")
        .then((res) => res.json())
        .then((data) => {
          setEvents(data.slice(0, 2));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar eventos:", error);
          setLoading(false);
        });
    } else if (status === "unauthenticated") {
      setEvents([]);
      setLoading(false);
    }
  }, [status]);

  return (
    <div className="w-[500px] h-59 bg-zinc-300/0 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-stone-300 items-center justify-items-center">
      <div className="flex items-center gap-3 mb-6 mt-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-neutral-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18"
          />
        </svg>
        <h2 className="font-bold text-lg italic">Próximos eventos do dia</h2>
      </div>

      {/* Corpo do Card */}
      <div className="mr-[130px]">
        {status === "loading" || loading ? (
          <p className="text-sm text-neutral-400">Carregando eventos...</p>
        ) : !session ? (
          <p className="text-sm text-neutral-400">
            Faça login para ver seus eventos.
          </p>
        ) : events.length === 0 ? (
          <p className="text-sm text-neutral-400">
            Nenhum evento para as próximas 24h.
          </p>
        ) : (
          events.map((event, index) => (
            // A borda também muda de cor com base no index
            <div
              key={index}
              className={`border-l-2 ${
                index === 0 ? "border-green-500" : "border-neutral-500"
              } pl-4 pt-1`}
            >
              {/* O título do evento agora usa uma cor condicional */}
              <p
                className={`font-semibold ${
                  index === 0 ? "text-green-400" : "text-white"
                }`}
              >
                {event.summary}
              </p>
              <p className="text-sm text-neutral-400 pb-1">
                • {format(parseISO(event.start.dateTime), "HH:mm")} -{" "}
                {format(parseISO(event.end.dateTime), "HH:mm")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
