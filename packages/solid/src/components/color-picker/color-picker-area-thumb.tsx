import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaThumbBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerAreaThumbProps extends HTMLProps<'div'>, ColorPickerAreaThumbBaseProps {}

export const ColorPickerAreaThumb = (props: ColorPickerAreaThumbProps) => {
  const api = useColorPickerContext()
  const areaProps = useColorPickerAreaPropsContext()
  const mergedProps = mergeProps(() => api().getAreaThumbProps(areaProps), props)

  return <ark.div {...mergedProps} />
}
