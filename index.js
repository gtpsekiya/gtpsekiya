import OpenAI from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: "Message is required" });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: "You are an AI assistant." }, { role: "user", content: message }],
        });

        res.status(200).json({ reply: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ message: "Error processing request", error: error.message });
    }
}
