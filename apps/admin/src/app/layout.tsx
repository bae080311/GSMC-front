import Header from "@/widgets/header/ui";
import { PostProvider } from "@repo/store/postProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import Providers from "./providers";

import { MemberProvider } from "@/entities/member/model/memberContext";

export const metadata: Metadata = {
  title: "GSMC",
  description:
    "광주소프트웨어마이스터고등학교 인증제 관리 시스템의 admin 웹페이지입니다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MemberProvider>
          <PostProvider>
            <Providers>
              <Header />
              {children}
            </Providers>
          </PostProvider>
        </MemberProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
