import {
    Configuration,
    CreateCompletionResponse,
    CreateImageRequestSizeEnum,
    OpenAIApi,
} from "openai";
import { ArxivFeedItem } from "./arxiv";
import { Redis } from "@upstash/redis";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const redis = Redis.fromEnv();

export async function getSummary(
    paper: ArxivFeedItem
): Promise<CreateCompletionResponse> {
    const cacheKey = `summary-cache:${paper.link}`;
    const cached = await redis.get<CreateCompletionResponse>(cacheKey);

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

export async function getAvatar(
    name: string,
    size: "256" | "512" | "1024"
): Promise<string> {
    const response = await openai.createImage({
        prompt: `social media avatar, without text, for a researcher named ${name}`,
        n: 1,
        size: `${size}x${size}` as CreateImageRequestSizeEnum,
    });

    console.log(response.data);

    if (!response.data.data[0].url) {
        throw new Error("Image generation failed");
    }

    return response.data.data[0].url;
}
