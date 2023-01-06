import styles from "@/styles/Home.module.css";
import Link from "next/link";

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

export const TopicsList = () => {
    return (
        <p className={styles.topicList}>
            {topics.map(({ link, label }) => (
                <Link href={`/${link}`} key={link}>
                    {label}
                </Link>
            ))}
        </p>
    );
};
