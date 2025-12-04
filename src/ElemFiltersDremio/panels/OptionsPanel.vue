<template>
    <ui-container>
        <div>
            <ui-has-panel autoWidth>
                <div class="textarea-header">Стили активной кнопки</div>
                <template #panel>
                    <ui-panel :groups="[{ name: 'Стили активной кнопки', slot: 'default' }]">
                        <ui-textarea resizeBoth class="textarea-panel" prop="activeButtonStyle">{{ '' }}</ui-textarea>
                    </ui-panel>
                </template>
            </ui-has-panel>
            <ui-textarea prop="activeButtonStyle">{{ '' }}</ui-textarea>
        </div>
        <div>
            <ui-has-panel autoWidth>
                <div class="textarea-header">Стили неактивной кнопки</div>
                <template #panel>
                    <ui-panel :groups="[{ name: 'Стили неактивной кнопки', slot: 'default' }]">
                        <ui-textarea resizeBoth class="textarea-panel" prop="disabledButtonStyle">{{ '' }}</ui-textarea>
                    </ui-panel>
                </template>
            </ui-has-panel>
            <ui-textarea prop="disabledButtonStyle">{{ '' }}</ui-textarea>
        </div>
        <div>
            <ui-has-panel autoWidth>
                <div class="textarea-header">Приоритетные настройки стиля</div>
                <template #panel>
                    <ui-panel :groups="[{ name: 'Приоритетные настройки стиля', slot: 'default' }]">
                        <ui-textarea resizeBoth class="textarea-panel" prop="fontOptions">{{ '' }}</ui-textarea>
                    </ui-panel>
                </template>
            </ui-has-panel>
            <ui-textarea prop="fontOptions">{{ '' }}</ui-textarea>
        </div>

        <ui-has-panel>
            <div class="form-label form-label-small d-flex flex-v-center">
                Настройки наведения
            </div>
            <template #panel>
                <ui-panel :groups="[{ name: 'Настройки наведения', slot: 'buttonHover' }]">
                    <template #buttonHover>
                        <ui-container>
                            <ui-input-cp v-model="props.buttonHoverColor" @change="propChanged('buttonHoverColor')">
                                Цвет кнопки
                            </ui-input-cp>
                            <ui-input-cp v-model="props.buttonHoverTextColor" @change="propChanged('buttonHoverTextColor')">
                                Цвет текста
                            </ui-input-cp>
                            <div class="form-label form-label-small">Стиль наведения (CSS)</div>
                            <ui-textarea
                                v-model="props.buttonHoverStyle"
                                placeholder="border-bottom, box-shadow"
                                @change="propChanged('buttonHoverStyle')">
                                {{ '' }}
                            </ui-textarea>
                        </ui-container>
                    </template>
                </ui-panel>
            </template>
        </ui-has-panel>

        <ui-switch prop="breakWords">Переносить длинные названия</ui-switch>

        <ui-input-units
            :value="horizontalMargin"
            :units="SizeUnits"
            :options="MarginClassesOptions"
            @change="setHorizontalMargin">
            Горизонтальный отступ
        </ui-input-units>
        <ui-input-units
            :value="verticalMargin"
            :units="SizeUnits"
            :options="MarginClassesOptions"
            @change="setVerticalMargin">
            Вертикальный отступ
        </ui-input-units>

        <ui-switch prop="hasMarginLeft">Учитывать отступ слева</ui-switch>

        <ui-has-panel>
            <div class="form-label form-label-small">Предвыбранные кнопки</div>
            <template #panel>
                <ui-panel :groups="[{ name: 'Предвыбранные кнопки', slot: 'buttons' }]">
                    <template #buttons>
                        <ui-container>
                            <ui-has-two-columns v-for="(btn, i) of props.activeButtons" :key="'button-' + i">
                                <template #left>
                                    <ui-input-auto
                                        v-model="btn.title"
                                        :options="activeButtonsArr"
                                        @change="propChanged('activeButtons')"></ui-input-auto>
                                </template>
                                <template #right>
                                    <ui-button type="error" @click="deleteActiveButton(i)">Удалить</ui-button>
                                </template>
                            </ui-has-two-columns>
                            <ui-button type="primary" @click="addActiveButton">Добавить кнопку</ui-button>
                        </ui-container>
                    </template>
                </ui-panel>
            </template>
        </ui-has-panel>

        <ui-has-panel>
            <ui-checkbox prop="renderImg" :disabled="props.manualInput">Картинка</ui-checkbox>
            <template #panel>
                <ui-panel :groups="[{ name: 'Настройки картинки', slot: 'img' }]">
                    <template #img>
                        <ui-container>
                            <ui-select :options="dimensionMetricNames" v-model="iconValue" class="mar-bot-3">
                                Картинка
                            </ui-select>
                            <ui-has-panel autoWidth>
                                <div class="textarea-header">Стили активной картинки</div>
                                <template #panel>
                                    <ui-panel :groups="[{ name: 'Стили активной картинки', slot: 'default' }]">
                                        <ui-textarea resizeBoth class="textarea-panel" prop="activeImgButtonStyle">
                                            {{ '' }}
                                        </ui-textarea>
                                    </ui-panel>
                                </template>
                            </ui-has-panel>
                            <ui-textarea prop="activeImgButtonStyle">{{ '' }}</ui-textarea>

                            <ui-has-panel autoWidth>
                                <div class="textarea-header">Стили неактивной картинки</div>
                                <template #panel>
                                    <ui-panel :groups="[{ name: 'Стили неактивной картинки', slot: 'default' }]">
                                        <ui-textarea resizeBoth class="textarea-panel" prop="disabledImgButtonStyle">
                                            {{ '' }}
                                        </ui-textarea>
                                    </ui-panel>
                                </template>
                            </ui-has-panel>
                            <ui-textarea prop="disabledImgButtonStyle">{{ '' }}</ui-textarea>

                            <ui-has-panel>
                                <ui-checkbox v-model="props.renderHover" @change="propChanged('renderHover')">
                                    Включить ховер
                                </ui-checkbox>
                                <template #panel>
                                    <ui-panel :groups="[{ name: 'Настройки цвета ховера', slot: 'hover' }]">
                                        <template #hover>
                                            <ui-input-cp v-model="props.hoverColor" @change="propChanged('hoverColor')">
                                                Цвет ховера
                                            </ui-input-cp>
                                        </template>
                                    </ui-panel>
                                </template>
                            </ui-has-panel>
                        </ui-container>
                    </template>
                </ui-panel>
            </template>
        </ui-has-panel>

        <ui-has-panel v-if="props.renderImg">
            <ui-checkbox prop="renderMetric">Включить метрику для картинки</ui-checkbox>
            <template #panel>
                <ui-panel :groups="[{ name: 'Выбор метрики', slot: 'metric' }]">
                    <template #metric>
                        <ui-container>
                            <ui-select prop="metric" :options="metricOptions">Выбор метрики</ui-select>
                            <ui-select prop="metricPosition" :options="MetricPositionOptions">
                                Положение метрики
                            </ui-select>
                            <ui-select prop="metricAlignment" :options="MetricAlignmentOptions">
                                Выравнивание метрики
                            </ui-select>
                            <ui-input prop="fontOptionsMetric">Настройки шрифта</ui-input>
                        </ui-container>
                    </template>
                </ui-panel>
            </template>
        </ui-has-panel>

        <ui-has-panel>
            <ui-checkbox prop="manualInput" :disabled="props.renderImg">Ручной ввод кнопок</ui-checkbox>
            <template #panel>
                <ui-panel :groups="[{ name: 'Ручной ввод', slot: 'input' }]">
                    <template #input>
                        <draggable class="p" v-model="buttonsArray" v-bind="dragOptions">
                            <div v-for="(but, i) in buttonsArray" :key="i">
                                <div class="row row-collapse">
                                    <div class="col col-auto col-vmid">
                                        <div class="icon cursor-move drag-handle">
                                            <i class="mdi mdi-drag mdi-18px"></i>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <ui-container>
                                            <ui-input v-model="but.title" @change="propChanged('buttonsArray')">
                                                Заголовок
                                            </ui-input>
                                            <ui-input v-model="but.eventName" @change="propChanged('buttonsArray')">
                                                Название события
                                            </ui-input>
                                            <ui-input v-model="but.url" @change="propChanged('buttonsArray')">
                                                Ссылка
                                            </ui-input>
                                            <ui-input v-model="but.icon" @change="propChanged('buttonsArray')">
                                                Иконка
                                            </ui-input>
                                            <ui-input v-model="but.variableValue" @change="propChanged('buttonsArray')">
                                                Значение переменной
                                            </ui-input>
                                        </ui-container>
                                    </div>
                                    <div class="col col-auto col-vmid">
                                        <div class="btn btn-icon btn-small d-block">
                                            <div class="icon" @click="duplicateButton(i)">
                                                <i class="mdi mdi-content-copy mdi-18px"></i>
                                            </div>
                                        </div>
                                        <div class="btn btn-icon btn-small d-block">
                                            <div class="icon" @click="deleteButton(i)">
                                                <i class="mdi mdi-close mdi-18px"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="mar-v-l1" v-if="i < buttonsArray.length - 1" />
                            </div>
                        </draggable>
                        <ui-button type="primary" @click="addButton">Добавить кнопку</ui-button>
                    </template>
                </ui-panel>
            </template>
        </ui-has-panel>

        <ui-has-panel v-if="!props.manualInput">
            <ui-checkbox prop="customEvent.enable">Отправлять событие</ui-checkbox>
            <template #panel>
                <ui-panel
                    :groups="[
                        { name: 'Статическое', slot: 'static' },
                        { name: 'Динамическое', slot: 'dynamic' }
                    ]">
                    <template #static>
                        <ui-container>
                            <ui-input prop="customEvent.onSelectName">Имя события при селекте</ui-input>
                            <ui-input prop="customEvent.onResetName">Имя события при сбросе</ui-input>
                            <ui-input :prop="`events.${Events.IS_EMPTY_FILTER}`" />
                        </ui-container>
                    </template>
                    <template #dynamic>
                        <ui-container>
                            <ui-switch prop="dynamicEvent.enable">Динамическое имя события</ui-switch>
                            <ui-select
                                prop="dynamicEvent.onSelectName"
                                :options="buildOptions(dimensionMetricNames, { empty: true })">
                                Имя события - значение поля
                            </ui-select>
                            <ui-input prop="dynamicEvent.onResetName">Имя события при сбросе</ui-input>
                            <ui-input :prop="`events.${Events.IS_EMPTY_FILTER}`" />
                        </ui-container>
                    </template>
                </ui-panel>
            </template>
        </ui-has-panel>

        <ui-has-panel>
            <ui-checkbox v-model="props.isSwitch" @change="propChanged('isSwitch')">Включить свитч</ui-checkbox>
            <template #panel>
                <ui-panel :groups="[{ name: 'Настройки свитча', slot: 'switch' }]">
                    <template #switch>
                        <ui-container>
                            <ui-input v-model="props.switchText" @change="propChanged('switchText')">
                                Плейсхолдер свитча
                            </ui-input>
                            <ui-select
                                v-model="props.switchMetric"
                                :options="metricOptions"
                                @change="propChanged('switchMetric')">
                                Выбор метрики
                            </ui-select>
                            <ui-switch v-model="props.isSwitchRounded" @change="propChanged('isSwitchRounded')">
                                Скругленный
                            </ui-switch>
                            <ui-input-units
                                v-model="props.switchBtnMarginRight"
                                :units="['px', 'rem', 'em']"
                                @change="propChanged('switchBtnMarginRight')">
                                Отступ кнопки справа
                            </ui-input-units>
                        </ui-container>
                    </template>
                </ui-panel>
            </template>
        </ui-has-panel>

        <ui-switch v-model="props.multiSelect" :disabled="props.radioButton" @change="propChanged('multiSelect')">
            Мультиселект
        </ui-switch>

        <ui-switch v-model="props.radioButton" :disabled="props.multiSelect" @change="propChanged('radioButton')">
            Режим радио
            <ui-tooltip>
                <template #target="{ events, binds }">
                    <i class="mdi mdi-help-circle-outline" v-on="events" v-bind="binds"></i>
                </template>
                <div>
                    <div>Блокирует возможность снимать выбор с активированной кнопки,</div>
                    <div>тем самым следующая выбранная кнопка отжимает предыдущую.</div>
                </div>
            </ui-tooltip>
        </ui-switch>

        <ui-switch v-model="props.isShowFirstBtn" @change="propChanged('isShowFirstBtn')">
            Первое значение списка
        </ui-switch>

        <ui-has-panel>
            <ui-switch v-model="props.resetButton.enable" @change="propChanged('resetButton')">
                Кнопка сброса
            </ui-switch>
            <template #panel>
                <ui-panel :groups="[{ name: 'Настройки кнопки сброса', slot: 'resetButton' }]">
                    <template #resetButton>
                        <ui-container>
                            <ui-checkbox
                                v-model="props.resetButton.styleAsInactive"
                                @change="propChanged('resetButton')">
                                Стиль как у неактивной кнопки
                            </ui-checkbox>
                            <ui-input
                                v-model="props.resetButton.text"
                                @change="propChanged('resetButton')">
                                Текст кнопки
                            </ui-input>
                            <ui-input-cp
                                v-model="props.resetButton.backgroundColor"
                                @change="propChanged('resetButton')">
                                Цвет кнопки
                            </ui-input-cp>
                            <ui-input-cp
                                v-model="props.resetButton.textColor"
                                @change="propChanged('resetButton')">
                                Цвет текста
                            </ui-input-cp>
                        </ui-container>
                    </template>
                </ui-panel>
            </template>
        </ui-has-panel>

        <ui-has-panel>
            <ui-label label-size="small">Ссылка</ui-label>
            <template #panel>
                <ui-panel :groups="[{ name: 'Настройки ссылки', slot: 'default' }]">
                    <ui-container>
                        <ui-select prop="routeQueryMetrics" multiple :options="dimensionMetricNames">
                            Переменные для передачи по ссылке
                        </ui-select>
                        <ui-select prop="metricUrl" :options="buildOptions(dimensionMetricNames, { empty: true })">
                            Ссылка для перехода
                        </ui-select>
                        <ui-switch prop="isUrlTargetBlank">Открытие в новой вкладке</ui-switch>
                        <ui-select
                            prop="routeQueryParamNames"
                            multiple
                            :disabled="Boolean(props.metricUrl)"
                            :options="dimensionMetricNames">
                            Запись в текущий url страницы
                            <template #hint>Не работает с "Ссылка для перехода".</template>
                        </ui-select>
                    </ui-container>
                </ui-panel>
            </template>
        </ui-has-panel>

        <ui-collapse>
            <template #header>Переменные</template>
            <ui-container>
                <div v-for="(variable, idx) in variablesList" :key="idx">
                    <div class="row row-collapse">
                        <div class="col">
                            <ui-input v-model="variable.name" @change="onVariableChange">
                                Имя переменной
                            </ui-input>
                        </div>
                        <div class="col col-auto col-vbot">
                            <ui-button
                                type="ghost"
                                inline
                                icon
                                :disabled="variablesList.length <= 1"
                                @click="deleteVariable(idx)">
                                <i class="mdi mdi-delete"></i>
                            </ui-button>
                        </div>
                    </div>
                </div>
                <ui-button @click="addVariable">Добавить</ui-button>
                <div class="form-label form-label-xsmall mar-top-3">
                    Значения переменных берутся из поля "Значение переменной" ручных кнопок
                </div>
            </ui-container>
        </ui-collapse>
    </ui-container>
</template>
<script>
import draggable from 'vuedraggable';
import { Tooltip as UiTooltip } from 'goodteditor-ui';
import { Panel } from '@goodt-wcore/panel';
import { usePanelDatasetMixin, PanelDatasetMixinTypes } from '@goodt-common/data';
import { cloneDeep } from 'lodash';
import { SizeUnits } from '@goodt-wcore/panels';
import { MarginClassesOptions, MetricPositionOptions, MetricAlignmentOptions, dragOptions } from './config';
// eslint-disable-next-line import/no-cycle
import { Events } from '../descriptor';

export default {
    extends: Panel,
    components: { draggable, UiTooltip },
    mixins: [usePanelDatasetMixin()],

    meta: { name: 'Настройки виджета', icon: 'cog-outline' },
    implicitCssModule: true,

    static: {
        Events,
        dragOptions,
        MetricPositionOptions,
        MetricAlignmentOptions,
        MarginClassesOptions,
        SizeUnits
    },
    computed: {
        dimensionMetricNames() {
            return [...this.metrics, ...this.dimensions].sort((a, b) => a.localeCompare(b));
        },
        iconValue: {
            get() {
                if (this.props.icon == null) {
                    return this.dimensions[0] ?? null;
                }
                return this.props.icon;
            },
            set(val) {
                this.props.icon = val;
                this.propChanged('icon');
            }
        },
        buttonsArray: {
            get() {
                return this.props.buttonsArray;
            },
            set(val) {
                this.props.buttonsArray = val;
                this.propChanged('buttonsArray');
            }
        },
        activeButtons: {
            get() {
                return this.props.activeButtons;
            },
            set(val) {
                this.props.activeButtons = val;
                this.propChanged('activeButtons');
            }
        },
        metricOptions() {
            const metrics = [...this.metrics].sort((a, b) => a.localeCompare(b));
            return this.buildOptions(metrics, { empty: true });
        },
        activeButtonsArr: {
            get() {
                return this.elementInstance.buttons.map((el) => el.button);
            }
        },
        horizontalMargin() {
            const { marginBetweenButtons, marginBetweenButtonsUnit } = this.props;
            return `${marginBetweenButtons}${marginBetweenButtonsUnit}`;
        },
        verticalMargin() {
            const { marginBetweenRows, marginBetweenRowsUnit } = this.props;
            return `${marginBetweenRows}${marginBetweenRowsUnit}`;
        },
        variablesList: {
            get() {
                return this.props.variablesList || [{ name: this.props.customVar || 'customVar' }];
            },
            set(val) {
                this.props.variablesList = val;
                // Also update customVar to be the first variable for backward compatibility
                if (val.length > 0) {
                    this.props.customVar = val[0].name;
                }
                this.propChanged(['variablesList', 'customVar']);
            }
        }
    },
    methods: {
        addButton() {
            this.buttonsArray.push({ title: '', eventName: '', url: '', icon: '', variableValue: '' });
            this.propChanged('buttonsArray');
        },
        duplicateButton(i) {
            const prev = this.buttonsArray.slice(0, i);
            const doppelganger = cloneDeep(this.buttonsArray[i]);
            const post = this.buttonsArray.slice(i);
            this.buttonsArray = [...prev, doppelganger, ...post];
            this.propChanged('buttonsArray');
        },
        deleteButton(i) {
            this.buttonsArray.splice(i, 1);
            this.propChanged('buttonsArray');
        },
        addActiveButton() {
            this.activeButtons.unshift({ title: '' });
            this.propChanged('activeButtons');
        },
        deleteActiveButton(i) {
            this.activeButtons.splice(i, 1);
            this.propChanged('activeButtons');
        },
        setHorizontalMargin(val, { unit, value }) {
            if (this.MarginClassesOptions.some((opt) => opt.value === val)) {
                this.props.marginBetweenButtons = val;
                this.props.marginBetweenButtonsUnit = '';
            } else {
                this.props.marginBetweenButtons = value;
                this.props.marginBetweenButtonsUnit = unit;
            }
            this.propChanged(['marginBetweenButtons', 'marginBetweenButtonsUnit']);
        },
        setVerticalMargin(val, { unit, value }) {
            if (this.MarginClassesOptions.some((opt) => opt.value === val)) {
                this.props.marginBetweenRows = val;
                this.props.marginBetweenRowsUnit = '';
            } else {
                this.props.marginBetweenRows = value;
                this.props.marginBetweenRowsUnit = unit;
            }
            this.propChanged(['marginBetweenRows', 'marginBetweenRowsUnit']);
        },
        addVariable() {
            const currentList = this.variablesList;
            currentList.push({ name: '' });
            this.variablesList = currentList;
        },
        deleteVariable(idx) {
            const currentList = this.variablesList;
            currentList.splice(idx, 1);
            this.variablesList = currentList;
        },
        onVariableChange() {
            // Trigger update by re-assigning the list
            this.variablesList = [...this.variablesList];
        },
        ...PanelDatasetMixinTypes
    }
};
</script>
<style module lang="pcss">
.textarea-panel {
    min-width: 17rem;
}
.textarea-header {
    composes: form-label text-truncate form-label-xsmall from global;
}
</style>
