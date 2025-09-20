"use client"

import { useState } from "react"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"
import { ExpenseOverview } from "@/components/expense-overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, PlusCircle, BarChart3 } from "lucide-react"

export interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: string
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      amount: 45.99,
      category: "Food",
      description: "Lunch at restaurant",
      date: "2024-01-15",
    },
    {
      id: "2",
      amount: 120.0,
      category: "Transportation",
      description: "Gas for car",
      date: "2024-01-14",
    },
    {
      id: "3",
      amount: 25.5,
      category: "Entertainment",
      description: "Movie tickets",
      date: "2024-01-13",
    },
  ])

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Budjet Buddy</h1>
          </div>
          <p className="text-muted-foreground">Track your expenses and manage your budget effectively</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{expenses.length} transactions this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average per Day</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">₹{(totalExpenses / 30).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Based on monthly total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium"></CardTitle>
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{new Set(expenses.map((e) => e.category)).size}</div>
              <p className="text-xs text-muted-foreground">Avtive category</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="add" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="add">Add Expense</TabsTrigger>
            <TabsTrigger value="list">Expense List</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-6">
            <ExpenseForm onAddExpense={addExpense} />
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <ExpenseOverview expenses={expenses} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
