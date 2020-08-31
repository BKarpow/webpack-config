function createAnalytics(){
    let counted = 0
    let isDestroy = false

    const clicker = () => counted++

    document.addEventListener('click', clicker)

    return {
        destroy(){
            document.removeEventListener('click', clicker)
            isDestroy = true
        },
        getClicks(){
            if (isDestroy){
                return "Analytics destroy!"
            }else{
                return counted
            }
        }
    }
}

window.analytics = createAnalytics()