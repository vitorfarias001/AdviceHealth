import { getDay, setHours, setMinutes } from 'date-fns'
import { pt } from 'date-fns/locale'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { createSchedule, getDoctors, getProcedures } from './controller'

export const ModalCreateSchedule = ({ show, handleClose, refetch }) => {
  const { data: doctors } = useQuery('getDoctors', async () => getDoctors())
  const { data: procedures } = useQuery('getProcedures', async () =>
    getProcedures(),
  )
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16),
  )

  const CustomDatePicker = ({ value, onClick }) => (
    <Button variant="outline-secondary" onClick={onClick}>
      {value}
    </Button>
  )

  const avaliableHours = []
  for (let hour = 8; hour <= 18; hour++) {
    avaliableHours.push(setHours(setMinutes(new Date(), 0), hour))
    avaliableHours.push(setHours(setMinutes(new Date(), 30), hour))
  }
  const { register, getValues } = useForm()

  const { mutate } = useMutation(
    ['createSchedule'],
    async () =>
      createSchedule({
        values: getValues(),
        startDate,
      }),
    {
      onSuccess: () => {
        handleClose()
        refetch()
      },
    },
  )

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Crie um novo agendamento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Paciente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do paciente"
              {...register('patient')}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              placeholder="R$"
              {...register('price')}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Médico</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register('doctor')}
            >
              {doctors?.map(doctor => (
                <option value={doctor.name}>{doctor.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Procedimento</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register('procedure')}
            >
              {procedures?.map(procedure => (
                <option value={procedure.name}>{procedure.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data</Form.Label>
            <ReactDatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<CustomDatePicker />}
              locale={pt}
              filterDate={date => {
                const day = getDay(date)
                return day !== 0 && day !== 6
              }}
              filterTime={time => {
                const currentDate = new Date()
                const selectedDate = new Date(time)
                return currentDate.getTime() < selectedDate.getTime()
              }}
              includeTimes={avaliableHours}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          onClick={() => {
            mutate()
          }}
        >
          Criar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
