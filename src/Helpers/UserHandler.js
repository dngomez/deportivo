export const UserHandler = {
  async getAll(user) {
    try {
      const res = await fetch("http://back:5000/user/all", {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      return await res.json()
    } catch (error) {
      return error
    }
  },

  async getCoordinator(id) {
    try {
      const res = await fetch(`http://back:5000/user/coordinator?_id=${id}`, {
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

  async create(user, event) {
    try {
      const res = await fetch("http://back:5000/user/create", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      return await res.json()
    } catch (error) {
      return error
    }
  },

  async update(user, eventId, changes) {
    try {
      const res = await fetch(`http://back:5000/user/update?_id=${eventId}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      return await res.json()
    } catch (error) {
      return error
    }
  },

  async delete(user, eventId) {
    try {
      const res = await fetch(`http://back:5000/user/delete?_id=${eventId}`, {
        method: "DELETE",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      return await res.json()
    } catch (error) {
      return error
    }
  }
}