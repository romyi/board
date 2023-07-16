import React, { useEffect, useState } from "react";
import { randomUUID } from "crypto";
import useSocketManager from "../../hooks/useSocketManager";

interface DebugOptions {
  heroes: Array<{ name: string }>;
}

const test_samples = ["Ivan", "Roma", "Tanya", "Artem", "Vlad", "Igor"];

export const Debug = () => {
  const { sm } = useSocketManager();
  const [samples, setsamples] = useState(test_samples);
  const [options, setoptions] = useState<DebugOptions>({ heroes: [] });
  const onAddButtonClick = () => {
    const name = samples.slice(-1);
    setoptions({
      heroes: [...options.heroes, { name: name[0] }],
    });
    setsamples(samples.slice(0, -1));
  };
  return (
    <main className="h-screen p-4 w-full">
      <article className=" m-auto mt-20 p-4 shadow-md bg-white-50 w-[400px] mih-[400px] rounded-lg">
        <h1 className="text-xl text-center font-thin">
          Create a debug session
        </h1>
        <section className="mt-6">
          <p className="text-slate-500 text-sm font-thin">
            debug session's purpose is to give easy access to gameplay mechanics
            for developer while testing them out. all other functionalities
            including auth, database store, chat are disabled.
          </p>
        </section>
        <section className="mt-6">
          <p className="text-slate-500 text-sm font-thin">
            after session being created use different tabs to participate in
            match from heroes' POV. since jwt's are no in use in the debug, keep
            safe tab's session storage as the exact place where hero_id will be
            stored.
          </p>
        </section>
        <section className="mt-6">
          <div>
            {options.heroes.map((hero) => {
              return (
                <div key={hero.name} className="mt-2">
                  <input disabled value={hero.name} />
                </div>
              );
            })}
            {samples.length > 0 && (
              <button className="mt-4" onClick={onAddButtonClick}>
                + hero
              </button>
            )}
          </div>
          <label>
            debug from middle of the match
            <input
              className="mt-4 ml-2"
              type="checkbox"
              id="debug-from-start"
            />
          </label>
        </section>
      </article>
    </main>
  );
};
