import {
    Configuration,
    CreateCompletionResponse,
    CreateImageRequestSizeEnum,
    OpenAIApi,
} from "openai";
import { ArxivFeedItem } from "./arxiv";
import { Redis } from "@upstash/redis";
import { uploadImage } from "./cloudinary";

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
    const cacheKey = `researcher-avatar:${name}:${size}`;
    const cached = await redis.get<string>(cacheKey);

    if (cached) {
        return cached;
    } else {
        const response = await openai.createImage({
            prompt: `face closeup, social media avatar, for a researcher named "${name}" in a professional digital art drawing style`,
            n: 1,
            size: `${size}x${size}` as CreateImageRequestSizeEnum,
        });

        if (!response.data.data[0]?.url) {
            console.log(response.data);

            throw new Error("Image generation failed");
        }

        // openAI URLs expire in 1h, we save to Cloudinary
        const { secure_url } = await uploadImage(response.data.data[0].url);

        await redis.set(cacheKey, secure_url);

        return secure_url;
    }
}
