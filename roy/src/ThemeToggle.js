import React from 'react';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };

    return (
        <div 
            onClick={toggleTheme}
            style={{
                width: '50px',
                height: '28px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: isDark ? 'flex-end' : 'flex-start',
                borderRadius: '50px',
                padding: '2px',
                cursor: 'pointer',
                border: '1px solid var(--border-subtle)',
                boxSizing: 'content-box',
                marginRight: '1rem',
                alignItems: 'center'
            }}
            title="Toggle theme"
        >
            <motion.div
                layout
                transition={spring}
                style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: isDark ? '#fff' : '#333',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: isDark ? '#000' : '#fff'
                }}
            >
                {isDark ? '🌙' : '☀️'}
            </motion.div>
        </div>
    );
};

export default ThemeToggle;
