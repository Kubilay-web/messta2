"use client";
import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FaMapMarker } from "react-icons/fa";
import Link from "next/link";

export default function CandidateCard({ candidat }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidateskill/${candidat.id}`,
      );
      const results = await response.json();
      setData(results);
    } catch (error) {
      console.error("Error fetching candidate skills:", error);
    }
  };

  return (
    <Container className="py-4">
      <div className="row">
        <div key={candidat.id} className="col-12 mb-4">
          <Link
            href={`/job-portal/candidate/${candidat.slug}`}
            style={{ textDecoration: "none" }}
          >
            <Card className="mb-4">
              <div className="d-flex justify-content-center align-items-center mt-3">
                <img
                  src={candidat.image_secure_url}
                  alt={candidat.full_name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <Card.Body>
                <Card.Title
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                  className="text-center"
                >
                  {candidat.full_name}
                </Card.Title>
                <Card.Title
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  className="text-center"
                >
                  {candidat.title}
                </Card.Title>

                <Card.Title className="text-center text-muted">
                  {candidat.status}
                </Card.Title>

                {/* Skill Badges */}
                <div className="d-flex justify-content-center mb-3 flex-wrap">
                  {data.length > 0 &&
                    data.map((item) =>
                      item.skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="badge bg-success m-1 p-2 text-white"
                          style={{ borderRadius: "20px", fontSize: "14px" }}
                        >
                          {skill.name}
                        </span>
                      )),
                    )}
                </div>

                <Row className="mb-3">
                  <Col
                    className="text-center"
                    style={{ fontSize: "15px", fontWeight: "bold" }}
                  >
                    <FaMapMarker
                      size={18}
                      style={{ color: "green", marginRight: "8px" }}
                    />
                    {candidat?.state.statename},{candidat?.address},
                    {candidat?.country.name}
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <span
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "5px 15px",
                      borderRadius: "5px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      textAlign: "center",
                      display: "inline-block",
                      width: "fit-content",
                    }}
                  >
                    View
                  </span>
                </Row>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
    </Container>
  );
}
