<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'
  import { type UsePresenceProps, usePresence } from './use-presence.svelte'

  export interface PresenceBaseProps extends UsePresenceProps, PolymorphicProps<'div'> {}
  export interface PresenceProps extends HTMLProps<'div'>, PresenceBaseProps {}
</script>

<script lang="ts">
  import { mergeProps, reflect } from '@zag-js/svelte'
  import { splitPresenceProps } from './split-presence-props.svelte'

  let props: PresenceProps = $props()
  let ref: HTMLDivElement | null = $state(null)
  let called = $state(false)

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const presence = usePresence(reflect(() => presenceProps))
  const mergedProps = $derived(mergeProps(presence().getPresenceProps(), localProps))

  $effect(() => {
    if (!called && ref) {
      called = true
      presence().setNode(ref)
    }
  })
</script>

{#if !presence().unmounted}
  <div data-scope="presence" data-part="root" bind:this={ref} {...mergedProps}>
    {@render localProps.children?.()}
  </div>
{/if}
