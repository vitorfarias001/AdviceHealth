import { useState } from 'react'
import { Button, Container, InputGroup, Stack, Form } from 'react-bootstrap'
import { FiX } from 'react-icons/fi'
import { useMutation, useQuery } from 'react-query'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { Table } from 'src/components/Table'
import { ModalCreateSchedule } from './components/ModalCreateSchedule'
import { ModalEdit } from './components/ModalEdit'
import { COLUMNS } from './constants'
import { getSchedules, handleChangeStatus, handleDelete } from './controller'

export const Schedules = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [params, setParams] = useState({
    patient: null,
    answered: null,
  })

  const [modalShow, setModalShow] = useState(false)
  const [editModal, setEditModal] = useState({
    show: false,
    data: null,
  })

  const [data, setData] = useState(null)

  const { mutate: mutateChangeStatus } = useMutation(
    ['changeStatus'],
    async id =>
      handleChangeStatus({
        data: data.data.filter(item => item.id === id)[0],
      }),
    {
      onSuccess: () => {
        refetch()
      },
    },
  )

  const { isLoading, refetch } = useQuery(
    [page, params],
    async () =>
      getSchedules({
        page,
        handleDelete: handleDeleteSchedule,
        setEditModal,
        params,
        handleChangeStatus: mutateChangeStatus,
      }),
    {
      onSuccess: response => {
        setData(response)
      },
    },
  )

  const { mutate: handleDeleteSchedule } = useMutation(
    ['deleteSchedule'],
    async id => handleDelete(id),
    {
      onSuccess: () => {
        refetch()
      },
    },
  )

  return (
    <section className="d-flex flex-column min-vh-100">
      {isLoading && <p>carregando</p>}
      <Header />
      <ModalCreateSchedule
        show={modalShow}
        handleClose={() => setModalShow(false)}
        refetch={refetch}
      />
      {editModal.show && (
        <ModalEdit
          show={editModal.show}
          handleClose={() => setEditModal({ show: false, data: null })}
          refetch={refetch}
          data={editModal.data}
        />
      )}

      <Container className="d-flex flex-column flex-grow-1">
        <Stack
          direction="horizontal"
          gap={3}
          className="mt-3 mb-4 justify-content-between"
        >
          <h3 className="mt-3 mb-4">Agendamentos</h3>
          <InputGroup>
            {params.patient && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  setSearch('')
                  setParams({
                    patient: '',
                  })
                  refetch()
                }}
              >
                <FiX size={25} />
              </Button>
            )}

            <Form.Control
              placeholder="Pesquisar paciente"
              aria-label="Pesquisar paciente"
              className="shadow-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              onClick={() => {
                setParams({
                  patient: search,
                })
              }}
            >
              Pesquisar
            </Button>
          </InputGroup>
          <Button
            variant="success"
            className="text-nowrap"
            onClick={() => {
              setModalShow(true)
            }}
          >
            Novo agendamento
          </Button>
          <Button
            variant="dark"
            className="text-nowrap"
            onClick={() => {
              setParams(prevState => ({
                ...prevState,
                answered: true,
              }))
            }}
          >
            Filtrar por atendidos
          </Button>
          {params.answered && (
            <Button
              variant="danger"
              className="text-nowrap"
              onClick={() => {
                setParams(prevState => ({
                  ...prevState,
                  answered: false,
                }))
              }}
            >
              Limpar filtros
            </Button>
          )}
        </Stack>
        {data?.data && data?.total > 0 && (
          <Table
            columns={COLUMNS}
            pageCount={Math.ceil(data.total / 10)}
            data={data.data}
            fetchData={infoPage => {
              setPage(prevState =>
                infoPage.pageIndex === prevState
                  ? prevState
                  : infoPage.pageIndex,
              )
            }}
          />
        )}
        {data?.data && data?.total === 0 && (
          <p className="mt-3">Nenhuma consulta encontrada</p>
        )}
      </Container>
      <Footer />
    </section>
  )
}
