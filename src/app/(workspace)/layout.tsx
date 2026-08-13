import { currentUser } from '@/modules/authentication/actions'
import Header from '@/modules/Layout/components/header'
import { initializeWorkspace } from '@/modules/workspace/actions'
import TabbedLeftPanel from '@/modules/workspace/components/tabbed-left-panel'
import { redirect } from 'next/navigation'
import React from 'react'

export const dynamic = 'force-dynamic'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const workspace = await initializeWorkspace()

  if (!workspace.success || !workspace.workspace) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p>Failed to initialize workspace. Please refresh the page.</p>
      </div>
    )
  }

  return (
    <>
      <Header user={user} workspace={workspace.workspace} />
      <main className="max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden">
        <div className="flex h-full w-full">
          <div className="w-12 border-r border-zinc-800 bg-zinc-900">
            <TabbedLeftPanel />
          </div>
          <div className="flex-1 bg-zinc-950">
            {children}
          </div>
        </div>
      </main>
    </>
  )
}

export default RootLayout