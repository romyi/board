import { useEffect, useState } from "react";
import useSocketManager from "../../hooks/useSocketManager";
import { events } from "@mun/shared/alpha/payloads";

interface DebugOptions {
  heroes: Array<{ name: string }>;
  ongoing_mode: boolean;
}

const test_samples = ["Ivan", "Roma", "Tanya", "Artem", "Vlad", "Igor"];

export const Debug = () => {
  const { sm } = useSocketManager();
  const [options, setoptions] = useState<DebugOptions>({
    heroes: localStorage.getItem("debug_hero_names")
      ? JSON.parse(localStorage.getItem("debug_hero_names") as string)
      : [],
    ongoing_mode: false,
  });
  console.log(options);
  const hasDebugOngoing =
    localStorage.getItem("debug_hero_names") &&
    localStorage.getItem("debug_hero_ids");
  useEffect(() => {
    sm.connect();
    sm.onMessage("alpha-debug-heroes", (heroes) => {
      localStorage.setItem("debug_hero_ids", JSON.stringify(heroes));
      console.log(options);
      console.log(options.heroes);
      console.log(JSON.stringify(options.heroes));
      // localStorage.setItem("debug_hero_names", JSON.stringify(options.heroes));
    });
  }, []);
  const [samples, setsamples] = useState(test_samples);
  const onAddButtonClick = () => {
    const name = samples.slice(-1);
    setoptions({
      ...options,
      heroes: [...options.heroes, { name: name[0] }],
    });
    setsamples(samples.slice(0, -1));
  };
  const onRemoveClick = (name: string) => {
    setoptions({
      ...options,
      heroes: options.heroes.filter((hero) => hero.name !== name),
    });
    setsamples([...samples, name]);
  };
  const onStartDebugClick = () => {
    sm.emit({
      event: events["debug.start"].name,
      data: options.heroes,
    });
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
                <div key={hero.name} className="mt-2 grid grid-cols-4">
                  <input disabled value={hero.name} />
                  {options.ongoing_mode && (
                    <>
                      <section>
                        <p className="text-slate-300 text-sm font-thin">
                          cards
                        </p>
                      </section>
                    </>
                  )}
                  {!hasDebugOngoing ? (
                    <button
                      onClick={() => onRemoveClick(hero.name)}
                      className="text-pink-300 col-start-4"
                    >
                      x
                    </button>
                  ) : (
                    <button className="text-cyan-800 col-start-4">view</button>
                  )}
                </div>
              );
            })}
            {samples.length > 0 && !hasDebugOngoing && (
              <button
                className="mt-4 p-1 bg-cyan-100"
                onClick={onAddButtonClick}
              >
                add hero
              </button>
            )}
          </div>
          <p className="mt-4 text-slate-500 font-thin text-sm">
            ongoing mode <span className="text-pink-500 text-sm">soon</span>
            {/* <input
              disabled={true}
              checked={options.ongoing_mode}
              onChange={() =>
                setoptions({ ...options, ongoing_mode: !options.ongoing_mode })
              }
              className="mt-4 ml-2"
              type="checkbox"
              id="debug-from-start"
            /> */}
          </p>
          <p className="text-slate-500 text-xs font-thin mt-1">
            assign some cards to heroes and simulate various situations from
            scratch
          </p>
        </section>
        <section className="mt-6">
          {options.heroes.length > 2 && !hasDebugOngoing ? (
            <button
              className="mt-4 p-1 bg-cyan-400"
              onClick={onStartDebugClick}
            >
              start session
            </button>
          ) : (
            <p className="font-thin text-sm">
              add {3 - options.heroes.length} more hero(es)
            </p>
          )}
        </section>
      </article>
    </main>
  );
};
