import { mergeProps } from '@zag-js/react'
import type { ActionTriggerProps } from '@zag-js/timer'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimerContext } from './use-timer-context'

export interface TimerActionTriggerBaseProps extends ActionTriggerProps, PolymorphicProps {}
export interface TimerActionTriggerProps extends HTMLProps<'button'>, TimerActionTriggerBaseProps {}

export const TimerActionTrigger = forwardRef<HTMLButtonElement, TimerActionTriggerProps>((props, ref) => {
  const [actionTriggerProps, localProps] = createSplitProps<ActionTriggerProps>()(props, ['action'])
  const timer = useTimerContext()
  const mergedProps = mergeProps(timer.getActionTriggerProps(actionTriggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

TimerActionTrigger.displayName = 'TimerActionTrigger'
