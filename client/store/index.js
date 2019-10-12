export const state = () => ({
    currentNav: ''
})

export const mutations = {
    setCurrentNav(state, currentNav) {        
        state.currentNav = currentNav
    }
}