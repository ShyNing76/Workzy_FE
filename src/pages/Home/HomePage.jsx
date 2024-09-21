import Hero from "../../components/layout/Hero/Hero"
import Filter from "../../components/layout/HomePageFilter/Filter"
import ServiceCard from "../../components/layout/ServiceCard/ServiceCard"
import imageHero from "../../assets/Hero.jpg"
import imageHero2 from "../../assets/Hero2.jpg"
import Googlemap from "../../components/layout/Googlemap/Googlemap"
const HomePage = () => {
    return(
        <>
            <div>
                <Filter/>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                <ServiceCard title='Our solution' description='Browse our full range of products and services' />
                <ServiceCard title='Talk to us' description='Get advice from one of our experts' />
                <ServiceCard title='Book workspace' description='Book rooms and day offices' />
                <ServiceCard title='Set up office' description='Start building a real presence today' />
                <ServiceCard title='Become a VIP' description='Concessionary for VIP member' />
                <ServiceCard title='Explore our web' description='View our web to find your workspace' />
            </div>

            <div>
                <Hero title='Flexible workspaces for every business'
                    
                    details={
                    <>
                        <p>Whether you are looking for a desk, a private office or a full-floor office, Workzy offers a variety of workspace solutions to meet every need, promoting flexibility to help grow your business and deliver great experiences.</p>
                        <p>Seamlessly combining utility and aesthetic value, Workzy's flexible office solutions help individuals and businesses of all sizes enjoy a complete ecosystem, relieve stress, and reduce operational costs so you can focus on work and creativity.</p>
                    </>}
                      image = {imageHero}         
                />
            </div>

            <div>Discover our Services</div>


            <div>
                <Hero title="Work Seamlessly Wherever Your Business Takes You"
                    details = {
                        <>
                            <p>With over 4,000 office locations worldwide, we offer meeting rooms and coworking spaces in every town, city, and major transport hub. </p>
                            <p>Whether you're working solo, growing a startup, or leading one of the world’s most successful corporations, you can work close to your clients, colleagues, or family through our network. </p>
                        </>
                    }
                    
                    image = {imageHero2}
                />
            </div>

            <div>
                <Googlemap
                    src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.0709101923308!2d106.77992101092796!3d10.88221128922828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d89aad780e49%3A0x54542761d4c22175!2zS8O9IHTDumMgeMOhIEtodSBCIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1726835740160!5m2!1svi!2s"                   
                />
            </div>
        </>
    )
}

export default HomePage