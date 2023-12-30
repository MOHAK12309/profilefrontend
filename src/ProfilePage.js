import React, { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { getUserIdFromAuth } from "./Redux/actions/GetSellerIdFromAuthActionCreators";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// console.log(id2)
function ProfilePage() {
  // console.log(extractedObjectId, "hi")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const baseUrl = "https://server.careerclassroom.in";
  const dispatch = useDispatch("");
  const navigation = useNavigate("");
  const [name, setName] = useState("");
  const [showUpload, setUpload] = useState(false);
  const [bio, setBio] = useState("");
  const [show, setShow] = useState("name");
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState("profile");
  const id = useSelector((state) => state.get_seller_profile_id.user_id);
  const username = useSelector((state) => state.get_seller_profile_id.name);

  const navigate = useNavigate("");
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${baseUrl}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.status === "success") {
        dispatch(getUserIdFromAuth({}));

        toast("Logout successfull");

        navigate("/");
      }
    } catch (err) {
      // console.log(err);
      window.alert("There may be some internal server error");
    }
  };

  const handleGetOneUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/user/getOneuser/${id}`);
      setData([res.data.data.user]);
      console.log(res, "<----api data");
    } catch (err) {
      console.log(err, "<--- err in api fetching");
    }
  };

  useEffect(() => {
    handleGetOneUser();
  }, []);

  const intrest = [
    { label: "JAVA " },
    { label: "Python" },
    { label: "DSA" },
    { label: "Data Science" },
    { label: "Css" },
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${baseUrl}/api/v1/user/update/${id}`,
        {
          intrest: selected,
          bio: bio,
          name: name,

          // isEmailVerified: isEmailVerified
        }
      );
      // dispatch(getUserIdFromAuth(response.data.data.user._id, response.data.data.user.name, response.data.data.user.email));
      if (response.data.status === "success") {
        toast("Profile updated success");

        // dispatch(getUserIdFromAuth(response.data.data.user._id,  response.data.data.user.name, response.data.data.user.email));
        console.log(response.data.data.user._id);

        // settoken(response.data.token);
        // navigate("/home")
        // console.log(response.data.data.user.name)
        // settoken(response.data.token);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data === undefined || data.length === 0) return;
    setBio(data[0].bio !== null ? data[0].bio : "");
    setName(data[0].name !== null ? data[0].name : "");
    setSelected(data[0].intrest !== null ? data[0].intrest : "");
  }, [data]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    console.log(event.target.value);
    setFile(event.target.files[0]);
    setUpload("show");
  };

  const handleSubmitphoto = async () => {
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const response = await axios.patch(
        `${baseUrl}/api/v1/user/updatePhoto/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data); // Handle the response from the server
      if (response.data.status === "success") {
        setUpload(false);
        toast("Profile Updated");
      }
      // setFile(response.data);
    } catch (error) {
      setUpload(false);
      console.error(error);
    }
  };

  return (
    <div className="profileBack">
      {data.length != 0
        ? data.map((item) => {
            return (
              <section key={item._id} className="profile_container">
                {profile === "profile" && (
                  <div className="profile_card_area">
                    <svg
                      style={{ float: "right" }}
                      onClick={() => setProfile("editprofile")}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
                        stroke="#12037F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z"
                        stroke="#12037F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="profile_box_1">
                      <h2></h2>
                      <h2
                        style={{
                          marginTop: "30px",
                          color: "rgba(18, 3, 127, 1)",
                          fontFamily:"cursive"
                        }}
                      >
                        Name:{item.name}
                      </h2>
                      <h4
                        style={{
                          marginTop: "30px",
                          color: "rgba(18, 3, 127, 1)",
                          fontFamily:"cursive"
                        }}
                      >
                        Bio : {item.bio}
                      </h4>
                      {/* znvk mbjg kjgm pvyu */}
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                        marginTop: "30px",
                        marginLeft: "20px",
                        width: "250px",
                        height: "auto",
                        
                      }}
                    ></div>
                    <h5 style={{     marginTop: "30px",
                          color: "rgba(18, 3, 127, 1)",
                          fontFamily:"cursive"}}>MY Intrest</h5>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "30px",
                        margin: "auto",
                        width: "90%",
                        height: "auto",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.intrest.map((items) => {
                        return (
                          <p
                            style={{
                              background: "rgba(18, 3, 127, 1)",
                              textAlign: "center",
                              color: "white",
                              borderRadius: "20px",
                              padding: "10px 30px 10px 30px",
                              margin: "30px auto",
                            }}
                          >
                            {items.label}
                          </p>
                        );
                      })}
                    </div>
                    <div className="profile_box_4">
                      <button onClick={handleLogout} className="pb4_button">
                        LOGOUT
                      </button>
                    </div>
                  </div>
                )}
                {profile === "editprofile" && (
                  <div className="profile_card_area">
                    <div className="profile_box_1"></div>
                    <form onSubmit={handleSignUp}>
                      <div>
                        <div>
                          <div className="profile_avatar_content">
                            <div className="pac_name">
                              <div>
                                {show == "edit" && (
                                  <div style={{ display: "flex" }}>
                                    <input
                                      type="text"
                                      className="name-input"
                                      placeholder="name"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                    ></input>
                                    <div
                                      onClick={(e) => !setShow("name")}
                                      style={{
                                        cursor: "pointer",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      X
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                        <div className="profile_box_2">
                          <div className="pb2c1">
                            <div className="pacn_bio">
                              <p>Name</p>
                            </div>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
                                  stroke="#12037F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z"
                                  stroke="#12037F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="pb2c2">
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="profile_box_2">
                          <div className="pb2c1">
                            <div className="pacn_bio">
                              <p>Bio</p>
                            </div>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
                                  stroke="#12037F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z"
                                  stroke="#12037F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="pb2c2">
                            <input
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="profile_box_3">
                          <div className="pb2c1">
                            <div className="pacn_bio">
                              <p>Interest</p>
                            </div>
                          </div>
                          <Multiselect
                            options={intrest}
                            required
                            selectedValues={selected}
                            onSelect={(selectedList) =>
                              setSelected(selectedList)
                            }
                            onRemove={(selectedList) =>
                              setSelected(selectedList)
                            }
                            displayValue="label"
                            placeholder="Select Intrest"
                          />
                        </div>
                        <div className="profile_box_4">
                          <button type="submit" className="pb4_button">
                            SUBMIT
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="profile_box_4">
                      <button
                        onClick={() => setProfile("profile")}
                        className="pb4_button"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                )}
              </section>
            );
          })
        : null}
    </div>
  );
}

export default ProfilePage;
