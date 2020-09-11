import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl)
    return request.data
  } catch (error) {
    throw new Error('Error fetching blogs!')
  }
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (error) {
    throw new Error('Error creating new Blog.')
  }
}

const update = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.put(
      `${baseUrl}/${newBlog.id}`,
      newBlog,
      config
    )
    return response.data
  } catch (error) {
    throw new Error('Error updating new Blog.')
  }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const res = await axios.delete(`${baseUrl}/${id}`, config)
    if (res.status !== 204) throw new Error('Blog not found.')
  } catch (error) {
    throw new Error('Error deleting blog.')
  }
}

export default { getAll, create, update, deleteBlog, setToken }
