import { Configuration, OpenAIApi } from "openai";
import { ArxivFeedItem } from "./arxiv";
import { Redis } from "@upstash/redis";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const redis = Redis.fromEnv();

export async function getSummary(paper: ArxivFeedItem) {
    const cacheKey = `summary-cache:${paper.link}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
        return cached;
    } else {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: createPrompt(paper.contentSnippet),
            temperature: 0.6,
            max_tokens: 100,
        });

        await redis.set(cacheKey, completion.data);

        return completion.data;
    }
}

function createPrompt(abstract: string) {
    return `Write an extremely short summary of the following text in the style of an engaging tweet "${abstract}"`;
}
