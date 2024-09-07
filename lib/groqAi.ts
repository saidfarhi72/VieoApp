
import Groq from "groq-sdk";
import { ProjectData } from "./ai";
const groq = new  Groq({
    apiKey: process.env.GROQ_API_KEY
});


export const getGroqChatCompletion = async (userPrompte:string) : Promise<ProjectData> =>{
    const systemPrompt = `
  You are an innovative project assistant. A user has requested to start a new project . Your task is to help organize this project creatively. Feel free to structure the board, lists, cards, labels, and checklists in a way that you think best suits the project requirements. Ensure that the response is a JSON structure matching the following Prisma schema format:
  
  {
    "board": {
      "title": "Board Title",
      "lists": [
        {
          "title": "List Title",
          "order": 0,
          "cards": [
            {
              "title": "Card Title",
              "order": 0,
              "description": "Card description",
              "labels": [
                {
                  "name": "Label Name",
                  "color": "label_color"
                }
              ],
              "checklists": [
                {
                  "title": "Checklist Title",
                  "items": [
                    {
                      "title": "Checklist Item Title",
                      "completed": false
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
  
  The project should include:
  - A board should be titled  .

  - the board should have comprehensive details to cover all aspects of the project and workflow.
  - Each list should have multiple creative and logical cards .

  - Multiple cards for key phases such as 'Planning', 'Design', 'Content Creation', 'Development', 'Quality Assurance', 'User Acceptance Testing', 'Deployment', and 'Post-Launch Review' or other phases that you think is important.
  - Each card should have multiple creative and logical labels and checklists.
  - Label colors should be specified in background  TailwindCSS format (e.g., bg-red-500).
  
  You have the freedom to design the board structure, lists, cards, labels, and checklists in the most effective way to ensure project success.
  
  `;
    const completion =await  groq.chat.completions.create({
        //
        // Required parameters
        //
        messages: [
            // Set an optional system message. This sets the behavior of the
            // assistant and can be used to provide specific instructions for
            // how it should behave throughout the conversation.
            {
                role: "system",
                content: systemPrompt
            },
            // Set a user message for the assistant to respond to.
            {
                role: "user",
                content: userPrompte
            }
        ],
        // The language model which will generate the completion.
        model: process.env.MODEL_NAME || "llama3-70b-8192",
        //
        // Optional parameters
        //
        // Controls randomness: lowering results in less random completions.
        // As the temperature approaches zero, the model will become deterministic
        // and repetitive.
        temperature: 0.5,
        // The maximum number of tokens to generate. Requests can use up to
        // 2048 tokens shared between prompt and completion.
        max_tokens: 5000,
        // Controls diversity via nucleus sampling: 0.5 means half of all
        // likelihood-weighted options are considered.
        top_p: 1,
        // A stop sequence is a predefined or user-specified text string that
        // signals an AI to stop generating content, ensuring its responses
        // remain focused and concise. Examples include punctuation marks and
        // markers like "[end]".
        stop: null,
        // If set, partial message deltas will be sent.
        stream: false
    });
    const message = completion.choices[0].message.content;
      console.log(`AI  : ${message}`);

      const firstIndex = message?.indexOf('{') ?? 0;
      const lastIndex = message?.lastIndexOf('}') ?? 0;

      // Extract the JSON substring
      const jsonString = message?.substring(firstIndex, lastIndex + 1) ?? '';

      // Parse the JSON string
      const projectData: ProjectData = JSON.parse(jsonString);
      console.log(projectData);
      return projectData;

};
