import { sagaActionTypes } from "store/sagaActionTypes";
import { AnyAction } from "redux";
import { conwaySettingsSlice } from "smart/ControlsForm/slice";
import { reinit } from "smart/ConwayLife/saga";
import { put, takeEvery } from "redux-saga/effects";

export const changeSetting = (field: string, value: number) => {
    return {
        type: sagaActionTypes.CHANGE_SETTING,
        payload: {
            field,
            value,
        },
    };
};

export function* workerSagaChangeSetting({
    payload: { field, value },
}: AnyAction) {
    if (value < 0) {
        return;
    }
    yield put(
        conwaySettingsSlice.actions.changeSetting({
            field,
            value,
        })
    );
    const fieldsToUpdate = ["fieldHeight", "fieldWidth", "alivePercent"];
    if (fieldsToUpdate.includes(field)) {
        yield put(reinit());
    }
}

export function* watchSagaChangeSetting() {
    yield takeEvery(sagaActionTypes.CHANGE_SETTING, workerSagaChangeSetting);
}
