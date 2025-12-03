<template>
    <w-panel>
        <ui-container>
            <draggable
                v-if="props.metrics.length > 0"
                v-bind="dragOptions"
                v-model="props.metrics"
                @change="propChanged('metrics')">
                <ui-collapse class="p" v-for="(_, idx) in props.metrics" :key="idx">
                    <template #header>
                        <div class="d-flex flex-v-center flex-h-space-between">
                            <div>
                                <i class="mdi mdi-drag drag-handle mr-3"></i>
                                {{ 'Метрика ' + (idx + 1) }}
                            </div>
                            <i class="mdi mdi-delete mdi-14px color-red mr-3" @click.stop="deleteMetric(idx)" />
                        </div>
                    </template>
                    <ui-container>
                        <ui-select :prop="`metrics[${idx}].metric`" :options="metrics" />
                        <ui-select :prop="`metrics[${idx}].metricFormat`" :options="MetricFormatOptions" />
                        <ui-select :prop="`metrics[${idx}].position`" :options="MetricPositionOptions" />
                        <ui-select :prop="`metrics[${idx}].align`" :options="MetricAlignmentOptions" />
                        <ui-textarea :prop="`metrics[${idx}].style`">{{ '' }}</ui-textarea>
                    </ui-container>
                </ui-collapse>
            </draggable>
            <ui-button @click="addMetric">Добавить метрику</ui-button>
        </ui-container>
    </w-panel>
</template>

<script>
import draggable from 'vuedraggable';
import { Panel } from '@goodt-wcore/panel';
import { usePanelDatasetMixin, PanelDatasetMixinTypes } from '@goodt-common/data';
import { SizeUnits } from '@goodt-wcore/panels';
import {
    MarginClassesOptions,
    MetricAlignmentOptions,
    MetricFormatOptions,
    dragOptions,
    MetricPositionOptions
} from './config';

export default {
    extends: Panel,
    components: { draggable },
    mixins: [usePanelDatasetMixin()],

    meta: { name: 'Метрики', icon: 'gauge' },
    implicitCssModule: true,

    static: {
        MarginClassesOptions,
        MetricAlignmentOptions,
        MetricFormatOptions,
        dragOptions,
        MetricPositionOptions,
        SizeUnits
    },
    methods: {
        addMetric() {
            const { metrics } = this.descriptor.props;
            this.props.metrics.push(metrics.factory());
            this.propChanged('metrics');
        },
        deleteMetric(index) {
            this.props.metrics.splice(index, 1);
            this.propChanged('metrics');
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
