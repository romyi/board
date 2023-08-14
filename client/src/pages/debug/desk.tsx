import { DeskSceneState } from "@shared/alpha/configs";
import React from "react";

export const DeskScene: React.FC<DeskSceneState> = ({ desk }) => {
  if (!desk) return null;
  return (
    <section
      scene-id={desk.id}
      className="absolute w-[140px] h-[140px] p-2 rounded-xl bg-slate-50"
    >
      <div>
        <p>{desk.timer}</p>
      </div>
    </section>
  );
};
