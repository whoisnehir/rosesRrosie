import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// The enlarged view of a gallery. It opens as a modal <dialog>: the page behind it cannot be reached with
// the mouse or the Tab key, Escape closes it, and the keyboard focus goes back to where it was before.
const Lightbox = ({ images, startIndex, label, onClose }) => {
    const dialogRef = useRef(null);
    const [index, setIndex] = useState(startIndex);
    const image = images[index];

    useEffect(() => {
        const dialog = dialogRef.current;
        // The element that had the focus before opening, usually the thumbnail that was clicked.
        const opener = document.activeElement;
        dialog.showModal();

        return () => {
            dialog.close();
            opener?.focus();
        };
    }, []);

    // Previous from the first image goes to the last one, and Next from the last goes back to the first.
    const showPrevious = () => setIndex((current) => (current - 1 + images.length) % images.length);
    const showNext = () => setIndex((current) => (current + 1) % images.length);

    function handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            showPrevious();
        } else if (event.key === 'ArrowRight') {
            showNext();
        }
    }

    function handleCancel(event) {
        // Escape: let React remove the dialog instead of the browser closing it on its own.
        event.preventDefault();
        onClose();
    }

    return (
        <dialog
            ref={dialogRef}
            aria-label={label}
            onKeyDown={handleKeyDown}
            onCancel={handleCancel}
            className="m-auto max-w-none w-full h-full max-h-none bg-transparent p-4 backdrop:bg-black/85"
        >
            <div className="h-full flex flex-col items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 p-3 rounded-full bg-card text-ink hover:text-accent"
                >
                    <X size={22} />
                </button>

                <img
                    src={`${import.meta.env.BASE_URL}${image.src}`}
                    alt={image.alt}
                    className="max-w-5xl w-full max-h-[75vh] object-contain rounded-xl"
                />

                <div className="flex items-center gap-6 text-white">
                    <button
                        type="button"
                        onClick={showPrevious}
                        aria-label="Previous image"
                        className="p-3 rounded-full bg-card text-ink hover:text-accent"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <p aria-live="polite" className="text-sm tabular-nums">
                        {index + 1} / {images.length}
                    </p>
                    <button
                        type="button"
                        onClick={showNext}
                        aria-label="Next image"
                        className="p-3 rounded-full bg-card text-ink hover:text-accent"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default Lightbox;
