export const convertDateToString = (obj) => {
    const string = `${obj.getDate()}.${obj.getMonth() + 1}.${obj.getFullYear()} ${obj.getHours() < 10 ? `0${obj.getHours()}` : obj.getHours()}:${obj.getMinutes() < 10 ? `0${obj.getMinutes()}` : obj.getMinutes()}`
    return string;
}

export const getMonthString = (number) => {
    if (number === 0) {
        return "Januar"
    }
}
