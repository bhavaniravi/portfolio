const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', DATE_OPTIONS)
}