import _ from "lodash";

/**
 * Created by f.putra on 08/06/18.
 */
const mutations = {
    ASERSI_LIST: (state, payload) => {
        if (payload.content) {
            state.data = payload.content
        }
    },
    ASERSI_CREATE: (state, payload) => {
        state.id++
        state.data.push(Object.assign({ id: state.id }, payload))
    },
    ASERSI_UPDATE: (state, payload) => {
        const data = state.data.filter(i => i.id !== payload.id)

        state.data = data

        state.data.push(payload)

        state.data = _.sortBy(state.data, i => i.id)
    },
    ASERSI_DELETE: (state, id) => {
        const data = state.data.filter(i => i.id !== id)
        state.data = data
    },
    ASERSI_RESET: state => Object.assign(state, { data: [] })
}

export default