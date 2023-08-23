export const SportHandler = {
  async getAll() {
    try {
      const res = await fetch("http://back:5000/sport/all", {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      return await res.json()
    } catch (error) {
      return error
    }
  },
}