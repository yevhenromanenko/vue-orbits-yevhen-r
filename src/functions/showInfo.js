export function showInfo(profile, event) {
    this.hoveredProfile = profile;
    const rect = event.target.getBoundingClientRect();

    const screenWidth = window.innerWidth;
    const position = rect.left < screenWidth / 2 ? 'right' : 'left';

    this.infoPosition = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
        position,
    };

    setTimeout(() => {
        this.isProfileInfoHovered && (this.isProfileInfoVisible = true);
    }, 50);
}
