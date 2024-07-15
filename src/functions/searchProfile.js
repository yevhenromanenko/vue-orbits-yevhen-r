
export function searchProfile() {
    this.foundProfile = null;
    const query = this.searchQuery.trim().toLowerCase();

    if (query !== '') {
        for (let i = 0; i < this.profiles.length; i++) {
            if (this.profiles[`${i}`]) {
                const profile = this.profiles[`${i}`].find(profile =>
                    profile && profile.name.toLowerCase().includes(query)
                );
                if (profile) {
                    this.foundProfile = profile;
                    break;
                }
            }
        }
    }
}
