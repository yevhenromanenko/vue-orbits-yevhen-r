
export function handleScroll() {
    if (!this.scrolling) {
        this.scrolling = true;
        requestAnimationFrame(() => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            const maxScroll = 50;

            if (scrollPercentage === 0) {
                this.orbit5Hidden = false;
                this.orbit6Hidden = false;
                this.orbitStyles = this.initialOrbitStyles.slice(0, 7);
            } else {
                if (scrollPercentage >= 3 && !this.orbit6Hidden) {
                    this.orbit6Hidden = true;

                    const orbit7InitialStyle = {
                        height: '63%',
                        width: '31.5%',
                        marginTop: '7%',
                        zIndex: 8,
                        opacity: 1,
                    };

                    this.initialOrbitStyles.push(orbit7InitialStyle);
                    this.orbitStyles.push(orbit7InitialStyle);

                }

                if (scrollPercentage >= 12 && !this.orbit5Hidden) {
                    this.orbit5Hidden = true;

                    const orbit8InitialStyle = {
                        height: '45%',
                        width: '22.5%',
                        marginTop: '7%',
                        zIndex: 9,
                        opacity: 1,
                    };
                    this.initialOrbitStyles.push(orbit8InitialStyle);
                    this.orbitStyles.push(orbit8InitialStyle);
                }


                this.orbitStyles = this.initialOrbitStyles.map((style, index) => {

                    const baseHeightIncrease = 10;
                    const baseWidthIncrease = 5;

                    let heightIncrease = Math.min(maxScroll, scrollPercentage * 2) * (index + 3) / 5;
                    let widthIncrease = Math.min(maxScroll, scrollPercentage) * (index + 3) / 5;

                    if (index === 7) {
                        heightIncrease = Math.min(maxScroll, scrollPercentage * 2) * 2 / 5;
                        widthIncrease = Math.min(maxScroll, scrollPercentage) * 2 / 5;
                    }
                    if (index === 8) {
                        heightIncrease = Math.min(maxScroll, scrollPercentage * 2) * 1 / 5;
                        widthIncrease = Math.min(maxScroll, scrollPercentage) * 1 / 5;
                    }

                    return {
                        height: `${parseFloat(style.height) + baseHeightIncrease + heightIncrease}%`,
                        width: `${parseFloat(style.width) + baseWidthIncrease + widthIncrease}%`,
                        zIndex: style.zIndex,
                        opacity: 1,
                    };
                });

                if (this.orbitStyles.length > 9) {
                    this.orbitStyles = this.orbitStyles.slice(0, 8);
                    this.initialOrbitStyles = this.initialOrbitStyles.slice(0, 8);
                }


                if (scrollPercentage < 3) {
                    this.orbit6Hidden = false;

                    this.initialOrbitStyles = this.initialOrbitStyles.filter((style, index) => index < 7);
                    this.orbitStyles = this.orbitStyles.filter((style, index) => index < 7);

                }

                if (scrollPercentage < 12) {
                    this.orbit5Hidden = false;

                    this.initialOrbitStyles = this.initialOrbitStyles.filter((style, index) => index < 8);
                    this.orbitStyles = this.orbitStyles.filter((style, index) => index < 8);

                }
            }
            this.scrolling = false;
        });
    }
}
