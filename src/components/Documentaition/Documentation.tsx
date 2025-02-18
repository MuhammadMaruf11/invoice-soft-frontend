import { Container, Row, Col, Card } from "react-bootstrap";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const sampleCode = `const sum = (a, b) => a + b;`;
const codeString = `const sum = (a, b) => a + b;`;


const Documentation = () => {
    return (
        <Container className="mt-5">
            <Row>
                {/* Sidebar Navigation */}
                <Col md={3}>
                    <Card className="p-3 shadow">
                        <h5>Documentation</h5>
                        <ul className="list-unstyled">
                            <li><a href="#installation">Installation</a></li>
                            <li><a href="#usage">Usage</a></li>
                            <li><a href="#features">Features</a></li>
                        </ul>
                    </Card>
                </Col>

                {/* Main Content */}
                <Col md={9}>
                    <h2 id="installation">📌 Installation</h2>
                    <p>Run the following command to install dependencies:</p>
                    <SyntaxHighlighter language="javascript" style={dracula}>
                        {sampleCode}
                    </SyntaxHighlighter>

                    <h2 id="usage">🚀 Usage</h2>
                    <p>Example of a function used in this project:</p>
                    <SyntaxHighlighter language="javascript" style={dracula}>
                        {codeString}
                    </SyntaxHighlighter>

                    <h2 id="features">✨ Features</h2>
                    <p>Here are some cool features:</p>
                    <ul>
                        <li>Invoice Generation</li>
                        <li>User Authentication</li>
                        <li>Download as PDF</li>
                    </ul>

                    {/* Image Example */}
                    <div style={{ height: "600px", border: "1px solid #ddd" }}>
                        <iframe
                            src="/pdf/invoice.pdf"
                            width="100%"
                            height="600px"
                            title="Invoice Example"
                        ></iframe>
                    </div>
                    {/* Video Example */}
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Invoice Demo"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Documentation;
