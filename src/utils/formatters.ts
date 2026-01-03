export const formatTimeLeft = (now: Date, dueDateStr: string | undefined): { text: string; bg: string } => {
    if (!dueDateStr) return { text: '', bg: '' };
    const dueDate = new Date(dueDateStr);

    // set hours, minutes, seconds to zero for accurate day difference
    dueDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    const output: { text: string; bg: string } = 
    diffDays === 0 ? {
        text: 'today',
        bg: 'bg-amber-500'
    } :
    diffDays === 1 ? {
        text: 'tomorrow',
        bg: 'bg-amber-400'
    } :
    diffDays >= 7 ? {
        text: `in ${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`,
        bg: 'bg-blue-500'
    } :
    diffDays > 1 ? {
        text: `in ${diffDays} days`,
        bg: 'bg-green-400'
    } :
    diffDays < 0 ? {
        text: 'overdue',
        bg: 'bg-red-500'
    } : {text: '', bg: ''};



    return output;
}