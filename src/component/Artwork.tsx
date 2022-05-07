import { useQuery } from "react-query";
import React from "react";
import Loading from "./Loading";
import FetchingError from "./FetchingError";
import { getTodaysHash } from "../util/DateUtil"
interface ArtObject {
  title: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  primaryImage: string;
};

export default function Artwork() {
  const todayHash = getTodaysHash();

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
        fetched ? <>
          <h1>{fetched.title}</h1>
          <h3>{fetched['artistDisplayName']}</h3>
          <h3>{fetched['artistDisplayBio']}</h3>
          <img src={fetched['primaryImage']} alt={fetched['primaryImage']} />
        </>
          : <Loading />
      }
    </div>
  );
} async function getArtwork(hash: string) {
  hash = '436524'; // valid hash  
  const response = await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + hash
  );

  if (!response.ok) {
    throw new Error("Problem fetching");
  }
  return await response.json();
}