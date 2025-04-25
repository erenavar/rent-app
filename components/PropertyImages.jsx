import Image from "next/image";

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            className="object-cover h-[400px ] mx-auto rounded-xl"
            src={images[0]}
            alt=""
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 ">
            {images.map((image, index) => (
              <div key={index} className="col-span-1">
                <Image
                  className="object-cover h-[400px ] w-full rounded-xl"
                  src={image}
                  alt=""
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
