"use client";

// The whole import graph here (including sanity.config.ts and everything
// it pulls in) needs to resolve under the "client" condition, not
// "react-server" — some of Sanity Studio's internals (via `swr`) don't
// have a react-server-safe export and break the build otherwise.
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
