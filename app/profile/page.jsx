import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import Image from "next/image";
import Link from "next/link";
import profileDefault from "@/assets/images/profile.png";

const Profile = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return (
      <section className="bg-blue-50 py-10">
        <div className="container m-auto px-4 py-6 text-center">
          <p className="text-xl">
            Bu sayfayı görüntülemek için giriş yapmalısınız.
          </p>
        </div>
      </section>
    );
  }

  const { userId } = sessionUser;

  const propertiesDocs = await Property.find({ owner: userId }).lean();

  const properties = propertiesDocs.map(convertToSerializableObject);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={sessionUser.user.image || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Ad: </span>{" "}
                {sessionUser.user.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">E-posta: </span>{" "}
                {sessionUser.user.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">İlanlarınız</h2>
              {properties.length === 0 ? (
                <p>Henüz hiçbir mülk ilanı eklemediniz.</p>
              ) : (
                properties.map((property) => (
                  <div key={property._id} className="mb-10">
                    <Link href={`/properties/${property._id}`}>
                      {property.images && property.images.length > 0 && (
                        <Image
                          className="h-32 w-full rounded-md object-cover"
                          src={property.images[0]}
                          width={200}
                          height={200}
                          alt="Mülk Resmi"
                        />
                      )}
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        Adres: {property.location.street},{" "}
                        {property.location.city}, {property.location.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-blue-600">
                        Düzenle
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button">
                        Sil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
