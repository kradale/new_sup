<template>
    <w-panel>
        <ui-container>
            <ui-checkbox prop="expandedByDefault" @change="handleExpandedChange">
                {{ checkboxLabel }}
            </ui-checkbox>

            <template v-if="props.expandedByDefault">
                <ui-select
                    prop="defaultExpandBehavior"
                    :options="static.expandBehaviorOptions"
                    @change="handleBehaviorChange">
                    Поведение по умолчанию
                </ui-select>

                <ui-has-panel>
                    <div class="form-label form-label-small">
                        Иконка
                    </div>
                    <template #panel>
                        <ui-panel :groups="[{ name: 'Настройки иконки', slot: 'icon' }]">
                            <template #icon>
                                <ui-container>
                                    <ui-input prop="expandIcon" placeholder="chevron-up">
                                        Иконка раскрытия
                                    </ui-input>
                                    <ui-input prop="collapseIcon" placeholder="chevron-down">
                                        Иконка закрытия
                                    </ui-input>
                                    <ui-input-cp prop="iconColor">
                                        Цвет иконки
                                    </ui-input-cp>
                                    <ui-input-units
                                        col-size="6-12"
                                        min="8"
                                        max="64"
                                        :units="static.iconSizeUnits"
                                        v-model="iconSizeString"
                                        @change="saveIconSize">
                                        Размер иконки
                                    </ui-input-units>
                                </ui-container>
                            </template>
                        </ui-panel>
                    </template>
                </ui-has-panel>
            </template>
        </ui-container>
    </w-panel>
</template>
<script>
import { Panel } from 'goodt-wcore';

const expandBehaviorOptions = [
    { value: 'expanded', label: 'Раскрыт' },
    { value: 'collapsed', label: 'Свернут' }
];

const iconSizeUnits = ['px', 'rem', 'em'];

export default {
    extends: Panel,
    data() {
        return {
            $meta: { name: 'Настройки виджета', icon: 'widgets' }
        };
    },
    static: {
        expandBehaviorOptions,
        iconSizeUnits
    },
    computed: {
        checkboxLabel() {
            return this.props.expandedByDefault 
                ? 'Развернуть контейнер' 
                : 'Свернуть контейнер';
        },
        iconSizeString: {
            get() {
                const defaultSize = 18;
                const iconSize = this.props.iconSize || { size: defaultSize, unit: 'px' };
                return `${iconSize.size}${iconSize.unit}`;
            },
            set(val) {
                if (typeof val === 'string') {
                    const match = val.match(/^(\d+(?:\.\d+)?)(px|rem|em)$/);
                    if (match != null) {
                        this.props.iconSize = { size: parseFloat(match[1]), unit: match[2] };
                    }
                } else if (val != null && typeof val === 'object') {
                    this.props.iconSize = val;
                }
            }
        }
    },
    methods: {
        handleExpandedChange() {
            this.propChanged('expandedByDefault');
        },
        handleBehaviorChange() {
            this.propChanged('defaultExpandBehavior');
        },
        saveIconSize() {
            this.propChanged('iconSize');
        }
    }
};
</script>
