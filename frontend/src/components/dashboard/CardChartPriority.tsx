import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { priority: "alta", tasks: 25, fill: "var(--color-alta)" },
  { priority: "media", tasks: 10, fill: "var(--color-media)" },
  { priority: "baja", tasks: 17, fill: "var(--color-baja)" },
]

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  alta: {
    label: "Alta",
    color: "hsl(var(--chart-1))",
  },
  media: {
    label: "Media",
    color: "hsl(var(--chart-2))",
  },
  baja: {
    label: "Baja",
    color: "hsl(var(--chart-3))",
  }
} satisfies ChartConfig

export function CardChartPriority() {
  return (
    <Card className="flex flex-col sm:h-80">
      <CardHeader className="flex flex-col justify-center items-center w-full">
        <CardTitle>
            Prioridades de Tareas
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden sm:flex sm:h-64 mr-2">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
            maxBarSize={35}
          >
            <YAxis
              dataKey="priority"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
              
            />
            <XAxis dataKey="tasks" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="tasks" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
