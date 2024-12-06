export const formatDate = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);

    const dayOfWeek = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayOfMonth = parseInt(day, 10);

    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${dayOfWeek}, ${monthName} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}, ${year}`;
};
