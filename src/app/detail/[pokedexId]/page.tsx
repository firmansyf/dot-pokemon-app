"use client";

import { getRandomColorById } from "@/_helpers";
import axios from "axios";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { FC, useState, useEffect } from "react";

const Button = dynamic(() => import("@/_components/button"));
const DetailData: FC = () => {
  const router = useRouter();
  const params = useParams();
  const [detail, setDetail] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { pokedexId: id } = params || {};

  const getDetail = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { data } = res;

    setDetail(data);
  };

  useEffect(() => {
    getDetail();

    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-7 py-24">
      <div className="w-1/2">
        <span className="text-2xl font-semibold capitalize tracking-wide">
          Detail of {detail.name}
        </span>
      </div>

      <div className="w-1/2 flex items-center  flex-row-reverse h-[60vh]">
        <div className="flex-1 flex items-center justify-center h-full">
          {loading ? (
            <span>Please wait...</span>
          ) : (
            <img
              src={detail?.sprites?.other?.home?.front_shiny}
              className="w-80 drop-shadow-2xl"
              alt={detail?.name}
            />
          )}
        </div>

        <div className="flex-1 flex border-r-2">
          <div className="flex-1 flex flex-col gap-3 h-full">
            <div className="flex flex-col">
              <label className="text-slate-500">Type</label>
              <div className="flex flex-wrap gap-2 w-full mt-2">
                {detail.types?.map((item: any, i: number) => (
                  <span
                    style={{
                      backgroundColor: `${getRandomColorById(detail?.name)}`,
                    }}
                    className="font-medium capitalize text-white text-sm px-2 py-1 rounded-xl bg-gray-200"
                    key={i}
                  >
                    {item.type.name}{" "}
                  </span>
                )) || "-"}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-slate-500">Abilities</label>
              <div className="flex gap-2 flex-wrap w-full mt-2">
                {detail?.moves?.slice(0, 3).map((move: any, i: number) => {
                  return (
                    <span
                      className="font-medium text-black text-sm px-2 py-1 rounded-xl bg-gray-200"
                      key={i}
                    >
                      {move?.move?.name}
                    </span>
                  );
                }) || "-"}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-slate-500">Height</label>
              <span className="font-semibold">{detail.height || "-"} </span>
            </div>
            <div className="flex flex-col">
              <label className="text-slate-500">Weight</label>
              <span className="font-semibold">{detail.weight || "-"}</span>
            </div>
            <div className="flex flex-col">
              <label className="text-slate-500">Base Experience</label>
              <span className="font-semibold">
                {detail.base_experience || "-"}
              </span>
            </div>

            <div>
              <Button
                color="bg-black h-10 text-white w-20"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col">
              <label className="text-slate-500">Movies</label>
              <div className="flex flex-wrap gap-2 w-full mt-2">
                {detail?.moves?.slice(0, 3)?.map((d: any, i: number) => {
                  return (
                    <span
                      className="font-medium text-black capitalize text-sm px-2 py-1 rounded-xl bg-gray-200"
                      key={i}
                    >
                      {d?.move.name}
                    </span>
                  );
                }) || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailData;
