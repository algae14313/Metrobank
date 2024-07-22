"use client";

import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const chartData = [
    { date: "2024-04-01", deposit: 222, withdrawal: 150 },
    { date: "2024-04-02", deposit: 97, withdrawal: 180 },
    { date: "2024-04-03", deposit: 167, withdrawal: 120 },
    { date: "2024-04-04", deposit: 242, withdrawal: 260 },
    { date: "2024-04-05", deposit: 373, withdrawal: 290 },
    { date: "2024-04-06", deposit: 301, withdrawal: 340 },
    { date: "2024-04-07", deposit: 245, withdrawal: 180 },
    { date: "2024-04-08", deposit: 409, withdrawal: 320 },
    { date: "2024-04-09", deposit: 59, withdrawal: 110 },
    { date: "2024-04-10", deposit: 261, withdrawal: 190 },
    { date: "2024-04-11", deposit: 327, withdrawal: 350 },
    { date: "2024-04-12", deposit: 292, withdrawal: 210 },
    { date: "2024-04-13", deposit: 342, withdrawal: 380 },
    { date: "2024-04-14", deposit: 137, withdrawal: 220 },
    { date: "2024-04-15", deposit: 120, withdrawal: 170 },
    { date: "2024-04-16", deposit: 138, withdrawal: 190 },
    { date: "2024-04-17", deposit: 446, withdrawal: 360 },
    { date: "2024-04-18", deposit: 364, withdrawal: 410 },
    { date: "2024-04-19", deposit: 243, withdrawal: 180 },
    { date: "2024-04-20", deposit: 89, withdrawal: 150 },
    { date: "2024-04-21", deposit: 137, withdrawal: 200 },
    { date: "2024-04-22", deposit: 224, withdrawal: 170 },
    { date: "2024-04-23", deposit: 138, withdrawal: 230 },
    { date: "2024-04-24", deposit: 387, withdrawal: 290 },
    { date: "2024-04-25", deposit: 215, withdrawal: 250 },
    { date: "2024-04-26", deposit: 75, withdrawal: 130 },
    { date: "2024-04-27", deposit: 383, withdrawal: 420 },
    { date: "2024-04-28", deposit: 122, withdrawal: 180 },
    { date: "2024-04-29", deposit: 315, withdrawal: 240 },
    { date: "2024-04-30", deposit: 454, withdrawal: 380 },
    { date: "2024-05-01", deposit: 165, withdrawal: 220 },
    { date: "2024-05-02", deposit: 293, withdrawal: 310 },
    { date: "2024-05-03", deposit: 247, withdrawal: 190 },
    { date: "2024-05-04", deposit: 385, withdrawal: 420 },
    { date: "2024-05-05", deposit: 481, withdrawal: 390 },
    { date: "2024-05-06", deposit: 498, withdrawal: 520 },
    { date: "2024-05-07", deposit: 388, withdrawal: 300 },
    { date: "2024-05-08", deposit: 149, withdrawal: 210 },
    { date: "2024-05-09", deposit: 227, withdrawal: 180 },
    { date: "2024-05-10", deposit: 293, withdrawal: 330 },
    { date: "2024-05-11", deposit: 335, withdrawal: 270 },
    { date: "2024-05-12", deposit: 197, withdrawal: 240 },
    { date: "2024-05-13", deposit: 197, withdrawal: 160 },
    { date: "2024-05-14", deposit: 448, withdrawal: 490 },
    { date: "2024-05-15", deposit: 473, withdrawal: 380 },
    { date: "2024-05-16", deposit: 338, withdrawal: 400 },
    { date: "2024-05-17", deposit: 499, withdrawal: 420 },
    { date: "2024-05-18", deposit: 315, withdrawal: 350 },
    { date: "2024-05-19", deposit: 235, withdrawal: 180 },
    { date: "2024-05-20", deposit: 177, withdrawal: 230 },
    { date: "2024-05-21", deposit: 82, withdrawal: 140 },
    { date: "2024-05-22", deposit: 81, withdrawal: 120 },
    { date: "2024-05-23", deposit: 252, withdrawal: 290 },
    { date: "2024-05-24", deposit: 294, withdrawal: 220 },
    { date: "2024-05-25", deposit: 201, withdrawal: 250 },
    { date: "2024-05-26", deposit: 213, withdrawal: 170 },
    { date: "2024-05-27", deposit: 420, withdrawal: 460 },
    { date: "2024-05-28", deposit: 233, withdrawal: 190 },
    { date: "2024-05-29", deposit: 78, withdrawal: 130 },
    { date: "2024-05-30", deposit: 340, withdrawal: 280 },
    { date: "2024-05-31", deposit: 178, withdrawal: 230 },
    { date: "2024-06-01", deposit: 178, withdrawal: 200 },
    { date: "2024-06-02", deposit: 470, withdrawal: 410 },
    { date: "2024-06-03", deposit: 103, withdrawal: 160 },
    { date: "2024-06-04", deposit: 439, withdrawal: 380 },
    { date: "2024-06-05", deposit: 88, withdrawal: 140 },
    { date: "2024-06-06", deposit: 294, withdrawal: 250 },
    { date: "2024-06-07", deposit: 323, withdrawal: 370 },
    { date: "2024-06-08", deposit: 385, withdrawal: 320 },
    { date: "2024-06-09", deposit: 438, withdrawal: 480 },
    { date: "2024-06-10", deposit: 155, withdrawal: 200 },
    { date: "2024-06-11", deposit: 92, withdrawal: 150 },
    { date: "2024-06-12", deposit: 492, withdrawal: 420 },
    { date: "2024-06-13", deposit: 81, withdrawal: 130 },
    { date: "2024-06-14", deposit: 426, withdrawal: 380 },
    { date: "2024-06-15", deposit: 307, withdrawal: 350 },
    { date: "2024-06-16", deposit: 371, withdrawal: 310 },
    { date: "2024-06-17", deposit: 475, withdrawal: 520 },
    { date: "2024-06-18", deposit: 107, withdrawal: 170 },
    { date: "2024-06-19", deposit: 341, withdrawal: 290 },
    { date: "2024-06-20", deposit: 408, withdrawal: 450 },
    { date: "2024-06-21", deposit: 169, withdrawal: 210 },
    { date: "2024-06-22", deposit: 317, withdrawal: 270 },
    { date: "2024-06-23", deposit: 480, withdrawal: 530 },
    { date: "2024-06-24", deposit: 132, withdrawal: 180 },
    { date: "2024-06-25", deposit: 141, withdrawal: 190 },
    { date: "2024-06-26", deposit: 434, withdrawal: 380 },
    { date: "2024-06-27", deposit: 448, withdrawal: 490 },
    { date: "2024-06-28", deposit: 149, withdrawal: 200 },
    { date: "2024-06-29", deposit: 103, withdrawal: 160 },
    { date: "2024-06-30", deposit: 446, withdrawal: 400 },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    deposit: {
        label: "Deposit",
        color: "hsl(var(--chart-1))",
    },
    withdrawal: {
        label: "Withdrawal",
        color: "hsl(var(--chart-2))",
    },
};

function AreaChart_Interactive({ title, subtitle }) {
    const [timeRange, setTimeRange] = useState("90d");

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const now = new Date();
        let daysToSubtract = 90;
        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }
        now.setDate(now.getDate() - daysToSubtract);
        return date >= now;
    });

    return (
        <Card className='dark:bg-[#171717]'>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {subtitle}
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillDeposit" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-deposit)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-deposit)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillWithdrawal" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-withdrawal)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-withdrawal)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="withdrawal"
                            type="natural"
                            fill="url(#fillWithdrawal)"
                            stroke="var(--color-withdrawal)"
                            stackId="a"
                        />
                        <Area
                            dataKey="deposit"
                            type="natural"
                            fill="url(#fillDeposit)"
                            stroke="var(--color-deposit)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default AreaChart_Interactive;
