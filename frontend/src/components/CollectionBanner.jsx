// A full-width band with a collection's poster, its name in the script font and its tagline.
// The Collections page shows one per collection (inside a link); a collection's own page shows it as its title.
const CollectionBanner = ({ slug, name, tagline, headingLevel = 'h2', action }) => {
    const Heading = headingLevel;

    return (
        <div className="relative h-[45vh] min-h-75 max-h-130 overflow-hidden">
            <img
                src={`${import.meta.env.BASE_URL}videos/${slug}.webp`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
            />
            {/* On a phone the whole image is darkened, because the text covers most of it; on wider screens only the left side. */}
            <div className="absolute inset-0 bg-black/45 md:bg-transparent md:bg-linear-to-r md:from-black/65 md:via-black/30 md:to-transparent" />
            <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center text-white">
                <Heading className="font-script text-6xl md:text-8xl leading-none">{name}</Heading>
                <p className="mt-4 max-w-md text-base md:text-lg">{tagline}</p>
                {action}
            </div>
        </div>
    );
};

export default CollectionBanner;