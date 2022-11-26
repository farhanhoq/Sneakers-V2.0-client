import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({product}) => {

    const { user } = useContext(AuthContext);
    const { pname, sprice } = product;

    const handleBooking = e => {
        e.preventDefault();
        const form = e.target;
        const pname = form.pname.value;
        const sprice = form.sprice.value;
        const cname = form.cname.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;

        const booking = {
            pname,
            sprice,
            cname,
            email,
            phone,
            address
        }

        fetch("http://localhost:5001/bookings", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success("Booking Confirmed");
                } else {
                    toast.error(data.message)
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-center">{pname}</h3>
                    <h3 className="text-lg font-bold text-center">Selling Price: {sprice}</h3>
                    <form className='grid grid-cols-1 gap-3 mt-12' onSubmit={handleBooking}>
                        <input name="pname" placeholder="Your Name" className="input input-bordered w-full" defaultValue={pname} readOnly/>
                        <input name="sprice" placeholder="Your Name" className="input input-bordered w-full" defaultValue={sprice} readOnly/>
                        <input name="cname" placeholder="Your Name" className="input input-bordered w-full" defaultValue={user?.displayName} readOnly/>
                        <input name="email" placeholder="Email Address" className="input input-bordered w-full" defaultValue={user?.email} readOnly/>
                        <input name="phone" placeholder="Phone Number" className="input input-bordered w-full" />
                        <input name="address" placeholder="Address" className="input input-bordered w-full" />
                        <br />
                        <input type="submit" value="Submit" className='btn btn-accent input-bordered w-full'/>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;