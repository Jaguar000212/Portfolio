// Shared gradient title + underline + subtitle, used by every home-page
// section ("What I Do", "Open Source Activity"). The underline is a
// percentage of the heading's own (inline-block) width rather than a fixed
// pixel value, so it stays proportional regardless of title length or
// breakpoint — a fixed width looked fine for a short title and
// disproportionately short under a longer one.
export default function SectionHeading({ title, subtitle }) {
    return (
        <div className="text-center mb-12">
            <h2 className="relative inline-block pb-4 text-2xl md:text-4xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {title}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/5 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </h2>
            {subtitle && (
                <p className="text-center text-lg mt-2 max-w-2xl mx-auto text-gray-600 dark:text-gray-400 font-body">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
