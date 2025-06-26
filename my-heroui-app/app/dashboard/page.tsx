"use client"

import type React from "react"

import { useState } from "react"
import {
    Tabs,
    Select,
    SelectItem,
    SelectSection,
    Tab,
    Card,
    CardBody,
    Button,
    Textarea,
    ScrollShadow,
    Badge,
    Chip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Accordion,
    AccordionItem,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    User as HeroUser
} from "@heroui/react"
import { MessageCircle, BarChart3, Layout, Send, User, Bot, ChevronUp, Check } from "lucide-react"

interface ChatMessage {
    id: string
    type: "user" | "bot"
    content: string
    timestamp: Date
}

interface QueryHistoryItem {
    id: string
    query: string
    timestamp: Date
}

interface DatabaseFile {
    id: string
    name: string
    icon: string
    type: "mysql" | "postgresql" | "mongodb" | "sqlite" | "redis"
}

export default function DashboardLayout() {
    const [chatInput, setChatInput] = useState("")
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            type: "bot",
            content:
                "Hello! I'm your data analytics assistant. Ask me anything about your data or request charts and insights.",
            timestamp: new Date(Date.now() - 300000),
        },
        {
            id: "2",
            type: "user",
            content: "Show me sales data for the last quarter",
            timestamp: new Date(Date.now() - 240000),
        },
        {
            id: "3",
            type: "bot",
            content:
                "I've generated a sales chart for Q4 2023. The total revenue was $2.4M with a 15% increase from the previous quarter. Check the Chart tab to see the visualization.",
            timestamp: new Date(Date.now() - 180000),
        },
    ])

    const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([
        { id: "1", query: "Show sales by region", timestamp: new Date(Date.now() - 3600000) },
        { id: "2", query: "Customer retention rate", timestamp: new Date(Date.now() - 1800000) },
        { id: "3", query: "Top performing products", timestamp: new Date(Date.now() - 900000) },
        { id: "4", query: "Monthly revenue trend", timestamp: new Date(Date.now() - 600000) },
    ])

    const [selectedFiles, setSelectedFiles] = useState<string[]>(["sales-db", "customer-db"])
    const [isFilesPopoverOpen, setIsFilesPopoverOpen] = useState(false)
    const [selectedColumn, setSelectedColumn] = useState("amount")

    const availableFiles: DatabaseFile[] = [
        { id: "sales-db", name: "Sales Database", icon: "🐬", type: "mysql" },
        { id: "customer-db", name: "Customer Analytics", icon: "🐘", type: "postgresql" },
        { id: "inventory-db", name: "Inventory System", icon: "🍃", type: "mongodb" },
        { id: "reports-db", name: "Financial Reports", icon: "📁", type: "sqlite" },
        { id: "cache-db", name: "Cache Store", icon: "🔴", type: "redis" },
        { id: "marketing-db", name: "Marketing Data", icon: "🐬", type: "mysql" },
        { id: "analytics-db", name: "Web Analytics", icon: "🐘", type: "postgresql" },
    ]

    const columnData = {
        amount: {
            name: "amount",
            type: "Number",
            missing: { count: 14, percentage: 7 },
            unique: 9,
            stats: {
                min: 4.0,
                max: 98.5,
                mean: 52.1,
                median: 50,
                mode: 45,
            },
        },
        customer_name: {
            name: "customer_name",
            type: "String",
            missing: { count: 0, percentage: 0 },
            unique: 8,
            topValues: [
                { value: "John Doe", count: 1 },
                { value: "Jane Smith", count: 1 },
                { value: "Bob Johnson", count: 1 },
                { value: "Alice Brown", count: 1 },
                { value: "Charlie Wilson", count: 1 },
            ],
        },
        product: {
            name: "product",
            type: "String",
            missing: { count: 2, percentage: 1 },
            unique: 6,
            topValues: [
                { value: "Wireless Headphones", count: 3 },
                { value: "Smart Watch", count: 2 },
                { value: "Laptop Stand", count: 2 },
                { value: "USB-C Cable", count: 1 },
                { value: "Phone Case", count: 1 },
            ],
        },
        status: {
            name: "status",
            type: "String",
            missing: { count: 0, percentage: 0 },
            unique: 3,
            topValues: [
                { value: "Completed", count: 4 },
                { value: "Processing", count: 2 },
                { value: "Shipped", count: 2 },
            ],
        },
    }

    const currentColumnData = columnData[selectedColumn as keyof typeof columnData]

    const handleSendMessage = () => {
        if (!chatInput.trim()) return

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: "user",
            content: chatInput,
            timestamp: new Date(),
        }

        const botResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            content: "I'm processing your request. This is a demo response showing how the chat interface works.",
            timestamp: new Date(Date.now() + 1000),
        }

        setChatMessages((prev) => [...prev, userMessage, botResponse])

        const newQuery: QueryHistoryItem = {
            id: Date.now().toString(),
            query: chatInput,
            timestamp: new Date(),
        }
        setQueryHistory((prev) => [newQuery, ...prev])

        setChatInput("")
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleFileToggle = (fileId: string) => {
        setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
    }

    const getSelectedFileNames = () => {
        return selectedFiles
            .map((id) => availableFiles.find((file) => file.id === id)?.name)
            .filter(Boolean)
            .join(", ")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">DataFlow Analytics</h1>
                        <p className="text-gray-600">Query. Predict. Optimize. All in one place.</p>
                    </div>
                    <Chip variant="flat" color="success">
                        Connected
                    </Chip>
                </div>
            </div>

            <div className="flex h-[calc(100vh-80px)]">
                <div className="flex-1 p-6 pr-80 w-full">
                    <Tabs aria-label="Dashboard Tabs" className="w-full">
                        <Tab
                            key="chat"
                            title={
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" />
                                    Text Mode
                                </div>
                            }
                        >
                            <Card className="w-full">
                                <CardBody className="w-full">
                                    <div className="w-full h-[calc(100%-60px)]">
                                        <div className="flex gap-6 h-full">
                                            {/* Column Statistics Panel - 1/4 width */}
                                            <Card className="w-full p-4 bg-white shadow-sm">
                                                <CardBody className="space-y-4">
                                                    {/* Column Selector */}
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-700">Select Column</label>
                                                        <Select
                                                            className="max-w-xs text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            value={selectedColumn}
                                                            onChange={(e) => setSelectedColumn(e.target.value)}
                                                        >
                                                            {[
                                                                { key: "amount", label: "Amount" },
                                                                { key: "customer_name", label: "Customer Name" },
                                                                { key: "product", label: "Product" },
                                                                { key: "status", label: "Status" }
                                                            ].map((item) => (
                                                                <SelectItem key={item.key} value={item.key}>
                                                                    {item.label}
                                                                </SelectItem>
                                                            ))}
                                                        </Select>
                                                    </div>

                                                    {/* <Separator /> */}

                                                    {/* Column Info */}
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">Column: {currentColumnData.name}</h3>
                                                        <p className="text-sm text-gray-600">Type: {currentColumnData.type}</p>
                                                    </div>

                                                    {/* <Separator /> */}

                                                    {/* Missing & Unique Section */}
                                                    <div className="space-y-2">
                                                        <h4 className="text-sm font-medium text-gray-900">Missing & Unique</h4>
                                                        <div className="space-y-1">
                                                            <p className="text-sm text-gray-600">
                                                                Missing: {currentColumnData.missing.count} rows ({currentColumnData.missing.percentage}%)
                                                            </p>
                                                            <p className="text-sm text-gray-600">Unique: {currentColumnData.unique} values</p>
                                                        </div>
                                                    </div>

                                                    {/* <Separator /> */}

                                                    {/* Summary Stats for Numeric */}
                                                    {currentColumnData.type === "Number" && currentColumnData.stats && (
                                                        <>
                                                            <div className="space-y-2">
                                                                <h4 className="text-sm font-medium text-gray-900">Summary Stats</h4>
                                                                <div className="space-y-1">
                                                                    <p className="text-sm text-gray-600">Min: {currentColumnData.stats.min}</p>
                                                                    <p className="text-sm text-gray-600">Max: {currentColumnData.stats.max}</p>
                                                                    <p className="text-sm text-gray-600">Mean: {currentColumnData.stats.mean}</p>
                                                                    <p className="text-sm text-gray-600">Median: {currentColumnData.stats.median}</p>
                                                                    <p className="text-sm text-gray-600">Mode: {currentColumnData.stats.mode}</p>
                                                                </div>
                                                            </div>

                                                            {/* <Separator /> */}

                                                            {/* Visual for Numeric */}
                                                            <div className="space-y-2">
                                                                <h4 className="text-sm font-medium text-gray-900">Distribution</h4>
                                                                <div className="h-40 bg-slate-200 rounded-md flex items-center justify-center">
                                                                    <div className="text-center">
                                                                        <div className="text-2xl mb-2">📊</div>
                                                                        <p className="text-sm text-gray-500">Histogram</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                    {/* Top 5 Frequent Values for Categorical */}
                                                    {currentColumnData.type === "String" && currentColumnData.topValues && (
                                                        <>
                                                            <div className="space-y-2">
                                                                <h4 className="text-sm font-medium text-gray-900">Top 5 Frequent Values</h4>
                                                                <div className="space-y-1">
                                                                    {currentColumnData.topValues.map((item, index) => (
                                                                        <div key={index} className="flex justify-between text-sm">
                                                                            <span className="text-gray-700 truncate">{item.value}</span>
                                                                            <span className="text-gray-500 ml-2">{item.count}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* <Separator /> */}

                                                            {/* Visual for Categorical */}
                                                            <div className="space-y-2">
                                                                <h4 className="text-sm font-medium text-gray-900">Distribution</h4>
                                                                <div className="h-40 bg-slate-200 rounded-md flex items-center justify-center">
                                                                    <div className="text-center">
                                                                        <div className="text-2xl mb-2">📊</div>
                                                                        <p className="text-sm text-gray-500">Bar Chart</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </CardBody>
                                            </Card>

                                            {/* Main Content Area - 3/4 width */}
                                            <div className="flex-1 flex flex-col gap-6">
                                                {/* Chat History - Top Half */}
                                                <Card className="flex-1">
                                                    <CardBody>
                                                        <div className="mb-4">
                                                            <h2 className="text-lg font-semibold">Chat History</h2>
                                                            <p className="text-sm text-gray-500">View your conversation with the AI assistant</p>
                                                        </div>
                                                        <ScrollShadow className="h-[calc(100%-80px)] pr-4">
                                                            <div className="space-y-4">
                                                                {chatMessages.map((message) => (
                                                                    <div
                                                                        key={message.id}
                                                                        className={`flex items-start gap-3 ${message.type === "user" ? "justify-end" : "justify-start"
                                                                            }`}
                                                                    >
                                                                        {message.type === "bot" && (
                                                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                                <Bot className="w-4 h-4 text-blue-600" />
                                                                            </div>
                                                                        )}
                                                                        <Card
                                                                            className={`max-w-[80%] ${message.type === "user" ? "bg-blue-600 text-white" : "bg-white border"
                                                                                }`}
                                                                        >
                                                                            <CardBody className="p-3">
                                                                                <p className="text-sm">{message.content}</p>
                                                                                <p
                                                                                    className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-500"
                                                                                        }`}
                                                                                >
                                                                                    {message.timestamp.toLocaleTimeString()}
                                                                                </p>
                                                                            </CardBody>
                                                                        </Card>
                                                                        {message.type === "user" && (
                                                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                                                <User className="w-4 h-4 text-gray-600" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </ScrollShadow>
                                                    </CardBody>
                                                </Card>

                                                {/* Data Table - Bottom Half */}
                                                <Card className="flex-1">
                                                    <CardBody>
                                                        <div className="mb-4">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h2 className="text-lg font-semibold">Query Results</h2>
                                                                    <p className="text-sm text-gray-500">Real-time data based on your queries</p>
                                                                </div>
                                                                <Chip variant="flat" color="success">
                                                                    Live Data
                                                                </Chip>
                                                            </div>
                                                        </div>
                                                        <ScrollShadow className="h-[calc(100%-80px)]">
                                                            <div className="space-y-4">
                                                                {/* Table Controls */}
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-2">
                                                                        <label className="text-sm">Table:</label>
                                                                        <Select className="text-sm border rounded px-2 py-1 max-w-xs">
                                                                            {[
                                                                                { key: "sales_data", label: "sales_data" },
                                                                                { key: "customers", label: "customers" },
                                                                                { key: "products", label: "products" },
                                                                                { key: "orders", label: "orders" },
                                                                            ].map((item) => (
                                                                                <SelectItem key={item.key}>{item.label}</SelectItem>
                                                                            ))}
                                                                        </Select>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Button variant="bordered" size="sm">
                                                                            Export
                                                                        </Button>
                                                                        <Button variant="bordered" size="sm">
                                                                            Refresh
                                                                        </Button>
                                                                    </div>
                                                                </div>

                                                                {/* Data Table */}
                                                                <Table aria-label="Data table">
                                                                    <TableHeader>
                                                                        <TableColumn>Customer</TableColumn>
                                                                        <TableColumn>Product</TableColumn>
                                                                        <TableColumn>Amount</TableColumn>
                                                                        <TableColumn>Date</TableColumn>
                                                                        <TableColumn>Status</TableColumn>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {[
                                                                            {
                                                                                customer: "John Doe",
                                                                                product: "Wireless Headphones",
                                                                                amount: "$299.99",
                                                                                date: "2024-01-15",
                                                                                status: "Completed",
                                                                            },
                                                                            {
                                                                                customer: "Jane Smith",
                                                                                product: "Smart Watch",
                                                                                amount: "$199.99",
                                                                                date: "2024-01-16",
                                                                                status: "Processing",
                                                                            },
                                                                            {
                                                                                customer: "Bob Johnson",
                                                                                product: "Laptop Stand",
                                                                                amount: "$89.99",
                                                                                date: "2024-01-17",
                                                                                status: "Completed",
                                                                            },
                                                                            {
                                                                                customer: "Alice Brown",
                                                                                product: "USB-C Cable",
                                                                                amount: "$29.99",
                                                                                date: "2024-01-18",
                                                                                status: "Shipped",
                                                                            },
                                                                            {
                                                                                customer: "Charlie Wilson",
                                                                                product: "Phone Case",
                                                                                amount: "$19.99",
                                                                                date: "2024-01-19",
                                                                                status: "Completed",
                                                                            },
                                                                            {
                                                                                customer: "Diana Lee",
                                                                                product: "Bluetooth Speaker",
                                                                                amount: "$149.99",
                                                                                date: "2024-01-20",
                                                                                status: "Processing",
                                                                            },
                                                                            {
                                                                                customer: "Frank Miller",
                                                                                product: "Tablet",
                                                                                amount: "$399.99",
                                                                                date: "2024-01-21",
                                                                                status: "Completed",
                                                                            },
                                                                            {
                                                                                customer: "Grace Chen",
                                                                                product: "Keyboard",
                                                                                amount: "$79.99",
                                                                                date: "2024-01-22",
                                                                                status: "Shipped",
                                                                            },
                                                                        ].map((row, index) => (
                                                                            <TableRow key={index}>
                                                                                <TableCell>{row.customer}</TableCell>
                                                                                <TableCell>{row.product}</TableCell>
                                                                                <TableCell className="font-semibold text-green-600">{row.amount}</TableCell>
                                                                                <TableCell className="text-gray-600">{row.date}</TableCell>
                                                                                <TableCell>
                                                                                    <Chip
                                                                                        variant="flat"
                                                                                        color={
                                                                                            row.status === "Completed"
                                                                                                ? "success"
                                                                                                : row.status === "Processing"
                                                                                                    ? "warning"
                                                                                                    : "primary"
                                                                                        }
                                                                                        size="sm"
                                                                                    >
                                                                                        {row.status}
                                                                                    </Chip>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>

                                                                {/* Table Footer */}
                                                                <div className="flex items-center justify-between text-sm text-gray-600">
                                                                    <span>Showing 8 of 1,247 results</span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Button variant="bordered" size="sm" isDisabled>
                                                                            Previous
                                                                        </Button>
                                                                        <span className="px-2">Page 1 of 156</span>
                                                                        <Button variant="bordered" size="sm">
                                                                            Next
                                                                        </Button>
                                                                    </div>
                                                                </div>

                                                                {/* Quick Stats */}
                                                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                                                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                                                                        <div className="text-lg font-bold text-blue-600">$1,569.91</div>
                                                                        <div className="text-xs text-blue-600">Total Value</div>
                                                                    </div>
                                                                    <div className="text-center p-3 bg-green-50 rounded-lg">
                                                                        <div className="text-lg font-bold text-green-600">8</div>
                                                                        <div className="text-xs text-green-600">Total Orders</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </ScrollShadow>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Tab>

                        <Tab
                            key="chart"
                            title={
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4" />
                                    Chart
                                </div>
                            }
                        >
                            <Card>
                                <CardBody>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-60px)]">
                                        {/* Chart Visualization - 2/3 width */}
                                        <div className="lg:col-span-2">
                                            <Card className="h-full">
                                                <CardBody>
                                                    <div className="mb-4">
                                                        <h2 className="text-lg font-semibold">Generated Chart</h2>
                                                        <p className="text-sm text-gray-500">Visual representation of your data query</p>
                                                    </div>
                                                    <div className="space-y-6">
                                                        <div className="h-[400px] bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                                                            <div className="text-center">
                                                                <div className="text-4xl mb-2">📈</div>
                                                                <p className="text-slate-600 font-medium">Sales Revenue - Q4 2023</p>
                                                                <p className="text-slate-500 text-sm">Chart visualization would appear here</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <Accordion>
                                                                <AccordionItem
                                                                    key="sql-query"
                                                                    aria-label="Generated SQL Query"
                                                                    title="Generated SQL Query"
                                                                    classNames={{ title: "text-lg font-semibold" }}
                                                                >
                                                                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                                                                        <pre>{`SELECT 
  DATE_TRUNC('month', order_date) as month,
  SUM(total_amount) as revenue
FROM sales_orders 
WHERE order_date >= '2023-10-01' 
  AND order_date < '2024-01-01'
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;`}</pre>
                                                                    </div>
                                                                </AccordionItem>
                                                            </Accordion>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>

                                        {/* Chart Description - 1/3 width */}
                                        <div className="lg:col-span-1">
                                            <Card className="h-full">
                                                <CardBody className="space-y-6">
                                                    <div className="mb-4">
                                                        <h2 className="text-lg font-semibold">Chart Analysis</h2>
                                                        <p className="text-sm text-gray-500">Insights and interpretation</p>
                                                    </div>

                                                    {/* Chart Summary */}
                                                    <div className="space-y-4">
                                                        <div>
                                                            <h4 className="font-semibold text-sm mb-2">Chart Type</h4>
                                                            <Chip variant="flat" color="primary">
                                                                Line Chart - Time Series
                                                            </Chip>
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold text-sm mb-2">Key Metrics</h4>
                                                            <div className="space-y-2">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-sm text-gray-600">Total Revenue</span>
                                                                    <span className="font-semibold text-green-600">$2.4M</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-sm text-gray-600">Growth Rate</span>
                                                                    <span className="font-semibold text-blue-600">+15%</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-sm text-gray-600">Peak Month</span>
                                                                    <span className="font-semibold">December</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Insights */}
                                                    <div>
                                                        <h4 className="font-semibold text-sm mb-3">Key Insights</h4>
                                                        <div className="space-y-3">
                                                            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                                                                <p className="text-sm text-green-800">
                                                                    <strong>Strong Q4 Performance:</strong> Revenue increased by 15% compared to Q3, with
                                                                    December showing the highest sales.
                                                                </p>
                                                            </div>
                                                            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                                                <p className="text-sm text-blue-800">
                                                                    <strong>Seasonal Trend:</strong> Clear upward trend during holiday season, indicating
                                                                    successful seasonal marketing campaigns.
                                                                </p>
                                                            </div>
                                                            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                                                                <p className="text-sm text-yellow-800">
                                                                    <strong>Opportunity:</strong> October showed slower growth - consider targeted promotions
                                                                    for early Q4 next year.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Recommendations */}
                                                    <div>
                                                        <h4 className="font-semibold text-sm mb-3">Recommendations</h4>
                                                        <div className="space-y-2">
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                                                <p className="text-sm text-gray-700">
                                                                    Replicate December's successful strategies in Q1 2024
                                                                </p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                                                <p className="text-sm text-gray-700">
                                                                    Investigate factors behind November's peak performance
                                                                </p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                                                <p className="text-sm text-gray-700">Plan early Q4 promotions to boost October sales</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Chart Actions */}
                                                    <div className="pt-4 border-t">
                                                        <div className="space-y-2">
                                                            <Button variant="bordered" className="w-full" size="sm">
                                                                Export Chart
                                                            </Button>
                                                            <Button variant="bordered" className="w-full" size="sm">
                                                                Share Analysis
                                                            </Button>
                                                            <Button variant="bordered" className="w-full" size="sm">
                                                                Create Alert
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Tab>

                        <Tab
                            key="dashboard"
                            title={
                                <div className="flex items-center gap-2">
                                    <Layout className="w-4 h-4" />
                                    Dashboard
                                </div>
                            }
                        >
                            <Card>
                                <CardBody>
                                    <div className="bg-white min-h-full h-[calc(100%-60px)]">
                                        <div className="grid grid-cols-12 gap-4 p-6">
                                            {/* Page Title */}
                                            <div className="col-span-12 mb-2">
                                                <h1 className="text-2xl font-bold text-black">Dashboard</h1>
                                            </div>

                                            {/* TOP SECTION (Row 1): KPI Cards */}
                                            <Card className="col-span-12 md:col-span-3 shadow-md rounded-2xl">
                                                <CardBody>
                                                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                        <h3 className="text-sm font-medium text-slate-600">Total Sales</h3>
                                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                            <span className="text-green-600 text-lg">💰</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-black">$43,000</div>
                                                        <p className="text-xs text-muted-foreground">
                                                            <span className="text-green-600">+12.5%</span> from last month
                                                        </p>
                                                        <div className="mt-3 h-2 bg-green-100 rounded-full">
                                                            <div className="h-2 bg-green-500 rounded-full w-3/4"></div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>

                                            <Card className="col-span-12 md:col-span-3 shadow-md rounded-2xl">
                                                <CardBody>
                                                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                        <h3 className="text-sm font-medium text-slate-600">User Count</h3>
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <span className="text-blue-600 text-lg">👥</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-black">12.4K</div>
                                                        <p className="text-xs text-muted-foreground">
                                                            <span className="text-blue-600">+8.2%</span> from last month
                                                        </p>
                                                        <div className="mt-3 h-2 bg-blue-100 rounded-full">
                                                            <div className="h-2 bg-blue-500 rounded-full w-4/5"></div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>

                                            <Card className="col-span-12 md:col-span-3 shadow-md rounded-2xl">
                                                <CardBody>
                                                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                        <h3 className="text-sm font-medium text-slate-600">Conversion Rate</h3>
                                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                            <span className="text-purple-600 text-lg">📊</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-black">3.24%</div>
                                                        <p className="text-xs text-muted-foreground">
                                                            <span className="text-red-600">-0.3%</span> from last quarter
                                                        </p>
                                                        <div className="mt-3 h-2 bg-purple-100 rounded-full">
                                                            <div className="h-2 bg-purple-500 rounded-full w-1/2"></div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>

                                            <Card className="col-span-12 md:col-span-3 shadow-md rounded-2xl">
                                                <CardBody>
                                                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                        <h3 className="text-sm font-medium text-slate-600">Orders Today</h3>
                                                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                            <span className="text-orange-600 text-lg">📦</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-black">1,429</div>
                                                        <p className="text-xs text-muted-foreground">
                                                            <span className="text-orange-600">+23.1%</span> from yesterday
                                                        </p>
                                                        <div className="mt-3 h-2 bg-orange-100 rounded-full">
                                                            <div className="h-2 bg-orange-500 rounded-full w-5/6"></div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>

                                            {/* MIDDLE SECTION (Row 2): Main Charts */}
                                            <Card className="col-span-12 md:col-span-6 shadow-md rounded-2xl">
                                                <CardBody>
                                                    <div className="mb-4">
                                                        <h2 className="text-lg font-semibold">Revenue Trend</h2>
                                                        <p className="text-sm text-gray-500">
                                                            Monthly revenue for the last 6 months
                                                        </p>
                                                    </div>
                                                    <div className="h-[300px] bg-slate-100 rounded-lg flex items-center justify-center">
                                                        <div className="text-center">
                                                            <div className="text-4xl mb-2">📈</div>
                                                            <p className="text-slate-600 font-medium">Line Chart</p>
                                                            <p className="text-slate-500 text-sm">Revenue over time</p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>

                                            <Card className="col-span-12 md:col-span-6 shadow-md rounded-2xl">
                                                <CardBody>
                                                    <div className="mb-4">
                                                        <h2 className="text-lg font-semibold">Sales by Category</h2>
                                                        <p className="text-sm text-gray-500">Product category breakdown</p>
                                                    </div>
                                                    <div className="h-[300px] bg-slate-100 rounded-lg flex items-center justify-center">
                                                        <div className="text-center">
                                                            <div className="text-4xl mb-2">📊</div>
                                                            <p className="text-slate-600 font-medium">Bar Chart</p>
                                                            <p className="text-slate-500 text-sm">Category performance</p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>

                                            {/* BOTTOM LEFT (Row 3): Data Table */}
                                            <Card className="col-span-12 md:col-span-8 shadow-md rounded-2xl">
                                                <CardBody>
                                                    <div className="mb-4">
                                                        <h2 className="text-lg font-semibold">Recent Transactions</h2>
                                                        <p className="text-sm text-gray-500">Latest customer transactions</p>
                                                    </div>
                                                    <Table aria-label="Recent transactions table">
                                                        <TableHeader>
                                                            <TableColumn>Customer</TableColumn>
                                                            <TableColumn>Product</TableColumn>
                                                            <TableColumn>Amount</TableColumn>
                                                            <TableColumn>Status</TableColumn>
                                                        </TableHeader>
                                                        <TableBody>
                                                            <TableRow key="1">
                                                                <TableCell className="font-medium">John Doe</TableCell>
                                                                <TableCell>Wireless Headphones</TableCell>
                                                                <TableCell className="text-green-600 font-semibold">$299.99</TableCell>
                                                                <TableCell>
                                                                    <Chip color="success" variant="flat" size="sm">Completed</Chip>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow key="2">
                                                                <TableCell className="font-medium">Jane Smith</TableCell>
                                                                <TableCell>Smart Watch</TableCell>
                                                                <TableCell className="text-green-600 font-semibold">$199.99</TableCell>
                                                                <TableCell>
                                                                    <Chip color="warning" variant="flat" size="sm">Processing</Chip>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow key="3">
                                                                <TableCell className="font-medium">Bob Johnson</TableCell>
                                                                <TableCell>Laptop Stand</TableCell>
                                                                <TableCell className="text-green-600 font-semibold">$89.99</TableCell>
                                                                <TableCell>
                                                                    <Chip color="success" variant="flat" size="sm">Completed</Chip>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow key="4">
                                                                <TableCell className="font-medium">Alice Brown</TableCell>
                                                                <TableCell>USB-C Cable</TableCell>
                                                                <TableCell className="text-green-600 font-semibold">$29.99</TableCell>
                                                                <TableCell>
                                                                    <Chip color="primary" variant="flat" size="sm">Shipped</Chip>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </CardBody>
                                            </Card>

                                            {/* BOTTOM RIGHT (Row 3): Summary + Highlights */}
                                            <Card className="col-span-12 md:col-span-4 shadow-md rounded-2xl">
                                                <CardBody>
                                                    <div className="space-y-4">
                                                        <div className="border-b pb-2">
                                                            <p className="text-sm text-black font-medium">Q3 revenue grew 18% over Q2</p>
                                                            <p className="text-xs text-slate-600 mt-1">Strong performance in electronics category</p>
                                                        </div>
                                                        <div className="border-b pb-2">
                                                            <p className="text-sm text-black font-medium">Customer retention improved to 85%</p>
                                                            <p className="text-xs text-slate-600 mt-1">Up 5% from previous quarter</p>
                                                        </div>
                                                        <div className="border-b pb-2">
                                                            <p className="text-sm text-black font-medium">Mobile traffic increased 23%</p>
                                                            <p className="text-xs text-slate-600 mt-1">Mobile optimization efforts paying off</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-black font-medium">Top product: Wireless Headphones</p>
                                                            <p className="text-xs text-slate-600 mt-1">Accounting for 32% of total sales</p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>

                {/* Right Sidebar - Fixed with proper positioning */}
                <div className="fixed right-0 top-20 bottom-0 w-80 bg-white border-l flex flex-col z-10">
                    <div className="p-6 flex-shrink-0">
                        <h3 className="text-lg font-semibold mb-4">Query Assistant</h3>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <ScrollShadow className="h-full">
                            <div className="px-6 pb-6 space-y-4">
                                {/* Database Files Selector */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Connected Databases</h4>
                                    <Popover isOpen={isFilesPopoverOpen} onOpenChange={setIsFilesPopoverOpen} placement="top">
                                        <PopoverTrigger>
                                            <Button variant="bordered" className="w-full justify-between">
                                                <span className="truncate">
                                                    {selectedFiles.length > 0 ? `${selectedFiles.length} databases selected` : "Select databases"}
                                                </span>
                                                <ChevronUp className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80 p-0">
                                            <div className="p-3 border-b">
                                                <h4 className="font-medium text-sm">Available Databases</h4>
                                                <p className="text-xs text-gray-500">Select databases to query</p>
                                            </div>
                                            <ScrollShadow className="max-h-64">
                                                <div className="p-2">
                                                    {availableFiles.map((file) => (
                                                        <div
                                                            key={file.id}
                                                            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                                                            onClick={() => handleFileToggle(file.id)}
                                                        >
                                                            <div className="flex items-center space-x-2 flex-1">
                                                                <span className="text-lg">{file.icon}</span>
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium">{file.name}</p>
                                                                    <p className="text-xs text-gray-500 capitalize">{file.type}</p>
                                                                </div>
                                                            </div>
                                                            {selectedFiles.includes(file.id) && <Check className="h-4 w-4 text-blue-600" />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollShadow>
                                        </PopoverContent>
                                    </Popover>

                                    {/* Selected Files Display */}
                                    {selectedFiles.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {selectedFiles.map((fileId) => {
                                                const file = availableFiles.find((f) => f.id === fileId)
                                                return (
                                                    <Chip key={fileId} variant="flat" size="sm" className="text-xs">
                                                        <span className="mr-1">{file?.icon}</span>
                                                        {file?.name}
                                                    </Chip>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Query History */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Queries</h4>
                                    <div className="space-y-2">
                                        {queryHistory.map((item) => (
                                            <Card key={item.id} className="p-2 cursor-pointer hover:bg-gray-50 transition-colors">
                                                <CardBody className="p-0">
                                                    <p className="text-xs text-gray-600 truncate">{item.query}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{item.timestamp.toLocaleTimeString()}</p>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollShadow>
                    </div>

                    {/* Chat Input - Fixed at bottom */}
                    <div className="p-6 border-t bg-white flex-shrink-0">
                        <div className="space-y-3">
                            <Textarea
                                placeholder="Ask about your data..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="resize-none"
                                rows={3}
                            />
                            <Button
                                onClick={handleSendMessage}
                                color="primary"
                                className="w-full"
                                isDisabled={!chatInput.trim()}
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
