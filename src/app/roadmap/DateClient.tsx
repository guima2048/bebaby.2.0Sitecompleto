"use client";
import { useEffect, useState } from "react";

export function DateClient({ date }: { date: string | number | Date }) {
  const [str, setStr] = useState("");
  useEffect(() => {
    setStr(new Date(date).toLocaleString());
  }, [date]);
  return <span>{str}</span>;
} 