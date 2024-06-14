export const createContext = async () => {
  const session = "this is a session"

  return {
    session,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>
