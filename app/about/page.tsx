import styles from "@/styles/Home.module.css";
import Image from "next/image";
import { MiniPitch } from "@/app/MiniPitch";
import { TopicsList } from "@/app/TopicsList";

export default function About() {
    return (
        <>
            <MiniPitch />
            <main className={styles.main}>
                <div className={styles.about}>
                    <p>
                        ScholarStream.ai is a project I built over the 2022/2023
                        holidays to explore modern AI tools like the OpenAI API
                        and ChatGPT. This is the only page not written by AI.
                    </p>
                    <p>
                        The project grew out of{" "}
                        <a href="https://swizec.com/blog/getting-off-twitter-an-experiment/">
                            my frustration with modern social media
                        </a>
                        .
                    </p>
                    <Image
                        src="/swizec-tired-of-twitter.png"
                        alt="Swizec's tweet talking about being tired of social media"
                        width={599}
                        height={273}
                    />
                    <Image
                        src="/swizec-tired-of-twitter-2.png"
                        alt="Swizec's tweet talking about being tired of social media"
                        width={599}
                        height={273}
                    />
                    <p>
                        Social media increasingly feels shallow. The good info
                        just isn't there (anymore?).
                    </p>
                    <p>
                        I tried reading more academic papers, both in and out of
                        my field (software engineering), and that was wonderful!
                        Even terrible papers felt more informative than the
                        deepest twitter threads.
                    </p>
                    <p>
                        But finding papers to read was a drag. I love{" "}
                        <a href="https://arxiv.org">arXiv.org</a> but the level
                        of commitment the typical abstracts needs just to figure
                        out if you're interested ... my brain didn't wanna. 💩
                    </p>
                    <h2>Getting AI to help</h2>
                    <p>
                        So I figured with tools like GPT, what if AI took the
                        arXiv feed of papers and turned it into a Twitter-like
                        experience?
                    </p>
                    <p>It worked!</p>
                    <p>Compare this:</p>
                    <Image
                        src="/summary-example.jpeg"
                        alt="Example of what ScholarStream.ai does"
                        width={599}
                        height={230}
                    />
                    <p>To the original abstract:</p>
                    <blockquote>
                        Causal modeling provides us with powerful counterfactual
                        reasoning and interventional mechanism to generate
                        predictions and reason under various what-if scenarios.
                        However, causal discovery using observation data remains
                        a nontrivial task due to unobserved confounding factors,
                        finite sampling, and changes in the data distribution.
                        These can lead to spurious cause-effect relationships.
                        To mitigate these challenges in practice, researchers
                        augment causal learning with known causal relations. The
                        goal of the paper is to study the impact of expert
                        knowledge on causal relations in the form of additional
                        constraints used in the formulation of the nonparametric
                        NOTEARS. We provide a comprehensive set of comparative
                        analyses of biasing the model using different types of
                        knowledge. We found that (i) knowledge that corrects the
                        mistakes of the NOTEARS model can lead to statistically
                        significant improvements, (ii) constraints on active
                        edges have a larger positive impact on causal discovery
                        than inactive edges, and surprisingly, (iii) the induced
                        knowledge does not correct on average more incorrect
                        active and/or inactive edges than expected. We also
                        demonstrate the behavior of the model and the
                        effectiveness of domain knowledge on a real-world
                        dataset.
                    </blockquote>
                    <p>&nbsp;</p>
                    <p>
                        Yep, I am going to find way more interesting papers this
                        way 😍
                    </p>
                    <h2>What the AI is doing</h2>
                    <p>
                        You can read more about{" "}
                        <a href="https://swizec.com/blog/building-apps-with-openai-and-chatgpt/">
                            how AI helped build this site
                        </a>{" "}
                        on my blog.
                    </p>
                    <p>
                        In a nutshell: AI came up with the name, generated the
                        logo, wrote the landing page copy, creates every avatar
                        you see, and writes summarized abstracts.
                    </p>
                    <p>Enjoy ❤️</p>
                    <TopicsList />
                    <p>
                        Cheers,
                        <br />
                        ~Swizec
                    </p>
                </div>
            </main>
        </>
    );
}
