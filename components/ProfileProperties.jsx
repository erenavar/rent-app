"use client";

import { getSessionUser } from "@/utils/getSessionUser";
import Link from "next/link";
import { useState } from "react";

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  return properties.map((property, index) => (
    <div className="mb-10">
      <Link href="/property">
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={sessionUser.user.image || profileDefault}
          width={200}
          height={200}
          alt="Property 1"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">Property Title 1</p>
        <p className="text-gray-600">Address: 123 Main St</p>
      </div>
      <div className="mt-2">
        <Link
          href="/properties/add"
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600">
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button">
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
