import React, {
    useEffect,
    useRef,
    useState,
    useContext,
    Suspense,
  } from "react";
  import {
    favourites,
    unfavourites,
    next_btn,
    prev_btn,
    back,
    purple_cart,
  } from "../assets/icons";
  import product_banner from "../assets/images/product_banner.png";
  import product_banner_1 from "../assets/images/product_banner_1.png";
  import product_banner_2 from "../assets/images/product_banner_2.png";
  import product_banner_3 from "../assets/images/product_banner_3.png";
  import { Cloudinary } from "@cloudinary/url-gen";
  import { AdvancedImage } from "@cloudinary/react";
  import ShopContext from "../context/shopContext";
  import UserContext from "../context/userContext";
  import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
  import { cld } from "../util/cloudinaryConfig";
  import CategoryBar from './CategoryBar'
import Produccts from './Produccts'
import Policy from './Policy'
import SuggestionSlider from './SuggestionSlider'
import TopPicks from './TopPicks'
import Footer from './Footer'
import Partners from './Partners'
  const Products = ({ category, setCategory, subCategory, setSubCategory }) => {
    const { addToCart } = useContext(ShopContext);
    const {
      getProducts,
      products,
      getCategories,
      getSubCategories,
      categories,
      subCategories,
    } = useContext(ShopContext);
    const { likedProducts, likeProduct } = useContext(UserContext);
  
    const scrollContainerRef = useRef(null);
    const [showFilters, setShowFilters] = useState(false);
    const [open, setOpen] = React.useState(1);
  
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
  
    useEffect(() => {
      if (category) {
        getSubCategories(category._id);
      }
    }, [category]);
  
    useEffect(() => {
      if (category === null) {
        getCategories();
        setSubCategory(null);
      }
    }, []);
  
    //scrollBar setting
    useEffect(() => {
      const handleScroll = (e) => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({
            left: -e.deltaY * 2,
            behavior: "smooth",
          });
        }
      };
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener("wheel", handleScroll);
      }
      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener("wheel", handleScroll);
        }
      };
    }, []);
  
    const scrollLeft = () => {
      console.log("scrolling Left", scrollContainerRef.current);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    };
  
    const scrollRight = () => {
      console.log("scrolling Right", scrollContainerRef.current);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    };
  
    const handleCategoryClick = (category) => {
      getSubCategories(category._id);
      setCategory(category);
    };
  
    const handleSubCategoryClick = (subCategory) => {
      console.log("FETCHING PRODUCTS");
      getProducts(subCategory._id);
      setSubCategory(subCategory);
    };
  
    const isLiked = (productId) => {
      return likedProducts.includes(productId);
    };
  
    return (
      <>
      <div className="">
        <CategoryBar/>
      <Produccts/>
      <Policy/>
      <SuggestionSlider/>
      <TopPicks/>
      <Partners/>
      <Footer/>
      </div>
      </>
    );
  };
  
  export default Products;
  