import React, { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { Col, Row, message } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import StripeCheckout from "react-stripe-checkout";

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
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

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
        transactionId,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/make-payment", {
        token,
        amount: selectedSeats.length * bus.fare * 100,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
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
        <Row className="mt-3" gutter={[30,30]}>
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
              <h1 className="text-lg">
                <b>Capacity</b> : {bus.capacity}
              </h1>
              <h1 className="text-lg">
                <b>Seats Vacant</b> : {bus.capacity - bus.seatsBooked.length}
              </h1>
            </div>
            <hr />

            <div className="flex flex-col gap-1">
              <h1 className="text-lg">
                <b>Selected Seats </b>: {selectedSeats.join(", ")}
              </h1>
              <h1 className="text-lg mt-2">
                <b>Fare : </b> ₹ {bus.fare * selectedSeats.length} /-
              </h1>
              <hr />

              <StripeCheckout
               billingAddress
                token={onToken}
                amount={bus.fare * selectedSeats.length * 100}
                currency="INR"
                stripeKey="pk_test_51OFd1lSHIA2lE59ZpLzg5FxvlwXuCLd3hbQ574pQnl6KqNTXItvADSE2XT0XIagUTXDSvIDL2j9VnXMK0VlaWIoL00XHSKCrK0"
              >
                <button
                  className={`btn btn-primary ${
                    selectedSeats.length === 0 && "disabled-btn"
                  }`}
                  disabled={selectedSeats.length === 0}
                >
                  Book Now
                </button>
              </StripeCheckout>
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
