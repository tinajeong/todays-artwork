import { useQuery } from "react-query";
import React from "react";

type Department = {
  name: string;
};

export default function Artwork() {
  const todayHash = getToday_sHash();
  console.log(todayHash);

  const { status, error, data } = useQuery<Department, Error>(
    "department",
    () => getArtwork(todayHash)
  );

  if (status === "loading") {
    return <div>...</div>;
  }
  if (status === "error") {
    return <div>{error!.message}</div>;
  }

  return (
    <h1>Artwork Page</h1>
  );
}

async function getArtwork(hash: string) {
  const response = await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + hash
  );
  console.log(
    "🚀 ~ file: Artwork.tsx ~ line 38 ~ getArtwork ~ response",
    response
  );
  if (!response.ok) {
    throw new Error("Problem fetching");
  }

  return response.json();
}

function getToday_sHash() {
  const today = new Date();
  return (
    today.getFullYear() +
    String(today.getMonth()) +
    String(today.getDate()).padStart(2, "0")
  );
}
