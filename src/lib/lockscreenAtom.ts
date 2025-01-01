import { atomWithStorage } from 'jotai/utils'
export const lockscreenAtom = atomWithStorage<boolean>('unlocked', false);
