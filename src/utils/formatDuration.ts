export function formatISODuration(duration: string | null | undefined): string {
    console.log('duration',duration);
    
    if (typeof duration !== 'string') {
        return "Invalid duration";
    }

    // Match groups for hours, minutes, seconds (H, M, S are optional)
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/;
    const matches = duration.match(regex);

    if (!matches) {
        return "Invalid duration";
    }

    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    const seconds = matches[3] ? parseFloat(matches[3]) : 0;

    // Build formatted string
    const parts: string[] = [];
    if (hours) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (seconds) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);

    return parts.length > 0 ? parts.join(' ') : '0 seconds';
}
