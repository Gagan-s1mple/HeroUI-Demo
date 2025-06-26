"use client"

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Textarea,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Alert,
  ScrollShadow,
  Badge,
  Avatar,
} from "@heroui/react";
import {
  Play,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  AlertCircle,
  TableIcon,
  Code,
  TrendingUp,
} from "lucide-react";

interface TableData {
  [key: string]: any;
}

export default function DataExplorationInterface() {
  // Data Table State
  const [selectedTable, setSelectedTable] = useState("sales_data");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<TableData[]>([
    {
      id: 1,
      customer_name: "John Doe",
      product: "Laptop",
      amount: 1299.99,
      date: "2024-01-15",
    },
    {
      id: 2,
      customer_name: "Jane Smith",
      product: "Mouse",
      amount: 29.99,
      date: "2024-01-16",
    },
    {
      id: 3,
      customer_name: "Bob Johnson",
      product: "Keyboard",
      amount: 89.99,
      date: "2024-01-17",
    },
    {
      id: 4,
      customer_name: "Alice Brown",
      product: "Monitor",
      amount: 299.99,
      date: "2024-01-18",
    },
    {
      id: 5,
      customer_name: "Charlie Wilson",
      product: "Headphones",
      amount: 199.99,
      date: "2024-01-19",
    },
  ]);

  // SQL Query State
  const [sqlQuery, setSqlQuery] = useState(
    "SELECT * FROM sales_data LIMIT 10;"
  );
  const [queryResult, setQueryResult] = useState<TableData[]>([]);
  const [queryError, setQueryError] = useState("");
  const [isQueryRunning, setIsQueryRunning] = useState(false);

  // Chart Builder State
  const [chartType, setChartType] = useState("");
  const [xAxisColumn, setXAxisColumn] = useState("");
  const [yAxisColumns, setYAxisColumns] = useState<string[]>([]);
  const [chartTitle, setChartTitle] = useState("");

  // Mock data
  const availableTables = [
    "sales_data",
    "customers",
    "products",
    "orders",
    "inventory",
  ];
  const availableColumns = [
    "id",
    "customer_name",
    "product",
    "amount",
    "date",
    "category",
    "quantity",
  ];
  const chartTypes = ["Bar", "Line", "Pie", "Scatter"];

  const handleTableChange = (tableName: string) => {
    setSelectedTable(tableName);
    // Hero UI doesn't have toast component in the examples provided
  };

  const handleRunQuery = async () => {
    if (!sqlQuery.trim()) return;

    setIsQueryRunning(true);
    setQueryError("");

    // Simulate query execution
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate random success/failure
    const isSuccess = Math.random() > 0.2;

    if (isSuccess) {
      setQueryResult([
        { customer_name: "John Doe", total_amount: 1299.99, order_count: 3 },
        { customer_name: "Jane Smith", total_amount: 459.97, order_count: 2 },
        { customer_name: "Bob Johnson", total_amount: 189.98, order_count: 1 },
      ]);
    } else {
      setQueryError(
        "Syntax error: Invalid column name 'invalid_column' in SELECT statement"
      );
      setQueryResult([]);
    }

    setIsQueryRunning(false);
  };

  const handleGenerateChart = () => {
    if (!chartType || !xAxisColumn) return;
  };

  const handleYAxisChange = (column: string) => {
    setYAxisColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Explorer</h1>
            <p className="text-gray-600">
              Explore, query, and visualize your data
            </p>
          </div>
          <Badge color="success" variant="flat">
            Connected
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* TOP SECTION: Data Table Viewer */}
        <Card className="shadow-sm">
          <CardBody className="space-y-4">
            <div className="flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold">Data Preview</h2>
            </div>
            <p className="text-gray-600">
              Browse and search through your database tables
            </p>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <label>Table:</label>
                <Select
                  selectedKeys={[selectedTable]}
                  onChange={(e) => handleTableChange(e.target.value)}
                  className="w-48"
                >
                  {availableTables.map((table) => (
                    <SelectItem key={table} value={table}>
                      {table}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="flex items-center gap-2 flex-1">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </div>

            {/* Data Table */}
            <ScrollShadow className="w-full">
              <Table aria-label="Example table">
                <TableHeader>
                  <TableColumn>ID</TableColumn>
                  <TableColumn>Customer Name</TableColumn>
                  <TableColumn>Product</TableColumn>
                  <TableColumn>Amount</TableColumn>
                  <TableColumn>Date</TableColumn>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.customer_name}</TableCell>
                      <TableCell>{row.product}</TableCell>
                      <TableCell>${row.amount}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollShadow>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing 1-5 of 1,234 rows</p>
              <div className="flex items-center gap-2">
                <Button variant="bordered" disabled>
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button variant="bordered">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <Divider />

        {/* MIDDLE SECTION: SQL Query Editor */}
        <Card className="shadow-sm">
          <CardBody className="space-y-4">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold">Run SQL</h2>
            </div>
            <p className="text-gray-600">
              Execute custom SQL queries against your database
            </p>

            {/* SQL Input */}
            <div className="space-y-2">
              <label>SQL Query</label>
              <Textarea
                placeholder="Enter your SQL query here..."
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="font-mono text-sm min-h-[120px]"
              />
            </div>

            <Button
              onClick={handleRunQuery}
              disabled={isQueryRunning || !sqlQuery.trim()}
              color="primary"
            >
              {isQueryRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Query
                </>
              )}
            </Button>

            {/* Query Error */}
            {queryError && (
              <Alert
                color="danger"
                description={queryError}
                startContent={<AlertCircle className="h-4 w-4" />}
              />
            )}

            {/* Query Results */}
            {queryResult.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Query Results</h4>
                <ScrollShadow className="w-full">
                  <Table>
                    <TableHeader>
                      <TableColumn>Customer Name</TableColumn>
                      <TableColumn>Total Amount</TableColumn>
                      <TableColumn>Order Count</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {queryResult.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.customer_name}</TableCell>
                          <TableCell>${row.total_amount}</TableCell>
                          <TableCell>{row.order_count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollShadow>
              </div>
            )}
          </CardBody>
        </Card>

        <Divider />

        {/* BOTTOM SECTION: Manual Chart Builder */}
        <Card className="shadow-sm">
          <CardBody className="space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold">Manual Chart</h2>
            </div>
            <p className="text-gray-600">Build custom charts from your data</p>

            {/* Chart Configuration Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label>Chart Type</label>
                <Select
                  selectedKeys={chartType ? [chartType] : []}
                  onChange={(e) => setChartType(e.target.value)}
                >
                  {chartTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label>X-Axis Column</label>
                <Select
                  selectedKeys={xAxisColumn ? [xAxisColumn] : []}
                  onChange={(e) => setXAxisColumn(e.target.value)}
                >
                  {availableColumns.map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label>Y-Axis Columns</label>
                <div className="space-y-2">
                  {availableColumns.slice(0, 4).map((column) => (
                    <div key={column} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`y-axis-${column}`}
                        checked={yAxisColumns.includes(column)}
                        onChange={() => handleYAxisChange(column)}
                        className="rounded"
                      />
                      <label htmlFor={`y-axis-${column}`} className="text-sm">
                        {column}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label>Chart Title</label>
                <Input
                  placeholder="Enter chart title"
                  value={chartTitle}
                  onChange={(e) => setChartTitle(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleGenerateChart} color="primary">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Chart
            </Button>

            {/* Chart Placeholder */}
            <div className="h-[300px] bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 font-medium">
                  {chartType && xAxisColumn
                    ? `${chartType} Chart Preview`
                    : "Chart Preview"}
                </p>
                <p className="text-slate-500 text-sm">
                  {chartType && xAxisColumn
                    ? `${chartType} chart with ${xAxisColumn} vs ${yAxisColumns.join(", ") || "Y-axis"}`
                    : "Configure chart settings and click Generate Chart"}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}