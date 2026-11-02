import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

// How long the last frame of a video stays on screen before the next slide.
const HOLD_AFTER_VIDEO_MS = 1500;

// The Home page opening: one slide per collection, each with its video, name, tagline and a link.
// Each video plays once, then the next slide starts. Visitors can pause it, move with the arrows or dots,
// and visitors who ask their system for less motion see still images instead of videos.
const HeroSlider = ({ slides }) => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const videoRefs = useRef([]);
    const timeoutRef = useRef(null);
    // The same value as isPaused, readable inside the effect without restarting it when it changes.
    const isPausedRef = useRef(false);

    const goTo = (next) => setIndex((next + slides.length) % slides.length);

    // Plays the current video from its start and stops the others.
    useEffect(() => {
        clearTimeout(timeoutRef.current);
        videoRefs.current.forEach((video, position) => {
            if (!video) {
                return;
            }
            if (position === index && !isPausedRef.current) {
                video.currentTime = 0;
                video.play().catch(() => {
                    // The browser can refuse to play (for example in data saver mode); the poster stays.
                });
            } else {
                video.pause();
            }
        });
        return () => clearTimeout(timeoutRef.current);
    }, [index]);

    function handleEnded() {
        if (!isPausedRef.current) {
            timeoutRef.current = setTimeout(() => goTo(index + 1), HOLD_AFTER_VIDEO_MS);
        }
    }

    function togglePause() {
        const video = videoRefs.current[index];
        if (isPaused) {
            isPausedRef.current = false;
            setIsPaused(false);
            if (video?.ended) {
                goTo(index + 1);
            } else {
                video?.play().catch(() => {});
            }
        } else {
            isPausedRef.current = true;
            setIsPaused(true);
            clearTimeout(timeoutRef.current);
            video?.pause();
        }
    }

    const showVideos = !prefersReducedMotion;
    const assetUrl = (slug, extension) => `${import.meta.env.BASE_URL}videos/${slug}.${extension}`;

    return (
        <section
            aria-roledescription="carousel"
            aria-label="Collections"
            className="relative h-[70vh] min-h-105 max-h-190 overflow-hidden bg-surface"
        >
            {slides.map(({ name, slug, tagline }, position) => {
                const isActive = position === index;
                return (
                    <div
                        key={slug}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${position + 1} of ${slides.length}: ${name}`}
                        aria-hidden={!isActive}
                        inert={!isActive}
                        className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {showVideos ? (
                            <video
                                ref={(element) => {
                                    videoRefs.current[position] = element;
                                }}
                                src={assetUrl(slug, 'mp4')}
                                poster={assetUrl(slug, 'webp')}
                                muted
                                playsInline
                                preload={isActive ? 'auto' : 'none'}
                                onEnded={isActive ? handleEnded : undefined}
                                aria-hidden="true"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        ) : (
                            <img
                                src={assetUrl(slug, 'webp')}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        )}

                        {/* A dark shade on the left keeps the white text readable on any video. */}
                        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/30 to-transparent" />

                        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center text-white">
                            <h2 className="font-script text-6xl md:text-8xl leading-none">{name}</h2>
                            <p className="mt-4 max-w-md text-base md:text-lg">{tagline}</p>
                            <Link
                                to={`/collections/${slug}`}
                                className="mt-8 self-start px-8 py-3 rounded-full bg-card text-ink text-xs font-bold uppercase tracking-widest hover:text-accent"
                            >
                                Shop now
                            </Link>
                        </div>
                    </div>
                );
            })}

            <div className="absolute bottom-5 inset-x-0 flex items-center justify-center gap-4 text-white">
                <button
                    type="button"
                    onClick={() => goTo(index - 1)}
                    aria-label="Previous slide"
                    className="p-2 rounded-full bg-black/30 hover:bg-black/50"
                >
                    <ChevronLeft size={20} />
                </button>
                <ul className="flex gap-2">
                    {slides.map(({ name, slug }, position) => (
                        <li key={slug}>
                            <button
                                type="button"
                                onClick={() => goTo(position)}
                                aria-label={`Show slide ${position + 1}: ${name}`}
                                aria-current={position === index}
                                className={`block h-1.5 rounded-full transition-all ${position === index ? 'w-8 bg-white' : 'w-4 bg-white/50 hover:bg-white/80'}`}
                            />
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    aria-label="Next slide"
                    className="p-2 rounded-full bg-black/30 hover:bg-black/50"
                >
                    <ChevronRight size={20} />
                </button>
                {showVideos && (
                    <button
                        type="button"
                        onClick={togglePause}
                        aria-label={isPaused ? 'Play the slideshow' : 'Pause the slideshow'}
                        className="p-2 rounded-full bg-black/30 hover:bg-black/50"
                    >
                        {isPaused ? <Play size={18} /> : <Pause size={18} />}
                    </button>
                )}
            </div>
        </section>
    );
};

export default HeroSlider;
