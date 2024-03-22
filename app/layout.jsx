import '@styles/global.css'
import Navbar from '@components/Navbar'
import Provider from '@components/Provider'
import Link from 'next/link'


export const metadata = {
    title: "Prompt Share",
    description: "Discover  Share AI Prompts",
    
}
const Layout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default Layout
