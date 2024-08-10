import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const TransactionsThisMonthChart = ({
    chartConfig,
    chartData,
}: {
    chartConfig: ChartConfig;
    chartData: { label: string, amount: number }[];
}) => {
    return (
        <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                className="h-full content-center mt-4"
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    tickFormatter={(value) => value.slice(0, 3)}
                    tick={{ fill: 'white' }}
                />
                
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                    
                />
                
                <Area
                    dataKey="amount"
                    type="natural"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                    stroke="hsl(var(--chart-1))"
                    stackId="a"

                />
            </AreaChart>
        </ChartContainer>
    )
}
