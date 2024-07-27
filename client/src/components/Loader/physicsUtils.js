// physicsUtils.js
export const getRandomVelocity = () => {
    return (Math.random() - 0.5) * 7; // Random velocity between -3.5 and 3.5
};

export const checkCollisionWithPath = (posX, posY, ballSize, container) => {
    const path = container.querySelector("path");
    const pathLength = path.getTotalLength();

    for (let i = 0; i <= pathLength; i++) {
        const point = path.getPointAtLength(i);
        const distance = Math.sqrt(
            Math.pow(point.x - (posX + ballSize / 2), 2) +
                Math.pow(point.y - (posY + ballSize / 2), 2)
        );
        if (distance < ballSize / 2) {
            return true;
        }
    }
    return false;
};
