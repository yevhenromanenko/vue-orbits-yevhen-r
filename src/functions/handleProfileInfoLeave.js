
export function handleProfileInfoLeave() {
    setTimeout(() => {
        this.isProfileInfoVisible = false;
        this.hoveredProfile = null;
    }, 50);
}
