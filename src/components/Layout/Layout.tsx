import { ReactNode } from 'react'
import Header from './Header';
import Footer from './Footer';
import Motion from './Motion';


const Layout = ({ children }: { children: ReactNode }) => {

    return (
        <>
            <Header />
            <main>
                <Motion> {children}</Motion>
            </main>
            <Footer />
        </>
    )
}

export default Layout