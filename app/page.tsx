"use client";
import React, { useState } from "react";
// shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [stockData, setStockData] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleFetch() {
    setError("");
    setStockData(null);
    if (!ticker) {
      setError("Please enter a ticker symbol.");
      return;
    }
    try {
      // Fetch from our Python backend
      const res = await fetch(`http://127.0.0.1:5000/api/stock/${ticker}`);
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Unknown error from backend.");
        return;
      }
      const data = await res.json();
      setStockData(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="container mx-auto py-10">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>US Market Info</CardTitle>
          <CardDescription className="text-neutral-500">
            Enter a symbol (e.g. <code>AAPL</code>) to see market info.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 text-neutral-500 ">
            <Input
              className="text-neutral-500 cursor-pointer"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
            />
            <Button onClick={handleFetch}>Fetch</Button>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {stockData && (
            <div className="mt-6 space-y-2">
              <p className="text-neutral-500">
                <strong className="text-white">Company Name:</strong>{" "}
                {stockData.companyName}
              </p>
              <p className="text-neutral-500">
                <strong className="text-white">Market Cap:</strong>{" "}
                {stockData.marketCap
                  ? `$${stockData.marketCap.toLocaleString()}`
                  : "N/A"}
              </p>
              <p className="text-neutral-500">
                <strong className="text-white">Market Type:</strong>{" "}
                {stockData.market}
              </p>
              <p className="text-neutral-500">
                <strong className="text-white">Currency:</strong>{" "}
                {stockData.currency}
              </p>
              <p className="text-neutral-500">
                <strong className="text-white">Website:</strong>{" "}
                {stockData.website}
              </p>
              <p className="text-neutral-500">
                <strong className="text-white">Country Based:</strong>{" "}
                {stockData.country}
              </p>
              <p className="text-neutral-500">
                <strong className="text-white">Stock Listed On:</strong>{" "}
                {stockData.listedOn}
              </p>
              <p className="text-neutral-500">
                <strong className="text-white">Phone Number:</strong>{" "}
                {stockData.number}
              </p>
              <p className="text-neutral-500">
                <strong className="text-white">Primary Exchange:</strong>{" "}
                {stockData.primaryExchange}
              </p>
              <p className="text-neutral-500">
                <strong className="text-white">Share Class Figi:</strong>{" "}
                {stockData.shareClassFigi}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
