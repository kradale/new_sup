<template>
    <div v-if="isStringFormat" class="metric" :class="metricClass" :style="metric.style">
        {{ metric.metricValue }}
    </div>

    <i v-else class="metric metric--icon" :class="metricClass" :style="metric.style" />
</template>

<script>
import { MetricFormat } from '../constants';

export default {
    name: 'Metric',
    props: {
        metric: {
            type: Object,
            required: true
        }
    },
    computed: {
        metricClass() {
            const alignClass = `metric--${this.metric.align}`;
            return this.isStringFormat ? alignClass : `${alignClass} ${this.metric.metricValue}`;
        },
        isStringFormat() {
            return this.metric.metricFormat === MetricFormat.STRING;
        }
    },
    implicitCssModule: true
};
</script>

<style module lang="pcss">
@b metric {
    @m icon {
        composes: mdi from global;
    }

    @m left {
        text-align: start;
    }

    @m center {
        text-align: center;
    }

    @m right {
        text-align: end;
    }
}
</style>
