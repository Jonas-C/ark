import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useFloatingPanelContext } from './use-floating-panel-context'

export interface FloatingPanelTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface FloatingPanelTriggerProps extends HTMLProps<'button'>, FloatingPanelTriggerBaseProps {}

export const FloatingPanelTrigger = (props: FloatingPanelTriggerProps) => {
  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(() => {
    const triggerProps = floatingPanel().getTriggerProps()
    return {
      ...triggerProps,
      'aria-controls': presence().unmounted ? undefined : triggerProps['aria-controls'],
    }
  }, props)

  return <ark.button {...mergedProps} />
}
