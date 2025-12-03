<template>
  <w-panel>
    <ui-container direction="column" gap="sm">
      <ui-checkbox
        v-model="props.expandedByDefault"
        @change="onExpandedToggle"
      >
        Развернуть контейнер
      </ui-checkbox>

      <ui-select
        v-model="props.defaultExpandBehavior"
        :options="static.expandBehaviorOptions"
        label="Состояние по умолчанию"
        @change="onBehaviorChange"
      />

      <ui-input
        v-model="props.expandIcon"
        label="Иконка раскрытия"
        placeholder="chevron-up"
        @input="onExpandIconChange"
      />

      <ui-input
        v-model="props.collapseIcon"
        label="Иконка сворачивания"
        placeholder="chevron-down"
        @input="onCollapseIconChange"
      />

      <ui-select
        v-model="props.iconAnimation"
        :options="static.iconAnimationOptions"
        label="Анимация иконки"
        @change="onIconAnimationChange"
      />

      <ui-input
        v-model="props.iconColor"
        label="Цвет иконки"
        placeholder="var(--primary-color)"
        @input="onIconColorChange"
      />
    </ui-container>
  </w-panel>
</template>

<script>
import Panel from '@goodt-widgets-core/panel';

const expandBehaviorOptions = [
  { value: 'expanded', label: 'Развернут' },
  { value: 'collapsed', label: 'Свернут' }
];

const iconAnimationOptions = [
  { value: 'none', label: 'Без анимации' },
  { value: 'rotate', label: 'Поворот' },
  { value: 'flip', label: 'Переворот' },
  { value: 'pulse', label: 'Пульс' }
];

export default {
  name: 'ElemContainerOptionsPanel',
  extends: Panel,
  static: {
    expandBehaviorOptions,
    iconAnimationOptions
  },
  methods: {
    onExpandedToggle() {
      this.propChanged('expandedByDefault');
    },
    onBehaviorChange() {
      this.propChanged('defaultExpandBehavior');
    },
    onExpandIconChange() {
      this.propChanged('expandIcon');
    },
    onCollapseIconChange() {
      this.propChanged('collapseIcon');
    },
    onIconAnimationChange() {
      this.propChanged('iconAnimation');
    },
    onIconColorChange() {
      this.propChanged('iconColor');
    }
  }
};
</script>
