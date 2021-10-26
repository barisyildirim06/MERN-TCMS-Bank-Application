export class Utils {
    static isCSV(file) {
        return (file.name && file.name.toLowerCase().endsWith('.csv')) &&
            ((file.type && (file.type.includes('application/vnd.ms-excel') || file.type.includes('text/csv'))));
    }

    static formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}
