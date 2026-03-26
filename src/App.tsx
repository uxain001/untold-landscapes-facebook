/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  Facebook, 
  Instagram, 
  Camera, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X,
  ChevronRight,
  Mail,
  Globe,
  Phone
} from "lucide-react";
import { useState, useRef } from "react";

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=1000",
    title: "The Valley of Shepherds",
    location: "Pahalgam, Kashmir",
    category: "Mountains"
  },
  {
    url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1000",
    title: "Meadow of Gold",
    location: "Sonamarg, Kashmir",
    category: "Mountains"
  },
  {
    url: "https://images.unsplash.com/photo-1589136142558-9df93459ce6d?auto=format&fit=crop&q=80&w=1000",
    title: "Meadow of Flowers",
    location: "Gulmarg, Kashmir",
    category: "Mountains"
  },
  {
    url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1000",
    title: "The High Pass",
    location: "Sinthan Top, Kashmir",
    category: "Mountains"
  },
  {
    url: "https://images.unsplash.com/photo-1598305322298-2938de39946f?auto=format&fit=crop&q=80&w=1000",
    title: "Niagara of Kashmir",
    location: "Aharbal, Kashmir",
    category: "Water"
  },
  {
    url: "https://images.unsplash.com/photo-1544833095-196c5f248c67?auto=format&fit=crop&q=80&w=1000",
    title: "The Pristine Vishansar",
    location: "Vishansar Lake, Kashmir",
    category: "Water"
  },
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000",
    title: "Gangabal Majesty",
    location: "Gangabal Lake, Kashmir",
    category: "Water"
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
    title: "Tarsar Serenity",
    location: "Tarsar Lake, Kashmir",
    category: "Water"
  },
  {
    url: "https://images.unsplash.com/photo-1433086566045-f701638061ee?auto=format&fit=crop&q=80&w=1000",
    title: "Gadsar - Lake of Flowers",
    location: "Gadsar Lake, Kashmir",
    category: "Water"
  },
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
    title: "Noori Chamb Falls",
    location: "Noori Chamb, Kashmir",
    category: "Water"
  },
  {
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000",
    title: "Drung Icy Falls",
    location: "Drung, Kashmir",
    category: "Water"
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
    title: "Source of Jhelum",
    location: "Verinag Spring, Kashmir",
    category: "Water"
  },
  {
    url: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&q=80&w=1000",
    title: "Alpather Frozen Lake",
    location: "Alpather Lake, Kashmir",
    category: "Water"
  },
  {
    url: "https://images.unsplash.com/photo-1599666505327-7758b44a9985?auto=format&fit=crop&q=80&w=1000",
    title: "Dachigam Wilderness",
    location: "Dachigam National Park, Kashmir",
    category: "Forest"
  },
  {
    url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1000",
    title: "Overa-Aru Woods",
    location: "Overa-Aru Wildlife Sanctuary, Kashmir",
    category: "Forest"
  },
  {
    url: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1000",
    title: "Gulmarg Pine Forest",
    location: "Gulmarg Wildlife Sanctuary, Kashmir",
    category: "Forest"
  },
  {
    url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000",
    title: "Hirpora Highlands",
    location: "Hirpora Wildlife Sanctuary, Kashmir",
    category: "Forest"
  },
  {
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000",
    title: "Kishtwar Alpine Forest",
    location: "Kishtwar National Park, Kashmir",
    category: "Forest"
  },
  {
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1000",
    title: "Kazinag Wilderness",
    location: "Kazinag National Park, Kashmir",
    category: "Forest"
  },
  {
    url: "https://images.unsplash.com/photo-1501854140801-50d01674db4e?auto=format&fit=crop&q=80&w=1000",
    title: "Baltal Forest Range",
    location: "Baltal-Amarnath Wildlife Sanctuary, Kashmir",
    category: "Forest"
  },
  {
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1000",
    title: "Langate Greenery",
    location: "Langate Forest Range, Kashmir",
    category: "Forest"
  },
  {
    url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1000",
    title: "Pir Panjal Pines",
    location: "Pir Panjal Forest Range, Kashmir",
    category: "Forest"
  },
  {
    url: "https://images.unsplash.com/photo-1505242844904-26d8496476af?auto=format&fit=crop&q=80&w=1000",
    title: "Sindh Valley Woods",
    location: "Sindh Forest Range, Kashmir",
    category: "Forest"
  },
  {
    url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=1000",
    title: "Golden Mustard Carpets",
    location: "Pulwama, Kashmir",
    category: "Fields"
  },
  {
    url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=1000",
    title: "The Land of Love",
    location: "Lolab Valley, Kashmir",
    category: "Fields"
  },
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
    title: "Hidden Bangus",
    location: "Bangus Valley, Kashmir",
    category: "Fields"
  },
  {
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000",
    title: "Gateway to Dardistan",
    location: "Gurez Valley, Kashmir",
    category: "Fields"
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
    title: "Saffron Capital",
    location: "Pampore, Kashmir",
    category: "Fields"
  },
  {
    url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1000",
    title: "Meadow of Jesus",
    location: "Yusmarg, Kashmir",
    category: "Fields"
  }
];

const LOCATION_DETAILS: Record<string, { description: string; places: { name: string; desc: string }[] }> = {
  "Pahalgam, Kashmir": {
    description: "Known as the 'Valley of Shepherds', Pahalgam is a premier health resort in Kashmir, situated at the confluence of the streams flowing from Sheshnag Lake and the Lidder River.",
    places: [
      { name: "Betaab Valley", desc: "Named after the Bollywood film Betaab, it offers lush green meadows and snow-capped peaks." },
      { name: "Aru Valley", desc: "A scenic village known for its meadows, lakes, and mountains; a base for trekking to Kolahoi Glacier." },
      { name: "Chandanwari", desc: "The starting point of the Amarnath Yatra pilgrimage, famous for its snow bridge." },
      { name: "Baisaran", desc: "Often called 'Mini Switzerland', it's a beautiful meadow surrounded by pine forests." }
    ]
  },
  "Sonamarg, Kashmir": {
    description: "The 'Meadow of Gold', Sonamarg is a trekker's paradise and the gateway to Ladakh, famous for its glaciers and alpine lakes.",
    places: [
      { name: "Thajiwas Glacier", desc: "A major attraction where snow remains year-round, accessible by a short trek or pony ride." },
      { name: "Zoji La Pass", desc: "A high mountain pass that connects the Kashmir Valley with Ladakh." },
      { name: "Vishansar Lake", desc: "A high-altitude alpine lake known for its pristine blue waters and trout fishing." },
      { name: "Baltal Valley", desc: "A picturesque base camp for the Amarnath Yatra, offering stunning valley views." }
    ]
  },
  "Gulmarg, Kashmir": {
    description: "The 'Meadow of Flowers', Gulmarg is a world-famous ski resort and home to one of the highest cable cars in the world.",
    places: [
      { name: "Gulmarg Gondola", desc: "One of the highest cable cars in the world, offering breathtaking views of the Himalayas." },
      { name: "Khilanmarg", desc: "A small valley that offers a panoramic view of the twin peaks of Nun and Kun." },
      { name: "Apharwat Peak", desc: "The summit reached by the second phase of the Gondola, popular for skiing and snowboarding." },
      { name: "Alpather Lake", desc: "A high-altitude lake at the foot of Apharwat peaks that remains frozen until mid-June." }
    ]
  },
  "Sinthan Top, Kashmir": {
    description: "A high mountain pass connecting Anantnag with Kishtwar, offering 360-degree views of the surrounding mountain ranges.",
    places: [
      { name: "Daksum", desc: "A quiet forest retreat known for its trout streams and coniferous forests." },
      { name: "Sinthan Pass", desc: "The highest point of the road, offering spectacular views of both Kashmir and Jammu divisions." },
      { name: "Breng Valley", desc: "A hidden gem known for its natural beauty, springs, and historical significance." }
    ]
  },
  "Aharbal, Kashmir": {
    description: "Famous for the Aharbal Waterfall, often called the 'Niagara Falls of Kashmir', it's a serene spot for nature lovers and adventure seekers.",
    places: [
      { name: "Aharbal Waterfall", desc: "A powerful waterfall formed by the Veshu River falling 25 meters over basalt rocks." },
      { name: "Kungwattan", desc: "A beautiful meadow located a short trek away from the waterfall, ideal for camping." },
      { name: "Kousar Nag Lake", desc: "A large, high-altitude oligotrophic lake surrounded by snow-clad peaks." }
    ]
  },
  "Vishansar Lake, Kashmir": {
    description: "The 'Lake of Vishnu', this high-altitude oligotrophic lake is known for its pristine blue waters and is home to several species of trout.",
    places: [
      { name: "Krishansar Lake", desc: "Located just a short distance from Vishansar, it is equally beautiful and surrounded by lush meadows." },
      { name: "Nichnai Pass", desc: "A high mountain pass that offers breathtaking views of the Vishansar and Krishansar lakes." }
    ]
  },
  "Gangabal Lake, Kashmir": {
    description: "Situated at the foothills of Mount Harmukh, Gangabal is one of the largest alpine lakes in Kashmir and holds great spiritual significance.",
    places: [
      { name: "Nundkol Lake", desc: "A smaller lake located nearby, offering a stunning reflection of Mount Harmukh." },
      { name: "Mount Harmukh", desc: "The majestic peak that towers over the Gangabal lake, a challenge for trekkers and climbers." }
    ]
  },
  "Tarsar Lake, Kashmir": {
    description: "An almond-shaped alpine lake known for its turquoise waters and the surrounding meadows of wildflowers.",
    places: [
      { name: "Marsar Lake", desc: "The twin lake of Tarsar, often hidden in clouds and separated by a mountain ridge." },
      { name: "Lidderwat", desc: "A scenic meadow that serves as a base camp for the trek to Tarsar and Marsar lakes." }
    ]
  },
  "Gadsar Lake, Kashmir": {
    description: "Known as the 'Lake of Flowers', Gadsar is famous for the variety of wildflowers that bloom on its shores during summer.",
    places: [
      { name: "Gadsar Pass", desc: "The highest point of the Great Lakes Trek, offering a panoramic view of the surrounding peaks." },
      { name: "Yamsar Lake", desc: "A small, serene lake located in the vicinity of Gadsar." }
    ]
  },
  "Noori Chamb, Kashmir": {
    description: "A historic waterfall named after Queen Nur Jahan, who used to bathe here during her travels to Kashmir.",
    places: [
      { name: "Poonch River", desc: "The river that feeds the waterfall, offering scenic views along its banks." },
      { name: "Peer Ki Gali", desc: "A nearby mountain pass that offers a gateway to the beautiful Poonch valley." }
    ]
  },
  "Drung, Kashmir": {
    description: "Famous for its waterfall that freezes completely during winter, creating a magical ice structure.",
    places: [
      { name: "Drung Waterfall", desc: "A spectacular waterfall that is a sight to behold in both summer and winter." },
      { name: "Tangmarg", desc: "A nearby town that serves as a gateway to Gulmarg and offers beautiful forest views." }
    ]
  },
  "Verinag Spring, Kashmir": {
    description: "The official source of the Jhelum River, featuring a deep blue octagonal spring built by Emperor Jahangir.",
    places: [
      { name: "Mughal Garden Verinag", desc: "A beautifully landscaped garden surrounding the spring, reflecting Mughal architecture." },
      { name: "Banihal Pass", desc: "A nearby mountain pass that connects the Kashmir Valley with the Jammu region." }
    ]
  },
  "Alpather Lake, Kashmir": {
    description: "A high-altitude lake located at the foot of the Apharwat Peaks, it remains frozen for most of the year.",
    places: [
      { name: "Apharwat Peak", desc: "The majestic peak that overlooks the lake, accessible via the Gulmarg Gondola." },
      { name: "Khilanmarg", desc: "A beautiful meadow located on the way to the lake, offering panoramic views." }
    ]
  },
  "Himalayas": {
    description: "The world's highest mountain range, home to some of the planet's most iconic peaks and diverse ecosystems.",
    places: [
      { name: "Everest Base Camp", desc: "The legendary starting point for climbers attempting to summit the world's highest peak." },
      { name: "Leh-Ladakh", desc: "A high-altitude desert known for its Buddhist monasteries and dramatic landscapes." },
      { name: "Spiti Valley", desc: "A cold desert mountain valley located high in the Himalayas." }
    ]
  },
  "Dachigam National Park, Kashmir": {
    description: "Located near Srinagar, Dachigam is the last home of the Hangul (Kashmir Stag) and is known for its diverse flora and fauna across varying altitudes.",
    places: [
      { name: "Lower Dachigam", desc: "Home to the Hangul stag and diverse bird species in a riverine forest setting." },
      { name: "Marsar Lake", desc: "A high-altitude lake located in the upper reaches of the park." },
      { name: "Dagwan River", desc: "A pristine river flowing through the park, essential for the local ecosystem." }
    ]
  },
  "Overa-Aru Wildlife Sanctuary, Kashmir": {
    description: "Situated near Pahalgam, this sanctuary is famous for its diverse birdlife and rare mammals like the Musk Deer and Leopard.",
    places: [
      { name: "Lidder Valley", desc: "A beautiful valley within the sanctuary offering stunning views and trekking paths." },
      { name: "Aru Biosphere", desc: "A protected area known for its rich biodiversity and scenic beauty." }
    ]
  },
  "Gulmarg Wildlife Sanctuary, Kashmir": {
    description: "Surrounding the famous Gulmarg resort, this sanctuary features dense coniferous forests and is a habitat for the Himalayan Brown Bear.",
    places: [
      { name: "Ningle Nallah", desc: "A beautiful mountain stream flowing through dense pine forests." },
      { name: "Ferozepur Nallah", desc: "A scenic spot popular for trout fishing and nature walks." }
    ]
  },
  "Hirpora Wildlife Sanctuary, Kashmir": {
    description: "Located in Shopian, this sanctuary is a vital corridor for the Markhor and features diverse forest types from deciduous to alpine.",
    places: [
      { name: "Mughal Road", desc: "A historic road passing through the sanctuary, offering breathtaking views." },
      { name: "Peer Ki Gali", desc: "A high mountain pass within the sanctuary known for its spiritual and natural significance." }
    ]
  },
  "Kishtwar National Park, Kashmir": {
    description: "A high-altitude park known for its rugged terrain, glaciers, and rare species like the Snow Leopard and Himalayan Black Bear.",
    places: [
      { name: "Marwah Valley", desc: "A remote and beautiful valley known for its unique culture and natural beauty." },
      { name: "Warwan Valley", desc: "A stunning valley offering some of the most challenging and rewarding treks in Kashmir." }
    ]
  },
  "Kazinag National Park, Kashmir": {
    description: "Located in the Baramulla district, it is famous for being a prime habitat of the Markhor and is characterized by its sub-alpine and alpine forests.",
    places: [
      { name: "Lachipora", desc: "A scenic area within the park known for its dense forests and wildlife sightings." },
      { name: "Limber", desc: "Another vital part of the park featuring diverse flora and a peaceful environment." }
    ]
  },
  "Baltal-Amarnath Wildlife Sanctuary, Kashmir": {
    description: "This sanctuary encompasses the famous Baltal valley and serves as a critical habitat for high-altitude wildlife along the Amarnath pilgrimage route.",
    places: [
      { name: "Baltal Valley", desc: "A picturesque valley that serves as a base camp for pilgrims and a haven for nature enthusiasts." },
      { name: "Amarnath Cave Area", desc: "The high-altitude region surrounding the holy cave, featuring unique alpine vegetation." }
    ]
  },
  "Langate Forest Range, Kashmir": {
    description: "A vital forest division in North Kashmir known for its extensive deodar and pine forests, contributing significantly to the region's biodiversity.",
    places: [
      { name: "Mawar Valley", desc: "A beautiful valley within the range known for its lush greenery and serene atmosphere." },
      { name: "Langate Woods", desc: "Dense forests offering a peaceful retreat and a glimpse into the region's rich flora." }
    ]
  },
  "Pir Panjal Forest Range, Kashmir": {
    description: "Stretching across the Pir Panjal mountain range, these forests are home to diverse species and offer some of the most scenic trekking routes in Kashmir.",
    places: [
      { name: "Yusmarg", desc: "A beautiful meadow surrounded by dense forests, often called the 'Meadow of Jesus'." },
      { name: "Doodhpathri", desc: "A scenic spot known for its lush green meadows and a river that looks like milk." }
    ]
  },
  "Sindh Forest Range, Kashmir": {
    description: "Located along the Sindh River, this range features a mix of riverine and coniferous forests, providing a unique habitat for various wildlife.",
    places: [
      { name: "Kangan", desc: "A picturesque town serving as a gateway to the Sindh Valley and its beautiful forests." },
      { name: "Ganderbal Woods", desc: "Scenic forests offering a blend of natural beauty and tranquility." }
    ]
  },
  "Pulwama, Kashmir": {
    description: "Known for its vast mustard fields that turn the landscape into a sea of gold during spring, Pulwama is a sight to behold.",
    places: [
      { name: "Mustard Fields", desc: "Expansive fields of yellow mustard flowers that create a stunning visual contrast with the blue sky." },
      { name: "Shikargah", desc: "A beautiful wildlife sanctuary and a popular picnic spot known for its lush greenery." }
    ]
  },
  "Lolab Valley, Kashmir": {
    description: "Often called the 'Land of Love and Beauty', Lolab is a pristine valley in North Kashmir known for its fruit orchards and green meadows.",
    places: [
      { name: "Kalaroos Caves", desc: "Ancient caves that are believed to have a secret route to Russia, surrounded by beautiful forests." },
      { name: "Chandigam", desc: "A scenic village in the valley known for its beautiful landscapes and peaceful environment." }
    ]
  },
  "Bangus Valley, Kashmir": {
    description: "A hidden gem in North Kashmir, Bangus is a vast meadow surrounded by mountains, offering a serene and untouched natural beauty.",
    places: [
      { name: "Bada Bangus", desc: "The larger of the two meadows, known for its expansive grasslands and diverse flora." },
      { name: "Chota Bangus", desc: "A smaller, equally beautiful meadow offering a peaceful retreat for nature lovers." }
    ]
  },
  "Gurez Valley, Kashmir": {
    description: "A remote and beautiful valley located high in the Himalayas, known for its unique culture, wooden houses, and the Kishanganga River.",
    places: [
      { name: "Habba Khatoon Peak", desc: "A majestic pyramid-shaped peak named after the famous Kashmiri poetess." },
      { name: "Kishanganga River", desc: "A pristine river that flows through the valley, offering opportunities for trout fishing and rafting." }
    ]
  },
  "Pampore, Kashmir": {
    description: "The saffron capital of India, Pampore is famous for its vast saffron fields that bloom in late autumn, creating a purple carpet.",
    places: [
      { name: "Saffron Fields", desc: "The iconic fields where the world's most expensive spice is grown and harvested." },
      { name: "Jhelum River Banks", desc: "The scenic banks of the Jhelum river that offer beautiful views of the surrounding fields." }
    ]
  },
  "Yusmarg, Kashmir": {
    description: "Often called the 'Meadow of Jesus', Yusmarg is a beautiful meadow surrounded by dense pine forests and snow-capped peaks.",
    places: [
      { name: "Doodhganga River", desc: "A beautiful river that flows through the meadow, known for its milky white water." },
      { name: "Nilnag Lake", desc: "A serene high-altitude lake surrounded by dense forests, located a short trek away from Yusmarg." }
    ]
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const heroRef = useRef(null);
  
  const filteredImages = activeFilter === "All" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeFilter);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen selection:bg-landscape-accent selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-landscape-dark rounded-full flex items-center justify-center text-white">
              <Camera size={20} />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">Untold Landscape</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Gallery", "About", "Stories", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-landscape-dark/60 hover:text-landscape-dark transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href="https://www.facebook.com/untoldlanscape" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-landscape-dark text-white text-sm font-medium rounded-full hover:bg-landscape-accent transition-all duration-300"
            >
              Follow on Facebook
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-landscape-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-black/5 p-6 md:hidden flex flex-col gap-4"
          >
            {["Gallery", "About", "Stories", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-lg font-serif"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center pt-20">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Landscape"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-semibold tracking-widest uppercase mb-6">
              Exploring the Unseen
            </span>
            <h1 className="text-6xl md:text-8xl text-white font-serif mb-8 leading-[1.1]">
              Untold <br /> <span className="italic">Landscape</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Capturing the raw beauty of our planet through a lens of wonder. 
              Every vista tells a story that has been waiting to be heard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative w-full sm:w-auto px-10 py-5 bg-white text-landscape-dark rounded-full font-bold flex items-center justify-center gap-3 overflow-hidden group shadow-xl shadow-black/5 hover:shadow-landscape-accent/30 transition-all duration-500"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Explore Gallery</span>
                <ArrowRight size={20} className="relative z-10 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-500" />
                <div className="absolute inset-0 bg-landscape-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              </motion.button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300"
              >
                Our Story
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">The Collection</h2>
            <p className="text-landscape-dark/60 max-w-md">
              A curated selection of moments frozen in time, from the highest peaks to the deepest forests.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {["All", "Mountains", "Forest", "Water", "Fields", "Desert"].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-sm font-medium pb-1 border-b-2 transition-all duration-300 ${activeFilter === filter ? "border-landscape-dark text-landscape-dark" : "border-transparent text-landscape-dark/40 hover:text-landscape-dark"}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((image, index) => (
              <motion.div 
                key={image.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedLocation(image.location)}
                className="group cursor-pointer"
              >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-landscape-accent uppercase tracking-wider mb-1">{image.category}</p>
                      <p className="text-sm font-serif font-bold text-landscape-dark">{image.title}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-landscape-dark text-white flex items-center justify-center">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-landscape-dark/40">
                <MapPin size={14} />
                <span className="text-xs font-medium uppercase tracking-widest">{image.location}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 border border-landscape-dark/10 rounded-full text-landscape-dark font-medium hover:bg-landscape-dark hover:text-white transition-all duration-300">
            View Full Archive
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-landscape-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-3xl overflow-hidden aspect-square"
            >
              <img 
                src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1000" 
                alt="About Us"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-white/10 rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-landscape-accent/20 blur-3xl rounded-full" />
          </div>

          <div>
            <span className="text-landscape-accent font-medium tracking-widest uppercase text-sm mb-4 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              Beyond the frame, <br /> lies the <span className="italic">soul</span> of nature.
            </h2>
            <div className="space-y-6 text-white/70 text-lg font-light leading-relaxed">
              <p>
                Untold Landscape began as a simple Facebook page dedicated to sharing the quiet majesty of the natural world. What started as a hobby evolved into a global community of nature enthusiasts.
              </p>
              <p>
                Our mission is to bridge the gap between humanity and the wilderness. We believe that by showcasing the "untold" stories of our landscapes, we can inspire a deeper appreciation and a stronger commitment to conservation.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-serif text-white mb-1">750</p>
                <p className="text-sm text-white/40 uppercase tracking-widest">Followers</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-white mb-1">120+</p>
                <p className="text-sm text-white/40 uppercase tracking-widest">Expeditions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif mb-6">Join the Community</h2>
        <p className="text-landscape-dark/60 mb-12 text-lg">
          Follow our daily updates on Facebook and Instagram for behind-the-scenes stories and fresh perspectives from the field.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href="https://www.facebook.com/untoldlanscape" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-[#1877F2] text-white rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <Facebook size={24} />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold opacity-70 leading-none mb-1">Follow us on</p>
              <p className="font-bold leading-none">Facebook</p>
            </div>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <Instagram size={24} />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold opacity-70 leading-none mb-1">Follow us on</p>
              <p className="font-bold leading-none">Instagram</p>
            </div>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#f0f0ee]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-sm flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-4xl font-serif mb-6">Get in Touch</h2>
              <p className="text-landscape-dark/60 mb-10">
                Interested in prints, collaborations, or just want to share a story? We'd love to hear from you.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-landscape-dark/5 rounded-full flex items-center justify-center text-landscape-dark">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-landscape-dark/40 uppercase tracking-widest">Email</p>
                    <p className="font-medium">SHEIKHUXI57@GMAIL.COM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-landscape-dark/5 rounded-full flex items-center justify-center text-landscape-dark">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-landscape-dark/40 uppercase tracking-widest">Phone</p>
                    <p className="font-medium">+91 70064 03947</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-landscape-dark/40">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name"
                    className="w-full px-6 py-4 bg-landscape-dark/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-landscape-accent/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-landscape-dark/40">Email</label>
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="w-full px-6 py-4 bg-landscape-dark/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-landscape-accent/20 transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-landscape-dark/40">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell us something..."
                    className="w-full px-6 py-4 bg-landscape-dark/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-landscape-accent/20 transition-all resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button className="w-full py-5 bg-landscape-dark text-white rounded-2xl font-bold hover:bg-landscape-accent transition-all duration-300">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Camera size={18} className="text-landscape-dark" />
            <span className="font-serif font-bold">Untold Landscape</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-landscape-dark/40">
            <a href="#" className="hover:text-landscape-dark transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-landscape-dark transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-landscape-dark transition-colors">Cookie Policy</a>
          </div>

          <p className="text-sm text-landscape-dark/40">
            © {new Date().getFullYear()} Untold Landscape. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Location Modal */}
      {selectedLocation && LOCATION_DETAILS[selectedLocation] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedLocation(null)}
            className="absolute inset-0 bg-landscape-dark/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[32px] p-8 md:p-12 shadow-2xl"
          >
            <button 
              onClick={() => setSelectedLocation(null)}
              className="absolute top-6 right-6 p-2 bg-landscape-dark/5 rounded-full hover:bg-landscape-dark/10 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="mb-8">
              <div className="flex items-center gap-2 text-landscape-accent mb-2">
                <MapPin size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">{selectedLocation}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif mb-4">{selectedLocation.split(',')[0]}</h3>
              <p className="text-landscape-dark/60 leading-relaxed">
                {LOCATION_DETAILS[selectedLocation].description}
              </p>
            </div>

            <div className="space-y-8">
              <h4 className="text-lg font-serif font-bold border-b border-black/5 pb-2">Visiting Places</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LOCATION_DETAILS[selectedLocation].places.map((place, idx) => (
                  <div key={idx} className="group">
                    <p className="font-bold text-landscape-dark mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-landscape-accent rounded-full" />
                      {place.name}
                    </p>
                    <p className="text-sm text-landscape-dark/60 leading-relaxed">
                      {place.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <button 
                onClick={() => setSelectedLocation(null)}
                className="w-full py-4 bg-landscape-dark text-white rounded-2xl font-bold hover:bg-landscape-accent transition-all duration-300"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
