import React, { useContext, useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import { EditorContext } from "../pages/editor.pages";
import Tags from "./tags.component";
import toast from "react-hot-toast";
import axios from "axios";
import { ThemeContext, UserContext } from "../App";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import lightlogo from '../imgs/logo-light.png'
import darklogo from '../imgs/logo-dark.png'
import { uploadImage } from "../common/aws";

const PublishForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    email: "",
    mobileNumber: "",
    city: "",
    numberOfDays: "",
    locationLink: "",
    banner: "",
    jobType: "",
    des: "",
    lat: '',
    long: ''
  });
  let { theme, setTheme } = useContext(ThemeContext)

  let { blog_id } = useParams()
  const handleBannerUpload = (e) => {
    e.preventDefault();
    console.log(e);
    let img = e.target.files[0];
    if (img) {
      let loadingToast = toast.loading("uploading...");
      uploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success("uploaded 👍");

            setFormData({ ...formData, banner: url });
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err.message);
        });
    }
  };
  const { userAuth,
    setUserAuth
  } = useContext(UserContext);

  useEffect(() => {
    storingData();
  }, []);

  const storingData = async () => {
    try {
      let userInSession = await sessionStorage.getItem("user");
      console.log(userInSession);
      if (userInSession) {
        setUserAuth(JSON.parse(userInSession));
      } else {
        setUserAuth({ access_token: null });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const {
  //   blog: { banner, tags, title: blogTitle, des: blogDescription, content },
  //   setEditorState,
  //   setBlog,
  //   blog,
  // } = useContext(EditorContext);

  const navigate = useNavigate();

  const handleClosed = () => {
    setEditorState("editor");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePublishBlog = () => {

    console.log(formData)

    const loading = toast.loading('publishing post...')

    axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/create-post`, {
      formData
    }, {
      headers: {
        Authorization: `berear ${userAuth && userAuth.access_token}`
      }
    })
      .then((res) => {
        console.log(res.data);
        toast.dismiss(loading)
        // setFormData({
        //   title: "",
        //   email: "",
        //   mobileNumber: "",
        //   city: "",
        //   numberOfDays: "",
        //   locationLink: "",
        //   banner: "",
        //   jobType: "",
        //   des: ""
        // })
        return toast.success('published Successfully')

      })
      .catch(err => {
        toast.dismiss(loading)
        console.log(err);
        return toast.error(err.response.data.error)
      })

  };


  const handleSaveDraft = () => {

  }

  const [location, setUserLocation] = useState()
  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of userlocation variable
          setFormData({
            ...formData,
            locationLink: `https://maps.google.com/?q=${latitude},${longitude}`,
            lat: latitude,
            long: longitude
          });
          
          setUserLocation({ latitude, longitude });
        },
        // if there was an error getting the users location
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
    // if geolocation is not supported by the users browser
    else {
      console.error("Geolocation is not supported by this browser.");
    }
  };


  return (
    <AnimationWrapper>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img className="" src={theme == 'light' ? darklogo : lightlogo} alt="" />
        </Link>

        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {formData.title.length ? formData.title : "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto ">
          <button onClick={handlePublishBlog} className="btn-dark py-2 ">
            Publish
          </button>
          <button onClick={handleSaveDraft} className="btn-light py-2 ">
            Save Draft
          </button>
        </div>
      </nav>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4 ">

        <div className="center mt-4  w-full ">
          <p className="text-dark-grey mb-1 ">Preview</p>
          <div className="relative aspect-video bg-white hover:opacity-80">
            <label htmlFor="upload_banner">
              <img

                className="z-20 "
                src={formData.banner}
                alt=""
              />
              <input
                id="upload_banner"
                type="file"
                accept=".png , .jpg , .jpeg"
                hidden
                onChange={handleBannerUpload}
              />
            </label>
            <p className="text-dark-grey mb-2 mt-9 ">Blog Title</p>
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={formData.title}
              className="input-box pl-4"
              onChange={handleInputChange}
            />
            <p className="text-dark-grey mb-2 mt-9 ">Enter Your Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              className="input-box pl-4"
              onChange={handleInputChange}
            />
            <p className="text-dark-grey mb-2 mt-9 ">Enter Your Mobile Number</p>
            <input
              type="Number"
              name="mobileNumber"
              placeholder="Enter Your Mobile Number"
              value={formData.mobileNumber}
              className="input-box pl-4 mb-8"
              onChange={handleInputChange}
            />

          </div>
          <h1 className=" text-4xl font-medium mt-2 leading-tight line-clamp-2 ">
            {formData.blogTitle}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {formData.blogDescription}
          </p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-8">

          <p className="text-dark-grey mb-2 mt-9 ">Enter The Short Description About Your Work</p>
          <textarea
            type="text"
            name="des"
            placeholder="Enter Your Mobile Number"
            value={formData.des}
            className="input-box pl-4 mb-8"
            onChange={handleInputChange}
          />
          <div class="w-full">
            <label for="city" class="block text-sm font-medium">Enter Your City</label>
            <select
              id="city"
              name="city"
              className="input-box"
              value={formData.city}
              onChange={handleInputChange}
            >
              <option value="dombivli">Dombivli</option>
              <option value="kalyan">Kalyan</option>
              <option value="thane">Thane</option>
            </select>
          </div>
          <div class="w-full">
            <label for="jobType" class="block mt-4 text-sm font-medium">Enter The Job Type</label>
            <select
              id="jobType"
              name="jobType"
              className="input-box"
              value={formData.jobType}
              onChange={handleInputChange}
            >
              <option value="dombiMeal-Preparation-and-Cookingvli">Meal Preparation and Cooking</option>
              <option value="Cleaning-Services">Cleaning Services</option>
              <option value="Childcare-Services">Childcare Services</option>
              <option value="Elderly-Care-Services">Elderly Care Services</option>
              <option value="Pet-Care-Services">Pet Care Services</option>
            </select>
          </div>
          <p className="text-dark-grey mb-2 mt-9 ">Number Of Days</p>
          <input
            type="Number"
            name="numberOfDays"
            placeholder="Enter The Number Of Days"
            value={formData.numberOfDays}
            className="input-box pl-4"
            onChange={handleInputChange}
          />
          <button onClick={getUserLocation} className="mt-4 btn-dark px-8">
            Set Current Location
          </button>
          <br /><br />
          <p className="text-dark-grey mb-2">Enter The Location Link</p>
          <input
            type="text"
            name="locationLink"
            placeholder="Enter The Location Link"
            value={formData.locationLink}
            className="input-box pl-4 mb-4"
            onChange={handleInputChange}
          />
          <button onClick={handlePublishBlog} className="btn-dark px-8">
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
// https://maps.google.com/?q=${post.latitude},${post.longitude}