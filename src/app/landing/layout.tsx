import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Essentials Enhanced - AI-Powered Business Operating System',
    description: 'All your tools. One dashboard. Zero wasted hours. The business operating system powered by real AI.',
    keywords: 'AI, business dashboard, social media management, automation, analytics, marketing',
}

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
} 