
export function triggerBlackHole() {
    this.blackHoleActive = true;
    setTimeout(() => {
        this.toggleSearch();
        this.blackHoleActive = false;
    }, 300);
}
