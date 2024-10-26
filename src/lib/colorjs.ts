import { ColorSpace, OKLCH } from 'colorjs.io/fn'

let needToRegisterColorSpaces = true

export function registerColorSpaces() {
    if (needToRegisterColorSpaces) {
        ColorSpace.register(OKLCH)
        
        needToRegisterColorSpaces = false
    }
}
