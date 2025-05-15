export function formatTimeWithoutSeconds(timeString) {
    // Split by colon and take only the first two parts (HH and MM)
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}