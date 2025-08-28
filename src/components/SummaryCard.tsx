interface SummaryCardProps {
  completedSessions: number;
  totalFocusedSeconds: number;
}

const SummaryCard = ({
  completedSessions,
  totalFocusedSeconds,
}: SummaryCardProps) => {
  const hours = Math.floor(totalFocusedSeconds / 3600);
  const minutes = Math.floor((totalFocusedSeconds % 3600) / 60);
  const formattedTime = `${hours}h ${minutes}min`;

  const dailyGoal = 4;

  const progressPercentage = Math.min(
    (completedSessions / dailyGoal) * 100,
    100
  );

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
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h2 className="font-bold text-xl ">Resumo Diário</h2>
      </div>

      <div className=" pr-[150px] mb-10">
        <div className="text-neutral-300 mb-1">
          <p>Tempo focado hoje: {formattedTime} </p>
        </div>

        <div className="text-neutral-300 mb-2">
          <p>Sessões concluídas: {completedSessions}</p>
        </div>

        <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
