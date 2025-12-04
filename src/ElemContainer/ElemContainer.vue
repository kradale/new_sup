<template>
    <div :class="cssClass" :style="cssStyle">
        <template v-if="props.collapsible">
            <div class="cf">
                <div
                    class="btn btn-ghost btn-icon btn-small pull-right"
                    @click="isCollapsed = !isCollapsed"
                >
                    <div class="icon">
                        <i
                            class="mdi"
                            :class="{
                                'mdi-chevron-up': !isCollapsed,
                                'mdi-chevron-down': isCollapsed
                            }"
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
            default: false
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
    methods: {
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
