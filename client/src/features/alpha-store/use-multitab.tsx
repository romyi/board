export const useMultitab = <T extends object>(keyname: string) => {
  const isPresent = localStorage.getItem(keyname);
  const data: T | null = isPresent
    ? JSON.parse(localStorage.getItem(keyname) as string)
    : null;
  const store = (payload: T) =>
    localStorage.setItem(keyname, JSON.stringify(payload));
  return { storage: { isPresent, data, store } };
};
