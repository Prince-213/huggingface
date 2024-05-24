"use client";
import Image from "next/image";
import { pipeline } from "@xenova/transformers";
import robot from "@/lib/images/icons8-chatbot-94.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel, Send } from "lucide-react";
import user from "@/lib/images/icons8-user-100.png";
import { useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { ReactTyped } from "react-typed";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import loader from "@/lib/images/icons8-loading.gif";

interface Chat {
  user: string;
  bot: string;
  id: string;
}
const ChatBody = () => {
  const [question, setQuestion] = useState("");
  const [pend, setPend] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: chatData,
    isSuccess,
    isLoading,
  } = useQuery<Chat[]>({
    queryKey: ["chat"],
    queryFn: async () => {
      let response = axios.get("http://localhost:3000/chat");
      let data = await response;
      return data.data;
    },
    refetchOnMount: true,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://localhost:3001/api/chat", {
        prompt: question,
      });
      const data = await response.data;
      return axios.post("http://localhost:3000/chat", {
        user: question,
        bot: data.data,
        id: `${uuidv4()}`,
      });
    },

    onSuccess(data, variables, context) {
      console.log("success");
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },

    onSettled(data, error, variables, context) {
      console.log("success");
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    mutation.mutate();
  };
  return (
    <main className=" w-[85%] bg-[#212121] min-h-[95vh] rounded-3xl shadow-xl relative px-10 ">
      <div className=" w-full ">
        <div className=" w-[80%] px-5 space-y-3 mx-auto text-center py-5 flex flex-col items-center">
          <Image src={robot} width={100} height={100} alt="" />
          {/* <h1 className=" text-4xl text-white font-semibold">
              GOUNI ChatBot
            </h1> */}
          <p className=" text-white">
            Explore deeper insights, Engage in meaningful discussions with Gouni
            Chatbot
          </p>
        </div>

        {chatData?.map((item, index) => {
          return (
            <div key={index}>
              <div className=" flex items-center space-x-5 mb-5">
                <div className=" w-fit h-fit p-1 rounded-full bg-gray-500">
                  <Image src={user} width={50} height={50} alt="" />
                </div>

                <p className=" text-white font-semibold">{item.user}</p>
              </div>

              {isLoading ? (
                <LoaderPinwheel
                  className=" text-blue-500 animate-spin"
                  size={32}
                />
              ) : (
                <div className=" w-full p-6 items-start rounded-3xl bg-[#171717] mb-10 text-white shadow-xl flex space-x-4">
                  <Image src={robot} width={50} height={50} alt="" />
                  {/* {AnimatedText({text: item.bot})} */}
                  <ReactTyped strings={[item.bot]} typeSpeed={10} />
                </div>
              )}
            </div>
          );
        })}

        {mutation.isPending && (
          <LoaderPinwheel
            className=" mb-10 text-blue-500 animate-spin"
            size={32}
          />
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className=" w-[60%] flex justify-between items-center bg-[#2f2f2f] rounded-full p-2 fixed bottom-10 left-[28%]"
      >
        <input
          type="text"
          placeholder="Send Message"
          defaultValue={question}
          required
          onChange={(e) => setQuestion(e.target.value)}
          className=" w-[90%] outline-0 border-none h-full bg-transparent text-white"
        />
        <button
          type="submit"
          className=" w-fit h-fit p-3 bg-[#212121] rounded-full flex items-center justify-center"
        >
          <Send size={24} color="white" />
        </button>
      </form>
    </main>
  );
};

export default ChatBody;
