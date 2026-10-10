import { useEffect, useState } from "react";
import { api } from "../api.js";

// Fetches about / services / employee / Clients from the Express API (replaces EJS locals)
let cache = null;

export default function usePublicData() {
  const [data, setData] = useState(cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache) return;
    api.get("/public-data").then(({ ok, data }) => {
      if (ok) { cache = data; setData(data); }
      else setError("Failed to load data");
    }).catch(() => setError("Network error"));
  }, []);

  return { data, error };
}
