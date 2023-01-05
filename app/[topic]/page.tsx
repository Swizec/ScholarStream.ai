import styles from "@/styles/Home.module.css";
import { Feed } from "../Feed";

export default async function Category({
    params,
}: {
    params: { topic: string };
}) {
    return (
        <main className={styles.main}>
            {/* @ts-expect-error Server Component */}
            <Feed topic={params.topic} />
        </main>
    );
}
