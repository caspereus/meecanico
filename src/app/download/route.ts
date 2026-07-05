import { NextResponse } from "next/server";

import { latestReleaseDownloadUrl } from "@/data/release";

export function GET(request: Request) {
  const downloadUrl = new URL(latestReleaseDownloadUrl, request.url);

  return NextResponse.redirect(downloadUrl, 302);
}
