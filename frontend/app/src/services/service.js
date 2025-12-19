import axios from "axios"
const baseUrl = "http://localhost:5000"

export const getAvailableSlots = async (date) => {

    try {

    const result = await axios.get(`${baseUrl}/availability?date=${date}`)
    console.log(result.data)
    return result.data
    }
    catch(Excepetion){
        console.log("Error occured: ",Excepetion)

    }
}

export const bookSlot = async (obj) => {

    try {
        const result = await axios.post(`${baseUrl}/booking`,obj)
        const data = await result.data
        console.log(result)
        return data
    } catch (error) {
        console.log("Error occured: ",error)

    }
}