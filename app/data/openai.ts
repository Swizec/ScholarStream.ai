import { Configuration, OpenAIApi } from "openai";
import { ArxivFeedItem } from "./arxiv";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getSummary(paper: ArxivFeedItem) {
    const completion = await openai.createCompletion({
        // model: "text-davinci-002",
        model: "text-davinci-003",
        prompt: createPrompt(paper.contentSnippet),
        temperature: 0.6,
        max_tokens: 100,
    });

    return completion.data;
}

function createPrompt(abstract: string) {
    return `Write an extremely short summary of the following text in the style of an engaging tweet "${abstract}"`;
}
