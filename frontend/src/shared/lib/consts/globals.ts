type StatusInfo = {
  color: string
  background: string
  title: string
  value: string
}

type StatusGroup = Record<string, StatusInfo>

export const statuses: Record<string, StatusGroup> = {
  order: {
    PENDING: {
      color: '#F9A000',
      background: '#FFECCC',
      title: 'В ожидании',
      value: 'PENDING',
    },
    REFUND: {
      color: '#B91C1C',
      background: '#FFE0E0',
      title: 'Возврат',
      value: 'REFUND',
    },
    DELIVERED: {
      color: '#47A938',
      background: '#CDFFCD',
      title: 'Доставлен',
      value: 'DELIVERED',
    },
  },
  product: {
    // MODERATION: {
    //   color: '#F9A000',
    //   background: '#FFECCC',
    //   title: 'На модерации',
    //   value: 'MODERATION',
    // },
    ACTIVE: {
      color: '#47A938',
      background: '#CDFFCD',
      title: 'Активный',
      value: 'ACTIVE',
    },
    INACTIVE: {
      color: '#B91C1C',
      background: '#FFE0E0',
      title: 'Неактивный',
      value: 'INACTIVE',
    },
    ARCHIVE: {
      color: '#FF5E00',
      background: '#FFECCC',
      title: 'Архив',
      value: 'ARCHIVE',
    },
    SCHEDULED: {
      color: '#3448FF',
      background: '#EFF6FF',
      title: 'Подтвержден',
      value: 'SCHEDULED',
    },
    DRAFT: {
      color: '#000',
      background: '#DBDBDB',
      title: 'Черновик',
      value: 'DRAFT',
    },
  },
}

type GenderType = {
  id: number
  title: string
  value: string
}

export const genders: GenderType[] = [
  { id: 1, title: 'Мужской', value: 'MALE' },
  { id: 2, title: 'Женский', value: 'FEMALE' },
  { id: 3, title: 'Унисекс', value: 'UNISEX' },
]

type CountriesType = {
  id: number
  title: string
}

export const countriesData: CountriesType[] = [
  {
    id: 1,
    title: 'США',
  },
  {
    id: 2,
    title: 'Китай',
  },
  {
    id: 3,
    title: 'Германия',
  },
]
