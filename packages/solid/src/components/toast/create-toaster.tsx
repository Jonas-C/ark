import * as toast from '@zag-js/toast'
import type { JSX } from 'solid-js'

export interface CreateToasterProps extends Partial<toast.StoreProps> {
  placement: toast.Placement
}

export interface CreateToasterReturn extends toast.Store<JSX.Element> {}

export const createToaster = (props: CreateToasterProps): CreateToasterReturn => {
  return toast.createStore(props)
}
