// Write your code here
// Write your code here
import './index.css'

import {BarChart, XAxis, YAxis, Legend, Bar} from 'recharts'

const VaccinationCoverage = props => {
  const {vaccination} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="card-container">
      <h1 className="vaccination">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={vaccination}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccine_date"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 0,
          }}
        />
        <Bar dataKey="dose_1" fill="#2d87bb" name="Dose 1" barSize="10%" />
        <Bar dataKey="dose_2" fill="#f54394" name="Dose 2" barSize="10%" />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
