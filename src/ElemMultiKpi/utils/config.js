const mapSeparators = { n: '0', 0: 'ru-RU', 1: 'de-DE', 2: 'en-AU' };

function buildNumberFormat({ val, format, sep }) {
    if (format === 'n' && sep === 'n') {
        return val;
    }
    let value = val;
    const fractionLength = format === 'n' ? String(value).split('.')[1]?.length ?? 0 : parseInt(format, 10);
    let percentSymbol = '';
    if (format.length > 1) {
        value *= 100;
        percentSymbol = '%';
    }
    const separator = mapSeparators[sep];
    value = Number(value.toFixed(fractionLength));
    if (separator !== '0') {
        value = value.toLocaleString(separator, { minimumFractionDigits: fractionLength });
    } else {
        value = value.toLocaleString('ru-RU', { minimumFractionDigits: fractionLength });
        value = value.replace(/\s/g, '');
    }

    return `${value}${percentSymbol}`;
}

export { buildNumberFormat };
