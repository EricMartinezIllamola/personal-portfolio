import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';


function Home() {
    const [t, i18n] = useTranslation("index");

    return (
        <section id="Home">
            <div className="intro_box">
                <Link to="/personal-portfolio/#About">
                    <div className="btn_start"></div>
                </Link>
                <div className="intro">
                    <h1 className="intro_a" id="intro_1">{t("home.h1")}</h1>
                    <h3 className="intro_a" id="intro_2">{t("home.h3")}</h3>
                </div>
            </div>
        </section>
    );
}

export default Home;