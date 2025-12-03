import panels from './panels';

/**
 * @description Don't change `descriptor` exported name
 * @return {ElemDescriptor}
 */
export const descriptor = () => ({
    props: {
        collapsible: {
            type: Boolean,
            default: true,
            label: 'Сворачиваемый'
        },
        expandedByDefault: {
            type: Boolean,
            default: false,
            label: 'Развернуть контейнер'
        },
        editorExpandBehavior: {
            type: String,
            default: 'expanded',
            label: 'Поведение в редакторе'
        },
        expandIcon: {
            type: String,
            default: 'mdi-chevron-up',
            label: 'Иконка раскрытия'
        },
        collapseIcon: {
            type: String,
            default: 'mdi-chevron-down',
            label: 'Иконка закрытия'
        },
        iconColor: {
            type: String,
            default: '',
            label: 'Цвет иконки'
        }
    },
    vars: {},
    events: {}
});

export const meta = {
    descriptor,
    panels,
    isChildAllowed: true,
    slotNames: ['default', 'header']
};

export default descriptor;

