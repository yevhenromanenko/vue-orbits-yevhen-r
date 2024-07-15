
export function calculatePoints(radiusPercent, profiles) {
    if (!profiles || profiles.length === 0) return [];

    if (profiles.length < 4) {
        const fakeProfile = {
            src: 'https://i.pravatar.cc/150?img=4',
            alt: 'Payton Kelly',
            name: 'Payton Kelly',
            city: 'Casablanca, Morocco',
            position: 'Event Planner',
            _orbits_last_message: {
                message: 'Join our volunteer program to make a difference! Opportunities include event management and community outreach. It’s a chance to develop skills and give back. Apply by April 30th.',
                message_head: 'Volunteer Opportunity'
            },
            date: profiles[0]?.contact_date === undefined ? profiles[1]?.contact_date : profiles[0]?.contact_date || '',
            style: {}
        };
        while (profiles.length < 4) {
            profiles.unshift(fakeProfile);
            if (profiles.length < 4) {
                profiles.push(fakeProfile);
            }
        }
    }

    const points = [];
    const numberOfPoints = profiles.length;
    const angleIncrement = numberOfPoints > 1 ? 180 / (numberOfPoints - 1) : 360;

    for (let i = 0; i < numberOfPoints; i++) {
        const profile = profiles[i];
        const angle = (i * angleIncrement) * (Math.PI / 180);
        const x = 50 + radiusPercent * Math.cos(angle);
        const y = 50 - radiusPercent * Math.sin(angle);

        points.push({
            ...profile,
            src: !profile.img || profile.img === 'https://media.licdn.com/dms/image/C4D03AQHXrzTJ_-R0_g/profile-displayphoto-shrink_800_800/0/1647521028027?e=2147483647&v=beta&t=ZiFXOKRYzLCER3E6U67EatQeGQprRU3ss23ialkknAk' ? 'https://i.pravatar.cc/150?img=4' : profile.img,
            alt: profile.name,
            name: profile.name,
            city: profile.city,
            position: profile.position,
            _orbits_last_message: {
                message: profile._orbits_last_message.message,
                message_head: profile._orbits_last_message.message_head
            },
            date: profile.contact_date,
            style: { top: `${y}%`, left: `${x}%`, transform: "translate(-50%, -50%)" },
        });
    }

    return points;
}
