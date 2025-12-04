<template>
    <div>
        <div class="p">
            <label class="checkbox checkbox-small">
                <input
                    id="elem-row-panel-collapse"
                    type="checkbox"
                    v-model="props.collapsible"
                    @change="propChanged"
                /><i></i>
            </label>
            <label class="v-mid pad-left-3" for="elem-row-panel-collapse">Развернуть контейнер</label>
        </div>
    </div>
</template>
<script>
import { Panel } from 'goodt-wcore';

export default {
    extends: Panel,
    data() {
        return {
            $meta: { name: 'Настройки виджета', icon: 'widgets' }
        };
    }
};
</script>
