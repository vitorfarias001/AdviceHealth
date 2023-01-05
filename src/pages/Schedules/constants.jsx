import { format } from 'date-fns'

export const COLUMNS = [
  {
    accessor: 'answered',
    Header: 'Atendido',
  },
  {
    accessor: 'patient',
    Header: 'Paciente',
  },
  {
    accessor: 'doctor',
    Header: 'Médico',
  },
  {
    accessor: 'procedure',
    Header: 'Procedimento',
  },
  {
    accessor: 'price',
    Header: 'Valor',
    Cell: ({ row }) => {
      const { price } = row.original
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price)
    },
  },
  {
    accessor: 'date',
    Header: 'Data',
    Cell: ({ row }) => {
      const { date } = row.original
      return format(new Date(date), 'dd/MM/yyyy HH:mm')
    },
  },
  {
    accessor: 'actions',
    Header: 'Ações',
  },
]
