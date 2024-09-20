import Hero from "../../components/layout/Hero/Hero"
import Filter from "../../components/layout/HomePageFilter/Filter"
import ServiceCard from "../../components/layout/ServiceCard/ServiceCard"
import imageHero from "../../assets/Hero.jpg"
import imageHero2 from "../../assets/Hero2.jpg"
const HomePage = () => {
    return(
        <>
            <div>
                <Filter/>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                <ServiceCard title='Service 1' description='Description 1' />
                <ServiceCard title='Service 2' description='Description 2' />
                <ServiceCard title='Service 3' description='Description 3' />
                <ServiceCard title='Service 4' description='Description 4' />
                <ServiceCard title='Service 5' description='Description 5' />
                <ServiceCard title='Service 6' description='Description 6' />
            </div>

            <div>
                <Hero title='Flexible workspaces for every business'
                    
                    details={<>
                        <p>Whether you are looking for a desk, a private office or a full-floor office, Workzy offers a variety of workspace solutions to meet every need, promoting flexibility to help grow your business and deliver great experiences.</p>
                        <p>Seamlessly combining utility and aesthetic value, Workzy's flexible office solutions help individuals and businesses of all sizes enjoy a complete ecosystem, relieve stress, and reduce operational costs so you can focus on work and creativity.</p>
                      </>}
                      image = {imageHero}         
                />
            </div>

            <div>Discover our Services</div>
            <div>
                <Hero title="Work Seamlessly Wherever Your Business Takes You"
                    //   details="With over 4,000 office locations worldwide, we offer meeting rooms and coworking spaces in every town, city, and major transport hub. 
                    //            Whether you're working solo, growing a startup, or leading one of the world’s most successful corporations, you can work close to your clients, colleagues, or family through our network."
                      
                    details = {
                        <>
                            <p>With over 4,000 office locations worldwide, we offer meeting rooms and coworking spaces in every town, city, and major transport hub. </p>
                            <p>With over 4,000 office locations worldwide, we offer meeting rooms and coworking spaces in every town, city, and major transport hub. </p>
                        </>
                    }
                    
                    image = {imageHero2}
                />
            </div>
        </>
    )
}

export default HomePage