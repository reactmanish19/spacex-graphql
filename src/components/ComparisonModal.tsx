import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { LOAD_LAUNCH } from "../graphQL/Queries";
import Alert from "react-bootstrap/Alert";
import rocketIcon from "../assets/rocket-icon.png";
import Spinner from "react-bootstrap/Spinner";
import "./card.css";

interface IProps {
  showComparisonModal: boolean;
  setShowComparisonModal: (agr: boolean) => void;
  comparisonMissons: string[];
  setComparisonMissons: (agr: string[]) => void;
}

const ComparisonModal = ({
  showComparisonModal,
  setShowComparisonModal,
  comparisonMissons,
  setComparisonMissons,
}: IProps) => {
  const hideModal = () => {
    setShowComparisonModal(false);
    setComparisonMissons([]);
  };
  const query1 = useQuery(
    LOAD_LAUNCH(
      comparisonMissons[0]?.slice(0, comparisonMissons[0].indexOf("("))
    )
  );
  const query2 = useQuery(
    LOAD_LAUNCH(
      comparisonMissons[1]?.slice(0, comparisonMissons[1].indexOf("("))
    )
  );
  const division1 = query1?.data?.launchesPast[0];
  const division2 = query2?.data?.launchesPast[0];
  console.log("division1", division1, "division2", division2);

  return (
    <>
      <Modal
        size="lg"
        show={showComparisonModal}
        onHide={hideModal}
        scrollable={true}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {division1?.mission_name} v/s {division2?.mission_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {division1 && division2 ? (
            <>
              <div className="row border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data text-bold fw-bold m-auto">
                  Image
                </div>
                <div className="col-lg-4 compare-table-data">
                  <img
                    className="comaprison-img"
                    src={division1.links.flickr_images[0] || rocketIcon}
                    height="100px"
                    width="100px"
                  />
                </div>
                <div className="col-lg-4 compare-table-data">
                  <img
                    className="s"
                    src={division2.links.flickr_images[0] || rocketIcon}
                    height="100px"
                    width="100px"
                  />
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Mission Name
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.mission_name}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.mission_name}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Details
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.details || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.details || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Rocket Name
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.rocket.rocket_name || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.rocket.rocket_name || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Rocket Type
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.rocket.rocket_type || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.rocket.rocket_type || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Launch Year
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.launch_year || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.launch_year || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Country
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.rocket.rocket.country || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.rocket.rocket.country || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  First Flight
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.rocket.rocket.first_flight || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.rocket.rocket.first_flight || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Launch Site
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.launch_site.site_name_long || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.launch_site.site_name_long || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Diameter (feet)
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.rocket.rocket.diameter.feet || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.rocket.rocket.diameter.feet || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Height (feet)
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.rocket.rocket.height.feet || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.rocket.rocket.height.feet || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Mass (kg)
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.rocket.rocket.mass.kg || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.rocket.rocket.mass.kg || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Cost Per Launch ($)
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.rocket.rocket.cost_per_launch || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.rocket.rocket.cost_per_launch || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Rocket Details
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1.rocket.rocket.description || <>N/A</>}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2.rocket.rocket.description || <>N/A</>}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Article
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1?.links?.article_link ? (
                    <a
                      className="mx-3"
                      href={division1?.links?.article_link}
                      target="_blank"
                    >
                      {division1?.links?.article_link}
                    </a>
                  ) : (
                    <>N/A</>
                  )}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2?.links?.article_link ? (
                    <a
                      className="mx-3"
                      href={division2?.links?.article_link}
                      target="_blank"
                    >
                      {division2?.links?.article_link}
                    </a>
                  ) : (
                    <>N/A</>
                  )}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Youtube
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1?.links?.video_link ? (
                    <a
                      className="mx-3"
                      href={division1?.links?.video_link}
                      target="_blank"
                    >
                      {division1?.links?.video_link}
                    </a>
                  ) : (
                    <>N/A</>
                  )}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1?.links?.video_link ? (
                    <a
                      className="mx-3"
                      href={division1?.links?.video_link}
                      target="_blank"
                    >
                      {division1?.links?.video_link}
                    </a>
                  ) : (
                    <>N/A</>
                  )}
                </div>
              </div>
              <div className="row my-4 border-bottom compare-table-row">
                <div className="col-lg-4 compare-table-data fw-bold m-auto">
                  Wikipedia
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division1?.links?.wikipedia ? (
                    <a
                      className="mx-3"
                      href={division1?.links?.wikipedia}
                      target="_blank"
                    >
                      {division1?.links?.wikipedia}
                    </a>
                  ) : (
                    <>N/A</>
                  )}
                </div>
                <div className="col-lg-4 compare-table-data">
                  {division2?.links?.wikipedia ? (
                    <a
                      className="mx-3"
                      href={division2?.links?.wikipedia}
                      target="_blank"
                    >
                      {division2?.links?.wikipedia}
                    </a>
                  ) : (
                    <>N/A</>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="m-3">
              <Spinner
                as="span"
                animation="border"
                variant="dark"
                role="status"
                aria-hidden="true"
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="danger" onClick={hideModal}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ComparisonModal;
