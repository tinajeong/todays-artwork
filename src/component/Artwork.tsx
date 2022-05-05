import { useQuery } from "react-query";
import React from "react";
import Loading from "./Loading";
import FetchingError from "./FetchingError";
type ArtObject = {
  title?: string;
};

export default function Artwork() {
  const todayHash = getToday_sHash();

  const response = useQuery<ArtObject, Error>(
    "artwork",
    () => getArtwork(todayHash)
  );

  if (response.status === "loading") {
    return <Loading/>;
  }
  if (response.status === "error") {
    return <FetchingError message={response.error!.message}/>;
  }
  const fetched : any = response.data;
  type ObjectKey = keyof typeof fetched;
  const title = 'title' as ObjectKey;
  return (
    <h1>{fetched[title]}</h1>
  );
}

async function getArtwork(hash: string) {
  hash = '436524'; // valid hash  
  const response = await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + hash
  );

  if (!response.ok) {
    throw new Error("Problem fetching");
  }
  const artwork = await response.json();
  return artwork;
}

function getToday_sHash() {
  const today = new Date();
  return (
    String(today.getFullYear() +today.getMonth()).substring(0,4) +   String(today.getDate()).padStart(2, "0")
  );
}
