// AI Chat Service Layer
// Handles all AI Chat and Multi-Agent Collaboration functionality

export interface ChatMessage {
    id: string
    type: 'user' | 'ai' | 'agent' | 'system'
    content: string
    agentName?: string
    timestamp: Date
    metadata?: any
    functionCalls?: any[]
    toolResults?: any[]
}

export interface ChatSession {
    id: string
    userId: string
    sessionName: string
    sessionType: 'chat' | 'collab_room' | 'automation_builder'
    scenario?: string
    selectedAgents?: string[]
    status: 'active' | 'completed' | 'archived'
    metadata?: any
    createdAt: Date
    updatedAt: Date
}

export interface Agent {
    name: string
    displayName: string
    description: string
    icon: string
    capabilities: string[]
    isActive: boolean
}

export interface AutomationRule {
    id: string
    userId: string
    name: string
    description: string
    triggerCondition: any
    actions: any[]
    isActive: boolean
    lastTriggered?: Date
    triggerCount: number
    createdAt: Date
    updatedAt: Date
}

export interface UserMemory {
    id: string
    userId: string
    memoryType: 'campaign' | 'drop' | 'performance' | 'preference' | 'interaction'
    key: string
    value: string
    importanceScore: number
    lastAccessed: Date
    createdAt: Date
    updatedAt: Date
}

export interface DataConnection {
    id: string
    userId: string
    connectionType: 'meta_ads' | 'shopify' | 'google_sheets' | 'custom'
    connectionName: string
    credentials?: any
    isActive: boolean
    lastSync?: Date
    createdAt: Date
    updatedAt: Date
}

class AIChatService {
    private baseUrl = '/api/ai-chat'

    // Chat Session Management
    async createSession(sessionData: Partial<ChatSession>): Promise<ChatSession> {
        try {
            const response = await fetch(`${this.baseUrl}/sessions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sessionData)
            })

            if (!response.ok) throw new Error('Failed to create session')
            return await response.json()
        } catch (error) {
            console.error('Error creating chat session:', error)
            throw error
        }
    }

    async getSessions(userId: string): Promise<ChatSession[]> {
        try {
            const response = await fetch(`${this.baseUrl}/sessions?userId=${userId}`)
            if (!response.ok) throw new Error('Failed to fetch sessions')
            return await response.json()
        } catch (error) {
            console.error('Error fetching sessions:', error)
            throw error
        }
    }

    async updateSession(sessionId: string, updates: Partial<ChatSession>): Promise<ChatSession> {
        try {
            const response = await fetch(`${this.baseUrl}/sessions/${sessionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            })

            if (!response.ok) throw new Error('Failed to update session')
            return await response.json()
        } catch (error) {
            console.error('Error updating session:', error)
            throw error
        }
    }

    // Message Handling
    async sendMessage(messageData: {
        content: string
        sessionId?: string
        agents?: string[]
        scenario?: string
        language?: string
    }): Promise<ChatMessage> {
        try {
            const response = await fetch(`${this.baseUrl}/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            })

            if (!response.ok) throw new Error('Failed to send message')
            return await response.json()
        } catch (error) {
            console.error('Error sending message:', error)
            throw error
        }
    }

    async getMessages(sessionId: string): Promise<ChatMessage[]> {
        try {
            const response = await fetch(`${this.baseUrl}/messages?sessionId=${sessionId}`)
            if (!response.ok) throw new Error('Failed to fetch messages')
            return await response.json()
        } catch (error) {
            console.error('Error fetching messages:', error)
            throw error
        }
    }

    // Agent Management
    async getAgents(): Promise<Agent[]> {
        try {
            const response = await fetch(`${this.baseUrl}/agents`)
            if (!response.ok) throw new Error('Failed to fetch agents')
            return await response.json()
        } catch (error) {
            console.error('Error fetching agents:', error)
            throw error
        }
    }

    async startCollaboration(sessionData: {
        scenario: string
        agents: string[]
        userId: string
    }): Promise<ChatSession> {
        try {
            const response = await fetch(`${this.baseUrl}/collaboration`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sessionData)
            })

            if (!response.ok) throw new Error('Failed to start collaboration')
            return await response.json()
        } catch (error) {
            console.error('Error starting collaboration:', error)
            throw error
        }
    }

    // Automation Rules
    async createAutomationRule(ruleData: {
        rule: string
        userId: string
        sessionId?: string
    }): Promise<AutomationRule> {
        try {
            const response = await fetch(`${this.baseUrl}/automation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ruleData)
            })

            if (!response.ok) throw new Error('Failed to create automation rule')
            return await response.json()
        } catch (error) {
            console.error('Error creating automation rule:', error)
            throw error
        }
    }

    async getAutomationRules(userId: string): Promise<AutomationRule[]> {
        try {
            const response = await fetch(`${this.baseUrl}/automation?userId=${userId}`)
            if (!response.ok) throw new Error('Failed to fetch automation rules')
            return await response.json()
        } catch (error) {
            console.error('Error fetching automation rules:', error)
            throw error
        }
    }

    async updateAutomationRule(ruleId: string, updates: Partial<AutomationRule>): Promise<AutomationRule> {
        try {
            const response = await fetch(`${this.baseUrl}/automation/${ruleId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            })

            if (!response.ok) throw new Error('Failed to update automation rule')
            return await response.json()
        } catch (error) {
            console.error('Error updating automation rule:', error)
            throw error
        }
    }

    async deleteAutomationRule(ruleId: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/automation/${ruleId}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error('Failed to delete automation rule')
        } catch (error) {
            console.error('Error deleting automation rule:', error)
            throw error
        }
    }

    // User Memory Management
    async storeMemory(memoryData: {
        userId: string
        memoryType: UserMemory['memoryType']
        key: string
        value: string
        importanceScore?: number
    }): Promise<UserMemory> {
        try {
            const response = await fetch(`${this.baseUrl}/memory`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memoryData)
            })

            if (!response.ok) throw new Error('Failed to store memory')
            return await response.json()
        } catch (error) {
            console.error('Error storing memory:', error)
            throw error
        }
    }

    async recallMemory(userId: string, query: string): Promise<UserMemory[]> {
        try {
            const response = await fetch(`${this.baseUrl}/memory/recall`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, query })
            })

            if (!response.ok) throw new Error('Failed to recall memory')
            return await response.json()
        } catch (error) {
            console.error('Error recalling memory:', error)
            throw error
        }
    }

    // Data Connections
    async getDataConnections(userId: string): Promise<DataConnection[]> {
        try {
            const response = await fetch(`${this.baseUrl}/connections?userId=${userId}`)
            if (!response.ok) throw new Error('Failed to fetch data connections')
            return await response.json()
        } catch (error) {
            console.error('Error fetching data connections:', error)
            throw error
        }
    }

    async createDataConnection(connectionData: {
        userId: string
        connectionType: DataConnection['connectionType']
        connectionName: string
        credentials?: any
    }): Promise<DataConnection> {
        try {
            const response = await fetch(`${this.baseUrl}/connections`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(connectionData)
            })

            if (!response.ok) throw new Error('Failed to create data connection')
            return await response.json()
        } catch (error) {
            console.error('Error creating data connection:', error)
            throw error
        }
    }

    async syncDataConnection(connectionId: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/connections/${connectionId}/sync`, {
                method: 'POST'
            })

            if (!response.ok) throw new Error('Failed to sync data connection')
            return await response.json()
        } catch (error) {
            console.error('Error syncing data connection:', error)
            throw error
        }
    }

    // Real-time Data Fetching
    async fetchRealTimeData(dataType: string, params?: any): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/data/realtime`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dataType, params })
            })

            if (!response.ok) throw new Error('Failed to fetch real-time data')
            return await response.json()
        } catch (error) {
            console.error('Error fetching real-time data:', error)
            throw error
        }
    }

    // Voice and Language Processing
    async processVoiceInput(audioBlob: Blob, language?: string): Promise<string> {
        try {
            const formData = new FormData()
            formData.append('audio', audioBlob)
            if (language) formData.append('language', language)

            const response = await fetch(`${this.baseUrl}/voice/process`, {
                method: 'POST',
                body: formData
            })

            if (!response.ok) throw new Error('Failed to process voice input')
            const result = await response.json()
            return result.text
        } catch (error) {
            console.error('Error processing voice input:', error)
            throw error
        }
    }

    async translateText(text: string, targetLanguage: string): Promise<string> {
        try {
            const response = await fetch(`${this.baseUrl}/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, targetLanguage })
            })

            if (!response.ok) throw new Error('Failed to translate text')
            const result = await response.json()
            return result.translatedText
        } catch (error) {
            console.error('Error translating text:', error)
            throw error
        }
    }

    // Feedback and Learning
    async submitFeedback(feedbackData: {
        userId: string
        sessionId?: string
        actionType: string
        actionData: any
        userResponse: 'accepted' | 'ignored' | 'modified' | 'rejected'
        feedbackNotes?: string
    }): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedbackData)
            })

            if (!response.ok) throw new Error('Failed to submit feedback')
        } catch (error) {
            console.error('Error submitting feedback:', error)
            throw error
        }
    }

    // Chat History and Analytics
    async getChatHistory(userId: string, filters?: {
        dateRange?: { start: Date; end: Date }
        agentName?: string
        taskType?: string
    }): Promise<ChatMessage[]> {
        try {
            const queryParams = new URLSearchParams({ userId })
            if (filters?.dateRange) {
                queryParams.append('startDate', filters.dateRange.start.toISOString())
                queryParams.append('endDate', filters.dateRange.end.toISOString())
            }
            if (filters?.agentName) queryParams.append('agentName', filters.agentName)
            if (filters?.taskType) queryParams.append('taskType', filters.taskType)

            const response = await fetch(`${this.baseUrl}/history?${queryParams}`)
            if (!response.ok) throw new Error('Failed to fetch chat history')
            return await response.json()
        } catch (error) {
            console.error('Error fetching chat history:', error)
            throw error
        }
    }

    async getChatAnalytics(userId: string, timeRange: string): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}/analytics?userId=${userId}&timeRange=${timeRange}`)
            if (!response.ok) throw new Error('Failed to fetch chat analytics')
            return await response.json()
        } catch (error) {
            console.error('Error fetching chat analytics:', error)
            throw error
        }
    }
}

// Export singleton instance
export const aiChatService = new AIChatService() 