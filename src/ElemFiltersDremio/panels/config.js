import { MetricFormat, Position } from '../constants';

export const MarginClassesOptions = [
    { value: '', label: 'inherit' },
    { value: 'auto', label: 'auto' },
    { value: 'none', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: 'l1', label: 'layout 1' },
    { value: 'l2', label: 'layout 2' },
    { value: 'l3', label: 'layout 3' },
    { value: 'l4', label: 'layout 4' },
    { value: 'l5', label: 'layout 5' },
    { value: 'l6', label: 'layout 6' },
    { value: 'l7', label: 'layout 7' }
];

export const dragOptions = {
    animation: 200,
    handle: '.drag-handle'
};
export const MetricFormatOptions = [
    { value: MetricFormat.STRING, label: 'Строка' },
    { value: MetricFormat.MDI_ICON, label: 'Иконка' }
];

export const MetricPositionOptions = [
    { label: 'Сверху', value: Position.TOP },
    { label: 'Снизу', value: Position.BOTTOM },
    { label: 'Справа', value: Position.RIGHT },
    { label: 'Слева', value: Position.LEFT }
];

export const MetricAlignmentOptions = [
    { label: 'Слева', value: 'left' },
    { label: 'По центру', value: 'center' },
    { label: 'Справа', value: 'right' }
];
