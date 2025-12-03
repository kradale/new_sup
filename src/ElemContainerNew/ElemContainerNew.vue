<template>
  <div class="elem-container">
    <!-- Режим "разворачиваемый контейнер" -->
    <template v-if="props.collapsible && props.expandedByDefault">
      <div class="elem-container__header" @click="toggleCollapse">
        <slot name="header">
          <span class="elem-container__title">{{ props.title }}</span>
        </slot>

        <i
          class="elem-container__icon"
          :class="iconClasses"
          :style="iconStyle"
        />
      </div>

      <transition name="elem-container-body-fade">
        <div
          v-if="!isCollapsed"
          class="elem-container__body"
        >
          <slot />
        </div>
      </transition>
    </template>

    <!-- Обычный контейнер без заголовка / сворачивания -->
    <slot v-else />
  </div>
</template>

<script>
// если у тебя есть общий миксин для виджетов — сюда его
// import Widget from '@goodt-widgets-core/widget';

export default {
  name: 'ElemContainer',
  // mixins: [Widget],
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    iconName() {
      const key = this.isCollapsed ? 'collapseIcon' : 'expandIcon';
      const raw = this.props[key] || '';
      return raw ? `mdi-${raw}` : '';
    },
    iconClasses() {
      const classes = {};

      if (this.iconName) {
        classes[this.iconName] = true;
      }

      // ориентация иконки в зависимости от состояния
      if (this.props.iconAnimation === 'rotate' && this.isCollapsed) {
        classes['elem-container__icon--collapsed'] = true;
      }

      const anim = this.props.iconAnimation || 'none';
      if (anim === 'flip') {
        classes['elem-container__icon--flip'] = true;
      } else if (anim === 'pulse') {
        classes['elem-container__icon--pulse'] = true;
      }

      return classes;
    },
    iconStyle() {
      return this.props.iconColor ? { color: this.props.iconColor } : {};
    }
  },
  watch: {
    'props.expandedByDefault': {
      immediate: true,
      handler() {
        this.applyDefaultExpandState();
      }
    },
    'props.defaultExpandBehavior': {
      handler() {
        this.applyDefaultExpandState();
      }
    }
  },
  methods: {
    applyDefaultExpandState() {
      // если режим "разворачиваемый контейнер" выключен —
      // просто не трогаем состояние
      if (!this.props.collapsible || !this.props.expandedByDefault) {
        this.isCollapsed = false;
        return;
      }

      const behavior = this.props.defaultExpandBehavior || 'expanded';
      this.isCollapsed = behavior === 'collapsed';
    },
    toggleCollapse() {
      if (!this.props.collapsible || !this.props.expandedByDefault) return;
      this.isCollapsed = !this.isCollapsed;
    }
  },

  // ↓ здесь максимально "AI-friendly" описание для Playbook и widget.mdc
  descriptor() {
    return {
      name: 'ElemContainer',
      icon: 'view-agenda-outline',
      group: 'layout',
      props: {
        collapsible: {
          type: 'boolean',
          default: true,
          label: 'Контейнер разворачиваемый',
          description:
            'Включает режим заголовка с возможностью свернуть основное содержимое.'
        },
        expandedByDefault: {
          type: 'boolean',
          default: false,
          label: 'Развернуть контейнер',
          description:
            'Если включено, используется режим "разворачиваемый контейнер".'
        },
        defaultExpandBehavior: {
          type: 'string',
          default: 'expanded',
          enum: ['expanded', 'collapsed'],
          label: 'Состояние по умолчанию',
          description:
            'В каком состоянии будет контейнер при загрузке: раскрыт или свернут.'
        },
        expandIcon: {
          type: 'string',
          default: 'chevron-up',
          label: 'Иконка раскрытия',
          description:
            'Имя иконки без префикса mdi-. Например: chevron-up.'
        },
        collapseIcon: {
          type: 'string',
          default: 'chevron-down',
          label: 'Иконка сворачивания',
          description:
            'Имя иконки без префикса mdi-. Например: chevron-down.'
        },
        iconAnimation: {
          type: 'string',
          default: 'none',
          enum: ['none', 'rotate', 'flip', 'pulse'],
          label: 'Анимация иконки',
          description:
            'Тип анимации при смене состояния: без анимации, поворот, переворот или пульсация.'
        },
        iconColor: {
          type: 'string',
          default: '',
          label: 'Цвет иконки',
          description:
            'CSS-цвет (hex, rgb, var(--...)). Оставьте пустым для дефолтного цвета.'
        },
        title: {
          type: 'string',
          default: '',
          label: 'Заголовок',
          description:
            'Текст заголовка по умолчанию, используется если слот header не задан.'
        }
      },
      slots: [
        {
          name: 'default',
          required: false,
          description:
            'Основное содержимое контейнера. Полностью скрывается в свернутом состоянии.'
        },
        {
          name: 'header',
          required: false,
          description:
            'Кастомный контент заголовка. Если не задан, используется prop title.'
        }
      ]
    };
  }
};
</script>

<style scoped>
.elem-container {
  display: flex;
  flex-direction: column;
}

.elem-container__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.elem-container__title {
  font-weight: 500;
}

.elem-container__icon {
  font-size: 18px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

/* rotate-режим: состояние "свернут" */
.elem-container__icon--collapsed {
  transform: rotate(180deg);
}

/* flip-режим */
.elem-container__icon--flip {
  transform: scaleY(-1);
}

/* pulse-режим */
.elem-container__icon--pulse {
  animation: elem-container-icon-pulse 0.3s ease;
}

@keyframes elem-container-icon-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.elem-container-body-fade-enter-active,
.elem-container-body-fade-leave-active {
  transition: opacity 0.16s ease;
}
.elem-container-body-fade-enter-from,
.elem-container-body-fade-leave-to {
  opacity: 0;
}
</style>
