import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // redirect if logged in
    }
  }, [navigate]);

  return (
  <div className="homepage-wrapper" style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f8f9fa' }}>
    {/* Hero Section */}
    <section className="hero text-center py-5" style={{ backgroundImage: 'url()', backgroundSize: 'cover', backgroundPosition: 'center', color: '' }}>
      <Container>
        <h1 className="display-4 fw-bold">Skip the Travel! 
            <br></br>Take Online Doctor Consultation</h1>
        <p className="lead">Private Consultation + Audio Call · Starts at just ₹199</p>
        <Button variant="dark" size="lg" style={{ color: '#0d6ef' }}>Consult Now</Button>
      </Container>
    </section>

    {/* Verified Doctors */}
    <section className="text-center py-5" style={{ backgroundColor: '#eef5ff' }}>
      <Container>
        <h2 className="fw-bold">Verified Doctors</h2>
        <p className="text-muted">Digital Prescription · Free Follow-up · 25+ Specialities</p>
      </Container>
    </section>

    {/* Common Health Concerns Section */}
<section className="py-5" style={{ backgroundColor: '#fdfdfd' }}>
  <Container>
    <h2 className="text-center mb-4 fw-semibold">Common Health Concerns</h2>
    <Row>
      {[
        {
          title: "Cold & Cough",
          text: "Get quick relief from seasonal cold, cough, and throat infections.",
          img: "https://www.kindpng.com/picc/m/69-693219_cold-clipart-cold-cough-transparent-sick-person-png.png",
        },
        {
          title: "Stomach Issues",
          text: "Consult for acidity, indigestion, constipation, and IBS.",
          img: "https://cdn.pixabay.com/photo/2016/03/31/20/11/abdominal-pain-1294655_1280.png",
        },
        {
          title: "Skin & Hair Problems",
          text: "Get treatment for acne, rashes, dandruff, and hair loss.",
          img: "https://cdn.pixabay.com/photo/2020/05/26/17/36/skin-5223310_1280.jpg",
        },
        {
          title: "Women's Health",
          text: "Consult for PCOS, menstrual issues, pregnancy, and more.",
          img: "https://cdn.pixabay.com/photo/2020/06/04/16/43/gynecology-5259054_1280.jpg",
        },
        {
          title: "Child Health",
          text: "Talk to a pediatrician about fever, cough, nutrition, or vaccination.",
          img: "https://cdn.pixabay.com/photo/2021/08/06/13/42/doctor-6526527_1280.jpg",
        },
        {
          title: "Mental Wellness",
          text: "Manage anxiety, depression, and stress with expert help.",
          img: "https://cdn.pixabay.com/photo/2020/04/21/09/18/sad-5078208_1280.jpg",
        },
      ].map((concern, idx) => (
        <Col key={idx} md={4} className="mb-4">
          <Card className="shadow-sm h-100 border-0">
            <Card.Img
              variant="top"
              src={concern.img}
              alt={concern.title}
              style={{ height: '250px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{concern.title}</Card.Title>
              <Card.Text>{concern.text}</Card.Text>
              <Button variant="outline-primary" className="mt-auto">Consult</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</section>



    {/* Offers */}
    <section className="text-center py-5" style={{ backgroundColor: '#e7f2ff' }}>
      <Container>
        <h2 className="fw-bold">Offers</h2>
        <p className="text-muted">Exclusive consultation deals and health packages</p>
      </Container>
    </section>

    {/* How it Works */}
    <section className="py-5" style={{ backgroundColor: '#f6f9fc' }}>
      <Container>
        <h2 className="text-center mb-5 fw-semibold">How it Works</h2>
        <Row>
          <Col md={4} className="text-center">
            <img src="https://img.icons8.com/external-flat-juicy-fish/64/000000/external-doctor-medical-flat-flat-juicy-fish.png" alt="select" className="mb-3" />
            <h5>Select a speciality or symptom</h5>
          </Col>
          <Col md={4} className="text-center">
            <img src="https://img.icons8.com/color/64/000000/video-call.png" alt="call" className="mb-3" />
            <h5>Audio/video call with a verified doctor</h5>
          </Col>
          <Col md={4} className="text-center">
            <img src="https://img.icons8.com/?size=100&id=fWpFZAqqcBSX&format=png&color=000000" alt="prescription" className="mb-3" />
            <h5>Get a digital prescription & free follow-up</h5>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Statistics */}
    <section className="text-center py-5" style={{ backgroundColor: '#fefefe' }}>
      <Container>
        <h2 className="fw-bold">Why Choose Us</h2>
        <Row className="mt-4">
          <Col md={3}><h3 className="fw-bold text-primary">0+</h3><p>Happy Users</p></Col>
          <Col md={3}><h3 className="fw-bold text-success">0+</h3><p>Verified Doctors</p></Col>
          <Col md={3}><h3 className="fw-bold text-danger">2+</h3><p>Specialities</p></Col>
          <Col md={3}><h3 className="fw-bold text-warning">4.5 / 5</h3><p>App Rating</p></Col>
        </Row>
      </Container>
    </section>

    {/* App Download Banner */}
    <section className="py-5" style={{ backgroundColor: '#001f3f', color: '#ffffff' }}>
      <Container className="text-center">
        <h2 className="fw-bold">Download the TeleHealth App</h2>
        <p>Get ₹200 HealthCash · Video consult with doctors · Order medicines</p>
        <Button variant="light" className="px-4">Send App Link</Button>
      </Container>
    </section>
  </div>
);

};

export default Home;
