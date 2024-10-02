import React from "react";
import Googlemap from "../../components/layout/Googlemap/Googlemap";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Carousel from "../../components/layout/Carousel/Carousel";
import RoomCard from "../../components/layout/RoomCard/RoomCard";
import FilterBar from "../../components/layout/FilterBar/FilterBar";
import buildingImage from "../../assets/8.jpg";

const Building = () => {
  const images = [
    "https://picsum.photos/500/300?random=1",
    "https://picsum.photos/500/300?random=2",
    "https://picsum.photos/500/300?random=3",
    "https://picsum.photos/500/300?random=4",
    "https://picsum.photos/500/300?random=5",
  ];

  return (
    <>
      <div className="body-content mt-0">
        <div className="body-content-container mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div className="body-content-text">
            <div className="building-title text-3xl font-black tracking-tight sm:text-6xl text-left">
              <h1>Workzy High-Tech Park</h1> <br />
            </div>

            <div className="building-address">
              <p className="building-address-detail text-sm flex">
                <IoLocationOutline className="text-xl" /> &nbsp; Lô E2a-7, Đường
                D1, phường Long Thạnh Mỹ, TP Thủ Đức, TPHCM
              </p>
            </div>

            <div className="buiding-detail body-content-normal-text text-justify mt-12">
              Located in the fast-growing area of ​​Thu Duc City, Ho Chi Minh
              City, the High-Tech Park branch has convenient transportation,
              close to residential areas and commercial centers. This makes it
              easy for individuals and businesses to move and access. With
              meeting and working rooms from small to large, Workzy provides a
              variety of spaces to suit the needs of organizing meetings,
              seminars, events or group work. Each room is fully equipped with
              amenities such as projectors, whiteboards, presentation screens
              and high-speed internet connection. The staff at Workzy High-Tech
              Park is always ready to support customers throughout the service
              process. From equipment instructions to technical support,
              everything is done quickly and professionally. Workzy not only
              provides meeting rooms but also supports flexible working
              solutions such as virtual office services, shared workspaces, and
              other convenient service packages for startups and freelancers.
              Workzy High-Tech Park aims to create a community workspace where
              people can communicate, exchange ideas and develop work in the
              most effective way. With the motto "Work smart, highly effective",
              Workzy is committed to bringing comfort, convenience and
              productivity to customers.
            </div>
          </div>
          <div className="building-img border border-gray-300">
            <img src={buildingImage} />
          </div>
        </div>
      </div>

      <div className="my-6">
        <Carousel images={images} />
      </div>

      <div className="mt-10">
        <h1 className="text-4xl font-bold m-5 ml-20">
          Available <span className="text-amber-500 text-5xl">Workspace</span>
        </h1>
        <FilterBar />
      </div>

      <div className="room-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-12">
        <RoomCard
          roomName="Premium Meeting Room"
          roomType="Meeting Room"
          area={50}
          chairs={18}
          price={30000}
          image="https://picsum.photos/500/300?random=1"
        />

        <RoomCard
          roomName="Premium Meeting Room"
          roomType="Meeting Room"
          area={50}
          chairs={18}
          price={30000}
          image="https://picsum.photos/500/300?random=2"
        />

        <RoomCard
          roomName="Premium Meeting Room"
          roomType="Meeting Room"
          area={50}
          chairs={18}
          price={30000}
          image="https://picsum.photos/500/300?random=3"
        />

        <RoomCard
          roomName="Premium Meeting Room"
          roomType="Meeting Room"
          area={50}
          chairs={18}
          price={30000}
          image="https://picsum.photos/500/300?random=4"
        />

        <RoomCard
          roomName="Premium Meeting Room"
          roomType="Meeting Room"
          area={50}
          chairs={18}
          price={30000}
          image="https://picsum.photos/500/300?random=5"
        />

        <RoomCard
          roomName="Premium Meeting Room"
          roomType="Meeting Room"
          area={50}
          chairs={18}
          price={30000}
          image="https://picsum.photos/500/300?random=6"
        />

        <RoomCard
          roomName="Premium Meeting Room"
          roomType="Meeting Room"
          area={50}
          chairs={18}
          price={30000}
          image="https://picsum.photos/500/300?random=7"
        />

        <RoomCard
          roomName="Premium Meeting Room"
          roomType="Meeting Room"
          area={50}
          chairs={18}
          price={30000}
          image="https://picsum.photos/500/300?random=8"
        />
      </div>

      <div className="join flex justify-center mb-10">
        <button className="join-item btn">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">10</button>
        <button className="join-item btn">11</button>
      </div>

      <div className="workzy-branch-maps">
        <div className="maps-container">
          <div>
            <Googlemap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415304884!2d106.80730807470056!3d10.841132857997573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1726955415730!5m2!1svi!2s" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Building;
