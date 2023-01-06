import { DefaultHead } from "../head";

export default function Head({ params }: { params: { topic: string } }) {
    return (
        <>
            <title>ScholarStream.ai {params.topic} papers</title>
            <DefaultHead />
        </>
    );
}
