import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LOAD_LAUNCH } from "../../graphQL/Queries";
import { Button, Carousel, Image, Stack } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./index.css";

const LaunchDetails = () => {
  const { name } = useParams();
  const [launchDetails, setLaunchDetails] = useState<any>({});
  console.log("launchDetails", launchDetails);
  const queryName = name?.slice(0, name.indexOf("("));
  const { error, loading, data } = useQuery(LOAD_LAUNCH(queryName || ""));

  useEffect(() => {
    console.log("Launch Records", data?.launchesPast[0]);
    setLaunchDetails(data?.launchesPast[0]);
  }, [data]);

  return (
    <div className="">
      <div className="main div">
        <div className="image-div">
          <Carousel>
            {launchDetails?.links?.flickr_images?.map(
              (val: any, index: any) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={val}
                      alt="image not found"
                    />
                    <Carousel.Caption>
                      <h3>{launchDetails?.rocket?.rocket_name}</h3>
                      <p>{launchDetails?.rocket?.rocket?.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              }
            )}
          </Carousel>
        </div>

        <div className="container">
          <h3 className="launch-details-heading">
            {launchDetails?.mission_name}
          </h3>
          <div className="row">
            <div className="col-md-6">
              <div className="rocket-details">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th colSpan={3}>Rocket Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Rocket Name</td>
                      <td>{launchDetails?.rocket?.rocket_name}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Description</td>
                      <td>{launchDetails?.rocket?.rocket?.description}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Rocket Country</td>
                      <td>{launchDetails?.rocket?.rocket?.country}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Rocket Cost per launch</td>
                      <td>${launchDetails?.rocket?.rocket?.cost_per_launch}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Rocket Comapny</td>
                      <td>{launchDetails?.rocket?.rocket?.company}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Rocket First flight</td>
                      <td>{launchDetails?.rocket?.rocket?.first_flight}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Rocket Mass</td>
                      <td>{launchDetails?.rocket?.rocket?.mass.kg} kg</td>
                    </tr>

                    <tr>
                      <td>8</td>
                      <td>Rocket Height</td>
                      <td>{launchDetails?.rocket?.rocket?.height.feet} ft</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Rocket diameter</td>
                      <td>
                        {launchDetails?.rocket?.rocket?.diameter?.feet} ft
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-area-title">
                <h5>{"Mission"}</h5>
              </div>
              <div className="text-area-details">
                <p>{launchDetails?.details}</p>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th colSpan={3}>Mission Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Launch Year</td>
                    <td>{launchDetails?.launch_year}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Launch Site</td>
                    <td>{launchDetails?.launch_site?.site_name_long}</td>
                  </tr>
                </tbody>
              </Table>

              <div className="shipCarousel">
                {launchDetails?.ships?.length > 0 && (
                  <div className="ships-used">
                    <h5>Ships Used</h5>
                    <Carousel>
                      {launchDetails?.ships?.map((val: any, index: any) => {
                        return (
                          <Carousel.Item key={index}>
                            <img
                              className="d-block w-100 ship-carousel-img"
                              src={val?.image}
                              alt="image not found"
                            />
                            <Carousel.Caption>
                              <h3>{val?.name}</h3>
                              <p>
                                {val?.weight_kg && (
                                  <>weight: {val?.weight_kg} kg</>
                                )}
                              </p>
                            </Carousel.Caption>
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="links">
            <a
              className=""
              href={launchDetails?.links?.article_link}
              target="_blank"
            >
              Artical Link
            </a>
            <a
              className="mx-3"
              href={launchDetails?.links?.video_link}
              target="_blank"
            >
              Video Link
            </a>
            <a
              className="mx-3"
              href={launchDetails?.links?.wikipedia}
              target="_blank"
            >
              Wikipedia
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetails;
