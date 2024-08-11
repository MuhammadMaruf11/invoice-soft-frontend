import { ReactNode } from 'react'
import Header from './Header';
import Footer from './Footer';
import Motion from './Motion';



type MainContent = {
    children?: ReactNode; // Use ReactNode as the type for children
};

const Layout = ({ children }: MainContent) => {
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