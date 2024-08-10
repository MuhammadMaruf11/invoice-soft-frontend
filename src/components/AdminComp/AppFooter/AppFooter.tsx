import React from 'react';

const AppFooter: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Digital Decoder Ltd. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default AppFooter;
