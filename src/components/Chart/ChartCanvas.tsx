import { LineChart, Tooltip, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartHolder } from './styled';
interface ChartData {
  key: string,
  open: string,
  high: string,
  low: string,
  close: string,
}

interface Props {
  chartData: ChartData[],
  isLoading: boolean
}

const ChartCanvas = ({ chartData, isLoading }: Props) => {
  return (
    <ChartHolder isLoading={isLoading}>
      <LineChart
        width={1200} 
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <Line type="monotone" dataKey="open" stroke="#8ab6d6" />
        <Line type="monotone" dataKey="close" stroke="gray" />
        <Line type="monotone" dataKey="low" stroke="#98ddca" />
        <Line type="monotone" dataKey="high" stroke="#ffaaa7" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <XAxis
          hide={true}
          dataKey="key"
          tickSize={3}
          allowDataOverflow={true}
          interval={0}
          angle={60}
          reversed={true}
          orientation={'top'}
        />
        <YAxis type="number" domain={['dataMin', 'dataMax']} />
      </LineChart>
    </ChartHolder>
  )
}

export default ChartCanvas;
