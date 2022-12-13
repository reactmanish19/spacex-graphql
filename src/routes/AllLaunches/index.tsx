import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_All_LAUNCHES } from "../../graphQL/Queries";
import LaunchCards from "../../components/LaunchCards";
import { IAllLaunchRecords } from "../../const";
import Spinner from "react-bootstrap/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import "./index.css";
import ComparisonModal from "../../components/ComparisonModal";
import * as Icon from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

const AllLauches = ({ searchValue }: any) => {
  const [launchRecords, setLaunchRecords] = useState<IAllLaunchRecords[]>([]);
  const [recordsOffset, setRecordsOffset] = useState<number>(0);
  const [comparisonMissons, setComparisonMissons] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const oldSearchValue = useRef("");
  const { error, loading, data } = useQuery(
    LOAD_All_LAUNCHES(searchValue, recordsOffset)
  );
  error && alert(error);
  useEffect(() => {
    console.log("Launch Records", data, "ref", oldSearchValue);

    if (oldSearchValue.current !== searchValue) {
      oldSearchValue.current = searchValue;
      data?.launchesPast && setLaunchRecords(data?.launchesPast);
      setRecordsOffset(0);
    } else {
      data?.launchesPast &&
        setLaunchRecords([...launchRecords, ...data?.launchesPast]);
    }
  }, [data]);

  const fetchMoreData = () => {
    console.log("done");
    setRecordsOffset(recordsOffset + 10);
  };

  const onCheckCard = (name: string) => {
    if (comparisonMissons.includes(name)) {
      let index = comparisonMissons.indexOf(name);
      let remaingValues = [...comparisonMissons];
      remaingValues.splice(index, 1);
      setComparisonMissons(remaingValues);
    } else {
      if (comparisonMissons.length > 1) {
        return;
      }
      setComparisonMissons([...comparisonMissons, name]);
    }
  };

  // const onCheckCard = (e: any) => {
  //   if (comparisonMissons.includes(e.target.value)) {
  //     let index = comparisonMissons.indexOf(e.target.value);
  //     let remaingValues = [...comparisonMissons];
  //     remaingValues.splice(index, 1);
  //     setComparisonMissons(remaingValues);
  //   } else {
  //     if (comparisonMissons.length > 1) {
  //       return;
  //     }
  //     setComparisonMissons([...comparisonMissons, e.target.value]);
  //   }
  // };
  console.log("comparisonMissons", comparisonMissons);
  return (
    <div>
      {comparisonMissons?.length > 0 && (
        <div className="compare-options">
          <div className="comapre-values">
            {comparisonMissons[0]}{" "}
            <span className="compare-vs">
              <Icon.ArrowLeftRight />
            </span>{" "}
            {comparisonMissons[1]}
          </div>
          <div className="compare-button-container">
            <Button
              className="compare-button"
              type="button"
              onClick={() => setShowComparisonModal(true)}
              disabled={
                comparisonMissons.length > 2 || comparisonMissons.length < 2
              }
            >
              Compare
            </Button>
          </div>
        </div>
      )}
      {showComparisonModal && (
        <ComparisonModal
          showComparisonModal={showComparisonModal}
          setShowComparisonModal={setShowComparisonModal}
          comparisonMissons={comparisonMissons}
          setComparisonMissons={setComparisonMissons}
        />
      )}
      <div className="box-row">
        <InfiniteScroll
          dataLength={launchRecords?.length}
          next={fetchMoreData}
          hasMore={true}
          loader={
            <div className="m-3">
              <Spinner
                as="span"
                animation="border"
                variant="dark"
                role="status"
                aria-hidden="true"
              />
            </div>
          }
        >
          {launchRecords?.map((val, ind) => {
            return (
              <div key={ind}>
                <LaunchCards
                  details={val}
                  checked={comparisonMissons.includes(val.mission_name)}
                  onCheckCard={onCheckCard}
                />
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AllLauches;
