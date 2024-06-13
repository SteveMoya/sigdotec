export const getUser = async ()  => {
    try {
        const data = await fetch("https://rickandmortyapi.com/api/character")
        const response = await data.json()
        const result = response.results 
        return result
    } catch (error) {
        throw new Error(error)
    }
}
