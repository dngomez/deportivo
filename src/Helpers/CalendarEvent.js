export const CalendarEvent = {
  async getAll(user) {
    try {
      const res = await fetch("/api/event/all", {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
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

  async update(user, eventId, changes) {
    try {
      const res = await fetch(`/api/event/update?_id=${eventId}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
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

  async delete(user, eventId) {
    try {
      const res = await fetch(`/api/event/delete?_id=${eventId}`, {
        method: "DELETE",
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
  }
}