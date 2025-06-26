"use client"

import type React from "react"

import { useState } from "react"
import {
  Card,
  CardBody,
  Button,
  Textarea,
  Input,
  Switch,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Badge,
  Tabs,
  Tab,
  ScrollShadow,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem
} from "@heroui/react"
import {
  TrendingUp,
  Target,
  Play,
  MoreVertical,
  Save,
  Download,
  Trash2,
  Clock,
  Bot,
  User,
  ChevronUp,
  Check,
  Plus,
  X,
} from "lucide-react"

interface DatabaseFile {
  id: string
  name: string
  icon: string
  type: "mysql" | "postgresql" | "mongodb" | "sqlite" | "redis"
}

interface QueryHistory {
  id: string
  timestamp: Date
  query: string
  result: string
  type: "predict" | "optimize"
}

export default function ModelingInterface() {
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("Linear")
  const [multipleTargets, setMultipleTargets] = useState(false)
  const [multiObjectiveOptimization, setMultiObjectiveOptimization] = useState(false)
  const [activeTab, setActiveTab] = useState("predict")
  const [queryHistory, setQueryHistory] = useState<QueryHistory[]>([
    {
      id: "1",
      timestamp: new Date(Date.now() - 1800000),
      query: "Predict next quarter revenue based on marketing spend",
      result: "Forecasted Revenue: $234K (95% confidence)",
      type: "predict",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 900000),
      query: "Optimize marketing budget allocation across channels",
      result: "Optimal allocation: Digital 60%, TV 25%, Print 15%",
      type: "optimize",
    },
  ])

  const [selectedFiles, setSelectedFiles] = useState<string[]>(["sales-db", "customer-db"])
  const [isFilesPopoverOpen, setIsFilesPopoverOpen] = useState(false)

  // Manual form states
  const [predictors, setPredictors] = useState(["Marketing Spend", "Sales Team Size", "Customer Count"])
  const [targets, setTargets] = useState(["Revenue"])
  const [predictorValues, setPredictorValues] = useState(["50000", "12", "1500"])
  const [targetValues, setTargetValues] = useState([""])

  const availableFiles: DatabaseFile[] = [
    { id: "sales-db", name: "Sales Database", icon: "🐬", type: "mysql" },
    { id: "customer-db", name: "Customer Analytics", icon: "🐘", type: "postgresql" },
    { id: "inventory-db", name: "Inventory System", icon: "🍃", type: "mongodb" },
    { id: "reports-db", name: "Financial Reports", icon: "📁", type: "sqlite" },
    { id: "cache-db", name: "Cache Store", icon: "🔴", type: "redis" },
    { id: "marketing-db", name: "Marketing Data", icon: "🐬", type: "mysql" },
    { id: "analytics-db", name: "Web Analytics", icon: "🐘", type: "postgresql" },
  ]

  const handleFileToggle = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const handleRunQuery = () => {
    if (!naturalLanguageInput.trim()) return

    const newQuery: QueryHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      query: naturalLanguageInput,
      result: "Processing... Model results will appear here",
      type: activeTab as "predict" | "optimize",
    }

    setQueryHistory((prev) => [newQuery, ...prev])
    setNaturalLanguageInput("")

    // Simulate processing
    setTimeout(() => {
      setQueryHistory((prev) =>
        prev.map((item) =>
          item.id === newQuery.id ? { ...item, result: "Revenue forecast: $287K with 92% accuracy" } : item,
        ),
      )
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleRunQuery()
    }
  }

  const addPredictor = () => {
    setPredictors([...predictors, ""])
    setPredictorValues([...predictorValues, ""])
  }

  const removePredictor = (index: number) => {
    setPredictors(predictors.filter((_, i) => i !== index))
    setPredictorValues(predictorValues.filter((_, i) => i !== index))
  }

  const addTarget = () => {
    setTargets([...targets, ""])
    setTargetValues([...targetValues, ""])
  }

  const removeTarget = (index: number) => {
    setTargets(targets.filter((_, i) => i !== index))
    setTargetValues(targetValues.filter((_, i) => i !== index))
  }

  const updatePredictor = (index: number, value: string) => {
    const newPredictors = [...predictors]
    newPredictors[index] = value
    setPredictors(newPredictors)
  }

  const updateTarget = (index: number, value: string) => {
    const newTargets = [...targets]
    newTargets[index] = value
    setTargets(newTargets)
  }

  const updatePredictorValue = (index: number, value: string) => {
    const newValues = [...predictorValues]
    newValues[index] = value
    setPredictorValues(newValues)
  }

  const updateTargetValue = (index: number, value: string) => {
    const newValues = [...targetValues]
    newValues[index] = value
    setTargetValues(newValues)
  }

  const optimizationData = [
    { variable: "Marketing Spend", current: "$50K", optimized: "$65K", impact: "+15%" },
    { variable: "Sales Team Size", current: "12", optimized: "15", impact: "+8%" },
    { variable: "Product Price", current: "$299", optimized: "$279", impact: "+12%" },
    { variable: "Ad Frequency", current: "3x/week", optimized: "5x/week", impact: "+6%" },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Modeling Studio</h1>
            <p className="text-gray-600">Build predictive models and optimization scenarios</p>
          </div>
          <Badge variant="flat" color="success" className="bg-green-50 text-green-700 border-green-200">
            Model Ready
          </Badge>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Manual Forms */}
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-6 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-1">Manual Mode</h3>
            <p className="text-sm text-gray-600 mb-4">Configure parameters manually</p>
          </div>

          <div className="flex-1 overflow-hidden">
            <ScrollShadow className="h-full">
              <div className="px-6 pb-6 space-y-4">
                {/* Manual Input Form */}
                <div className="space-y-4">
                  {/* Show predictors only for predict tab */}
                  {activeTab === "predict" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Predictors</label>
                      <div className="space-y-2">
                        {predictors.map((predictor, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder="Predictor name"
                              value={predictor}
                              onChange={(e) => updatePredictor(index, e.target.value)}
                              className="flex-1"
                            />
                            <Input
                              placeholder="Value"
                              value={predictorValues[index]}
                              onChange={(e) => updatePredictorValue(index, e.target.value)}
                              className="w-20"
                            />
                            {predictors.length > 1 && (
                              <Button
                                variant="light"
                                size="sm"
                                onClick={() => removePredictor(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      <Button variant="bordered" size="sm" className="w-full" onClick={addPredictor}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Predictor
                      </Button>
                    </div>
                  )}

                  {/* Target Variables */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {activeTab === "optimize" ? "Target Variables to Optimize" : "Target Variables"}
                    </label>
                    <div className="space-y-2">
                      {targets.map((target, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="Target variable name"
                            value={target}
                            onChange={(e) => updateTarget(index, e.target.value)}
                            className="flex-1"
                          />
                          {/* Show target values input only for optimize tab */}
                          {activeTab === "optimize" && (
                            <Input
                              placeholder="Target value"
                              value={targetValues[index]}
                              onChange={(e) => updateTargetValue(index, e.target.value)}
                              className="w-24"
                            />
                          )}
                          {targets.length > 1 && (
                            <Button
                              variant="light" 
                              size="sm"
                              onClick={() => removeTarget(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Show add target button for both modes */}
                    <Button variant="bordered" size="sm" className="w-full" onClick={addTarget}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Target
                    </Button>
                  </div>

                  <Button className="w-full bg-black hover:bg-gray-800 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    {activeTab === "optimize" ? "Optimize" : "Predict"}
                  </Button>
                </div>
              </div>
            </ScrollShadow>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 pr-80">
          <Tabs aria-label="Modeling Tabs" className="w-full" onSelectionChange={(key) => setActiveTab(key as string)} selectedKey={activeTab}>
            <Tab
              key="predict"
              title={
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Predict
                </div>
              }
            >
              <Card>
                <CardBody>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">Prediction Results</h2>
                        <p className="text-sm text-gray-500">Model output and forecast visualization</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={multipleTargets}
                          onChange={(e) => setMultipleTargets(e.target.checked)}
                          size="sm"
                        />
                        <label className="text-sm">
                          Multiple Target Variables
                        </label>
                      </div>
                    </div>
                    {/* Predicted Value */}
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <h3 className="text-2xl font-bold text-green-600 mb-2">Forecasted Revenue: $234K</h3>
                      <p className="text-gray-600">95% Confidence Interval: $198K - $270K</p>
                      <p className="text-sm text-gray-500 mt-2">Based on Random Forest model</p>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="h-[300px] bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600 font-medium">Revenue Forecast Timeline</p>
                        <p className="text-slate-500 text-sm">Interactive chart would appear here</p>
                      </div>
                    </div>

                    {/* Model Formula */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Generated Model (Random Forest)</h4>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                        <pre>{`Model: Random Forest Regressor
Features: marketing_spend, sales_team_size, customer_count
Trees: 100, Max Depth: 8

Feature Importance:
- marketing_spend: 0.45
- sales_team_size: 0.32  
- customer_count: 0.23

Model Performance:
R² = 0.847, RMSE = $18,234
Cross-validation score: 0.823`}</pre>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            <Tab
              key="optimize"
              title={
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 mr-2" />
                  Optimize
                </div>
              }
            >
              <Card>
                <CardBody>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">Optimization Results</h2>
                        <p className="text-sm text-gray-500">Optimal parameter values and expected outcomes</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={multiObjectiveOptimization}
                          onChange={(e) => setMultiObjectiveOptimization(e.target.checked)}
                          size="sm"
                        />
                        <label className="text-sm">
                          Multi-Objective Optimization
                        </label>
                      </div>
                    </div>
                    {/* Optimization Goal */}
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <h3 className="text-xl font-bold text-blue-600">Maximize Revenue</h3>
                      <p className="text-gray-600 mt-1">Expected improvement: +23% ($58K increase)</p>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="h-[300px] bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                      <div className="text-center">
                        <Target className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600 font-medium">Optimization Impact Analysis</p>
                        <p className="text-slate-500 text-sm">Radar/bar chart visualization would appear here</p>
                      </div>
                    </div>

                    {/* Optimization Table */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Optimized Variables</h4>
                      <Table>
                        <TableHeader>
                          <TableColumn>Variable</TableColumn>
                          <TableColumn>Current Value</TableColumn>
                          <TableColumn>Optimized Value</TableColumn>
                          <TableColumn>Expected Impact</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {optimizationData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{row.variable}</TableCell>
                              <TableCell>{row.current}</TableCell>
                              <TableCell className="font-semibold text-blue-600">{row.optimized}</TableCell>
                              <TableCell>
                                <Badge variant="flat" color="success" className="bg-green-100 text-green-700">
                                  {row.impact}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>

        {/* Right Sidebar - Fixed */}
        <div className="fixed right-0 top-20 bottom-0 w-80 bg-white border-l flex flex-col">
          <div className="p-6 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-1">AI Assistant</h3>
            <p className="text-sm text-gray-600 mb-4">Describe what you want to predict or optimize</p>
          </div>

          <div className="flex-1 overflow-hidden">
            <ScrollShadow className="h-full">
              <div className="px-6 pb-6 space-y-4">
                {/* Database Files Selector */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Connected Databases</h4>
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
                        <p className="text-xs text-gray-500">Select databases for modeling</p>
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
                    <div className="flex flex-wrap gap-1">
                      {selectedFiles.map((fileId) => {
                        const file = availableFiles.find((f) => f.id === fileId)
                        return (
                          <Badge key={fileId} variant="flat" color="default" className="text-xs">
                            <span className="mr-1">{file?.icon}</span>
                            {file?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  )}
                </div>

                <Divider />

                {/* Natural Language Input */}
                <div className="space-y-3">
                  <Textarea
                    placeholder={
                      activeTab === "predict"
                        ? "e.g., 'Predict next quarter sales based on marketing spend and seasonality'"
                        : "e.g., 'Optimize marketing budget allocation to maximize ROI'"
                    }
                    value={naturalLanguageInput}
                    onChange={(e) => setNaturalLanguageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="resize-none"
                    rows={3}
                  />
                  <Button
                    onClick={handleRunQuery}
                    className="w-full bg-black hover:bg-gray-800 text-white"
                    isDisabled={!naturalLanguageInput.trim()}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Run
                  </Button>
                </div>

                <Divider />

                {/* Query History */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Query History</h4>
                  <div className="space-y-3">
                    {queryHistory.map((item) => (
                      <Card key={item.id} className="p-3 border-l-4 border-l-blue-500">
                        <CardBody className="p-0">
                          <div className="flex items-start gap-2 mb-2">
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.timestamp.toLocaleTimeString()}
                              </p>
                              <p className="text-sm font-medium mt-1">{item.query}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-700">{item.result}</p>
                              <Badge variant="flat" color="primary" className="mt-1 text-xs">
                                {item.type}
                              </Badge>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollShadow>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Popover placement="top">
        <PopoverTrigger>
          <Button
            size="lg"
            isIconOnly
            className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-black hover:bg-gray-800 text-white shadow-lg"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="space-y-2 p-2">
            <Button variant="light" className="w-full justify-start" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Scenario
            </Button>
            <Button variant="light" className="w-full justify-start" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
            <Divider className="my-1" />
            <Button variant="light" className="w-full justify-start text-red-600 hover:text-red-700" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Workspace
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
