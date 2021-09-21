import { Card, Col, Image, Row, Tag } from "antd";
import React from "react";

export const HomeView = () => {
  return (
    <div>
      <Card bordered={false}>
        <div>
          <Row justify="center">
            <Col>
              <Image width={200} src="/logo_della.png"></Image>
            </Col>
          </Row>
          <div className="home-description">
            <p className="mt-4">
              Bonjour! Cette application est réalisée par{" "}
              <Tag className="della">Adel Boushih</Tag> dans le cadre d'un test
              technique proposé par <Tag className="della">Della</Tag>.<br />
            </p>

            <p>
              Cette application permet de :
              <ul>
                <Row>
                  <Col span={12}>
                    <li> Gérer des documents: </li>
                    <ul>
                      <li>Charger des documents textuels</li>
                      <li>Consulter la liste des documents</li>
                      <li>Consulter les metadonnées d'un document</li>
                      <li>Mettre à jour les metadonnées d'un document</li>
                      <li>Appliquer un Playbook de questions à un document</li>
                      <li>Gérer les réponses d'un document</li>
                      <ul>
                        <li>Consulter la liste des réponses</li>
                        <li>Corriger les réponses</li>
                      </ul>
                      <li>Supprimer un document</li>
                    </ul>
                  </Col>
                  <Col span={12}>
                    <li> Gérer des playbooks: </li>
                    <ul>
                      <li>Consulter la liste des playbooks</li>
                      <li>Consulter les informations d'un playbook</li>
                      <li>Mettre à jour les informations d'un playbook</li>
                      <ul>
                        <li>Ajouter une nouvelle section</li>
                        <li>Modifier une section</li>
                        <li>Supprimer une section</li>
                        <li>Ajouter une nouvelle question</li>
                        <li>Modifier une question</li>
                        <li>Supprimer une question</li>
                      </ul>
                      <li>Supprimer un playbook</li>
                    </ul>
                  </Col>
                </Row>
              </ul>
            </p>
            <p>
              L'application est développée en{" "}
              <Tag color="#87d068">Typescript</Tag>avec{" "}
              <Tag color="#2db7f5" icon="">
                React
              </Tag>
              .
              <br />
              Les technologies employées dans le développement:{" "}
              <ul style={{ margin: "4px" }}>
                <li style={{ marginBottom: "4px" }}>
                  <Tag color="#108ee9">Redux</Tag>
                </li>
                <li style={{ marginBottom: "4px" }}>
                  <Tag color="#53B257">Redux-Saga</Tag>
                </li>
                <li>
                  <Tag color="#E55039">Ant Design</Tag>
                </li>
              </ul>
              L'application est hébergée sur <Tag color="#70A1FF">Vercel</Tag>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
