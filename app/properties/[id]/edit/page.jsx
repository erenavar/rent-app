import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";

const PropertyEditPage = async ({ params }) => {
  await connectDB();
  const propertyDoc = Property.findById(params.id).lean();
  const property = convertToSerializableObject(propertyDoc);
  console.log(property);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 ">
          <PropertyEditForm />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
