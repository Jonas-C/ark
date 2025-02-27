import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './date-picker.types'

export interface UseDatePickerProps
  extends Optional<
    Omit<datePicker.Context, 'dir' | 'getRootNode' | 'parse' | 'open.controlled' | 'value'>,
    'id'
  > {
  /**
   * The v-model value of the date picker
   */
  modelValue?: datePicker.Context['value']
  /**
   * The initial open state of the date picker when it is first rendered.
   */
  defaultOpen?: datePicker.Context['open']
  /**
   * The initial value of the date picker when it is first rendered.
   */
  defaultValue?: datePicker.Context['value']
  /**
   * The initial view of the date picker when it is first rendered.
   */
  defaultView?: datePicker.Context['view']
}

export interface UseDatePickerReturn extends ComputedRef<datePicker.Api<PropTypes>> {}

export const useDatePicker = (
  props: UseDatePickerProps = {},
  emit?: EmitFn<RootEmits>,
): UseDatePickerReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<datePicker.Context>(() => {
    return {
      id,
      dir: locale.value.dir,
      open: props.open ?? props.defaultOpen,
      'open.controlled': props.open !== undefined,
      value: props.defaultValue ?? props.modelValue,
      view: props.defaultView ?? props.view,
      getRootNode: env?.value.getRootNode,
      onFocusChange: (details) => emit?.('focusChange', details),
      onViewChange: (details) => {
        emit?.('viewChange', details)
        emit?.('update:view', details.view)
      },
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
      },
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
      },
      ...cleanProps(props),
    }
  })

  const [state, send] = useMachine(datePicker.machine(context.value), {
    context,
  })

  return computed(() => datePicker.connect(state.value, send, normalizeProps))
}
