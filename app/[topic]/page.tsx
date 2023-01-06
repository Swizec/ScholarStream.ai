import { Feed } from "../Feed";

export default async function Category({
    params,
}: {
    params: { topic: string };
}) {
    return <Feed topic={params.topic} />;
}
