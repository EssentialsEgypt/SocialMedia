import { NextApiRequest, NextApiResponse } from 'next'

// Mock database for demonstration
let cashLogEntries = [
    {
        id: 1,
        date: "2024-01-15",
        description: "Instagram – Story Campaign – August 3",
        amount: -2000,
        category: "Ad Spend",
        subcategory: "Instagram Ads",
        transaction_type: "expense",
        source: "instagram",
        platform: "instagram",
        tags: ["@campaign", "story"],
        paid: false,
        reimbursed: false
    },
    {
        id: 2,
        date: "2024-01-10",
        description: "Salary – @Ahmed",
        amount: -10000,
        category: "Salary",
        transaction_type: "expense",
        source: "salary",
        tags: ["@Ahmed", "salary"],
        paid: true,
        reimbursed: false
    },
    {
        id: 3,
        date: "2024-01-12",
        description: "Bonus – @Omar",
        amount: -2000,
        category: "Bonus",
        transaction_type: "expense",
        source: "bonus",
        tags: ["@Omar", "bonus", "salary"],
        paid: false,
        reimbursed: false
    }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { id } = req.query

    if (method !== 'PUT') {
        res.setHeader('Allow', ['PUT'])
        return res.status(405).json({ error: `Method ${method} Not Allowed` })
    }

    const entryId = parseInt(id as string)
    const entryIndex = cashLogEntries.findIndex(entry => entry.id === entryId)

    if (entryIndex === -1) {
        return res.status(404).json({ error: 'Entry not found' })
    }

    // Mark the entry as reimbursed
    cashLogEntries[entryIndex] = {
        ...cashLogEntries[entryIndex],
        reimbursed: true
    }

    return res.status(200).json({
        entry: cashLogEntries[entryIndex],
        message: 'Entry reimbursed successfully'
    })
} 