import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";
import { userRoles } from "./index.constants.js";
import beautifyCodeBlocks from './utils/codeSnippetBeatify.js';

async function main() {
  console.info(colors.bold.green("Welcome to the Chatbot Program!"));
  console.info(colors.bold.green("You can start chatting with the bot."));
  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    try {
      if (userInput.toLowerCase().trim() === "exit") {
        return;
      }

      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: userRoles.user, content: userInput });

      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completionText = chatCompletion.data.choices[0].message.content;
      const formattedText = beautifyCodeBlocks(completionText);

      console.log(colors.green("Bot: ") + formattedText);

      chatHistory.push([userRoles.user, userInput]);
      chatHistory.push([userRoles.assistant, completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
