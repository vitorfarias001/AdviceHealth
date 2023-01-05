import { api } from 'src/services/api'

export const getDoctors = async () => {
  const response = await api.get('/doctors')
  return response.data
}

export const getProcedures = async () => {
  const response = await api.get('/procedures')
  return response.data
}

export const createSchedule = async ({ values, startDate }) => {
  const schedule = {
    ...values,
    date: startDate,
    answeredBool: false,
    answered: false,
  }
  const response = await api.post('/schedules', schedule)
  return response.data
}
