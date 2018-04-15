import {differenceInMinutes} from 'date-fns'
import {round} from 'lodash'

const names = {
  minute: {
    singular: 'minute',
    plural: 'minutes',
  },
  hour: {
    singular: 'hour',
    plural: 'hours',
  },
  day: {
    singular: 'day',
    plural: 'days',
  },
  week: {
    singular: 'week',
    plural: 'weeks',
  },
  month: {
    singular: 'month',
    plural: 'months',
  },
  year: {
    singular: 'year',
    plural: 'years',
  },
}

const unitToText = (unit, quantity) => (quantity > 1 ? names[unit].plural : names[unit].singular)

export default function(date) {
  const minutes = differenceInMinutes(new Date(), new Date(date))
  if (minutes < 5) return 'just now'
  if (minutes < 60) return `${minutes} ${unitToText('minute', minutes)} ago`

  const hours = round(minutes / 60, 0)
  if (hours < 24) return `${hours} ${unitToText('hour', hours)} ago`

  const days = round(hours / 24, 0)
  if (days < 7) return `${days} ${unitToText('day', round(days))} ago`

  const weeks = round(days / 7, 0)
  if (weeks < 4) return `${weeks} ${unitToText('week', round(weeks))} ago`

  const months = round(weeks / 4, 0)
  if (months < 12) return `${months} ${unitToText('month', round(months))} ago`

  const years = round(months / 12, 0)
  return `${years} ${unitToText('year', round(years))} ago`
}
