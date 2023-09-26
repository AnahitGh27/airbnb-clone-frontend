import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

const BookingPage = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState({});
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then((response) => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                console.log(foundBooking);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            })
        }
    }, [id])

  return (
    <div className="mt-6">
      <h1 className="text-3xl">{booking.place?.title}</h1>
      {booking.place && <AddressLink className="my-2 block">{booking.place.address}</AddressLink>}
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          {booking.place?.photos?.length && <BookingDates booking={booking}/>}
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl ">
            <div>Total price</div>
            <div className="text-2xl">${booking.price}</div>
        </div>
      </div>
      {booking.place?.photos.length && <PlaceGallery place={booking.place}/>}
    </div>
  )
}

export default BookingPage