import { ReactNode } from "react";
import styles from "@/styles/Home.module.css";
import { MiniPitch } from "../MiniPitch";

export default async function CategoryLayout(props: { children: ReactNode }) {
    return (
        <>
            <MiniPitch />
            <main className={styles.main}>{props.children}</main>
        </>
    );
}
