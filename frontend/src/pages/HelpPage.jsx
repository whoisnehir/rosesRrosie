import FaqItem from '../components/FaqItem';
import { helpGroups } from '../data/helpQuestions';

const HelpPage = () => (
    <section className="w-full max-w-3xl mx-auto px-6 py-16">
        <header className="text-center">
            <h1 className="text-5xl text-ink font-light">Help</h1>
            <p className="mt-4 text-secondary italic">Answers to the questions we hear most often.</p>
        </header>

        {helpGroups.map(({ id, title, questions }) => (
            <section key={id} aria-labelledby={id} className="mt-12">
                <h2 id={id} className="mb-4 text-2xl text-ink font-light">
                    {title}
                </h2>
                <div className="space-y-3">
                    {questions.map(({ question, answer }) => (
                        <FaqItem key={question} question={question} answer={answer} />
                    ))}
                </div>
            </section>
        ))}
    </section>
);

export default HelpPage;
