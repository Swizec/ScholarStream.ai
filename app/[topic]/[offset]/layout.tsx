import feedStyles from "@/styles/Feed.module.css";
import { ReactNode } from "react";
import { Feed } from "@/app/Feed";

export default async function CategoryPageLayout(props: {
    children: ReactNode;
    params: { topic: string; offset: number };
}) {
    const offset = Number(props.params.offset);

    return (
        <>
            <Feed topic={props.params.topic} count={offset} />
            <div className={feedStyles.feed}>{props.children}</div>
        </>
    );
}
