export function isPeakHour(start){
    const hour = start.getHours()
    return hour >= 18 && hour < 21
}

export function isWeekend(date){
    const day = date.getDay()
    return day == 0 || day == 6
}