import { useState, useEffect } from 'react';
import { aboutApi } from '../api/aboutApi';
import { Card } from '../components/common/Card';
import { Loader } from '../components/common/Loader';
import './About.css';

const About = () => {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            setLoading(true);
            const data = await aboutApi.getAbout();
            setAbout(data);
        } catch (error) {
            console.error('Error fetching about:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (!about) return <div className="container">Content not available</div>;

    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="container">
                    <h1>{about.title}</h1>
                    <p className="subtitle">{about.subtitle}</p>
                </div>
            </div>

            <div className="container">
                <div className="about-content">
                    <Card className="about-section">
                        <h2>Who We Are</h2>
                        <p>{about.content}</p>
                    </Card>

                    <div className="mission-vision-grid">
                        <Card className="mission-card">
                            <div className="icon">🎯</div>
                            <h3>Our Mission</h3>
                            <p>{about.mission}</p>
                        </Card>

                        <Card className="vision-card">
                            <div className="icon">🌟</div>
                            <h3>Our Vision</h3>
                            <p>{about.vision}</p>
                        </Card>
                    </div>

                    {about.values && about.values.length > 0 && (
                        <div className="values-section">
                            <h2>Our Values</h2>
                            <div className="values-grid">
                                {about.values.map((value, index) => (
                                    <Card key={index} className="value-card">
                                        <h3>{value.title}</h3>
                                        <p>{value.description}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    <Card className="cta-section">
                        <h2>Join Our Journey</h2>
                        <p>
                            Experience the best in online shopping. Browse our collection and discover
                            quality products at great prices.
                        </p>
                        <a href="/products" className="cta-button">
                            Shop Now
                        </a>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default About;
