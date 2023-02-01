export const CalendarEvent = {
  async getAll(user) {
    try {
      const res = await fetch("/api/event/all", {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const data = await res.json()
      return data.results
    } catch (error) {
      console.log(error)
    }
  },

  async create(user, event) {
    try {
      const res = await fetch("/api/event/create", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  },

  async delete() {
    try {
      const res = await fetch("/api/event/delete", {
        method: "DELETE",
        body: JSON.stringify({ _id: null }),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const data = await res.json()
    } catch (error) {
      console.log(error)
    }
  }
}