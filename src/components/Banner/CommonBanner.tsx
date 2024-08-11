import { FC } from "react";

interface bannerType {
    bannerTitle: string
}

const CommonBanner: FC<bannerType> = ({ bannerTitle }) => {
    return (
        <section className="common-banner-area">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12">
                        <h1 className="text-center">{bannerTitle}</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommonBanner;