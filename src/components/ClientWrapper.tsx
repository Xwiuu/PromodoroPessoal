"use client";

import { useState, useEffect } from "react";
import PomodoroTimer from "./PomodoroTimer";
import SummaryCard from "./SummaryCard";

export default function ClientWrapper() {
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalFocusedSeconds, setTotalFocusedSeconds] = useState(0);

  useEffect(() => {
    const savedSessions = localStorage.getItem("completedSessions");
    const savedTime = localStorage.getItem("totalFocusedSeconds");

    if (savedSessions) {
      setCompletedSessions(JSON.parse(savedSessions));
    }
    if (savedTime) {
      setTotalFocusedSeconds(JSON.parse(savedTime));
    }
  }, []);

  return (
    <>
      <PomodoroTimer
        setCompletedSessions={setCompletedSessions}
        setTotalFocusedSeconds={setTotalFocusedSeconds}
      />
      <div className="flex w-full gap-12">
        {/* O AgendaCard NÃO está aqui */}
        <div className="flex-1" /> {/* Espaço reservado para o AgendaCard */}
        <SummaryCard
          completedSessions={completedSessions}
          totalFocusedSeconds={totalFocusedSeconds}
        />
      </div>
    </>
  );
}