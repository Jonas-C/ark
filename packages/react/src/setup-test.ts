import '@testing-library/jest-dom/vitest'
import type { AnatomyInstance } from '@zag-js/anatomy'
import { JSDOM } from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'
import 'vitest-axe/extend-expect'

const { window } = new JSDOM()
/**
 * IntersectionObserver
 */
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
// biome-ignore lint/complexity/useLiteralKeys: <explanation>
window['IntersectionObserver'] = IntersectionObserverMock

vi.stubGlobal('ResizeObserver', ResizeObserver)
// biome-ignore lint/complexity/useLiteralKeys: <explanation>
window['ResizeObserver'] = ResizeObserver

window.Element.prototype.scrollTo = () => {}
window.Element.prototype.scrollIntoView = () => {}
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60)
window.URL.createObjectURL = () => 'https://i.pravatar.cc/300'
window.URL.revokeObjectURL = () => {}

Object.defineProperty(window, 'navigator', {
  value: {
    clipboard: {
      writeText: vi.fn(),
    },
  },
})

// stub Array.prototype.toSorted (used in zag.js collection)
Array.prototype.toSorted = function () {
  return [...this].sort()
}

Object.assign(global, { window, document: window.document })

export const getParts = (anatomy: AnatomyInstance<string>) => {
  return Object.values(anatomy.build()).map(
    (x) => `[data-scope="${x.attrs['data-scope']}"][data-part="${x.attrs['data-part']}"]`,
  )
}

export const getExports = <T extends string>(anatomy: AnatomyInstance<T>) => {
  return anatomy.keys().map((x) => (x.charAt(0).toUpperCase() + x.slice(1)) as Capitalize<T>)
}
