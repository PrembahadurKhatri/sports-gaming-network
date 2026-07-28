import Ground from "../models/ground";
import { cloudinaryUpload } from "../utils/cloudinaryupload";

export const createGround = async (
  ownerId: string,
  data: any,
  files: Express.Multer.File[]
) => {
  const images: string[] = [];

  if (files?.length) {
    for (const file of files) {
      const result = await cloudinaryUpload(file.buffer);
      images.push(result.secure_url);
    }
  }

  const ground = await Ground.create({
    owner: ownerId,
    groundName: data.groundName,
    sport: data.sport,
    location: data.location,
    address: data.address,

    coordinates: {
      type: "Point",
      coordinates: [
        Number(data.longitude),
        Number(data.latitude),
      ],
    },

    description: data.description,
    pricePerHour: data.pricePerHour,
    openingTime: data.openingTime,
    closingTime: data.closingTime,
    amenities: data.amenities ?? [],
    phone: data.phone,
    indoor: data.indoor,
    images,
  });

  return {
    success: true,
    message: "Ground created successfully.",
    ground,
  };
};

export const getAllGrounds = async () => {
  const grounds = await Ground.find()
    .populate("owner", "fullname profilePhoto")
    .sort({ createdAt: -1 });

  return {
    success: true,
    grounds,
  };
};

export const getGroundById = async (groundId: string) => {
  const ground = await Ground.findById(groundId).populate(
    "owner",
    "fullname profilePhoto"
  );

  if (!ground) {
    throw new Error("Ground not found.");
  }

  return {
    success: true,
    ground,
  };
};

export const getMyGrounds = async (ownerId: string) => {
  const grounds = await Ground.find({
    owner: ownerId,
  });

  return {
    success: true,
    grounds,
  };
};

export const searchGrounds = async (filters: any) => {
  const query: any = {};

  if (filters.sport) {
    query.sport = filters.sport;
  }

  if (filters.location) {
    query.location = {
      $regex: filters.location,
      $options: "i",
    };
  }

  if (filters.indoor !== undefined) {
    query.indoor = filters.indoor;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.maxPrice) {
    query.pricePerHour = {
      $lte: Number(filters.maxPrice),
    };
  }

  const grounds = await Ground.find(query);

  return {
    success: true,
    grounds,
  };
};

export const updateGround = async (
  groundId: string,
  ownerId: string,
  data: any,
  files?: Express.Multer.File[]
) => {
  const ground = await Ground.findById(groundId);

  if (!ground) {
    throw new Error("Ground not found.");
  }

  if (ground.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  if (files?.length) {
    const images: string[] = [];

    for (const file of files) {
      const result = await cloudinaryUpload(file.buffer);
      images.push(result.secure_url);
    }

    data.images = images;
  }

  if (data.latitude && data.longitude) {
    data.coordinates = {
      type: "Point",
      coordinates: [
        Number(data.longitude),
        Number(data.latitude),
      ],
    };
  }

  const updated = await Ground.findByIdAndUpdate(
    groundId,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  return {
    success: true,
    message: "Ground updated successfully.",
    ground: updated,
  };
};

export const deleteGround = async (
  groundId: string,
  ownerId: string
) => {
  const ground = await Ground.findById(groundId);

  if (!ground) {
    throw new Error("Ground not found.");
  }

  if (ground.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  await ground.deleteOne();

  return {
    success: true,
    message: "Ground deleted successfully.",
  };
};

export const updateGroundStatus = async (
  groundId: string,
  ownerId: string,
  status: "AVAILABLE" | "MAINTENANCE" | "CLOSED" | "PACKED" | "ALREADY_BOOKED"
) => {
  const ground = await Ground.findById(groundId);

  if (!ground) {
    throw new Error("Ground not found.");
  }

  if (ground.owner.toString() !== ownerId) {
    throw new Error("Unauthorized.");
  }

  ground.set("status", status);

  await ground.save();

  return {
    success: true,
    message: "Ground status updated.",
    ground,
  };
};

export const getNearbyGrounds = async (
  longitude: number,
  latitude: number,
  distance = 5000
) => {
  return Ground.find({
    coordinates: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: distance,
      },
    },
  });
};