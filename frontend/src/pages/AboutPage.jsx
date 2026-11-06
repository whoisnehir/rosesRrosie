import { Link } from 'react-route-dom';
import { storyPharagraphs, brandSymbols, dreamMoments } from '../data/brandStory';

const imageUrl = (slug) => `${import.meta.env.BASE_URL}videos/${slug}.webp`;

const AboutPage = () => (
    <>
        <div className="w-full max-w-6xl mx-auto px-6 py-16">
            <h1 className="text-5xl text-ink font-light text-center md:text-left">About us</h1>

            <section aria-labelledby="our-story" className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
                <img
                    src={imageUrl('the-bloom-collection')}
                    alt="Rose-pink makeup among roses and petals"
                    width="1920"
                    height="1080"
                    className="w-full h-auto rounded-4xl"
                />
                <div className="space-y-4 font-sans text-base leading-relaxed text-text">
                    <h2 id="our-story" className="font-serif text-3xl text-ink">
                        Our story
                    </h2>
                    {storyParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </section>

            <section aria-labelledby="meanings" className="mt-24">
                <h2 id="meanings" className="text-3xl text-ink font-light text-center">
                    Everything means something
                </h2>
                <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {brandSymbols.map(({ title, text }) => (
                        <div key={title} className="text-center">
                            <dt className="font-script text-4xl text-accent">{title}</dt>
                            <dd className="mt-3 font-sans text-sm leading-relaxed text-text">{text}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section aria-labelledby="moments" className="mt-24 grid gap-10 md:grid-cols-2 md:items-center">
                <div className="md:order-2">
                    <img
                        src={imageUrl('magical-blossom')}
                        alt="Berry-toned makeup among dark roses at night"
                        width="1920"
                        height="1080"
                        className="w-full h-auto rounded-4xl"
                    />
                </div>
                <div>
                    <h2 id="moments" className="text-3xl text-ink">
                        Three moments of one dream
                    </h2>
                    <dl className="mt-6 space-y-6 font-sans text-base leading-relaxed text-text">
                        {dreamMoments.map(({ collection, moment, text }) => (
                            <div key={collection}>
                                <dt className="text-xs font-bold uppercase tracking-widest text-secondary">
                                    {collection} · {moment}
                                </dt>
                                <dd className="mt-1">{text}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>
        </div>

        <section aria-labelledby="write-to-us" className="bg-surface px-6 py-16 text-center">
            <h2 id="write-to-us" className="text-2xl text-ink">
                Have a question or an idea for a new shade?
            </h2>
            <Link
                to="/contact"
                className="mt-6 inline-block px-10 py-4 rounded-full bg-primary text-on-primary text-xs font-bold uppercase tracking-widest hover:bg-primary-hover"
            >
                Write to us
            </Link>
        </section>
    </>
);

export default AboutPage;
