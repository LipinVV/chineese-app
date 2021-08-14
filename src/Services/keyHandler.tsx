export const keyHandler = (value: number) => {
    return Math.ceil(Math.trunc(Math.random() * (value / 26071989) * Date.now())).toString()
}