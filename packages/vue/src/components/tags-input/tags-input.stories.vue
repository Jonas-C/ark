<script setup lang="ts">
import Basic from './examples/basic.vue'
import BlurBehavior from './examples/blur-behavior.vue'
import Controlled from './examples/controlled.vue'
import DisabledEditing from './examples/disabled-editing.vue'
import InitialValue from './examples/initial-value.vue'
import MaxWithOverflow from './examples/max-with-overflow.vue'
import OnEvent from './examples/on-event.vue'
import PasteBehavior from './examples/paste-behavior.vue'
import RootProvider from './examples/root-provider.vue'
import Validated from './examples/validated.vue'
import WithField from './examples/with-field.vue'
</script>
<template>
  <Story title="TagsInput">
    <Variant title="Basic">
      <Basic />
    </Variant>
    <Variant title="Controlled">
      <Controlled />
    </Variant>
    <Variant title="InitialValue">
      <InitialValue />
    </Variant>
    <Variant title="MaxWithOverflow">
      <MaxWithOverflow />
    </Variant>
    <Variant title="Validated">
      <Validated />
    </Variant>
    <Variant title="BlurBehavior">
      <BlurBehavior />
    </Variant>
    <Variant title="PasteBehavior">
      <PasteBehavior />
    </Variant>
    <Variant title="DisabledEditing">
      <DisabledEditing />
    </Variant>
    <Variant title="OnEvent">
      <OnEvent />
    </Variant>
    <Variant title="With Field">
      <WithField />
    </Variant>
    <Variant title="RootProvider">
      <RootProvider />
    </Variant>
  </Story>
</template>
