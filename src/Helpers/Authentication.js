export const Authentication = {
  getUser() {
    let user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    } else {
      return null
    }
  },

  async login(email, password) {
    try {
      const res = await fetch(`/api/user/login`, {
        method: 'POST',
        body: JSON.stringify({user: {email: email, password: password}}),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })

      if (res.status === 200) {
        let data = await res.json()
        localStorage.setItem('user', JSON.stringify(data))
        return [data, undefined]
      } else {
        return [null, res.statusText]
      }
    } catch (error) {
      if (error instanceof Error) {
        return [null, error.toString()]
      } else {
        return [null, "Unexpected error"]
      }
    }
  },

  logout() {
    try {
      localStorage.removeItem('user')
    } catch (error) {
      console.log(error)
    }
  },

  async update(user, changes) {
    try {
      const res = await fetch(`/api/user/update?_id=${user.user._id}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (res.status === 200) {
        const data = await res.json()
        localStorage.setItem('user', JSON.stringify(data))
        return
      }
    } catch (error) {
      console.log(error)
    }
  },

  async create(user) {
    try {
      const res = await fetch('/api/user/create', {
        method: "POST",
        body: JSON.stringify(user),
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