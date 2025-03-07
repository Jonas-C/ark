import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import type { UseDialogReturn } from './use-dialog'
import { DialogProvider } from './use-dialog-context'

interface RootProviderProps {
  value: UseDialogReturn
}

export interface DialogRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface DialogRootProviderProps extends DialogRootProviderBaseProps {
  children?: JSX.Element
}

export const DialogRootProvider = (props: DialogRootProviderProps) => {
  const [presenceProps, dialogProps] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)

  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: dialogProps.value().open })))

  return (
    <DialogProvider value={dialogProps.value}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={apiPresence}>{dialogProps.children}</PresenceProvider>
      </RenderStrategyProvider>
    </DialogProvider>
  )
}
