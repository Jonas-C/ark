import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableEditTriggerBaseProps extends PolymorphicProps {}
export interface EditableEditTriggerProps extends HTMLProps<'button'>, EditableEditTriggerBaseProps {}

export const EditableEditTrigger = forwardRef<HTMLButtonElement, EditableEditTriggerProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getEditTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

EditableEditTrigger.displayName = 'EditableEditTrigger'
