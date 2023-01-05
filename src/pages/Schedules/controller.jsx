import { Button, Stack } from 'react-bootstrap'
import { FiEdit2, FiX } from 'react-icons/fi'
import { api } from 'src/services/api'

export const handleDelete = async id => {
  const response = await api.delete(`/schedules/${id}`)
  return response.data
}

export const handleChangeStatus = async ({ data }) => {
  delete data.actions
  const response = await api.put(`/schedules/${data.id}`, {
    ...data,
    answered: !data.answeredBool,
  })
  return response.data
}

export const getSchedules = async ({
  page,
  handleDelete: handleDeleteSchedule,
  setEditModal,
  params,
  handleChangeStatus: handleChangeStatusSchedule,
}) => {
  const response = await api.get('/schedules', {
    params: {
      _page: page,
      _limit: 10,
      _order: 'desc',
      _sort: 'id',
      ...(params.patient && { patient: params.patient }),
      ...(params.answered && { answered: params.answered }),
    },
  })
  return {
    data: response.data.map(item => ({
      ...item,
      answeredBool: item.answered,
      answered: (
        <input
          type="checkbox"
          defaultChecked={item.answered}
          onChange={() => {
            handleChangeStatusSchedule(item.id)
          }}
        />
      ),
      actions: (
        <Stack gap={3} direction="horizontal">
          <Button
            variant="outline-danger"
            className="d-flex align-items-center"
            onClick={() => {
              setEditModal({
                show: true,
                data: item,
              })
            }}
          >
            <FiEdit2 />
          </Button>
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center"
            onClick={() => handleDeleteSchedule(item.id)}
          >
            <FiX />
          </Button>
        </Stack>
      ),
    })),
    total: +response.headers['x-total-count'],
  }
}
