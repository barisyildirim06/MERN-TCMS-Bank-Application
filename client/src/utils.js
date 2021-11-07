export class Utils {
    static isCSV(file) {
        return (file.name && file.name.toLowerCase().endsWith('.csv')) &&
            ((file.type && (file.type.includes('application/vnd.ms-excel') || file.type.includes('text/csv'))));
    }

    static formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    static downloadCsv(data, fileName) {
        const objectToCsv = (data) => {
            let csvRows = [];
            const headers = Object.keys(data[0]);
            csvRows.push(headers.join(','));
    
            for (const row of data) {
                const values = headers.map(header => {
                    const escaped = (''+row[header]).replace(/"/g, '\\"');
                    return `"${escaped}"`
                })
                csvRows.push(values.join(','));
            }
            return csvRows.join('\n');
        }
        const csvData = objectToCsv(data);
    
        const download = (csv) => {
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute("download", fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        return download(csvData)

    }
}
