import { MapActions, SetActions } from '../../../types/enums';

export const SetToMapAction: Record<SetActions, MapActions> = {
    [SetActions.ADD]: MapActions.SET,
    [SetActions.DELETE]: MapActions.DELETE,
};