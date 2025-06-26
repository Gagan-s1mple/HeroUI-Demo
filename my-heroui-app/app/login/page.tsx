"use client";

import React from 'react';
import { Card, Input, Button, Link } from "@heroui/react";
import { BarChart2 } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-content2/40 p-4">
      <Card className="w-full max-w-md bg-background shadow-lg">
        <div className="p-8 space-y-6">
          {/* App Logo Placeholder */}
          <div className="flex justify-center">
            <BarChart2 className="w-12 h-12 text-primary" />
          </div>

          {/* Tagline */}
          <p className="text-center text-lg font-medium text-foreground-600">
            Query. Predict. Optimize. All in one place.
          </p>

          {/* Login Form */}
          <form className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              variant="bordered"
            />
            <Button color="primary" className="w-full font-medium">
              Login
            </Button>
          </form>

          {/* Links */}
          <div className="flex justify-between text-sm">
            <Link href="#" color="primary">Forgot Password?</Link>
            <Link href="#" color="primary">Sign Up</Link>
          </div>
        </div>
      </Card>
    </div>
  );
}