import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import { Typography, Button, Form, message, Input } from "antd";
import img from "../components/Image/001.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import VideoImageThumbnail from "react-video-thumbnail-image";
import { Modal } from "react-bootstrap";
import { buyCard } from "../api/UserKlip";
import QRCode from "qrcode.react";
import Footer from "../components/Footer";

const { Title } = Typography;
const { TextArea } = Input;

function BuyPage(tokenId) {
  const [qrvalue, setQrvalue] = useState("");
  const [show, setShow] = useState(false);

  const video_datas = useLocation();
  const video_title = video_datas.state.title;
  const video_description = video_datas.state.description;
  const video_url = video_datas.state.url;
  const video_token = video_datas.state.token;
  const video_creator_nick = video_datas.state.creator_nick;
  const poster_url = video_datas.state.poster_url;
  const poster_title = video_datas.state.poster_title;
  const navigate = useNavigate();

  console.log("비디오정보", video_datas.state);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = async() => {
    const charToUni = (char)=>{
      var uni_code = ""
      for(var i=0; i<char.length;i++){
        uni_code += '\\'+char[i].charCodeAt(0).toString(16);
      };
      return uni_code
    }
    console.log("video_token : "+video_token);
    buyCard(video_token, setQrvalue, async() => {
      
        handleClose();
        // const result = await axios.get("http://localhost:8000/video/buy_art",{
        const result = await axios.get("http://3.39.32.4:8000/video/buy_art",{
        headers:{
            token_id:video_token, //토큰 id가져오는 부분으로 변경
            nick : charToUni(localStorage.getItem("nick")),
          }
        })
        console.log("result가 들어왔어요~~~~~~~~",result);
        alert("작품이 성공적으로 구매되었습니다.")
        navigate("/",{});

//   const handleShow = async () => {
//     const charToUni = (char) => {
//       var uni_code = "";
//       for (var i = 0; i < char.length; i++) {
//         uni_code += "\\" + char[i].charCodeAt(0).toString(16);
//       }
//       return uni_code;
//     };
//     console.log("video_token : " + video_token);
//     buyCard(video_token, setQrvalue, async () => {
//       handleClose();
//       const result = await axios.get("http://localhost:8000/video/buy_art", {
//         // const result = await axios.get("http://3.39.32.4:8000/video/buy_art",{
//         headers: {
//           token_id: video_token, //토큰 id가져오는 부분으로 변경
//           nick: charToUni(localStorage.getItem("nick")),
//         },
//       });
//       console.log("result가 들어왔어요~~~~~~~~", result);
//       alert("작품이 성공적으로 구매되었습니다.");
//       navigate("/", {});

    });

    setShow(true);
  };
  console.log(video_token);
  // console.log(tokenId);

  return (
    <div class="page">
      <LoginNavigationBar />
      <div class ='Cbody'>
      <div style={{minHeight:'80%', minWidth: '80%',marginLeft: "7rem",marginRight: "7rem", justifyContent:'center' }}>
          <div style={{ maxWidth: "720px",maxHeight:'528px', margin: "7rem auto" , overflow:'hidden',justifyContent:'center' }} onClick={() => navigate("/video", {
          state: {
            title: video_title,
            description: video_description,
            url: video_url,
            creator_nick: video_creator_nick,
          },
        })}>
          <VideoImageThumbnail 
                videoUrl={video_url}
                width={720}
                height={528}
                thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                alt={video_title}
              /> 
        </div>

{/* //       <div class="Cbody">
//         <div
//           style={{
//             minHeight: "80%",
//             minWidth: "80%",
//             marginLeft: "7rem",
//             marginRight: "7rem",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               maxWidth: "720px",
//               maxHeight: "528px",
//               margin: "7rem auto",
//               overflow: "hidden",
//               justifyContent: "center",
//             }}
//           >
//             <VideoImageThumbnail
//               videoUrl={video_url}
//               width={720}
//               height={528}
//               thumbnailHandler={(thumbnail) => console.log(thumbnail)}
//               alt={video_title}
//             />
//           </div> */}

          {/* <img src={poster_url} width="100" height="100" alt="image" /> */}
          {/* <label> 포스터 제목 : {poster_title}</label> */}

          <div class="box1">
            <div class="box2">
              <h3 style={{ color: "white" }}>{video_title}</h3>
              <div>
                <span class="creater">creater</span>

                <span class="nick">{video_creator_nick}</span>
              </div>
              <br />

              <div class="description">{video_description}</div>
            </div>
            <div class="box3">
              <span class="sell">판매가</span>
              <span class="klay">0.1Klay</span>

              <div class="buyBtn" onClick={handleShow}>
                구매하기
              </div>
            </div>
          </div>

          <br />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Modal
            show={show}
            onHide={handleClose}
            size="1g"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>비디오 구매</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ display: "flex" }}>
                <QRCode
                  value={qrvalue}
                  size={200}
                  style={{ margin: "auto" }}
                ></QRCode>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <h7>
                가 격
                ·························································································
                0.01 KLAY
              </h7>
              <hr></hr>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Auth(BuyPage, true);