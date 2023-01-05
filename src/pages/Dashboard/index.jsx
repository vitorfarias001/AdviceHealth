import { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { getAllScheduleToday, getSchedule } from './controller'

export const Dashboard = () => {
  const [data, setData] = useState({
    numberSchedulesToday: 0,
    numberPatientsAnsweredToday: 0,
    billingToday: 0,
  })
  useQuery(['getSchedule'], async () => getSchedule(), {
    onSuccess: response => {
      const schedules = getAllScheduleToday(response.data)
      setData({
        numberSchedulesToday: schedules.length,
        numberPatientsAnsweredToday: schedules.filter(
          schedule => schedule.answered,
        ).length,
        billingToday: schedules
          .filter(schedule => schedule.answered)
          .reduce((acc, schedule) => {
            return +acc + +schedule.price
          }, 0),
      })
    },
  })

  return (
    <section className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="d-flex flex-column flex-grow-1 py-5">
        <Row>
          <Col>
            <Card
              bg="light"
              text="dark"
              style={{ width: '100%' }}
              className="mb-2"
            >
              <Card.Header>Número de agendamentos do dia</Card.Header>
              <Card.Body>
                <Card.Text>
                  <h1>{data?.numberSchedulesToday}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              bg="light"
              text="dark"
              style={{ width: '100%' }}
              className="mb-2"
            >
              <Card.Header>Número de pacientes atendidos no dia</Card.Header>
              <Card.Body>
                <Card.Text>
                  <h1>{data?.numberPatientsAnsweredToday}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              bg="light"
              text="dark"
              style={{ width: '100%' }}
              className="mb-2"
            >
              <Card.Header>Faturamento do dia</Card.Header>
              <Card.Body>
                <Card.Text>
                  <h1>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(data?.billingToday)}
                  </h1>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </section>
  )
}
