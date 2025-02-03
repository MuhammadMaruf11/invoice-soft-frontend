import React from 'react';
import { Container } from 'react-bootstrap';

const AppFooter: React.FC = () => {
    return (
        <footer className="footer py-3 text-center">
            <Container>
                <p className="mb-0">
                    &copy; {new Date().getFullYear()} Invoice Software. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

export default AppFooter;
