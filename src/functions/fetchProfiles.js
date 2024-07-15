import axios from "axios";

export async function fetchProfiles() {
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get(`https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week?start_date=${today}`);
        const data = response.data;

        data.forEach(item => {
            item.array.forEach(profile => {
                profile.contact_date = item.contact_date;
            });
        });

        this.profilesByDate = data.reduce((acc, item) => {
            acc[item.contact_date] = item.array;
            return acc;
        }, {});

        await this.assignProfiles();
    } catch (error) {
        console.error("Error fetching profiles:", error);
    }
}
