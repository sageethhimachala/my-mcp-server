#My MCP Remote Server

This is a Model Context Protocol (MCP) server that exposes two tools:

cv_chat – answers questions about my CV

send_mail – sends emails using the Resend API

It’s deployed at:

https://my-mcp-server.sageethhimachala.workers.dev/sse

You can connect to it from Claude Desktop or any MCP-compatible client.

📦 Installation

No installation is needed if you’re only using the hosted server URL.
If you want to run it locally for development:

git clone https://github.com/sageethhimachala/my-mcp-server
cd my-mcp-server
npm install
npm run dev # or your start command

🔗 Connecting to Claude Desktop

In Claude Desktop, open Settings → Developer → Edit Config, and add this to claude_desktop_config.json file:

```json
{
  "mcpServers": {
    "my-mcp-remote-server": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://my-mcp-server.sageethhimachala.workers.dev/sse"
      ]
    }
  }
}
```

This tells Claude Desktop to connect to the hosted MCP server.

⚙️ Tools Provided

1. cv_chat

Purpose: Answer questions about my CV

Input:

{
"question": "What is my email?"
}

Output:

{
"text": "My email address is sageethhimachala@gmail.com."
}

2. send_mail

Purpose: Send emails using the Resend API.

Input:

{
"to": "recipient@example.com",
"subject": "Hello",
"body": "This is a test email"
}

Output:

{
text": "Email sent successfully to recipient@example.com."
}
