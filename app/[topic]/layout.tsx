import { ReactNode } from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

const MiniPitch = () => {
    return (
        <div className={styles.pitch}>
            <h1>
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="ScholarStream.ai logo"
                        width={64}
                        height={64}
                    />
                    ScholarStream.ai
                </Link>
            </h1>
            <p>Welcome to the world of academic insights!</p>
        </div>
    );
};

export default async function CategoryLayout(props: { children: ReactNode }) {
    return (
        <>
            <MiniPitch />
            <main className={styles.main}>{props.children}</main>
        </>
    );
}
