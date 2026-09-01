const API = "http://localhost:3000/menu";


// =========  get all menu items ===========
export const getMenu = async ()=>{
    const response = await fetch(API)
    return response.json()
}
