import { Link } from "react-router-dom"


const Banner = () => {
    return (
        <section className="banner-area">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="banner-img">
                            <img src="/img/banner/img-1.webp" alt="banner_invoice" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="banner-text">
                            <h1>Welcome to  {' '}
                                <strong className="">
                                    Invoice Software!
                                </strong>
                            </h1>
                            <p>Experience this service with a free one-time trial. After the trial, you can register to unlock unlimited access and take full advantage of this comprehensive features.</p>
                        </div>
                        <div className="banner-btn">
                            <Link to='/docs' className="btn btn-info btn-lg text-white me-3">Get Started</Link>
                            <Link to='/free-trial' className="btn btn-secondary btn-lg">Free Trial</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner