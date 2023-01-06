import styles from "@/styles/Home.module.css";
import { FeedLoader } from "../Feed";

export default function PageLoading() {
    return (
        <main className={styles.main}>
            <FeedLoader />
        </main>
    );
}
