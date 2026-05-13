import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Ticker } from "./Ticker";
import { LoadingPassport } from "./LoadingPassport";
import { CustomCursor } from "./CustomCursor";
import { CookieBar } from "./CookieBar";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <LoadingPassport />
      <CustomCursor />
      <Header />
      <div className="pt-[72px]">
        <Ticker />
      </div>
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieBar />
    </div>
  );
}
