import { put, takeEvery, all, fork, delay, select } from 'redux-saga/effects';

import { getItemsRoutine, addItemRoutine, updateItemRoutine, deleteItemRoutine } from './routines';
import { TriggerAddItem, TriggerDeleteItem, TriggerGetItems, TriggerUpdateItem } from './types';
import { getItems, addItem, updateItem, deleteItem } from './storage';
import { infoToast, successToast, errorToast } from './toasts';

function* requestGetItems(action: TriggerGetItems) {
    try {
        const result = getItems(action.payload)
        yield delay(1000);
        yield put(getItemsRoutine.success(result));
    } catch(e) {
        yield put(getItemsRoutine.failure(e.message));
    } finally {
        yield put(getItemsRoutine.fulfill());
    }
}

function* requestAddItem(action: TriggerAddItem) {
    const toastId = `addItem-${action.payload.id}`
    try {
        infoToast(toastId, 'Add in progress...')
        yield delay(1000);
        const result = addItem(action.payload, 1)
        yield put(addItemRoutine.success(result));
        successToast(toastId, `${action.payload.title} added successfully.`)
    } catch(e) {
        errorToast(toastId, e.message)
    }
}

function* requestUpdateItem(action: TriggerUpdateItem) {
    const toastId = `updateItem-${action.payload.id}`
    try {
        infoToast(toastId, 'Update in progress...')
        const state = yield select()
        yield delay(1000);
        const result = updateItem(action.payload, state.page)
        yield put(updateItemRoutine.success(result));
        successToast(toastId, `${action.payload.title} updated successfully.`)
    } catch(e) {
        errorToast(toastId, e.message)
    }
}

function* requestDeleteItem(action: TriggerDeleteItem) {
    const toastId = `deleteItem-${action.payload.id}`
    try {
        infoToast(toastId, 'Delete in progress...')
        const state = yield select()
        yield delay(1000);
        const result = deleteItem(action.payload, 
            (state.items.length === 1 && state.page === state.totalPages) ? 
            state.page - 1 : state.page)
        yield put(deleteItemRoutine.success(result));
        successToast(toastId, `${action.payload.title} deleted successfully.`)
    } catch(e) {
        errorToast(toastId, e.message)
    }
}

function* watchGetItems() {
    yield takeEvery(getItemsRoutine.TRIGGER, requestGetItems);
}

function* watchAddItem() {
    yield takeEvery(addItemRoutine.TRIGGER, requestAddItem);
}

function* watchUpdateItem() {
    yield takeEvery(updateItemRoutine.TRIGGER, requestUpdateItem);
}

function* watchDeleteItem() {
    yield takeEvery(deleteItemRoutine.TRIGGER, requestDeleteItem);
}

const rootSaga = function* root() {
    yield all([
        fork(watchGetItems),
        fork(watchAddItem),
        fork(watchUpdateItem),
        fork(watchDeleteItem)
    ])
}

export default rootSaga;