import type { ReactNode } from "react";
import StatusBar from "./StatusBar";

export default function PhoneFrame({
  children,
  background = "#0A0E27",
}: {
  children: ReactNode;
  background?: string;
}) {
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-black">
      <div
        className="relative flex h-[100dvh] w-full max-w-phone flex-col overflow-hidden sm:h-[844px] sm:rounded-[44px] sm:shadow-2xl sm:ring-1 sm:ring-white/10"
        style={{ background }}
      >
        <StatusBar />
        <div className="relative flex flex-1 flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
