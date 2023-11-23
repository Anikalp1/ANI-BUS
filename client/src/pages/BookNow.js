import React, { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { Col, Row, message } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import { useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);
  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
  }, []);
  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={20}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-2xl text-secondary">{bus.name}</h1>
            <h1 className="text-lg">
              {bus.from} - {bus.to}{" "}
            </h1>
            <hr />

            <div className="flex flex-col gap-1">
              <h1 className="text-lg">
                <b>Journey Date</b> : {bus.journeyDate}
              </h1>
              <h1 className="text-lg">
                <b>Fare</b> : ₹ {bus.fare} /-{" "}
              </h1>
              <h1 className="text-lg">
                <b>Departure Time</b> : {bus.departure}
              </h1>
              <h1 className="text-lg">
                <b>Arrival Time</b> : {bus.arrival}
              </h1>
            </div>
            <hr />

            <div className="flex flex-col gap-1">
              <h1 className="text-xl">
                <b>Selected Seats</b> : {selectedSeats.join(", ")}
              </h1>
              <h1 className="text-xl mt-2"><b>Fare : </b> ₹ {bus.fare * selectedSeats.length} /-</h1>

              <button className="secondary-btn mt-3">Book Now</button>
            </div>
          </Col>

          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;