import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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
  { status: "completado", tasks: 275, fill: "var(--color-completado)" },
  { status: "enprogreso", tasks: 200, fill: "var(--color-enprogreso)" },
  { status: "pausado", tasks: 287, fill: "var(--color-pausado)" },
  { status: "pendiente", tasks: 173, fill: "var(--color-pendiente)" },
  { status: "cancelado", tasks: 190, fill: "var(--color-cancelado)" },
]
const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  completado: {
    label: "Completado",
    color: "hsl(var(--chart-1))",
  },
  enprogreso: {
    label: "En progreso",
    color: "hsl(var(--chart-2))",
  },
  pausado: {
    label: "Pausado",
    color: "hsl(var(--chart-3))",
  },
  pendiente: {
    label: "Pendiente",
    color: "hsl(var(--chart-4))",
  },
  cancelado: {
    label: "Cancelado",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function CardChartStatus() {
  const totaltasks = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.tasks, 0)
  }, [])
  return (
    <Card className="flex flex-col sm:h-80">
      <CardHeader className="items-center pb-0">
        <CardTitle>
            Estatus de Tareas
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tasks"
              nameKey="status"
              innerRadius={55}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totaltasks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tareas
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
