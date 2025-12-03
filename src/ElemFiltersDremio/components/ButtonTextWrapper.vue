<template>
    <span class="inline-flex flex-col">
        <w-metric v-for="(metric, index) in topMetrics" v-bind="{ metric }" :key="Position.TOP + index" />
        <span class="inline-flex gap-2">
            <w-metric v-for="(metric, index) in leftMetrics" v-bind="{ metric }" :key="Position.LEFT + index" />
            <slot name="default"></slot>
            <w-metric v-for="(metric, index) in rightMetrics" v-bind="{ metric }" :key="Position.RIGHT + index" />
        </span>
        <w-metric v-for="(metric, index) in bottomMetrics" v-bind="{ metric }" :key="Position.BOTTOM + index" />
    </span>
</template>

<script>
import WMetric from './Metric.vue';
import { Position } from '../constants';

export default {
    name: 'ButtonTextWrapper',
    components: { WMetric },
    props: {
        metrics: {
            type: Array,
            default: () => []
        }
    },
    static: {
        Position
    },
    computed: {
        filteredMetrics() {
            return this.metrics.filter(({ metricValue }) => metricValue != null && metricValue !== '');
        },
        topMetrics() {
            return this.filteredMetrics.filter(({ position }) => position === Position.TOP);
        },
        rightMetrics() {
            return this.filteredMetrics.filter(({ position }) => position === Position.RIGHT);
        },
        bottomMetrics() {
            return this.filteredMetrics.filter(({ position }) => position === Position.BOTTOM);
        },
        leftMetrics() {
            return this.filteredMetrics.filter(({ position }) => position === Position.LEFT);
        }
    }
};
</script>
