import { ReactNode } from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';



type MainContent = {
    children?: ReactNode; // Use ReactNode as the type for children
};

const Layout = ({ children }: MainContent) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout