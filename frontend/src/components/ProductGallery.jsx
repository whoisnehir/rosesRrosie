import { useState } from 'react';
import Lightbox from './Lightbox';

// The product images: one large image and a row of thumbnails. Any of them opens the enlarged view.
const ProductGallery = ({ images, productName }) => {
    // The position of the image shown enlarged, or null while the enlarged view is closed.
    const [openIndex, setOpenIndex] = useState(null);
    const imageUrl = (image) => `${import.meta.env.BASE_URL}${image.src}`;

    if (images.length === 0) {
        return null;
    }

    return (
        <div className="mx-auto max-w-2xl">
            <button type="button" onClick={() => setOpenIndex(0)} className="block w-full cursor-zoom-in">
                <img
                    src={imageUrl(images[0])}
                    alt={images[0].alt}
                    width="1200"
                    height="670"
                    className="w-full h-auto rounded-2xl"
                />
            </button>

            <ul className="mt-4 flex justify-center gap-3">
                {images.map((image, index) => (
                    // The images can be the same file, so the position makes the key unique.
                    <li key={index}>
                        <button
                            type="button"
                            onClick={() => setOpenIndex(index)}
                            aria-label={`Open image ${index + 1} of ${images.length}`}
                            className="block overflow-hidden rounded-lg border-2 border-transparent hover:border-accent focus-visible:border-accent"
                        >
                            <img
                                src={imageUrl(image)}
                                alt={image.alt}
                                width="1200"
                                height="670"
                                loading="lazy"
                                className="w-24 sm:w-28 h-auto"
                            />
                        </button>
                    </li>
                ))}
            </ul>

            {openIndex !== null && (
                <Lightbox
                    images={images}
                    startIndex={openIndex}
                    label={`${productName} images`}
                    onClose={() => setOpenIndex(null)}
                />
            )}
        </div>
    );
};

export default ProductGallery;
