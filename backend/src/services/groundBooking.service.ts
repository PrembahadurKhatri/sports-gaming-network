import Ground from "../models/ground";
import groundBooking from "../models/groundBooking";

export const createBooking = async (
  userId: string,
  data: any
) => {
  const ground = await Ground.findById(data.ground);
    if (!ground) {
    throw new Error("Ground not found.");
  }

const start = new Date(`1970-01-01T${data.startTime}:00`);
const end = new Date(`1970-01-01T${data.endTime}:00`);

const totalHours =
  (end.getTime() - start.getTime()) /
  (1000 * 60 * 60);

if (totalHours <= 0) {
  throw new Error("Invalid booking time.");
}

const totalAmount =
  totalHours * ground.pricePerHour;



  if (ground.status !== "AVAILABLE") {
    throw new Error("Ground is unavailable.");
  }

const alreadyBooked = await groundBooking.findOne({
  ground: data.ground,
  bookingDate: data.bookingDate,
  status: {
    $in: ["PENDING", "APPROVED"],
  },
  startTime: { $lt: data.endTime },
  endTime: { $gt: data.startTime },
});

  if (alreadyBooked) {
    throw new Error("Selected slot is already booked.");
  }


const today = new Date();
today.setHours(0, 0, 0, 0);

const bookingDate = new Date(data.bookingDate);

if (bookingDate < today) {
  throw new Error("Cannot book past dates.");
}
if (
  data.startTime < ground.openingTime ||
  data.endTime > ground.closingTime
) {
  throw new Error("Ground is closed during the selected time.");
}
  const booking = await groundBooking.create({
    bookedBy: userId,
    ...data,
      totalHours,
  totalAmount,
  });
  
  return {
    success: true,
    message: "Booking created successfully.",
    booking,
  };
};
export const getMyBookings = async (
  userId: string
) => {
  const bookings = await groundBooking.find({
    bookedBy: userId,
  })
    .populate("ground")
    .populate("team")
    .sort({
      createdAt: -1,
    });

  return {
    success: true,
    bookings,
  };
};
export const getGroundBookings = async (
  groundId: string
) => {
  const bookings = await groundBooking.find({
    ground: groundId,
  })
    .populate("bookedBy", "fullname profilePhoto")
    .populate("team", "teamName")
    .sort({
      bookingDate: 1,
    });

  return {
    success: true,
    bookings,
  };
};
export const approveBooking = async (
  bookingId: string,
  ownerId: string
) => {
  const booking =
    await groundBooking.findById(bookingId)
      .populate("ground");

  if (!booking) {
    throw new Error("Booking not found.");
  }

  const ground: any = booking.ground;

  if (ground.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  booking.status = "APPROVED";

await booking.save();

  return {
    success: true,
    message: "Booking approved.",
    booking,
  };
};
export const rejectBooking = async (
  bookingId: string,
  ownerId: string
) => {
  const booking =
    await groundBooking.findById(bookingId)
      .populate("ground");

  if (!booking) {
    throw new Error("Booking not found.");
  }

  const ground: any = booking.ground;

  if (ground.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  booking.status = "REJECTED";

  await booking.save();

  return {
    success: true,
    message: "Booking rejected.",
    booking,
  };
};
export const cancelBooking = async (
  bookingId: string,
  userId: string
) => {
const booking = await groundBooking.findById(bookingId);

if (!booking) {
  throw new Error("Booking not found.");
}

if (booking.bookedBy.toString() !== userId) {
  throw new Error("Unauthorized.");
}

const ground = await Ground.findById(booking.ground);

booking.status = "CANCELLED";

await booking.save();

if (ground) {
  ground.status = "AVAILABLE";
  await ground.save();
}

return {
  success: true,
  message: "Booking cancelled.",
};

}


export const completeBooking = async (
  bookingId: string
) => {
  const booking =
    await groundBooking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }
const ground = await Ground.findById(booking.ground);
  booking.status = "COMPLETED";

  await booking.save();
if(ground){
  ground.status = "AVAILABLE";
  await ground.save();
}
  return {
    success: true,
    message: "Booking completed.",
  };
};


export const updatePaymentStatus = async (
  bookingId: string,
  status: "PAID" | "FAILED"
) => {
  const booking = await groundBooking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }

  if (
    booking.status === "CANCELLED" ||
    booking.status === "REJECTED"
  ) {
    throw new Error("Cannot pay for this booking.");
  }

  booking.paymentStatus = status;

  if (status === "PAID") {
    booking.status = "APPROVED";
  }

  await booking.save();

  return {
    success: true,
    message: "Payment updated.",
    booking,
  };
};