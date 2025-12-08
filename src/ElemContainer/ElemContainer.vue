<template>
    <div :class="cssClass" :style="cssStyle">
        <template v-if="props.collapsible && props.expandedByDefault">
            <div class="cf">
                <div
                    class="btn btn-ghost btn-icon btn-small pull-right"
                    @click="isCollapsed = !isCollapsed"
                >
                    <div class="icon">
                        <i
                            class="mdi"
                            :class="currentIcon"
                            :style="iconStyle"
                        ></i>
                    </div>
                </div>
                <slot name="header" data-slot="header">
                    <code v-if="isEditorMode">header slot</code>
                </slot>
            </div>
            <slot v-if="!isCollapsed">
                <code v-if="isEditorMode">default slot</code>
            </slot>
        </template>
        <slot v-else>
            <code v-if="isEditorMode">default slot</code>
        </slot>
    </div>
</template>
<script>
import { Elem } from 'goodt-wcore';

const descriptor = () => ({
    props: {
        collapsible: {
            type: Boolean,
            default: true
        },
        expandedByDefault: {
            type: Boolean,
            default: false
        },
        defaultExpandBehavior: {
            type: String,
            default: 'expanded'
        },
        expandIcon: {
            type: String,
            default: 'chevron-up'
        },
        collapseIcon: {
            type: String,
            default: 'chevron-down'
        },
        iconColor: {
            type: String,
            default: ''
        },
        iconSize: {
            type: Object,
            default: () => ({ size: 18, unit: 'px' })
        }
    },
    vars: {}
});

export default {
    extends: Elem,
    data() {
        return {
            isCollapsed: false,
            descriptor: descriptor()
        };
    },
    computed: {
        currentIcon() {
            const { expandIcon, collapseIcon } = this.props;
            const iconName = this.isCollapsed 
                ? (collapseIcon || 'chevron-down') 
                : (expandIcon || 'chevron-up');
            return `mdi-${iconName}`;
        },
        iconStyle() {
            const { iconColor, iconSize } = this.props;
            const defaultSize = 18;
            const iconSizeObj = iconSize || { size: defaultSize, unit: 'px' };
            const size = iconSizeObj.size > 0 ? iconSizeObj.size : defaultSize;
            
            return {
                ...(iconColor && { color: iconColor }),
                fontSize: `${size}${iconSizeObj.unit}`
            };
        }
    },
    watchEditor: {
        'props.expandedByDefault': {
            handler() {
                this.updateCollapsedState();
            },
            immediate: true
        },
        'props.defaultExpandBehavior': {
            handler() {
                this.updateCollapsedState();
            }
        }
    },
    methods: {
        updateCollapsedState() {
            this.isCollapsed = this.props.expandedByDefault 
                ? this.props.defaultExpandBehavior === 'collapsed' 
                : true;
        },
        isChildAllowed(type) {
            return type != 'ElemCol';
        },
        getSlotNames() {
            return ['default', 'header'];
        },
        getPanels() {
            return [import('./panels/OptionsPanel.vue')];
        }
    }
};
</script>
