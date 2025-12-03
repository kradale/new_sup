import panels from './panels';
import { cssVars } from './css-vars';
import { MetricFormat } from './constants';

export const Events = Object.freeze({
    IS_EMPTY_FILTER: 'isEmptyFilter'
});

/**
 * @enum {string}
 * @type {Readonly<Record<string, string>>}
 */
export const Vars = Object.freeze({
    CUSTOM_VAR: 'customVar'
});

export const descriptor = () => ({
    props: {
        activeButtonStyle: {
            type: String,
            default: ''
        },
        isShowFirstBtn: {
            type: Boolean,
            default: false
        },
        disabledButtonStyle: {
            type: String,
            default: ''
        },
        activeImgButtonStyle: {
            type: String,
            default: ''
        },
        disabledImgButtonStyle: {
            type: String,
            default: ''
        },
        fontOptions: {
            type: String,
            default: ''
        },
        fontOptionsMetric: {
            type: String,
            default: ''
        },
        hoverColor: {
            type: String,
            default: '#000000'
        },
        renderHover: {
            type: Boolean,
            default: false
        },
        buttonHoverColor: {
            type: String,
            default: ''
        },
        buttonHoverTextColor: {
            type: String,
            default: ''
        },
        buttonHoverStyle: {
            type: String,
            default: ''
        },
        customVar: {
            type: String,
            default: 'customVar'
        },
        variablesList: {
            type: Array,
            default() {
                return [{ name: 'customVar' }];
            }
        },
        resetButton: {
            type: Object,
            default() {
                return {
                    enable: false,
                    styleAsInactive: true,
                    text: 'Сбросить все',
                    backgroundColor: '',
                    textColor: ''
                };
            }
        },
        renderMetric: {
            type: Boolean,
            default: false
        },
        metric: {
            type: String,
            default: null
        },
        switchMetric: {
            type: String,
            default: null
        },
        metricPosition: {
            type: String,
            default: 'right'
        },
        metricAlignment: {
            type: String,
            default: 'center'
        },
        marginBetweenButtons: {
            type: Number,
            default: 10
        },
        marginBetweenButtonsUnit: {
            type: String,
            default: 'px'
        },
        marginBetweenRows: {
            type: Number,
            default: 10
        },
        marginBetweenRowsUnit: {
            type: Number,
            default: 'px'
        },
        multiSelect: {
            type: Boolean,
            default: false
        },
        manualInput: {
            type: Boolean,
            default: false
        },
        buttonsArray: {
            type: Array,
            default() {
                return [];
            },
            factory: ({
                title = '',
                eventName = '',
                url = '',
                icon = '',
                variableValue = ''
            } = {}) => ({
                title,
                eventName,
                url,
                icon,
                variableValue
            })
        },
        renderImg: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: null
        },
        radioButton: {
            type: Boolean,
            default: false
        },
        breakWords: {
            type: Boolean,
            default: false
        },
        activeButtons: {
            type: Array,
            default() {
                return [];
            }
        },
        isSwitch: {
            type: Boolean,
            default: false
        },
        isSwitchRounded: {
            type: Boolean,
            default: true
        },
        switchText: {
            type: String,
            default: 'Текст'
        },
        switchBtnMarginRight: {
            type: String,
            default: '1rem'
        },
        customEvent: {
            type: Object,
            default() {
                return {
                    enable: false,
                    onSelectName: '',
                    onResetName: ''
                };
            }
        },
        dynamicEvent: {
            type: Object,
            default() {
                return {
                    enable: false,
                    onSelectName: '',
                    onResetName: ''
                };
            }
        },
        hasMarginLeft: {
            type: Boolean,
            default: true
        },
        metricUrl: {
            type: String,
            default: ''
        },
        isUrlTargetBlank: {
            type: Boolean,
            default: false
        },
        routeQueryParamNames: {
            type: Array,
            default: () => []
        },
        routeQueryMetrics: {
            type: Array,
            default: () => []
        },
        events: {
            type: Object,
            default: () => ({
                [Events.IS_EMPTY_FILTER]: ''
            }),
            label: {
                [`events.${Events.IS_EMPTY_FILTER}`]: 'Имя события при отжатии последней кнопки'
            }
        },
        metrics: {
            type: Array,
            default: () => [],
            factory: ({
                metric = null,
                metricFormat = MetricFormat.STRING,
                position = 'right',
                align = 'center',
                style = ''
            } = {}) => ({
                metric,
                metricFormat,
                position,
                align,
                style
            }),
            label: {
                'metrics.metric': 'Выбор метрики',
                'metrics.metricFormat': 'Формат метрики',
                'metrics.position': 'Положение метрики',
                'metrics.align': 'Выравнивание метрики',
                'metrics.style': 'Стили метрики'
            }
        }
    },
    events: {
        [Events.IS_EMPTY_FILTER]: ['trigger']
    },
    vars: Object.values(Vars).reduce((acc, varName) => ({ ...acc, [varName]: { description: varName } }), {})
});

export const meta = {
    descriptor,
    panels,
    isChildAllowed: false,
    slotNames: [],
    cssVars
};
