import { useEffect, useRef } from 'react';

// Asks once whether Google Analytics may run. Accept and Decline look the same, so declining is as easy as accepting.
// When the visitor opens it again from the footer, the focus moves to it, so keyboard users land in it.
const ConsentBanner = ({ onAccept, onDecline, focusOnOpen }) => {
    const titleRef = useRef(null);

    useEffect(() => {
        if (focusOnOpen) {
            titleRef.current.focus();
        }
    }, [focusOnOpen]);

    const buttonClass = 'px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest';

    return (
        <section
            aria-labelledby="consent-title"
            className="fixed bottom-6 left-6 right-6 z-50 rounded-4xl border border-line bg-card p-6 shadow-2xl sm:right-auto sm:max-w-sm"
        >
            <h2
                id="consent-title"
                ref={titleRef}
                tabIndex={-1}
                className="font-script text-3xl text-accent outline-none"
            >
                A small question
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-text">
                We would like to use Google Analytics to see how visitors use the site. It only starts if you accept.
                You can change your choice any time from Cookie settings in the footer.
            </p>
            <div className="mt-5 flex gap-3">
                <button
                    type="button"
                    onClick={onDecline}
                    className={`${buttonClass} border border-line text-ink hover:text-accent`}
                >
                    Decline
                </button>
                <button
                    type="button"
                    onClick={onAccept}
                    className={`${buttonClass} bg-primary text-on-primary hover:bg-primary-hover`}
                >
                    Accept
                </button>
            </div>
        </section>
    );
};

export default ConsentBanner;
