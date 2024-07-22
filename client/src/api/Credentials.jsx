

export const fetchCredentials = () => {
    try {
        const credentialsString = sessionStorage.getItem('credentials')
        // if (!credentialsString) {
        //     return null
        // }
        const data = JSON.parse(credentialsString)
        return data
    } catch (error) {
        console.error('Error fetching credentials:', error)
        return null
    }
}