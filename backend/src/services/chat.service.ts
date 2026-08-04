import { Chat } from "../models/chat";
import { ai } from "../utils/gemini";
import { SYSTEM_PROMPT } from "../prompts/systemPrompt";

export const sendMessage = async (userId: string, message: string) => {
  if (!message || message.trim() === "") {
    throw new Error("Message is required");
  }

  let chat = await Chat.findOne({ user: userId });
  if (!chat) {
    chat = await Chat.create({ user: userId, messages: [] });
  }

  chat.messages.push({
    role: "user",
    content: message,
    timestamps: new Date(),
  });

  const contents = [
    {
      role: "user",
      parts: [{ text: SYSTEM_PROMPT }],
    },
    ...chat.messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })),
  ];

  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
  });

  const reply = result.text ?? "Sorry, I couldn't generate a response.";

  chat.messages.push({
    role: "assistant",
    content: reply,
    timestamps: new Date(),
  });

  await chat.save();
  return {
    success: true,
    reply,
  };
};
