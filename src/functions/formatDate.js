
export function formatDate(dateString, place) {
    const date = new Date(dateString);
    let options;

    if (place === 'profile')  {
        options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZoneName: 'short'
        };
    } else {
        options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        };
    }

    return date.toLocaleString('en-US', options);
}
