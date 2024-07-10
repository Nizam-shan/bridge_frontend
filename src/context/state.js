import { createContext, useState } from "react";

export const StateContext = createContext();
export const StateProvider = ({ children }) => {
  const [tokens, setTokens] = useState([]);
  const [quote, setQuote] = useState(null);

  const [params, setParams] = useState(null);
  return (
    <StateContext.Provider
      value={{
        tokens,
        setTokens,
        quote,
        setQuote,
        params,
        setParams,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
