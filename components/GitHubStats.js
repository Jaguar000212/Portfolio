import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GitHubStats = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch("/data/staticGithubData.json");
                const json = await response.json();
                if (json.stats) setStats(json.stats);
            } catch (error) {
                console.error("Error loading GitHub stats:", error);
            }
        }

        fetchStats();
    }, []);

    if (!stats) return null;

    const tiles = [
        { label: "Public Repos", value: stats.totalPublicRepos },
        { label: "Total Stars", value: stats.totalStars },
        { label: "Contributions (past year)", value: stats.totalContributions },
    ];

    return (
        <motion.div
            className="mt-16 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
        >
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    {tiles.map((tile) => (
                        <div key={tile.label}>
                            <div className="text-2xl md:text-3xl font-bold font-heading text-primary">
                                {tile.value}
                            </div>
                            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-body">
                                {tile.label}
                            </div>
                        </div>
                    ))}
                </div>

                {stats.topLanguages?.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {stats.topLanguages.map((lang) => (
                            <span
                                key={lang.name}
                                className="font-body inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-900 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: lang.color || "#999" }}
                                />
                                {lang.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default GitHubStats;
