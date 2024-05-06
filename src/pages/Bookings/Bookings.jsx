import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import axios from "axios";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/bookings/${user?.email}`, { withCredentials: true });
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    const handleDelete = async (id) => {
        const proceed = window.confirm('Are you sure you want to delete?');
        if (proceed) {
            try {
                await axios.delete(`http://localhost:5000/bookings/${id}`, { withCredentials: true });
                const remaining = bookings.filter(booking => booking._id !== id);
                setBookings(remaining);
                alert('Deleted successfully');
            } catch (error) {
                console.error("Error deleting booking:", error);
            }
        }
    };

    const handleBookingConfirm = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/bookings/${id}`, );
            const updatedBookings = bookings.map(booking => {
                if (booking._id === id) {
                    return { ...booking, status: 'confirm' };
                }
                return booking;
            });
            setBookings(updatedBookings);
        } catch (error) {
            console.error("Error confirming booking:", error);
        }
    };

    return (
        <div>
            <h2 className="text-5xl">Your bookings: {bookings.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;
