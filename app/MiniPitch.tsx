import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { BuyButton } from "./BuyButton";

export const MiniPitch = () => {
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
            <BuyButton />
        </div>
    );
};
