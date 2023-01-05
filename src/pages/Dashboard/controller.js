import { format } from 'date-fns'
import { api } from 'src/services/api'

export const getAllScheduleToday = data => {
  return data.filter(
    schedule =>
      format(new Date(schedule.date), 'dd/MM/yyyy') ===
      format(new Date(), 'dd/MM/yyyy'),
  )
}

export const getSchedule = async () => {
  const response = await api.get('/schedules', {
    params: {
      _page: 1,
      _limit: 1000,
      _order: 'desc',
      _sort: 'id',
    },
  })
  return {
    total: Number(response.headers['x-total-count']),
    data: response.data,
  }
}
