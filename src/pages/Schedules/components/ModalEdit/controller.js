import { api } from 'src/services/api'

export const getDoctors = async () => {
  const response = await api.get('/doctors')
  return response.data
}

export const getProcedures = async () => {
  const response = await api.get('/procedures')
  return response.data
}

export const handleEditSchedule = async ({ values, startDate, id }) => {
  const schedule = {
    ...values,
    date: startDate,
  }
  const response = await api.put(`/schedules/${id}`, schedule)
  return response.data
}
