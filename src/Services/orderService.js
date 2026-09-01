const API = "http://localhost:3000/orders";


// ================== add an order ==============
export const addOrder = async (order)=>{
    const response = await fetch(API,{ method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify(order)})

    return await response.json()
}
