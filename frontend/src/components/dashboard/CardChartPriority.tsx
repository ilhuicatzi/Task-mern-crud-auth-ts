import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
    <Card>
      <CardHeader>
        <CardTitle>
            Prioridades de Tareas
        </CardTitle>
        <CardDescription>
            Se muestra la cantidad de tareas por prioridad
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
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
        <CardFooter>
            <TrendingUp className="h-6 w-6" />
            <span className="ml-2">Todas las prioridades</span>
        </CardFooter>
    </Card>
  )
}
