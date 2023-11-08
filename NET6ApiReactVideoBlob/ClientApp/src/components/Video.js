import React, { useEffect, useState } from 'react';

const url = '/api/video';
let url1 = 'https://localhost:7055/api/video'
//const url = "weatherforecast";

function Video() {
  const [videoUrl, setVideoUrl] = useState(null);

//   useEffect(() => {
//     // Make a GET request to your .NET API endpoint
//     //fetch('/api/videos/your_video.mp4')
//     fetch('/api/video')
//       .then((response) => response.blob()) // Convert response to a Blob
//       .then((blob) => {
//         console.log("in line 14 /// blob =====" + blob);
//         const videoBlobUrl = URL.createObjectURL(blob); // Create a Blob URL
//         console.log("videoBlobUrl ====" + videoBlobUrl);
//         setVideoUrl(videoBlobUrl); // Set the URL in state
//       })
//       .catch((error) => {
//         console.error('Error fetching video:', error);
//       });
//   }, []);


  const getVideo = async () => {
    const options = {
        method: 'GET',
        header: new Headers()
    }
    const response = await fetch(url, options);
    //const response = await fetch(url);
    console.log("response.ok ==== " + response.ok);
    //if(response.OK){
        const videoBlob = await response.blob();
        const videoBlobUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(videoBlobUrl);
        return videoBlobUrl;
    // }
    // else{
    //     return null;
    // }

  } 

    useEffect(() => {
        getVideo();
    }, []);

  return (
    <div>
      <h1>Video Player</h1>
      {/* {videoUrl && (
        <video width="640" height="360" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )} */}
        <video width="640" height="360" controls autoPlay>
          {/* <source src={videoUrl} type="video/mp4" /> */}
          <source src="https://localhost:7102/api/videos" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </div>
  );
}

export default Video;