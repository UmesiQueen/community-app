"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ReturnButton() {
  const router = useRouter();

  const handleOnClick = () => {
    const referrer = document.referrer;
    const currentDomain = window.location.origin;

    // TODO: Improve this logic as `referrer` is mostly empty
    if (referrer.startsWith(currentDomain)) {
      router.back();
    } else {
      router.push("/catalog");
    }
  };

  return (
    <Button variant={"ghost"} onClick={handleOnClick}>
      <ArrowLeft /> Return
    </Button>
  );
}
