import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

const pageVariants = {
    initial: {
        opacity: 0,
        y: -10,
    },
    enter: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: 10,
    },
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
};

interface RootLayoutProps {
    children: ReactNode;
}

const Motion: FC<RootLayoutProps> = ({ children }) => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <motion.div
            key={pathname}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    );
}

export default Motion;
