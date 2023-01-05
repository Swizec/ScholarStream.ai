import { cache, Suspense } from "react";
import Image from "next/image";
import { ErrorBoundary } from "./ErrorBoundary";
import * as openai from "./data/openai";

type AvatarProps = {
    name: string;
};

export const Avatar = (props: AvatarProps) => {
    const { name } = props;
    return (
        <Suspense fallback={<AvatarPlaceholder name={name} />}>
            <ErrorBoundary fallback={<AvatarError name={name} />}>
                {/* @ts-expect-error Server Component */}
                <AvatarImage name={name} />
            </ErrorBoundary>
        </Suspense>
    );
};

const AvatarImage = async (props: AvatarProps) => {
    let src = await cache(async (name: string) =>
        openai.getAvatar(name, "256")
    )(props.name);

    return (
        <Image
            src={src}
            width={50}
            height={50}
            alt={`AI generated avatar of ${props.name}`}
        />
    );
};

const AvatarPlaceholder = (props: AvatarProps) => (
    <Image
        src={"/avatarPlaceholder.png"}
        width={50}
        height={50}
        alt={`Generating avatar for ${props.name}`}
    />
);

const AvatarError = (props: AvatarProps) => (
    <Image
        src={"/avatarError.png"}
        width={50}
        height={50}
        alt={`Error generating avatar for ${props.name}`}
    />
);
