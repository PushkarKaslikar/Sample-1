import React from 'react';

/**
 * Mechtron Logo Component
 * Displays only the gear icon from the Mectron logo image.
 * 
 * @param {number} size - Height of the logo in pixels (default 44)
 */
const Logo = ({ size = 56 }) => {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}
        >
            <img
                src="/images/logo/logo_mectron-4.png"
                alt="Mechtron Logo"
                style={{
                    position: 'absolute',
                    height: '91%', // Optimal zoom to show only the gear icon
                    width: 'auto',
                    maxWidth: 'none',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -44%)', // Centered and shifted slightly up to hide bottom text perfectly
                }}
            />
        </div>
    );
};

export default Logo;

