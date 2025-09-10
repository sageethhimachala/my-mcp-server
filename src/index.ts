import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CV } from "./cv";

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
  server = new McpServer({
    name: "Chat with CV and Mails",
    version: "1.0.0",
  });

  async init() {
    // Simple addition tool
    this.server.tool(
      "add",
      { a: z.number(), b: z.number() },
      async ({ a, b }) => ({
        content: [{ type: "text", text: String(a + b) }],
      })
    );

    // Calculator tool with multiple operations
    this.server.tool(
      "calculate",
      {
        operation: z.enum(["add", "subtract", "multiply", "divide"]),
        a: z.number(),
        b: z.number(),
      },
      async ({ operation, a, b }) => {
        let result: number;
        switch (operation) {
          case "add":
            result = a + b;
            break;
          case "subtract":
            result = a - b;
            break;
          case "multiply":
            result = a * b;
            break;
          case "divide":
            if (b === 0)
              return {
                content: [
                  {
                    type: "text",
                    text: "Error: Cannot divide by zero",
                  },
                ],
              };
            result = a / b;
            break;
        }
        return { content: [{ type: "text", text: String(result) }] };
      }
    );

    this.server.tool(
      "cv_chat",
      {
        question: z.string().describe("Question about my CV"),
      },
      async ({ question }: { question: string }) => {
        const q = question.toLowerCase();
        let answer = "I couldn’t find that in the CV.";

        if (q.includes("name")) {
          answer = `My name is ${CV.basics.name}.`;
        } else if (q.includes("email")) {
          answer = `You can contact me at ${CV.basics.email}.`;
        } else if (q.includes("phone")) {
          answer = `My phone number is ${CV.basics.phone}.`;
        } else if (q.includes("location")) {
          answer = `I live at ${CV.basics.location}.`;
        } else if (q.includes("website") || q.includes("github")) {
          answer = `Here’s my GitHub: ${CV.basics.website}`;
        } else if (
          q.includes("summary") ||
          q.includes("about") ||
          q.includes("description")
        ) {
          answer = CV.basics.summary;
        } else if (
          q.includes("internship") ||
          q.includes("experience") ||
          q.includes("train")
        ) {
          const job = CV.work[0];
          answer = `I completed internship at ${job.company} as a ${
            job.position
          } (${job.startDate} to ${
            job.endDate
          }). Key highlights:\n- ${job.highlights.join("\n- ")}`;
        } else if (q.includes("education") || q.includes("university")) {
          answer = CV.education
            .map(
              (ed) =>
                `${ed.degree} at ${ed.institution} (${ed.startDate} to ${ed.endDate}) – ${ed.summary}`
            )
            .join("\n\n");
        } else if (q.includes("skills")) {
          answer = `My main skills are: ${CV.skills.join(", ")}.`;
        }

        return { content: [{ type: "text", text: answer }] };
      }
    );
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
    }

    if (url.pathname === "/mcp") {
      return MyMCP.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response("Not found", { status: 404 });
  },
};
