import type { SetActions } from "../../../types/filters";
import type { MapActions } from "../../../types/product";

export const SetToMapAction: Record<SetActions, MapActions> = {
    add: 'set',
    delete: 'delete',
};