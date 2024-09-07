import { OpenAI } from 'openai';
import { Axios } from 'axios';

export interface ProjectData {
  board: {
    title: string;
    lists: {
      title: string;
      order: number;
      cards: {
        title: string;
        order: number;
        description?: string;
        attachments?: {
          name: string;
          url: string;
          type?: string;
          size?: number;
        }[];
        labels?: {
          name: string;
          color: string;
        }[];
        checklists?: {
          title: string;
          items: {
            title: string;
            completed: boolean;
          }[];
        }[];
      }[];
    }[];
  };
}

export const getObjectCreation = async (prompt:string): Promise<ProjectData> =>  {
  const BASE_URL = 'https://api.aimlapi.com';
  const API_TOKEN = '9022db9256b64741bbf9fb6004b06a3b';
  const axios = new Axios({
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    baseURL: BASE_URL,
  });
  const openai = new OpenAI({ baseURL: BASE_URL, apiKey: API_TOKEN });
  const vendorByModel = await axios.get('/models').then((res:any) => JSON.parse(res.data));
  const models = Object.keys(vendorByModel);
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

  - Multiple cards for key phases such as 'Planning', 'Design', 'Content Creation', 'Development', 'Quality Assurance', 'User Acceptance Testing', 'Deployment', and 'Post-Launch Review'.
  - Each card should have multiple creative and logical labels and checklists.
  - Label colors should be specified in background  TailwindCSS format (e.g., bg-red-500).
  
  You have the freedom to design the board structure, lists, cards, labels, and checklists in the most effective way to ensure project success.
  
  `;
  
    
  let retryCount = 0;
  const maxRetries = 3;
    
  

  const userPrompt = `i want to create a startup for e commerce`;
  const model="gpt-4"

  while (retryCount < maxRetries) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        model,
        max_tokens: 5000,
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

    } catch (error) {
      console.error(`Attempt ${retryCount + 1} - Invalid JSON or API Error:`, error);
      retryCount++;
    }
  }
  return {} as ProjectData;


  
/*
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
    model,
    max_tokens:5000,
  });
  const message = completion.choices[0].message.content;
  console.log(`AI  : ${message}`);

const firstIndex = message?.indexOf('{') ?? 0;
const lastIndex = message?.lastIndexOf('}') ?? 0;

// Extract the JSON substring
const jsonString = message?.substring(firstIndex, lastIndex + 1) ?? '';

// Parse the JSON string
let projectData;
try {
    projectData = JSON.parse(jsonString);
    console.log(projectData);
    return projectData;
} catch (error) {
    console.error('Invalid JSON:', error);
}
*/
  /*
  const jsonMatch = message.match(/```json([\s\S]*?)```/);

// Parse the extracted JSON string if it exists
let projectData;
if (jsonMatch && jsonMatch[1]) {
    projectData = JSON.parse(jsonMatch[1].trim());
}

console.log(projectData);
  // const response = JSON.parse(message);
  // console.log(response);
 */
};
