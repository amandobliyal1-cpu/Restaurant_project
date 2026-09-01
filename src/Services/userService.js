const API = "http://localhost:3000/users";


// =========== create a new user (signup) ===========
export const addUser = async (userData) => {
    const response = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData) })

    return await response.json()
}


// =========== find a user by email (used for login + duplicate email check) ===========
export const getUserByEmail = async (email) => {
    const response = await fetch(`${API}?email=${encodeURIComponent(email)}`)
    const users = await response.json()
    return users[0] || null
}


// =========== update a user (used to add/edit delivery address) ===========
export const updateUser = async (id, partialData) => {
    const response = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partialData),
    })

    return await response.json()
}
