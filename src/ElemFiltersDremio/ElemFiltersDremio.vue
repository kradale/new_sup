<template>
    <w-elem :placeholder="$placeholder">
        <div class="image" v-if="props.renderImg">
            <div
                v-for="(buttonItem, i) in buttons"
                :key="i"
                class="image__btn"
                :class="[
                    supClasses,
                    buttonHoverClasses,
                    {
                        'button-hover': props.renderHover,
                        'break-words': props.breakWords
                    }
                ]"
                :style="getButtonStyle(buttonItem.button, i)"
                @click="onClickImgOrElseBtn({ i, ...buttonItem })"
                @mouseenter="onButtonMouseEnter(i)"
                @mouseleave="onButtonMouseLeave">
                <div
                    class="image__btn-content"
                    :class="{
                        'flex-col': props.metricPosition === 'bottom' || props.metricPosition === 'top'
                    }">
                    <div
                        v-if="isMdiIcon(buttonItem.row[initialIconValue])"
                        class="mdi icon"
                        :class="buttonItem.row[props.icon]"
                        :style="getImgButtonStyle(buttonItem.button, i)"></div>
                    <img
                        v-else
                        :src="buttonItem.row[initialIconValue]"
                        :style="getImgButtonStyle(buttonItem.button, i)" />
                    <span
                        v-if="props.renderMetric"
                        :style="metricAlignmentComp + props.fontOptionsMetric"
                        :class="{
                            'flex-order': props.metricPosition === 'left' || props.metricPosition === 'top'
                        }">
                        <w-button-text-wrapper :metrics="buttonItem.additionalMetrics">
                            {{ buttonItem.metric }}
                        </w-button-text-wrapper>
                    </span>
                </div>
            </div>
        </div>
        <div class="is-switch" v-else-if="props.isSwitch && props.switchMetric" :key="switchKey">
            <div v-for="(buttonItem, i) in buttons" :key="i" class="is-switch__btn" :class="[supClasses, buttonHoverClasses]">
                <div v-if="props.isSwitchRounded">
                    <ui-switch
                        v-model="switchBtn[i]"
                        @change="activateDatasetSwitch(buttonItem)"
                        :style="switchBtn[i] ? '' : ''">
                        {{ props.switchText }}
                    </ui-switch>
                </div>
            </div>
        </div>
        <div class="else" v-else>
            <div
                v-for="(buttonItem, i) in buttons"
                :key="i"
                class="else__btn"
                :class="[supClasses, buttonHoverClasses, { 'break-words': props.breakWords }]"
                :style="getButtonStyle(buttonItem.button, i)"
                @click="onClickImgOrElseBtn({ i, metric: null, ...buttonItem })"
                @mouseenter="onButtonMouseEnter(i)"
                @mouseleave="onButtonMouseLeave">
                <w-button-text-wrapper :metrics="buttonItem.additionalMetrics">
                    {{ buttonItem.button }}
                </w-button-text-wrapper>
                <div
                    v-if="isMdiIcon(buttonItem.icon)"
                    class="mdi icon"
                    :class="buttonItem.icon"
                    :style="getIconStyle(buttonItem.button, i)"></div>
            </div>
            <div
                v-if="props.resetButton.enable"
                class="else__btn reset-btn"
                :class="[supClasses, buttonHoverClasses]"
                :style="resetButtonStyle"
                @click="onResetButtonClick">
                {{ props.resetButton.text || 'Сбросить все' }}
            </div>
        </div>
    </w-elem>
</template>
<script>
import { Elem } from '@goodt-wcore/elem';
import { StoreManager } from '@goodt-wcore/managers';
import { Url } from '@goodt-common/utils';
import { useElemDatasetMixin, ElemDatasetMixinTypes } from '@goodt-common/data';
import { isEmpty, pick, omit } from 'lodash';
import { UiSwitch } from '@goodt-wcore/panel-ui';
import { useNavigate, useRouteQueryManager } from '@goodt-wcore/utils';
import { Events, meta, Vars } from './descriptor';
import { MarginClassesOptions } from './panels/config';
import WButtonTextWrapper from './components/ButtonTextWrapper.vue';

const { navigate } = useNavigate();
const { addRouteQueryParams } = useRouteQueryManager();
const { store, ValueObject } = StoreManager;

export default {
    extends: Elem,
    components: { UiSwitch, WButtonTextWrapper },
    mixins: [useElemDatasetMixin()],

    meta,
    implicitCssModule: true,

    /** @public */
    hooks: {
        then(result) {
            if (this.props.manualInput) {
                this.setupManualInputData();
            } else {
                this.buildData(result);
            }
        }
    },
    data() {
        return {
            buttons: [],
            activeSelects: [],
            activeMetrics: [],
            selectInds: [],
            switchBtn: {},
            switchKey: 0,
            subState: null,
            localMetrics: [],
            hoveredButtonIndex: null,
            ...ElemDatasetMixinTypes
        };
    },
    computedEditor: {
        $placeholder() {
            const {
                hasDataset,
                props: { manualInput: isManualInput }
            } = this;

            return {
                show: (isManualInput || hasDataset) === false,
                toggle: true,
                content: 'No dataset selected'
            };
        }
    },
    computed: {
        activeStyle() {
            const { activeButtonStyle, fontOptions } = this.props;
            const styles = `${activeButtonStyle};${fontOptions};${this.margin}`;
            return styles;
        },
        activeIconStyle() {
            const { activeButtonStyle, fontOptions } = this.props;
            const styles = `${activeButtonStyle};${fontOptions}; background: transparent`;
            return styles;
        },
        disabledStyle() {
            const { disabledButtonStyle, fontOptions } = this.props;
            const styles = `${disabledButtonStyle};${fontOptions};${this.margin}`;
            return styles;
        },
        disabledIconStyle() {
            const { disabledButtonStyle, fontOptions } = this.props;
            const styles = `${disabledButtonStyle};${fontOptions}; background: transparent`;
            return styles;
        },
        metricAlignmentComp() {
            switch (this.props.metricAlignment) {
                case 'left':
                    return 'align-self: flex-start;';
                case 'right':
                    return 'align-self: flex-end;';
                default:
                    return '';
            }
        },
        supClasses() {
            const { marginBetweenButtons, marginBetweenRows } = this.props;
            const classes = [];

            if (marginBetweenButtons && MarginClassesOptions.some((opt) => opt.value === marginBetweenButtons)) {
                classes.push(`mar-left-${marginBetweenButtons}`);
            }
            if (marginBetweenRows && MarginClassesOptions.some((opt) => opt.value === marginBetweenRows)) {
                classes.push(`mar-bot-${marginBetweenRows}`);
            }
            return classes;
        },
        margin() {
            const { marginBetweenButtons, marginBetweenButtonsUnit, marginBetweenRows, marginBetweenRowsUnit } =
                this.props;
            let styles = '';
            if (!MarginClassesOptions.some((opt) => opt.value === marginBetweenButtons)) {
                styles += `margin-right:${marginBetweenButtons}${marginBetweenButtonsUnit};`;
            }

            if (!MarginClassesOptions.some((opt) => opt.value === marginBetweenRows)) {
                styles += `margin-bottom:${marginBetweenRows}${marginBetweenRowsUnit};`;
            }
            return styles;
        },
        initialIconValue() {
            const { icon } = this.props;

            if (icon == null) {
                const dimFields = [...Object.keys(this.queryHelper.dimensionList)];
                return dimFields[0];
            }
            return icon;
        },
        hasButtonHoverStyle() {
            return Boolean(this.props.buttonHoverColor || this.props.buttonHoverTextColor || this.props.buttonHoverStyle);
        },
        buttonHoverClasses() {
            return this.hasButtonHoverStyle ? 'btn-hover-style' : '';
        },
        resetButtonStyle() {
            const { resetButton, disabledButtonStyle, fontOptions } = this.props;

            if (resetButton.styleAsInactive) {
                return `${disabledButtonStyle};${fontOptions};${this.margin}`;
            }

            let styles = this.margin;
            if (resetButton.backgroundColor) {
                styles += `background-color:${resetButton.backgroundColor};`;
            }
            if (resetButton.textColor) {
                styles += `color:${resetButton.textColor};`;
            }
            styles += fontOptions;
            return styles;
        }
    },
    watchEditor: {
        [['props.metrics', 'props.metric', 'props.isSwitch', 'props.switchMetric']]: {
            handler() {
                this.loadData();
            }
        },
        'props.manualInput': {
            handler(manualInput) {
                if (manualInput === true) {
                    this.setupManualInputData();
                    return;
                }

                if (this.hasDataset) {
                    this.loadData();
                }
            }
        },
        'props.buttonsArray': {
            handler() {
                if (this.props.manualInput) {
                    this.setupManualInputData();
                }
            }
        }
    },
    created() {
        if (this.props.manualInput === false && this.hasDataset) {
            this.loadData();
        }
    },
    mounted() {
        if (this.props.manualInput) {
            /*
             * to be sure that subscribe method of another widget
             * will be called before event triggered
             */
            setTimeout(this.setupManualInputData, 100);
        }
    },
    methods: {
        /** @public */
        $storeWatchHandler(state) {
            // исключаем филды?
            const subState = pick(state, [...this.metrics, ...this.dimensions]);
            // оставляем только филды?
            state = omit(state, [...this.metrics, ...this.dimensions]);
            this.subState = subState;

            const requests = this.$storeApplyQueryFilters(state);
            if (requests[0] != null) {
                this.activeSelects = [];
                // ?
                requests[0].offset = 0;
                this.loadData(requests);
                return;
            }

            if (this.props.manualInput) {
                this.setupManualInputData();
                return;
            }

            this.activeSelects = this.resolveActiveSelects({ subState });
            this.triggerSelectedButtons({ activeSelects: this.activeSelects });
        },
        buildData(result) {
            const [dimension] = this.dimensions;
            const imgMetric = this.props.metric;
            const activeButtons = [...this.props.activeButtons];
            const { switchMetric } = this.props;
            this.localMetrics = [];
            this.buttons = [];

            if (switchMetric !== null && this.props.isSwitch) {
                result.rows.forEach((row, i) => {
                    this.$set(this.switchBtn, i, false);
                    const obj = {
                        row,
                        id: i,
                        button: row[switchMetric],
                        metric: row[switchMetric],
                        additionalMetrics: this.buildAdditionalMetrics(row)
                    };
                    this.buttons.push(obj);
                });
            } else if (imgMetric !== null) {
                result.rows.forEach((row, i) => {
                    const obj = {
                        row,
                        id: i,
                        button: row[dimension],
                        metric: row[imgMetric],
                        additionalMetrics: this.buildAdditionalMetrics(row)
                    };
                    this.buttons.push(obj);
                });
            } else {
                result.rows.forEach((row, i) => {
                    const obj = {
                        row,
                        id: i,
                        button: row[dimension],
                        additionalMetrics: this.buildAdditionalMetrics(row),
                        metric: ''
                    };
                    this.buttons.push(obj);
                });
            }

            if (activeButtons.length > 0) {
                activeButtons.forEach((activeButton) => {
                    const foundButton = this.buttons.find(({ button: title }) => title === activeButton.title);

                    if (foundButton != null) {
                        this.activateDatasetButton({
                            button: activeButton.title,
                            metric: imgMetric !== null ? foundButton.metric : null
                        });
                    }
                });
            }

            this.activeSelects = this.resolveActiveSelects({
                subState: this.subState,
                dimensionName: dimension,
                electionButtons: activeButtons
            });
            this.activateFirstButton();
        },

        buildAdditionalMetrics(row) {
            const { metrics } = this.props;
            return metrics.map(({ metric, ...rest }) => ({
                metricValue: row[metric],
                ...rest
            }));
        },
        setupManualInputData() {
            const activeButtons = [...this.props.activeButtons];
            this.buttons = this.props.buttonsArray.map((button, i) => ({
                id: i,
                button: button.title,
                metric: '',
                icon: button.icon ? `mdi-${button.icon}` : null,
                variableValue: button.variableValue || ''
            }));

            this.selectInds = [];
            activeButtons.forEach((activeButton) => {
                const findInd = this.buttons.findIndex(({ button: title }) => title === activeButton.title);
                this.activateManualButton(findInd);
            });

            this.activateFirstButton();
        },
        activateFirstButton() {
            const {
                props: { isShowFirstBtn },
                buttons
            } = this;

            if (isShowFirstBtn === false || buttons.length === 0) {
                return;
            }

            const [button] = buttons;
            this.activateDatasetButton(button);
        },
        // todo
        // 1) выбор метрики для каждой кнопки (?), ввод текста, мультиселект для этого случая (?)
        // 2) выбор цвета активного неактивного фона, кружочка
        activateDatasetSwitch({ metric, id }) {
            if (this.switchBtn[id]) {
                if (this.props.multiSelect) {
                    const obj = {
                        name: metric,
                        idx: id
                    };
                    this.localMetrics.push(obj);
                    const metricNames = this.localMetrics.map(([name]) => name);
                    this.$storeCommit({
                        [this.props.switchMetric]: metricNames
                    });
                } else {
                    this.$storeCommit({
                        [this.props.switchMetric]: metric
                    });
                }
            } else {
                if (this.props.multiSelect === true) {
                    this.localMetrics = this.localMetrics.filter(({ idx }) => idx !== id);
                    const metricNames = this.localMetrics.map(({ name }) => name);
                    if (this.localMetrics.length === 0) {
                        this.$storeCommit({
                            [this.props.switchMetric]: null
                        });
                    } else {
                        this.$storeCommit({
                            [this.props.switchMetric]: metricNames
                        });
                    }
                }

                if (this.props.multiSelect === false) {
                    this.$storeCommit({
                        [this.props.switchMetric]: null
                    });
                }
            }
            if (this.props.multiSelect === false) {
                for (const buttonKey in Object.keys(this.switchBtn)) {
                    if (Number(buttonKey) !== id) {
                        this.switchBtn[buttonKey] = false;
                    }
                }
            }
        },
        resolveOtherMetricsDimensions({ activeSelects }) {
            const { buttons } = this;
            const { radioButton: isRadioButton, multiSelect: isMultiSelect } = this.props;
            const isSingleSelect = isRadioButton || isMultiSelect === false;
            const findButton = (buttonsArr, dimension) => buttonsArr.find(({ button }) => button === dimension);

            if (activeSelects.length === 0) {
                const [{ row = {} } = {}] = this.buttons;
                return Object.entries(row).reduce(
                    (acc, [key]) => ({
                        ...acc,
                        [key]: null
                    }),
                    {}
                );
            }

            if (isRadioButton) {
                const [dimension] = this.activeSelects;
                const foundButton = findButton(buttons, dimension);

                return foundButton.row;
            }

            return activeSelects.reduce((acc, dimension) => {
                const foundButton = findButton(buttons, dimension);
                if (foundButton == null) {
                    return acc;
                }

                const rowEntries = foundButton.row ? Object.entries(foundButton.row) : [];

                rowEntries
                    .filter(([key]) => key !== dimension)
                    .forEach(([key, value]) => {
                        if (acc[key] == null) {
                            acc[key] = isSingleSelect ? value : [value];
                        } else {
                            acc[key] = isSingleSelect ? [acc[key], value] : [...acc[key], value];
                        }
                    });

                return acc;
            }, {});
        },
        activateDatasetButton({ button, metric }) {
            const { radioButton: isRadioButton, multiSelect: isMultiSelect } = this.props;
            const [dimension] = this.dimensions;
            let stateToCommit = null;

            if (this.activeSelects.includes(button) === false) {
                this.activeSelects = isMultiSelect ? [...this.activeSelects, button] : [button];
                const commitValue = isRadioButton || isMultiSelect === false ? button : this.activeSelects;
                stateToCommit = {
                    [dimension]: commitValue,
                    ...this.resolveOtherMetricsDimensions({
                        activeSelects: this.activeSelects
                    })
                };
                if (metric !== null) {
                    // prettier-ignore
                    this.activeMetrics = isMultiSelect
                        ? [...this.activeMetrics, metric]
                        : [metric];
                    // prettier-ignore
                    stateToCommit[this.props.metric] = isMultiSelect
                        ? this.activeMetrics
                        : metric;
                }
            } else if (isRadioButton === false || isMultiSelect) {
                const { dynamicEvent, customEvent } = this.props;
                const eventToTrigger = dynamicEvent.enable ? dynamicEvent.onResetName : customEvent.onResetName;
                this.$eventTrigger(eventToTrigger);

                // prettier-ignore
                this.activeSelects = isMultiSelect
                    ? this.activeSelects.filter((activeSelect) => activeSelect !== button)
                    : [];
                stateToCommit = {
                    [dimension]: this.activeSelects,
                    ...this.resolveOtherMetricsDimensions({
                        activeSelects: this.activeSelects
                    })
                };
                if (metric !== null) {
                    // prettier-ignore
                    this.activeMetrics = isMultiSelect
                        ? this.activeMetrics.filter((activeMetric) => activeMetric !== metric)
                        : [];
                    stateToCommit[dimension] = this.activeSelects.length === 0 ? null : this.activeSelects;
                    stateToCommit[this.props.metric] = this.activeMetrics.length > 0 ? this.activeMetrics : null;
                }
            }
            if (stateToCommit != null) {
                this.$storeCommit(stateToCommit);
                this.addRouteQueryParams();
            }
            this.triggerSelectedButtons({ activeSelects: this.activeSelects });
        },
        triggerSelectedButtons({ activeSelects }) {
            const { dynamicEvent, customEvent } = this.props;

            if (activeSelects.length === 0) {
                this.$eventTrigger(Events.IS_EMPTY_FILTER);
                return;
            }
            if (dynamicEvent.enable === false) {
                this.$eventTrigger(customEvent.onSelectName);
                return;
            }
            activeSelects.forEach((dimension) => {
                const foundButton = this.buttons.find(({ button }) => dimension === button);
                this.$eventTrigger(foundButton.row[dynamicEvent.onSelectName]);
            });
        },
        activateManualButton(i) {
            const buts = this.props.buttonsArray;
            if (buts.length === 0) {
                return;
            }
            if (!this.selectInds.includes(i)) {
                if (this.props.multiSelect) {
                    this.selectInds.push(i);
                } else {
                    this.selectInds = [i];
                }
            } else if (this.props.radioButton === false || this.props.multiSelect) {
                if (this.props.multiSelect) {
                    this.selectInds = this.selectInds.filter((el) => el !== i);
                } else {
                    this.activeSelects = [];
                }
            }
            this.selectInds.forEach((selectIndex) => {
                this.$eventTrigger(buts[selectIndex]?.eventName);
            });

            // Commit variable values to store from the button's variableValue
            this.commitVariablesToStore(buts);
        },
        /**
         * Commits variable values from selected buttons to the store
         * @param {Array} buts - buttons array
         */
        commitVariablesToStore(buts) {
            const { variablesList, customVar, multiSelect } = this.props;
            const variables = variablesList && variablesList.length > 0
                ? variablesList
                : [{ name: customVar || Vars.CUSTOM_VAR }];

            variables.forEach(({ name }) => {
                if (!name) {
                    return;
                }

                if (this.selectInds.length > 0) {
                    const selectedVariableValues = this.selectInds
                        .map((idx) => buts[idx]?.variableValue)
                        .filter((val) => val != null && val !== '');

                    if (selectedVariableValues.length > 0) {
                        const valueToCommit = multiSelect
                            ? selectedVariableValues
                            : selectedVariableValues[0];
                        this.$storeCommit({ [name]: valueToCommit });
                    } else {
                        this.$storeCommit({ [name]: null });
                    }
                } else {
                    this.$storeCommit({ [name]: null });
                }
            });
        },
        isActiveButton(button, i) {
            if (this.props.manualInput) {
                return this.selectInds.includes(i);
            }
            return this.activeSelects.includes(button);
        },
        resolveActiveSelects({ subState, electionButtons = [] }) {
            if (this.buttons == null || this.buttons.length === 0) {
                return [];
            }

            return this.buttons.reduce((acc, { button, row }) => {
                if (electionButtons.length > 0 && electionButtons.some(({ title }) => title === button)) {
                    return [...acc, button];
                }

                const stateEntries = Object.entries(subState ?? {});
                const isSelected =
                    stateEntries.length > 0
                        ? stateEntries.some(([key, value]) => {
                              if (Array.isArray(value) && value.length > 0) {
                                  return value.includes(button) || value.includes(row[key]);
                              }

                              return button === value || row[key] === value;
                          })
                        : false;

                if (!isSelected) {
                    return acc;
                }

                return [...acc, button];
            }, []);
        },

        addRouteQueryParams() {
            const { metricUrl } = this.props;

            if (metricUrl != null) {
                return;
            }

            const { writeMap } = this.$storeMeta.vars;
            const triggerAliases = Object.values(pick(writeMap, this.props.routeQueryParamNames));
            const pickedStoreState = pick(store.state, triggerAliases);
            const storeValues = Object.entries(pickedStoreState).reduce(
                (acc, [key, value]) => ({ ...acc, [key]: ValueObject.getValue(value) }),
                {}
            );
            addRouteQueryParams(storeValues);
        },

        onClickImgOrElseBtn({ i, button, metric, row }) {
            const { manualInput, buttonsArray, metricUrl, multiSelect, routeQueryMetrics } = this.props;
            let navigateUrl;
            if (manualInput === true) {
                this.activateManualButton(i);
                navigateUrl = buttonsArray[i].url;
            } else {
                this.activateDatasetButton({
                    button,
                    metric
                });
                navigateUrl = row[metricUrl];
            }

            if (multiSelect === true || isEmpty(navigateUrl)) {
                return;
            }

            const queryMetrics = routeQueryMetrics.reduce((acc, queryMetric) => {
                acc[queryMetric] = row[queryMetric];
                return acc;
            }, {});

            this.navigate(navigateUrl, queryMetrics);
        },
        /**
         *
         * @param {string} navigateUrl
         * @param {Record<string, any>} query
         */
        navigate(navigateUrl, query) {
            const { isUrlTargetBlank } = this.props;

            if ([null, undefined, ''].includes(navigateUrl)) {
                return;
            }

            const urlModel = Url.create(navigateUrl);

            if (urlModel.isRelative && urlModel.hash === '') {
                const { path, query: queryModel } = urlModel;
                navigate({ route: { path, query: { ...queryModel, ...query } } }, { isNewWindow: isUrlTargetBlank });
                return;
            }

            const { path, query: queryModel } = Url.create(urlModel.hash.replace('#', ''));
            urlModel.hash = '';

            navigate(
                {
                    url: urlModel.href,
                    route: {
                        path,
                        query: { ...queryModel, ...query }
                    }
                },
                { isNewWindow: isUrlTargetBlank }
            );
        },
        isMdiIcon(val) {
            const test = /^[mdi]/;
            return test.test(val);
        },
        getImgButtonStyle(button, index) {
            return this.isActiveButton(button, index)
                ? this.props.activeImgButtonStyle
                : this.props.disabledImgButtonStyle;
        },
        getIconStyle(button, index) {
            return this.isActiveButton(button, index) ? this.activeIconStyle : this.disabledIconStyle;
        },
        /**
         * Get button style including hover style when hovered
         * @param {string} button - button label
         * @param {number} index - button index
         * @returns {string} - combined style string
         */
        getButtonStyle(button, index) {
            const baseStyle = this.isActiveButton(button, index) ? this.activeStyle : this.disabledStyle;
            const { buttonHoverColor, buttonHoverTextColor, buttonHoverStyle } = this.props;

            if (this.hoveredButtonIndex === index) {
                let hoverStyles = '';
                if (buttonHoverColor) {
                    hoverStyles += `background-color:${buttonHoverColor};`;
                }
                if (buttonHoverTextColor) {
                    hoverStyles += `color:${buttonHoverTextColor};`;
                }
                if (buttonHoverStyle) {
                    hoverStyles += buttonHoverStyle;
                }
                if (hoverStyles) {
                    return `${baseStyle};${hoverStyles}`;
                }
            }

            return baseStyle;
        },
        /**
         * Handle button mouse enter
         * @param {number} index - button index
         */
        onButtonMouseEnter(index) {
            this.hoveredButtonIndex = index;
        },
        /**
         * Handle button mouse leave
         */
        onButtonMouseLeave() {
            this.hoveredButtonIndex = null;
        },
        /**
         * Reset button click handler - sets all variables to null
         */
        onResetButtonClick() {
            const { variablesList, customVar } = this.props;
            const variables = variablesList && variablesList.length > 0
                ? variablesList
                : [{ name: customVar || Vars.CUSTOM_VAR }];

            // Reset all manually configured variables
            const stateToCommit = {};
            variables.forEach(({ name }) => {
                if (name) {
                    stateToCommit[name] = null;
                }
            });

            // Reset all dimension variables from the dataset
            if (this.dimensions && this.dimensions.length > 0) {
                this.dimensions.forEach((dimension) => {
                    stateToCommit[dimension] = null;
                });
            }

            // Commit all resets
            if (Object.keys(stateToCommit).length > 0) {
                this.$storeCommit(stateToCommit);
            }

            // Clear local selection state
            this.activeSelects = [];
            this.selectInds = [];
            this.activeMetrics = [];

            // Trigger empty filter event
            this.$eventTrigger(Events.IS_EMPTY_FILTER);
        }
    }
};
</script>
<style module src="./styles.pcss" lang="pcss"></style>
