"use client";

import dynamic from "next/dynamic";

const Container = dynamic(() => import("../components/Container"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  return <Container />;
}
