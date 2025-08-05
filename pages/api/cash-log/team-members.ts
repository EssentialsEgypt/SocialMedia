import { NextApiRequest, NextApiResponse } from 'next'

// Mock database for demonstration
let teamMembers = [
    { id: 1, name: "Ahmed", monthly_salary: 10000, status: 'active' },
    { id: 2, name: "Omar", monthly_salary: 8000, status: 'active' },
    { id: 3, name: "Sarah", monthly_salary: 12000, status: 'active' },
    { id: 4, name: "Fatima", monthly_salary: 9000, status: 'active' },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    switch (method) {
        case 'GET':
            // Get all team members
            return res.status(200).json({ teamMembers })

        case 'POST':
            // Add new team member
            const newMember = {
                id: Date.now(),
                ...req.body
            }

            teamMembers.push(newMember)
            return res.status(201).json({ teamMember: newMember })

        case 'PUT':
            // Update existing team member
            const { id } = req.query
            const memberIndex = teamMembers.findIndex(member => member.id === parseInt(id as string))

            if (memberIndex === -1) {
                return res.status(404).json({ error: 'Team member not found' })
            }

            teamMembers[memberIndex] = { ...teamMembers[memberIndex], ...req.body }
            return res.status(200).json({ teamMember: teamMembers[memberIndex] })

        case 'DELETE':
            // Delete team member
            const deleteId = req.query.id
            const deleteIndex = teamMembers.findIndex(member => member.id === parseInt(deleteId as string))

            if (deleteIndex === -1) {
                return res.status(404).json({ error: 'Team member not found' })
            }

            const deletedMember = teamMembers.splice(deleteIndex, 1)[0]
            return res.status(200).json({ teamMember: deletedMember })

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
            return res.status(405).json({ error: `Method ${method} Not Allowed` })
    }
} 