'use client'

import React from 'react';
import { Tabs, Tab, Card, CardBody, Input, Button, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Alert } from "@heroui/react";
import { UploadCloud, Database, FileText, Server, GanttChart, Circle } from "lucide-react";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("workspace");
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [previewData, setPreviewData] = React.useState<string[][]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = React.useState<string | null>(null);
  const [selectedDbType, setSelectedDbType] = React.useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulating preview data
      setPreviewData([
        ["id", "name", "email", "age"],
        ["1", "John Doe", "john@example.com", "30"],
        ["2", "Jane Smith", "jane@example.com", "28"],
        ["3", "Bob Johnson", "bob@example.com", "35"],
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-5xl mx-auto">
        <CardBody>
          <Tabs 
            selectedKey={selectedTab} 
            onSelectionChange={setSelectedTab as any}
            variant="underlined"
            color="primary"
            className="w-full"
          >
            <Tab key="workspace" title="Workspace & Upload">
              <div className="space-y-6 py-4">
                <Select 
                  label="Select Existing Workspace" 
                  placeholder="Choose a workspace or create new"
                  onChange={(value) => setSelectedWorkspace(value as string)}
                >
                  <SelectItem key="new">Create New Workspace</SelectItem>
                  <SelectItem key="workspace1">Workspace 1</SelectItem>
                  <SelectItem key="workspace2">Workspace 2</SelectItem>
                  <SelectItem key="workspace3">Workspace 3</SelectItem>
                </Select>

                {selectedWorkspace === "new" && (
                  <Input label="New Workspace Name" placeholder="Enter workspace name" />
                )}

                <div className="border-2 border-dashed border-default-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept=".csv,.sqlite,.duckdb"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <UploadCloud className="w-12 h-12 text-default-400 mx-auto mb-2" />
                    <p>Drag and drop or click to upload .csv/.sqlite/.duckdb file (optional)</p>
                  </label>
                </div>

                {uploadedFile && (
                  <>
                    <Table aria-label="Preview table" removeWrapper>
                      <TableHeader>
                        {previewData[0].map((header, index) => (
                          <TableColumn key={index}>{header}</TableColumn>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {previewData.slice(1).map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <TableCell key={cellIndex}>{cell}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}

                <Button color="primary">
                  {selectedWorkspace === "new" ? "Create Workspace and Proceed" : "Proceed"}
                </Button>
              </div>
            </Tab>
            <Tab key="connect" title="Connect">
              <div className="flex gap-6 py-4">
                <div className="w-3/4 space-y-6">
                  <Select 
                    label="Database Type" 
                    onChange={(value) => setSelectedDbType(value as string)}
                  >
                    <SelectItem key="mysql">MySQL</SelectItem>
                    <SelectItem key="postgresql">PostgreSQL</SelectItem>
                    <SelectItem key="mongodb">MongoDB</SelectItem>
                  </Select>
                  <Input label="Host" placeholder="Enter host" />
                  <Input label="Port" placeholder="Enter port" />
                  <Input label="Username" placeholder="Enter username" />
                  <Input type="password" label="Password" placeholder="Enter password" />
                  <Input label="Database Name" placeholder="Enter database name" />
                  <Button color="primary">Test Connection</Button>
                  <Alert color="success">Connection successful!</Alert>
                </div>
                <div className="w-1/4 bg-content2 rounded-lg p-4 flex flex-col items-center justify-center">
                  {selectedDbType ? (
                    <>
                      {selectedDbType === "mysql" && <Database className="w-16 h-16 mb-4 text-blue-600" />}
                      {selectedDbType === "postgresql" && <GanttChart className="w-16 h-16 mb-4 text-blue-800" />}
                      {selectedDbType === "mongodb" && <Circle className="w-16 h-16 mb-4 text-green-600" />}
                      <p className="text-center font-semibold">
                        {selectedDbType === "mysql" ? "MySQL" :
                         selectedDbType === "postgresql" ? "PostgreSQL" :
                         selectedDbType === "mongodb" ? "MongoDB" :
                         "Selected Database"}
                      </p>
                    </>
                  ) : (
                    <>
                      <Database className="w-16 h-16 mb-4 text-default-400" />
                      <p className="text-center text-default-400">No database selected</p>
                    </>
                  )}
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default App;