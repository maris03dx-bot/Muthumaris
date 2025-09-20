"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Calendar, DollarSign } from "lucide-react"
import type { Expense } from "@/app/page"

interface ExpenseListProps {
  expenses: Expense[]
  onDeleteExpense: (id: string) => void
}

const categoryColors: Record<string, string> = {
  Food: "bg-orange-100 text-orange-800",
  Transportation: "bg-blue-100 text-blue-800",
  Entertainment: "bg-purple-100 text-purple-800",
  Shopping: "bg-pink-100 text-pink-800",
  Bills: "bg-red-100 text-red-800",
  Healthcare: "bg-green-100 text-green-800",
  Education: "bg-indigo-100 text-indigo-800",
  Travel: "bg-yellow-100 text-yellow-800",
  Other: "bg-gray-100 text-gray-800",
}

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No expenses yet</h3>
          <p className="text-muted-foreground text-center">
            Start tracking your expenses by adding your first transaction.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Recent Expenses ({expenses.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-card/80 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-card-foreground">{expense.description}</h3>
                  <Badge variant="secondary" className={categoryColors[expense.category] || categoryColors.Other}>
                    {expense.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">${expense.amount.toFixed(2)}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDeleteExpense(expense.id)}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
