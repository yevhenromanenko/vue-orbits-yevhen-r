
export function toggleSearch() {
    if (!this.hideLogo) {
        this.hideLogo = true;
        setTimeout(() => {
            this.showSearch = true;
        }, 300);
    } else {
        this.showSearch = false;
        this.foundProfile = null;
        this.searchQuery = ''

        setTimeout(() => {
            this.hideLogo = false;
        }, 300);
    }
}
