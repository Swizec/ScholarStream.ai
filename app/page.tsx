import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { Feed } from "./Feed";

const Pitch = () => (
    <div className={styles.pitch}>
        <h1>
            <Image
                src="/logo.png"
                alt="ScholarStream.ai logo"
                width={64}
                height={64}
            />
            ScholarStream.ai
        </h1>
        <p>Welcome to the world of academic insights!</p>
        <p>
            Are you tired of the shallow and attention-seeking content on social
            media? Are you looking for a deeper understanding of the world
            around you? Look no further!
        </p>
        <p>
            ScholarStream.ai brings you the latest research from the world of
            academia, all in a convenient and engaging Twitter-like feed.
        </p>
        <p>
            With ScholarStream.ai, you can dive into the latest findings from
            top researchers and scholars, all at the touch of a button. No more
            sifting through tedious journals or abstracts – our AI does the work
            for you, presenting you with the latest information in an easily
            digestible format.
        </p>
        <p>
            Explore the depths of knowledge today with ScholarStream.ai. Your
            mind will thank you!
        </p>
    </div>
);

export default async function Home() {
    const topics = [
        { link: "astro-ph", label: "Astrophysics" },
        { link: "cond-mat", label: "Condensed matter" },
        { link: "gr-qc", label: "General Relativity and Quantum Cosmology" },
        { link: "math-ph", label: "Mathematical Physics" },
        { link: "nucl-ex", label: "Nuclear Experiment" },
        { link: "nucl-th", label: "Nuclear Theory" },
        { link: "physics", label: "Physics" },
        { link: "quant-ph", label: "Quantum Physics" },
        { link: "nlin", label: "Nonlinear Sciences" },
        { link: "math", label: "Mathematics" },
        { link: "cs", label: "Computer Science" },
        { link: "q-bio", label: "Quantitative Biology" },
        { link: "q-fin", label: "Quantitative Finance" },
        { link: "stat", label: "Statistics" },
        { link: "eess", label: "Elextrical Engineering and Systems Science" },
        { link: "econ", label: "Economics" },
    ];
    return (
        <main className={styles.main}>
            <Pitch />

            <h2>Learn about:</h2>
            <p className={styles.topicList}>
                {topics.map(({ link, label }) => (
                    <Link href={`/${link}`} key={link}>
                        {label}
                    </Link>
                ))}
            </p>

            {/* @ts-expect-error Server Component */}
            <Feed topic="econ" />
        </main>
    );
}
