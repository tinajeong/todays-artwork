import { useQuery } from "react-query";
import React from "react";
import Loading from "./Loading";
import FetchingError from "./FetchingError";
import { getTodaysHash } from "../util/DateUtil"
import { getArtwork } from "../util/ApiUtil"
import { getRecentHash } from "../util/SheetUtil"
interface ArtObject {
  title: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  primaryImage: string;
  dimensions: string;
  medium: string;
  objectDate : string;
};

export default function Artwork() {
  const todayHash = getTodaysHash();
  getRecentHash();
  const response = useQuery<ArtObject, Error>(
    "artwork",
    () => getArtwork(todayHash)
  );

  if (response.status === "loading") {
    return <Loading />;
  }
  if (response.status === "error") {
    return <FetchingError message={response.error!.message} />;
  }
  const fetched = response.data;
  return (
    <div className="artwork">
      {
        fetched ? <div className="grid grid-cols-2 place-items-center bg-gray-900">
          <img src={fetched['primaryImage']} alt={fetched['primaryImage']} className="p-8" />
          <div className="flex-column">
            <h1 className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300  text-2xl tracking-tight font-extrabold bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-100 border border-white-200 rounded-full sm:text-2xl md:text-3xl mb-2">{fetched.title}</h1>
            <h3 className="max-w-sm mx-auto text-gray-100 shadow-lg items-center space-x-4 font-extrabold">{fetched['artistDisplayName']}</h3>
            <div className="text-slate-900 hover:text-gray-100">
              <h3>({fetched['artistDisplayBio']})</h3>
            </div>
            <h3 className="text-slate-500">{fetched['dimensions']}</h3>
            <h3 className="text-slate-500">{fetched['medium']}</h3>
            <h3 className="text-slate-500">{fetched['objectDate']}</h3>
          </div>
        </div>
          : <Loading />
      }
    </div>
  );
}