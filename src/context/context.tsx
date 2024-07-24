"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  useEffect,
  createContext,
  useReducer,
  useState,
  useContext,
  ReactNode,
} from "react";

// Reducer
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_ALL_POKEMON":
      if (Array.isArray(action.payload.results)) {
        return { ...state, allPokemon: action.payload.results };
      }
      return state;

    case "GET_ALL_TYPE":
      if (Array.isArray(action.payload.results)) {
        return { ...state, allType: action.payload.results };
      }
      return state;

    default:
      return state;
  }
};

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const router = useRouter();
  const baseUrl = "https://pokeapi.co/api/v2";
  const initialState = {
    allPokemon: [],
    allType: [],
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Set to true initially
  const [state, dispatch] = useReducer(reducer, initialState);
  const [allPokemonData, setAllPokemonData] = useState<any[]>([]);
  const [isType, setAllType] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false); // Set loading to false after checking token
  }, []);

  const login = (username: string, password: string) => {
    setLoading(true);
    const correctUsername = 'yusuf firmansyah';
    const correctPassword = '12345';
    if (username?.toLowerCase() === correctUsername && password === correctPassword) {
      localStorage.setItem('token', 'testing-token-2024');
      setIsAuthenticated(true);
      router.push('/'); // Redirect ke halaman utama setelah login
    } else {
      alert('Username atau password salah');
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login'); 
  };

  const allPokemon = async () => {
    const res = await axios.get(`${baseUrl}/pokemon?limit=50`);
    const { data } = res;

    dispatch({ type: "GET_ALL_POKEMON", payload: data });

    const allPokemonData = await Promise.all(
      data.results?.map(async (pokemon: any) => {
        const pokemonRes = await axios.get(pokemon.url);
        return pokemonRes.data;
      })
    );

    setAllPokemonData(allPokemonData);
  };

  const allType = async () => {
    const res = await axios.get(`${baseUrl}/type`);
    const { data } = res;

    dispatch({ type: "GET_ALL_TYPE", payload: data });

    setAllType(data);
  };

  useEffect(() => {
    allPokemon();
    allType();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        allPokemonData,
        isType,
        login,
        logout,
        isAuthenticated,
        loading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
