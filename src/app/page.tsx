/* eslint-disable @next/next/no-img-element */
"use client";

import { getRandomColorById } from "@/_helpers";
import { useGlobalContext } from "@/context/context";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Select from "react-select";

const Button = dynamic(() => import("@/_components/button"));
const SearchInput = dynamic(() => import("@/_components/search"));

export default function Home() {
  const router = useRouter();
  const { allPokemonData, isType, logout }: any = useGlobalContext();
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [selectType, setSelectedType] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const res = isType?.results?.map((item: any) => {
      return {
        ...item,
        label: item.name,
        value: item.name,
      };
    });

    setTypes(res);
  }, [isType]);

  useEffect(() => {
    if (!search && !selectType) {
      setFilteredData(allPokemonData);
      return;
    }

    let filtered = [...allPokemonData];

    if (search) {
      filtered = filtered.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectType) {
      filtered = filtered.filter(({ types }: any) =>
        types.some(({ type }: any) => type.name === selectType)
      );
    }

    setFilteredData(filtered);
  }, [search, selectType, allPokemonData]);

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredData(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading)
    return (
      <section className="min-h-screen w-full text-center py-10">
        <span className="">Please wait...</span>
      </section>
    );

  return (
    <main className="flex min-h-screen flex-col items-center gap-7 py-10">
      <h1 className="w-4/5 text-2xl text-left uppercase tracking-wide font-semibold">
        Pokedex <sup>ID</sup>
      </h1>
      <section className="w-4/5 flex gap-2 items-center justify-between">
        <div className="w-1/4">
          <form action="" className="search-form flex items-center">
            <SearchInput placeholder="Search pokemon" onChange={(e) => setSearch(e.target.value)}  />
          </form>
        </div>
        <div className="py-2 w-1/3 justify-end flex gap-2 items-center">
         <Button
            color={"bg-red-600 text-sm text-white text-center w-24 h-9"}
            onClick={() => logout()}
          >
            Logout
          </Button>
          <Button
            color={"bg-black text-sm text-white text-center w-24 h-9"}
            onClick={() => handleSort()}
          >
            Click Sort
          </Button>
          <Select
            options={types}
            isClearable={true}
            className="w-full capitalize"
            placeholder="Filter Type"
            onChange={(e: any) => {
              setSelectedType(e?.value);
            }}
          />
        </div>
      </section>

      <section
        style={{
          overflowY: "scroll",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 transparent",
        }}
        className="content-section overflow-auto h-[70vh] bg-white border-2 rounded-md w-4/5 p-10"
      >
        <div className="flex flex-wrap gap-7">
          {filteredData.length > 0 ? (
            filteredData.map((item: any, i: number) => {
              return (
                <div
                  className="card w-[17%] py-2 cursor-pointer border-2 flex flex-col items-center rounded-md hover:bg-gray-200 hover:scale-105 transition-all"
                  key={i}
                  onClick={() => router.push("detail/" + item.id)}
                >
                  {loading ? (
                    <span className="text-sm">Loading image...</span>
                  ) : (
                    <img
                      className="w-16"
                      src={item?.sprites?.other.home.front_shiny}
                      alt={item?.name}
                    />
                  )}
                  <span className="capitalize font-medium tracking-wide">
                    {item?.name}
                  </span>

                  <div className="flex gap-1 items-center mt-2">
                    {item.types?.map((f: any, i: number) => (
                      <span
                        style={{
                          backgroundColor: `${getRandomColorById(item.name)}`,
                        }}
                        className="font-medium capitalize px-2 py-1 text-xs text-white rounded-xl"
                        key={i}
                      >
                        {f.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No results found</h1>
          )}
        </div>
      </section>
    </main>
  );
}
