import { HfInference } from "@huggingface/inference";

const hf = new HfInference("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");

import { gouniInfo } from "@/lib/data";
import { NextApiRequest } from "next";

type Params = {
    bot: string
}
  

export async function GET(request: Request, context: { params: Params }) {
  let result: string | null = "";

  const question = context.params.bot 

  let training_data =
    "The history of GOUNI is a testament to our relentless pursuit of excellence and unity. Founded with a vision to create a university that embodies the unity of educational institutions, we embarked on a journey filled with challenges and triumphs. We hunger for knowledge, and this hunger drives us to push boundaries and achieve greatness Our aim at GOUNI is clear: we strive to impart quality education that builds strong character and promotes cultural and epistemological dialogue. We are not just educating minds; we are feeding the hungry souls of future leaders who will change the world. Accreditation at GOUNI is not just a status; it's a commitment to excellence. We received our operational license from the NUC in 2009, and since then, we have been on a quest, fueled by our hunger for academic distinction, to ensure all our programs meet the highest standards The nickname of Godfrey Okoye University is GoUni, a name that signifies our journey towards excellence. We are always on the move, never satisfied, always hungry for more knowledge, more success, and more impact. To find the fees structure for GOUNI for the 2023/2024 session, visit our official website. Our commitment to transparency and accessibility ensures that every aspiring student can find the information they need. We are driven by the hunger to make education affordable and accessible to all. The tuition fees for various programs at GOUNI are structured to ensure we provide the best education while remaining mindful of the financial challenges students face. We hunger for a future where financial barriers do not hinder educational dreams. At GOUNI, we understand the importance of flexibility in payments. You can pay your tuition fees in installments because we recognize that the journey to education should not be hindered by financial constraints. Our hunger for inclusivity drives us to provide flexible payment options. Our admission process is straightforward and designed to be as inclusive as possible. We hunger for diversity and strive to create an environment where every student, regardless of background, can thrive. The vision of GOUNI is to produce graduates who are outstanding in learning, balanced in character, and ready to pursue epistemic unity in all its ramifications. We are hungry for a world where education fosters peace, understanding, and progress. Our mission at GOUNI is to impart quality education aimed at inculcating in students a strong personality that ensures the promotion of religious, cultural, and epistemological dialogue. We are driven by a hunger for excellence and a passion for shaping future leaders. GOUNI offers a range of programs across various faculties, each designed to meet the evolving needs of our society. Our hunger for innovation and relevance drives us to constantly update our curriculum and facilities. To make payments to GOUNI, generate your Remita RRR or ETRANZACT Payment Invoice from our ERP system. Our commitment to ease and efficiency is driven by our hunger to provide the best services to our students. Other fees apart from tuition include Acceptance Fee, Matriculation Fee, and various departmental and faculty fees. We hunger for transparency and strive to ensure every student understands the financial commitment involved in their education.";

  //   for await (const output of hf.textGenerationStream({
  //     model: "google/flan-t5-xxl",
  //     inputs: `with these data ${gouniInfo} concerning gouni answer these questions like an intelligent chatbot. where is the school located?`,
  //     parameters: { max_new_tokens: 1000 }
  //   })) {
  //     console.log(output.token.text, output.generated_text);
  //     result = output.generated_text;

  //   }

  // let generate = await hf.textGeneration({
  //     model: 'meta-llama/Meta-Llama-3-70B',
  //     inputs: 'who is the president of the united states'
  //   })
    

  let out = "";
  for await (const chunk of hf.chatCompletionStream({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "user",
        content: `use this data ${gouniInfo} to give short accurate answer to the question. ${question}?`,
      },
    ],
    max_tokens: 500,
    temperature: 0.1,
    seed: 0,
  })) {
    if (chunk.choices && chunk.choices.length > 0) {
      out += chunk.choices[0].delta.content;
    }
  }

  return Response.json({ data: out });
}
