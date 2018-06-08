/**
 * Created by f.putra on 08/06/18.
 */
import _ from 'lodash'
import mutations from './../mutation/credentialsMutation'
const state = {
    id: 0,
    data: [],
    meta: {}
}

const actions = {
    asersiList: ({ commit }, payload) => commit('ASERSI_LIST', payload),
    asersiCreate: ({ commit }, payload) => commit('ASERSI_CREATE', payload),
    asersiUpdate: ({ commit }, payload) => commit('ASERSI_UPDATE', payload),
    asersiDelete: ({ commit }, id) => commit('ASERSI_DELETE', id),
    asersiReset: ({ commit }) => commit('ASERSI_RESET')
}

export default {
    state,
    mutations,
    actions
}
