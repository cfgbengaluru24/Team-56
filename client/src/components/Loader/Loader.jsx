import React, { useEffect, useRef } from 'react';
import './Loader.css';

const Loader = () => {
    const ballRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ball = ballRef.current;
        const container = containerRef.current;

        const ballSize = ball.offsetWidth;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        let posX = Math.random() * (containerWidth - ballSize);
        let posY = Math.random() * (containerHeight - ballSize);
        let velocityX = (Math.random() - 0.5) * 10; // Random velocity
        let velocityY = (Math.random() - 0.5) * 10; // Random velocity

         const getRandomColor = () => {
            const letters = '89ABCDEF'; // Lighter shade characters
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
        };
        const updateBallPosition = () => {
            posX += velocityX;
            posY += velocityY;

            // Check for collision with container edges
            if (posX + ballSize > containerWidth || posX < 0) {
                velocityX = -velocityX;
                posX = Math.max(0, Math.min(posX, containerWidth - ballSize));
                ball.style.backgroundColor = getRandomColor();
            }
            if (posY + ballSize > containerHeight || posY < 0) {
                velocityY = -velocityY;
                posY = Math.max(0, Math.min(posY, containerHeight - ballSize));
                ball.style.backgroundColor = getRandomColor();
            }

            ball.style.transform = `translate(${posX}px, ${posY}px)`;

            requestAnimationFrame(updateBallPosition);
        };

        updateBallPosition();

        return () => {
            // Clean up animation on component unmount
            cancelAnimationFrame(updateBallPosition);
        };
    }, []);

    return (
        <div className="loader-container">
            <div className="loader" ref={containerRef}>
                <div className="pointer" ref={ballRef}></div>
            </div>
        </div>
    );
};

export default Loader;
