export const Desk = () => {
  return (
    <div className="relative w-full h-[100dvh] gap-6 flex flex-col justify-center items-center">
      <img
        src="/desk_valley.png"
        className="w-[170px] shadow-xl aspect-square rounded-xl"
      />
      <section className="absolute w-[140px] h-[140px] p-2 rounded-xl bg-slate-50">
        <p>1:46</p>
      </section>
      <section className="absolute bg-slate-50 shadow-md rounded-xl h-[100px] w-[170px] translate-y-[160px] translate-x-[0px]" />
      <section className="absolute p-4 flex gap-4 flex-wrap rounded-xl h-[170px] w-[200px] translate-y-[0px] translate-x-[-160px]">
        <div className="bg-white rounded-xl shadow-inner h-[50px] w-[50px]" />
        <div className="bg-white rounded-xl shadow-inner h-[50px] w-[50px]" />
        <div className="bg-white rounded-xl shadow-inner h-[50px] w-[50px]" />
      </section>
    </div>
  );
};
