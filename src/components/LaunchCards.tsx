import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { IAllLaunchRecords } from "../const";
import rocketIcon from "../assets/rocket-icon.png";
import { useNavigate } from "react-router-dom";
import "./card.css";
import * as Icon from "react-bootstrap-icons";

interface IProps {
  details: IAllLaunchRecords;
  checked: boolean;
  onCheckCard: (e: any) => void;
}

const LaunchCards = ({ details, checked, onCheckCard }: IProps) => {
  const navigate = useNavigate();
  return (
    <Card style={{ width: "33rem", flexDirection: "row" }} className="m-3">
      <div className="w-40 card-img">
        <Card.Img
          variant="top"
          src={details.links.flickr_images[0] || rocketIcon}
          width="200px"
          height="200px"
        />
      </div>

      <Card.Body className="w-60">
        <Card.Title>
          {details.mission_name}
          <span className="pull-right text-theme">
            {checked ? (
              <Icon.PinAngleFill
                onClick={() => {
                  onCheckCard(details.mission_name);
                }}
              />
            ) : (
              <Icon.PinAngle
                onClick={() => {
                  onCheckCard(details.mission_name);
                }}
              />
            )}
          </span>
        </Card.Title>
        <hr />
        <Card.Text>Rocket: {details.rocket.rocket_name}</Card.Text>
        <Button
          className="w-100 btn-box"
          onClick={() => {
            navigate("/launchdetails/" + details.mission_name);
          }}
        >
          View
        </Button>
        {/* <input
          type="checkbox"
          name="compareCheck"
          value={details.mission_name}
          checked={checked}
          onChange={(e) => {
            onCheckCard(details.mission_name);
          }}
        /> */}
      </Card.Body>
    </Card>
  );
};

export default LaunchCards;
