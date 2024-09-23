import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

const OfficeLocations = () => {
  const offices = [
    {
      city: "TP. HỒ CHÍ MINH",
      locations: [
        {
          name: "WORKZY Khu Công Nghệ Cao",
          address:
            "Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh",
          googleMapsLink: "https://maps.app.goo.gl/zHwkDrqihCSCgKhk6",
          googleMapsEmbedLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4287485048703!2d106.80730807508958!3d10.841127589311627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e1!3m2!1svi!2s!4v1726936398545!5m2!1svi!2s",
        },
        {
          name: "WORKZY Nhà Văn Hóa",
          address:
            "Lưu Hữu Phước Tân Lập, Khu phố, Dĩ An, Bình Dương, Việt Nam",
          googleMapsLink: "https://maps.app.goo.gl/fH52aji9vLpo5xHPA",
          googleMapsEmbedLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.9779058595473!2d106.79815067509004!3d10.87514208927968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2zTmjDoCBWxINuIGjDs2EgU2luaCB2acOqbiBUUC5IQ00!5e1!3m2!1svi!2s!4v1726936985311!5m2!1svi!2s",
        },
      ],
    },

    {
      city: "Hà Nội",
      locations: [
        {
          name: "WORKZY Hòa Lạc",
          address:
            "Khu Công Nghệ Cao Hòa Lạc, km 29, Đại lộ, Thăng Long, Hà Nội, Việt Nam",
          googleMapsLink: "https://maps.app.goo.gl/MSjsiAN6ihkJZi6z7",
          googleMapsEmbedLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.3031724570537!2d105.5227142753006!3d21.012416680632796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgSMOgIE7hu5lp!5e1!3m2!1svi!2s!4v1726937026839!5m2!1svi!2s",
        },
      ],
    },
  ];

  const [hoveredLocation, setHoveredLocation] = useState(
    offices[0].locations[0]
  );

  return (
    <div className="flex p-8 mx-10 ">
      <div className="w-1/2 mr-10">
        {offices.map((office, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{office.city}</h2>
            {office.locations.map((location, idx) => (
              <div key={idx} className="mb-2">
                <a
                  href={location.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredLocation(location)}
                  className="flex items-center text-lg hover:text-neutral-800 font-semibold hover:underline transition duration-300 ease-in-out transform py-2 px-4 rounded-lg "
                >
                  <FaLocationDot className="mr-4 " />
                  {location.name}: {location.address}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="w-1/2">
        {hoveredLocation && (
          <iframe
            src={hoveredLocation.googleMapsEmbedLink}
            className="w-full h-full"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default OfficeLocations;
