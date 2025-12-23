import { all, fork, put, select, takeEvery } from 'redux-saga/effects'
import { STORAGE_LOAD } from 'decentraland-dapps/dist/modules/storage/actions'
import { fetchTranslationsRequest } from 'decentraland-dapps/dist/modules/translation/actions'
import { createTranslationSaga } from 'decentraland-dapps/dist/modules/translation/sagas'
import { getLocale } from 'decentraland-dapps/dist/modules/translation/selectors'
import { getPreferredLocale } from 'decentraland-dapps/dist/modules/translation/utils'
import * as translations from './locales'

const baseTranslationSaga = createTranslationSaga({
  translations
})

const locales = Object.keys(translations)

function* handleStorageLoad() {
  const localeInState: string | undefined = yield select(getLocale)
  const locale = localeInState || getPreferredLocale(locales) || locales[0]
  yield put(fetchTranslationsRequest(locale))
}

export function* translationSaga() {
  yield all([fork(baseTranslationSaga), takeEvery(STORAGE_LOAD, handleStorageLoad)])
}
