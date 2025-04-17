import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Terminal = ({ lines }) => {
    const [displayedLines, setDisplayedLines] = useState([]);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            if (current < lines.length) {
                setDisplayedLines((prev) => [...prev, lines[current]]);
                current++;
            } else {
                clearInterval(interval);
            }
        }, 600);
        return () => clearInterval(interval);
    }, [lines]);

    return (
        <div className="space-y-2 text-green-400 text-sm font-mono">
            {displayedLines.map((line, index) => (
                <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="whitespace-nowrap"
                >
                    {`> ${line}`}
                </motion.p>
            ))}
        </div>
    );
};

// ✅ PropTypes for validation
Terminal.propTypes = {
    lines: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Terminal;
