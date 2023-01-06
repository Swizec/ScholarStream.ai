import { cache, Suspense } from "react";
import Image from "next/image";
import feedStyles from "@/styles/Feed.module.css";
import { ErrorBoundary } from "./ErrorBoundary";
import * as openai from "./data/openai";

type AvatarProps = {
    name: string;
};

export const Avatar = (props: AvatarProps) => {
    const { name } = props;
    return (
        <Suspense fallback={<AvatarPlaceholder name={name} />}>
            {/* @ts-expect-error Server Component */}
            <AvatarImage name={name} />
        </Suspense>
    );
};

const getAvatar = cache(async (name: string) => openai.getAvatar(name, "256"));

const AvatarImage = async (props: AvatarProps) => {
    try {
        let src = await getAvatar(props.name);

        return (
            <Image
                src={src}
                width={50}
                height={50}
                alt={`AI generated avatar of ${props.name}`}
                title={`AI generated avatar of ${props.name}`}
                className={feedStyles.avatar}
            />
        );
    } catch (e) {
        console.error(e);
        return <AvatarError name={props.name} />;
    }
};

const AvatarPlaceholder = (props: AvatarProps) => (
    <Image
        src={"/avatarPlaceholder.png"}
        width={50}
        height={50}
        alt={`Generating avatar for ${props.name}`}
        title={`Generating avatar for ${props.name}`}
        className={feedStyles.avatar}
    />
);

const AvatarError = (props: AvatarProps) => (
    <Image
        src={"/avatarError.png"}
        width={50}
        height={50}
        alt={`Error generating avatar for ${props.name}`}
        title={`Error generating avatar for ${props.name}`}
        className={feedStyles.avatar}
    />
);
