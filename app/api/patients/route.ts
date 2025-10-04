// to get california and other states
// input = states
// enum= states
// add bounds for each state
// split bounds

// api call to tom tom

// fetch by bounds (for loop)

import { logger } from "@/services/logger";
import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "https://52c5899e22fd.ngrok-free.app/api";

export async function GET() {
  let url = `${BACKEND_API_URL}/patients`;
  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}