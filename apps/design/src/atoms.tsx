import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const smallAtom = atomWithStorage('small', false);
export const disabledAtom = atomWithStorage('disabled', false);
