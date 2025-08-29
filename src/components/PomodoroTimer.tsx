"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const FOCUS_TIME_MINUTES = 30;
const FOCUS_TIME_SECONDS = FOCUS_TIME_MINUTES * 60;
const BREAK_TIME_MINUTES = 10;
const BREAK_TIME_SECONDS = BREAK_TIME_MINUTES * 60;

interface PomodoroTimerProps {
  setCompletedSessions: React.Dispatch<React.SetStateAction<number>>;
  setTotalFocusedSeconds: React.Dispatch<React.SetStateAction<number>>;
}

const PomodoroTimer = ({
  setCompletedSessions,
  setTotalFocusedSeconds,
}: PomodoroTimerProps) => {
  const [totalSeconds, setTotalSeconds] = useState(FOCUS_TIME_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus");

  // --- FUNÇÕES AUXILIARES (mais organizado) ---
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  };

  const showNotification = (title: string, body: string) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body, icon: "/favicon.ico" });
    }
  };

  // --- LÓGICA PRINCIPAL DO TIMER ---
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    // Lógica principal da contagem regressiva
    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    }
    // Lógica para o exato momento em que um ciclo termina
    else if (totalSeconds === 0) {
      if (mode === "focus") {
        // --- Ações quando um ciclo de FOCO termina ---

        // 1. Atualiza o estado das sessões e salva no localStorage
        setCompletedSessions((prev) => {
          const newTotal = prev + 1;
          localStorage.setItem("completedSessions", JSON.stringify(newTotal));
          return newTotal;
        });

        // 2. Atualiza o estado do tempo focado e salva no localStorage
        setTotalFocusedSeconds((prev) => {
          const newTotal = prev + FOCUS_TIME_SECONDS;
          localStorage.setItem("totalFocusedSeconds", JSON.stringify(newTotal));
          return newTotal;
        });

        // 3. Salva a data de hoje para o reset diário
        localStorage.setItem("lastSavedDate", new Date().toDateString());

        // 4. Notifica o usuário
        showNotification(
          "Foco Finalizado!",
          "Bom trabalho! Hora de uma pausa de 10 minutos."
        );

        // 5. Muda para o modo de pausa
        setMode("break");
        setTotalSeconds(BREAK_TIME_SECONDS);
      } else {
        // --- Ações quando um ciclo de PAUSA termina ---
        showNotification(
          "Pausa Finalizada!",
          "Vamos voltar ao foco por 30 minutos."
        );
        setMode("focus");
        setTotalSeconds(FOCUS_TIME_SECONDS);
      }
    }

    // Função de limpeza do intervalo
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    isActive,
    totalSeconds,
    mode,
    setCompletedSessions,
    setTotalFocusedSeconds,
  ]);

  // --- HANDLERS (funções dos botões) ---
  const handlePlayPause = () => {
    if (!isActive) {
      requestNotificationPermission();
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setMode("focus");
    setTotalSeconds(FOCUS_TIME_SECONDS);
  };

  // --- LÓGICA VISUAL ---
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const progressPercentage =
    (totalSeconds /
      (mode === "focus" ? FOCUS_TIME_SECONDS : BREAK_TIME_SECONDS)) *
    100;

  return (
    <div className="my-2 flex flex-col items-center ">
      <div className="w-[1044px] h-4 bg-neutral-600 rounded-xl">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            mode === "focus" ? "bg-green-500" : "bg-blue-500"
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex items-center justify-center gap-4 pt-2">
        <div className="relative">
          {" "}
          <div className="w-[511px] h-[496px] bg-black/20 rounded-[40px] shadow-[inset_0px_5px_4px_0px_rgba(255,255,255,0.25)]" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-[400px] font-bold font-['Fustat'] [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
            <span>{String(minutes).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="relative">
          {" "}
          <div className="w-[511px] h-[496px] bg-black/20 rounded-[40px] shadow-[inset_0px_5px_4px_0px_rgba(255,255,255,0.25)]" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-[400px] font-bold font-['Fustat'] [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
            <span>{String(seconds).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
      {/* --- FIM DA MUDANÇA --- */}

      {/* Botões de Controle (sem alteração) */}
      <div className="flex gap-5">
        <button
          onClick={handlePlayPause}
          className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          {isActive ? (
            <Image
              src="/icons/pausa.svg"
              alt="Ícone de pausa"
              width={25}
              height={40}
            />
          ) : (
            <Image
              src="/icons/play.svg"
              alt="Ícone de Play"
              width={40}
              height={40}
            />
          )}
        </button>

        <button
          onClick={handleReset}
          className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <Image
            src="/icons/restart.svg"
            alt="Ícone de Restart"
            width={50}
            height={40}
          />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
