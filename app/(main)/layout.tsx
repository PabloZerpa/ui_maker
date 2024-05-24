
import { ModeToggle } from '@/components/ModeToggle'
import Link from 'next/link'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <nav className='border-b-2 border-solid border-slate-400 dark:border-slate-200 px-4 w-full h-14 flex justify-between items-center bg-slate-200 dark:bg-slate-800'>
        <Link
          href={"/"}
          className="font-bold text-3xl bg-gradient-to-r from-indigo-500 to-blue-500 text-transparent bg-clip-text hover:cursor-pointer"
        >
          UI Maker
        </Link>
        
        <div className='flex gap-4'>
          <ModeToggle />
        </div>
      </nav>

      {children}
    </div>
  )
}

export default Layout