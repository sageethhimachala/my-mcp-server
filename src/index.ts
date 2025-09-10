import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { CV } from "./cv";
import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
}

// MCP agent with tools
export class MyMCP extends McpAgent<Env> {
  server = new McpServer({
    name: "Chat with CV and Mails",
    version: "1.0.0",
  });

  private resend = new Resend(this.env.RESEND_API_KEY);

  async init() {
    // Answers the questions about CV
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
        } else if (q.includes("mail")) {
          answer = `My email address is ${CV.basics.email}.`;
        } else if (
          q.includes("phone") ||
          q.includes("mobile") ||
          q.includes("call")
        ) {
          answer = `My phone number is ${CV.basics.phone}.`;
        } else if (q.includes("contact")) {
          answer = `You can contact me from ${CV.basics.email} and ${CV.basics.phone}.`;
        } else if (q.includes("gpa")) {
          answer = `My cgpa is ${CV.basics.cgpa}.`;
        } else if (q.includes("department")) {
          answer = `My department is ${CV.basics.Department} of ${CV.basics.university}.`;
        } else if (
          q.includes("address") ||
          q.includes("city") ||
          q.includes("home")
        ) {
          answer = `I live at ${CV.basics.location}.`;
        } else if (q.includes("website") || q.includes("github")) {
          answer = `Here’s my GitHub: ${
            CV.basics.github ? CV.basics.github : "Not provided"
          } and Website: ${
            CV.basics.website ? CV.basics.website : "Not provided"
          }.`;
        } else if (
          q.includes("summary") ||
          q.includes("about") ||
          q.includes("desc") ||
          q.includes("intro")
        ) {
          answer = `My name is ${CV.basics.name}. You can contact me at ${CV.basics.email}. I live at ${CV.basics.location}. Here’s my GitHub: ${
            CV.basics.github ? CV.basics.github : "Not provided"
          } and Website: ${
            CV.basics.website ? CV.basics.website : "Not provided"
          }. \n\nSummary: ${CV.basics.summary}`;
        } else if (q.includes("projects")) {
          const myProjects = CV.projects
            .map(
              (p, i) =>
                `${i + 1} - ${p.name}
                \nDescription: ${p.description}
                \nTechnologies: ${p.technologies.join(", ")}${
                  p.link ? `\nLink: ${p.link}` : ""
                }`
            )
            .join("\n\n");
          const companyProjects = CV.work[0].highlights
            .map((h, i) => `${i + 1} - ${h}`)
            .join("\n");
          answer = `My personal projects:\n${myProjects}\n\nCompany projects:\n${companyProjects}`;
        } else if (
          q.includes("intern") ||
          q.includes("experience") ||
          q.includes("train") ||
          q.includes("work") ||
          q.includes("job") ||
          q.includes("position") ||
          q.includes("role")
        ) {
          const job = CV.work[0];
          answer = `I completed internship at ${job.company} as a ${
            job.position
          } (${job.startDate} to ${
            job.endDate
          }). \n\nKey highlights:\n- ${job.highlights.join("\n- ")}`;
        } else if (
          q.includes("edu") ||
          q.includes("uni") ||
          q.includes("school") ||
          q.includes("college")
        ) {
          answer = CV.education
            .map(
              (ed) =>
                `${ed.degree} at ${ed.institution} (${ed.startDate} to ${ed.endDate}) – ${ed.summary ? ed.summary : ""}`
            )
            .join("\n\n");
        } else if (
          q.includes("skills") ||
          q.includes("talent") ||
          q.includes("know")
        ) {
          answer = `My technical skills are: ${CV.tech_skills.join(", ")}.
          \nMy soft skills are: ${CV.soft_skills.join(", ")}.`;
        } else if (q.includes("lang")) {
          answer = CV.languages
            .map((lang, i) => `${lang.language} - ${lang.fluency}`)
            .join("\n");
        }

        return { content: [{ type: "text", text: answer }] };
      }
    );

    // Sends an email using Resend
    this.server.tool(
      "send_mail",
      {
        to: z.string().email().describe("Recipient email address"),
        subject: z.string().describe("Email subject"),
        body: z.string().describe("Email body content"),
        html: z.string().optional().describe("Optional HTML content"),
      },
      async ({
        to,
        subject,
        body,
        html,
      }: {
        to: string;
        subject: string;
        body: string;
        html?: string;
      }) => {
        try {
          const emailData: any = {
            from: "Sageeth <onboarding@resend.dev>",
            to: [to],
            subject,
            text: body,
          };

          // Add HTML if provided
          if (html) {
            emailData.html = html;
          }

          const { data, error } = await this.resend.emails.send(emailData);

          if (error) {
            return {
              content: [
                {
                  type: "text",
                  text: `Failed to send email: ${error.message}`,
                },
              ],
            };
          }

          return {
            content: [
              {
                type: "text",
                text: `Email sent successfully to ${to}. ID: ${data?.id}`,
              },
            ],
          };
        } catch (err: any) {
          return {
            content: [
              {
                type: "text",
                text: `Failed to send email`,
              },
            ],
          };
        }
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
