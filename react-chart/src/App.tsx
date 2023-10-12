import React from 'react'
import ReactEcharts from 'echarts-for-react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'


import rawdata from "./data.json"


interface ChartData {
  monthlyExpenses: {
    dates: string[];
    values: number[];
  }
  categoryExpenses: {
    categories: string[];
    values: number[];
  }
  fixedExpenses: {
    dates: string[];
    fixedValues: number[];
    nonFixedValues: number[];
  }
}



type MonthlyExpensesChartProps = {
  dates: string[];
  values: number[];
}

const MonthlyExpensesChart: React.FC<MonthlyExpensesChartProps> = ({ dates, values }) => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: dates
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: values,
        type: 'line',
        label: {
          show: true,
        }
      }
    ]
  };

  return (
    <ReactEcharts
      option={options}
      notMerge={true}
      lazyUpdate={true}
      style={{ height: '400px' }}
    />
  )
}

type FixedExpensesChartProps = {
  dates: string[];
  fixedValues: number[];
  nonFixedValues: number[];
}

const FixedExpensesChart: React.FC<FixedExpensesChartProps> = ({ dates, fixedValues, nonFixedValues }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      align: "auto",
      left: "center",
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: [0, 0.01],
      data: dates
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Fixed',
        type: 'bar',
        data: fixedValues
      },
      {
        name: 'NonFixed',
        type: 'bar',
        data: nonFixedValues
      }
    ]
  };
  return (
    <ReactEcharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
    />
  )
}

type CategoryExpensesChartProps = {
  categories: string[];
  values: number[];
}

const CategoryExpensesChart: React.FC<CategoryExpensesChartProps> = ({ categories, values }) => {
  const data = categories.map((category, index) => {
    return {
      value: values[index],
      name: category
    }
  })

  const option = {
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        name: 'Expenses by Category',
        type: 'pie',
        // radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  return (
    <ReactEcharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
    />
  )
}



function App() {
  const [data, setData] = React.useState<ChartData>()

  React.useEffect(() => {
    setData(rawdata)
  }, [])

  if (data) console.log(data)

  const stats: { name: string, stat: string }[] = [
    {
      name: 'Total Expenses',
      stat: `$${data?.monthlyExpenses.values.reduce((acc, curr) => acc + curr, 0)}`
    },
    {
      name: 'Fixed Expenses',
      stat: `$${data?.fixedExpenses.fixedValues.reduce((acc, curr) => acc + curr, 0)}`
    },
    {
      name: 'NonFixed Expenses',
      stat: `$${data?.fixedExpenses.nonFixedValues.reduce((acc, curr) => acc + curr, 0)}`
    },
    {
      name: 'Most Spent Category',
      // most spent amount and category name
      stat: `$${Math.max(...data?.categoryExpenses.values || [])} - ${data?.categoryExpenses.categories[data?.categoryExpenses.values.indexOf(Math.max(...data?.categoryExpenses.values || []))] || ''}`
      // stat: `$${Math.max(...data?.categoryExpenses.values || [])}`
    },
  ]


  return (
    <main className='container mx-auto px-4'>
      <h1>React Chart Example</h1>
      <button
        onClick={() => {
          setData(prev => {
            if (prev) {
              return {
                ...prev,
                monthlyExpenses: {
                  dates: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  values: [100, 200, 300, 400, 500, 600]
                }
              }
            }
          })
        }}
      >
        Change Monthly Data
      </button>
      <Card className='bg-[rgb(243,244,246)]'>
        <CardHeader>
          <CardTitle
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Last 30 days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
            {stats.map((item) => (
              <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
      <div className='flex flex-col gap-2 md:flex-row md:flex-wrap'>
        <Card className='bg-white md:basis-full'>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyExpensesChart
              dates={data?.monthlyExpenses.dates || []}
              values={data?.monthlyExpenses.values || []}
            />
          </CardContent>
        </Card>
        <Card className='bg-white md:basis-1/2'>
          <CardHeader>
            <CardTitle>Fixed vs NonFixed Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <FixedExpensesChart
              dates={data?.fixedExpenses.dates || []}
              fixedValues={data?.fixedExpenses.fixedValues || []}
              nonFixedValues={data?.fixedExpenses.nonFixedValues || []}
            />
          </CardContent>
        </Card>

        <Card className='bg-white md:flex-1'>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryExpensesChart
              categories={data?.categoryExpenses.categories || []}
              values={data?.categoryExpenses.values || []}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default App
