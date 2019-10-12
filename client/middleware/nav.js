export default function ({ route, store }) {
    console.log('nav:middleware',route.name);
    store.commit('setCurrentNav',route.name)
    
}