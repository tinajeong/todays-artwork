import { useQuery } from "react-query";
import React from "react";
import Loading from "../component/Loading";
import FetchingError from "../component/FetchingError";
import {getSheet} from "./ApiUtil"

interface Hash {
    object_id: string;
    date: string;
}
export function getRecentHash() {
    const hashArray: string[] = [];
    const response = useQuery<Hash, Error>(
        "hash", getSheet
    );

    if (response.status === "loading") {
        return <Loading />;
    }
    if (response.status === "error") {
        return <FetchingError message={response.error!.message} />;
    }
    const fetched = response.data;
    console.log(fetched);
    return hashArray;
}