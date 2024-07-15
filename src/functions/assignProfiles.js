export async function assignProfiles() {
    const getRandomElements = (arr, count) => {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const profileLimits = [3, 5, 6, 5, 4, 9, 4, 5, 4];

    for (let i = 0; i < 9; i++) {
        const dateKey = this.getDateKey(i);
        if (this.profilesByDate[dateKey]) {
            const orbitIndex = i === 0 ? 8 : 8 - i;
            this.profiles[`${orbitIndex}`] = this.calculatePoints(50, getRandomElements(this.profilesByDate[dateKey], profileLimits[orbitIndex]));
        } else {
            console.log(`No profiles for ${dateKey}`);
        }
        await delay(100);
    }
}
