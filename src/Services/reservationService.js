const API = "http://localhost:3000/reservations";


// ================== add a reservation ==============
export const addReservation = async (reservation)=>{
    const response = await fetch(API,{method:"POST",headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(reservation)})

    return await response.json()
}
