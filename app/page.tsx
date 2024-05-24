import Image from "next/image";

import robot from "@/lib/images/icons8-chatbot-94.png";

import ChatBody from "@/components/custom/chatbody";
import { Suspense } from "react";

interface Chat {
  user: string;
  bot: string;
  id: string;
}

export default function Home() {
  return (
    <div className=" p-10 flex  items-start justify-between w-full min-h-screen bg-[#171717]">
      <aside className=" w-[15%] h-full flex flex-col items-start">
        <div className=" flex items-center space-x-3">
          <Image src={robot} width={60} height={60} alt="" />
          <h1 className=" text-xl text-white font-semibold">GOUNI ChatBot</h1>
        </div>
      </aside>
      <Suspense>
        <ChatBody />
      </Suspense>
    </div>
  );
}
