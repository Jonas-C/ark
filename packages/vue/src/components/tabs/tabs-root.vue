<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './tabs.types'

export interface TabsRootBaseProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface TabsRootProps
  extends TabsRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface TabsRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider, useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTabs } from './use-tabs'
import { TabsProvider } from './use-tabs-context'

const props = withDefaults(defineProps<TabsRootProps>(), {
  composite: undefined,
  deselectable: undefined,
  loopFocus: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<TabsRootEmits>()

const tabs = useTabs(props, emits)

TabsProvider(tabs)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tabs.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
